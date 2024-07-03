import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballRef = useRef({ x: 50, y: 50, dx: 2, dy: 2, radius: 10 });
  const paddle1Ref = useRef({ y: 100, width: 10, height: 50 });
  const paddle2Ref = useRef({ y: 100, width: 10, height: 50 });
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const update = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Dessiner la balle
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2);
          ctx.fill();

          // Dessiner les raquettes
          ctx.fillStyle = 'white';
          ctx.fillRect(10, paddle1Ref.current.y, paddle1Ref.current.width, paddle1Ref.current.height);
          ctx.fillRect(canvas.width - 20, paddle2Ref.current.y, paddle2Ref.current.width, paddle2Ref.current.height);

          // Mouvement de la balle
          let { x, y, dx, dy, radius } = ballRef.current;
          x += dx;
          y += dy;

          // Détection de collision avec les bords verticaux
          if (y + radius > canvas.height || y - radius < 0) {
            dy = -dy;
          }

          // Détection de collision avec les raquettes
          if (
            (x - radius < 20 && y > paddle1Ref.current.y && y < paddle1Ref.current.y + paddle1Ref.current.height) ||
            (x + radius > canvas.width - 20 && y > paddle2Ref.current.y && y < paddle2Ref.current.y + paddle2Ref.current.height)
          ) {
            dx = -dx;
          }

          // Réinitialiser la balle si elle sort de l'écran
          if (x - radius < 0) {
            setScore(prevScore => ({ ...prevScore, player2: prevScore.player2 + 1 }));
            x = canvas.width / 2;
            y = canvas.height / 2;
          }
          if (x + radius > canvas.width) {
            setScore(prevScore => ({ ...prevScore, player1: prevScore.player1 + 1 }));
            x = canvas.width / 2;
            y = canvas.height / 2;
          }

          ballRef.current = { x, y, dx, dy, radius };

          // Demander une nouvelle frame d'animation
          requestAnimationFrame(update);
        };

        // Démarrer l'animation
        requestAnimationFrame(update);
      }
    }
  }, []);

  useEffect(() => {
    const sock = new SockJS('http://localhost:8000');
    const stompClient = new Client({
      webSocketFactory: () => sock,
      debug: str => {
        console.log(str);
      },
      onConnect: () => {
        stompClient.subscribe('/topic/pong', (message: IMessage) => {
          const data = JSON.parse(message.body);
          handleServerMessage(data);
        });
      },
    });
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const handleServerMessage = (data: any) => {
    if (data.type === 'paddle_position') {
      const newPosition = data.position;
      paddle2Ref.current.y += newPosition;
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={400} />
      <div>
        Player 1: {score.player1} - Player 2: {score.player2}
      </div>
    </div>
  );
};

export default PongGame;
