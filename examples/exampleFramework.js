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