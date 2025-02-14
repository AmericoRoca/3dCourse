import * as THREE from "./three.module.min.js"

//Scene Mesh Camera Renderer

//Scene
const scene = new THREE.Scene()

//Mesh 
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: "red"})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)


//Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3

scene.add(camera)


//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(aspect.width,aspect.height);


const clock = new THREE.Clock();

const animate = () =>{

    //GET ELAPSETIME
    const elapsedTime = clock.getElapsedTime();

    console.log(elapsedTime)

    //Update rotation on x axis
    mesh.rotation.x = elapsedTime * Math.PI * 2;

    //Renderer
    renderer.render(scene,camera)
    window.requestAnimationFrame(animate)
}

animate();


