 var camera, scene, particles, renderer;
function loop() {
    particles.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.onload = function () {
    camera = new THREE.PerspectiveCamera(
        70, 
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 20;

    scene = new THREE.Scene();

    particles = new ProtonLoader.ProtonLoader(Proton);
    particles.createParticles({
        container: scene,
        renderType: 'MeshRender',
        body: {
            type: 'sphere',
            radius: 1,
            segments: 8,
        },
        particleProps: {
            rate: [4, 16],
            position: 5,
            mass: 1,
            radius: [6, 12],
            life: 5,
            alpha: [1, 0],
            scale: [0.1, 1.3],
            colors: [0xFF0000, 0x00FF00],
            velocity: {
                speed: 5,
                direction: [0, 1, 0],
                variance: 180,
            },
        },
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    example();
    loop();
    window.addEventListener( 'resize', onWindowResize, false );
    var controls = new THREE.OrbitControls(camera, renderer.domElement, scene.position);
    controls.enableZoom = true;
}