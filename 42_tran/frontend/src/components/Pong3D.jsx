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
      const ballRadius = 0.1;
      ballPosition.x += ballDirection.dx;
      ballPosition.y += ballDirection.dy;

      if (ballPosition.y + ballRadius >= 2.5 || ballPosition.y - ballRadius <= -2.5) {
        setBallDirection((dir) => ({ ...dir, dy: -dir.dy }));
      }

      const paddleSize = { width: 0.2, height: 1 };

      const leftPaddle = ballRef.current.parent.children.find(
        (child) => child.position.x === -4
      );
      if (
        leftPaddle &&
        ballPosition.x - ballRadius <= leftPaddle.position.x + paddleSize.width / 2 &&
        ballPosition.y >= leftPaddle.position.y - paddleSize.height / 2 &&
        ballPosition.y <= leftPaddle.position.y + paddleSize.height / 2
      ) {
        setBallDirection((dir) => ({ ...dir, dx: Math.abs(dir.dx) }));
      }

      const rightPaddle = ballRef.current.parent.children.find(
        (child) => child.position.x === 4
      );
      if (
        rightPaddle &&
        ballPosition.x + ballRadius >= rightPaddle.position.x - paddleSize.width / 2 &&
        ballPosition.y >= rightPaddle.position.y - paddleSize.height / 2 &&
        ballPosition.y <= rightPaddle.position.y + paddleSize.height / 2
      ) {
        setBallDirection((dir) => ({ ...dir, dx: -Math.abs(dir.dx) }));
      }

      if (ballPosition.x - ballRadius <= -5) {
        onScore(2);
        ballPosition.set(initialPosition[0], initialPosition[1], initialPosition[2]);
        setBallDirection({ dx: speed, dy: speed });
      }
      if (ballPosition.x + ballRadius >= 5) {
        onScore(1);
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
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const controls = useRef({
    left: { up: false, down: false },
    right: { up: false, down: false },
  });

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'z': // Key z for left paddle
        controls.current.left.up = true;
        break;
      case 'x': // Key x for left paddle
        controls.current.left.down = true;
        break;
      case 'u': // Key u for right paddle
        controls.current.right.up = true;
        break;
      case 'n': // Key n for right paddle
        controls.current.right.down = true;
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'z': // Key z for left paddle
        controls.current.left.up = false;
        break;
      case 'x': // Key x for left paddle
        controls.current.left.down = false;
        break;
      case 'u': // Key u for right paddle
        controls.current.right.up = false;
        break;
      case 'n': // Key n for right paddle
        controls.current.right.down = false;
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
    if (player === 1) {
      setScore1((prevScore) => prevScore + 1);
    } else {
      setScore2((prevScore) => prevScore + 1);
    }
  };

  return (
    <>
      <div>Player 1: {score1} - Player 2: {score2}</div>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Paddle position={[-4, 0, 0]} controls={controls.current.left} />
        <Paddle position={[4, 0, 0]} controls={controls.current.right} />
        <Ball initialPosition={[0, 0, 0]} speed={0.05} onScore={handleScore} />
        <Wall position={[0, 2.5, 0]} size={[10, 0.2, 0.2]} />
        <Wall position={[0, -2.5, 0]} size={[10, 0.2, 0.2]} />
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Pong3D;
