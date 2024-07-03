import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Paddle = ({ position, controls }) => {
  const ref = useRef();
  const moveSpeed = 0.1;
  const paddleSize = { width: 0.2, height: 1 };

  useFrame(() => {
    if (ref.current) {
      if (controls.up && ref.current.position.y < 2.5 - paddleSize.height / 2) {
        ref.current.position.y += moveSpeed;
      }
      if (controls.down && ref.current.position.y > -2.5 + paddleSize.height / 2) {
        ref.current.position.y -= moveSpeed;
      }
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[paddleSize.width, paddleSize.height, 0.2]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const Wall = ({ position, size }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

const Ball = ({ initialPosition, speed, onScore }) => {
  const ballRef = useRef();
  const [ballDirection, setBallDirection] = useState({ dx: speed, dy: speed });

  useFrame(() => {
    if (ballRef.current) {
      const ballPosition = ballRef.current.position;
      ballPosition.x += ballDirection.dx;
      ballPosition.y += ballDirection.dy;

      // Gérer les rebonds de la balle sur les murs du haut et du bas
      if (ballPosition.y >= 2.9 || ballPosition.y <= -2.9) {
        setBallDirection((dir) => ({ ...dir, dy: -dir.dy }));
      }

      // Gestion des rebonds sur les raquettes
      const ballSize = 0.1; // Rayon de la balle
      const paddleSize = { width: 0.2, height: 1 };

      // Raquette gauche (à gauche)
      if (
        ballPosition.x - ballSize <= -4 + paddleSize.width / 2 &&
        ballPosition.y >= ballRef.current.parent.children[2].position.y - paddleSize.height / 2 &&
        ballPosition.y <= ballRef.current.parent.children[2].position.y + paddleSize.height / 2
      ) {
        setBallDirection((dir) => ({ ...dir, dx: -dir.dx }));
      }

      // Raquette droite (à droite)
      if (
        ballPosition.x + ballSize >= 4 - paddleSize.width / 2 &&
        ballPosition.y >= ballRef.current.parent.children[3].position.y - paddleSize.height / 2 &&
        ballPosition.y <= ballRef.current.parent.children[3].position.y + paddleSize.height / 2
      ) {
        setBallDirection((dir) => ({ ...dir, dx: -dir.dx }));
      }

      // Gérer les buts
      if (ballPosition.x <= -5) {
        onScore(2); // But pour le joueur 2
        ballPosition.set(initialPosition[0], initialPosition[1], initialPosition[2]);
        setBallDirection({ dx: speed, dy: speed });
      }
      if (ballPosition.x >= 5) {
        onScore(1); // But pour le joueur 1
        ballPosition.set(initialPosition[0], initialPosition[1], initialPosition[2]);
        setBallDirection({ dx: -speed, dy: speed });
      }
    }
  });

  return (
    <mesh ref={ballRef} position={initialPosition}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Pong3D = () => {
  const controls = {
    left: { up: false, down: false },
    right: { up: false, down: false },
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'z': // Touche z pour la raquette de gauche
        controls.left.up = true;
        break;
      case 'x': // Touche x pour la raquette de gauche
        controls.left.down = true;
        break;
      case 'u': // Touche u pour la raquette de droite
        controls.right.up = true;
        break;
      case 'n': // Touche n pour la raquette de droite
        controls.right.down = true;
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'z': // Touche z pour la raquette de gauche
        controls.left.up = false;
        break;
      case 'x': // Touche x pour la raquette de gauche
        controls.left.down = false;
        break;
      case 'u': // Touche u pour la raquette de droite
        controls.right.up = false;
        break;
      case 'n': // Touche n pour la raquette de droite
        controls.right.down = false;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleScore = (player) => {
    console.log(`Joueur ${player} a marqué un but !`);
    // Ici, vous pouvez implémenter la logique pour mettre à jour les scores
    // et potentiellement réinitialiser la balle au centre.
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Murs du haut et du bas */}
        <Wall position={[0, 3, 0]} size={[10, 0.2, 0.2]} />
        <Wall position={[0, -3, 0]} size={[10, 0.2, 0.2]} />

        {/* Raquettes */}
        <Paddle position={[-4, 0, 0]} controls={controls.left} />
        <Paddle position={[4, 0, 0]} controls={controls.right} />

        {/* Balle */}
        <Ball initialPosition={[0, 0, 0]} speed={0.05} onScore={handleScore} />

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Pong3D;
