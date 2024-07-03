import * as THREE from 'three';

let scene, camera, renderer;
let paddle1, paddle2, ball;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    paddle1 = new THREE.Mesh(geometry, material);
    paddle2 = new THREE.Mesh(geometry, material);
    ball = new THREE.Mesh(geometry, material);

    scene.add(paddle1);
    scene.add(paddle2);
    scene.add(ball);

    paddle1.position.set(-2, 0, 0);
    paddle2.position.set(2, 0, 0);
    ball.position.set(0, 0, 0);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();
