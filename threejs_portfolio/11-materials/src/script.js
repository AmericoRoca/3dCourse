import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */

//Loading Manager
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () =>{
    console.log("start");
    
}

loadingManager.onLoad = () =>{
    console.log("load");
}

loadingManager.onProgress = () =>{
    console.log("progress");
}

loadingManager.onError = () =>{
    console.log("error");
}

const textureLoader = new THREE.TextureLoader(loadingManager);

//Textures

//Door
const colorTexture = textureLoader.load("/textures/door/color.jpg",);
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg",);
const heightTexture = textureLoader.load("/textures/door/height.jpg",);
const normalTexture = textureLoader.load("/textures/door/normal.jpg",);
const ambientOclussionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg",);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg",);
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg",);

//Gradient
const gradiente = textureLoader.load("/textures/door/gradients/3jpg",);


//Maccap
const mac = textureLoader.load("/textures/door/matcaps/1.png",);




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//MeshBasicMaterial

const materialSphere = new THREE.MeshBasicMaterial({map: colorTexture})
const materialPlane = new THREE.MeshBasicMaterial({map: normalTexture})
const materialTorus = new THREE.MeshBasicMaterial()

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    materialSphere
)
sphere.position.x = -1.5


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    materialPlane
)


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    materialTorus
)
torus.position.x = 1.5


scene.add(sphere, plane, torus)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    torus.rotation.x = -0.5 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()