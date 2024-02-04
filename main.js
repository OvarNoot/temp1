import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.x = - 4;
camera.position.z = 4;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer( {
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xffffff);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const group = new THREE.Group();
scene.add(group);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 20, 50 );
controls.minDistance = 5;
controls.maxDistance = 500;
controls.autoRotate =  true;


const planegeometry = new THREE.PlaneGeometry( 50, 50 );
const planematerial1 = new THREE.MeshBasicMaterial( {color: 0xbc9476} );
const plane = new THREE.Mesh( planegeometry, planematerial1 );
plane.rotation.x = -Math.PI / 2;
group.add( plane );




//stem
const stemgemoetry = new THREE.CylinderGeometry(1, .5, 10, 32);
const stemmaterial = new THREE.MeshPhongMaterial({ color: 0x00e500 });
const stem = new THREE.Mesh( stemgemoetry, stemmaterial );
stem.position.y = 4.5;
group.add(stem);

const ringgeometry = new THREE.RingGeometry( 1, 3, 2 ); 
const ringmaterial = new THREE.MeshBasicMaterial( { color:  0xff0000, side: THREE.DoubleSide } );
const ring = new THREE.Mesh( ringgeometry, ringmaterial ); 
ring.rotation.x = -Math.PI / 2;
ring.position.y = 9.5;
group.add( ring );

const ringgeometry1 = new THREE.RingGeometry( 1, 4, 4 ); 
const ringmaterial1 = new THREE.MeshBasicMaterial( { color:  0xFF3232, side: THREE.DoubleSide } );
const ring1 = new THREE.Mesh( ringgeometry1, ringmaterial1 ); 
ring1.rotation.x = -Math.PI / 2;
ring1.position.y = 9.5;
group.add( ring1 );

const ringgeometry2 = new THREE.RingGeometry( 1, 5, 6 ); 
const ringmaterial2 = new THREE.MeshBasicMaterial( { color: 0xFF9999, side: THREE.DoubleSide } );
const ring2 = new THREE.Mesh( ringgeometry2, ringmaterial2 ); 
ring2.rotation.x = -Math.PI / 2;
ring2.position.y = 9.5;
group.add( ring2 );

const ringgeometry3 = new THREE.RingGeometry( 1, 5.5, 8 ); 
const ringmaterial3 = new THREE.MeshBasicMaterial( { color: 0xFFCCCC, side: THREE.DoubleSide } );
const ring3 = new THREE.Mesh( ringgeometry3, ringmaterial3 ); 
ring3.rotation.x = -Math.PI / 2;
ring3.position.y = 9.5;
group.add( ring3 );

const ringgeometry4 = new THREE.RingGeometry( 1, 6, 10 ); 
const ringmaterial4 = new THREE.MeshBasicMaterial( { color:0xFF6666 , side: THREE.DoubleSide } );
const ring4 = new THREE.Mesh( ringgeometry4, ringmaterial4 ); 
ring4.rotation.x = -Math.PI / 2;
ring4.position.y = 9.5;
group.add( ring4 );




const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'audios/Fallen.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0 );
    sound.autoplay = true;

});

const music = document.getElementById('music');
music.addEventListener('change', function (){
	sound.play();
    if (!music.checked) {
        sound.setVolume( 0 );
    } else {
        sound.setVolume(0.5);
    }

});

const crazy = document.getElementById('crazy');
crazy.addEventListener('change', function (){});

var a, b, c;
const speedslider = document.getElementById('slider');
speedslider.addEventListener('input', function (){
    a = slider.value * 50
    b = slider.value * 100
    c = slider.value * 150
});

function animate() {
    const now = Date.now();
    if (crazy.checked){
        group.rotation.set(
            Math.PI * Math.cos( now / a ),
            Math.PI * Math.sin( now / b ),
            Math.PI * Math.sin( now / c )
          );
    } else {
        group.rotation.set(0,0,0);
    }


	requestAnimationFrame( animate );

    ring.rotation.x -= 0.01;
    ring.rotation.y += 0.01;

    ring1.rotation.x += 0.02;
    ring1.rotation.y += 0.02;

    ring2.rotation.x -= 0.03;
    ring2.rotation.y -= 0.03;

    ring3.rotation.x += 0.04;
    ring3.rotation.y -= 0.04;

    ring4.rotation.x += 0.05;
    ring4.rotation.y += 0.05;


    controls.update();
	renderer.render( scene, camera );
}
animate();