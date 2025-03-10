import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

/**
 * Base
 */

const gui = new GUI()

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
const doorColorTexture = textureLoader.load("/textures/door/color.jpg",);
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg",);
const heightTexture = textureLoader.load("/textures/door/height.jpg",);
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg",);
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg",);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg",);
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg",);

//Gradient
const gradiente = textureLoader.load("/textures/door/gradients/3.jpg");


//Maccap
const mac = textureLoader.load("/textures/door/matcaps/1.png",);




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//MeshBasicMaterial

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorAmbientOcclusionTexture
material.displacementScale = 0.1
material.metalnessMap = doorColorTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture


gui.add(material, "metalness").min(0).max(1).step(0.0001)
gui.add(material, "roughness").min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1, 100, 100),
    material
)


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5


scene.add(sphere, plane, torus)

//Ligths
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

const rgbeLoader = new RGBELoader()
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    
    scene.background = environmentMap
    scene.environment = environmentMap
});




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