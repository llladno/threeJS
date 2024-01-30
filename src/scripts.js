// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,
//
//     // If we need pagination
//     pagination: {
//         el: '.swiper-pagination',
//     },
//
//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//
//     // And if we need scrollbar
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },
// });

import * as THREE from "three"
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import './style.css'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

const geometry = new THREE.BoxGeometry(3,1,2);
const material = new THREE.MeshBasicMaterial({color:'purple',
wireframe: true})
const mesh = new THREE.Mesh(geometry, material);
const color2 = new THREE.Color( 0xd0e0ea );
scene.add(mesh)
scene.background =  color2

const size = {
    width: 600,
    height: 600,
}

const camera = new THREE.PerspectiveCamera(75, size.width/size.height)

camera.position.z = 10
// camera.position.y = 2
// mesh.rotation.y = 1


mesh.scale.x = 1

// setInterval(()=>{
//     mesh.scale.x += 0.001
//     mesh.scale.y += 0.001
//     renderer.render(scene, camera)
// },1)

scene.add(camera)


function init(obj){
    console.log('ok')
    console.log(obj)
    // let children = obj?.children
    // let obj1 = children[0]?.geometry

    const material2 = new THREE.MeshBasicMaterial({
        color: 'red'
    })
    // const mesh2 = new THREE.Mesh(obj1, material2);
    // const cube = new THREE.Mesh(obj, material2)
    // cube.rotation.y = 1.4
    // mesh2.rotation.x = 1
    scene.add(obj)
    camera.position.y = 3
    // camera.lookAt(mesh2.position)
    renderer.render(scene, camera)
}


const material2 = new THREE.MeshBasicMaterial({
    color: 'red'
})
// const mesh2 = new THREE.Mesh(geometry, material2);
// scene.add(mesh2)
const loaderrr = new GLTFLoader()
loaderrr.load('./model/laptop/scene.gltf', (obj)=> {
    console.log(obj)
    let root = obj.scene
    root.scale.x = 3
    root.scale.y = 3
    root.scale.z = 3
    root.rotation.y = 3.14
    root.rotation.x = 0.5
    scene.add(root)
    renderer.render(scene, camera)
})

const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(2,2,5)
scene.add(light)

const canvas = document.getElementsByClassName('canvas')[0]

const renderer = new THREE.WebGLRenderer({canvas})
const clock = new THREE.Clock()
window.addEventListener(`scroll`, ()=>{

})
let activ = true

const animate = () => {
    requestAnimationFrame(animate);

    // Добавьте ваш код анимации здесь, если это необходимо

    renderer.render(scene, camera);
};

animate();


window.addEventListener(`scroll`, ()=>{

        // const tick = ()=> {
        //     const elepsedTime = clock.getElapsedTime()
        //     console.log('pzdw')
        //     for(let x = -3; x < -1; x = x + 0.2){
        //
        //     }
        //     const interval = setInterval(()=>{
        //         if(mesh2.position.x <= camera.position.x){
        //             camera.lookAt(mesh2.position)
        //             clearInterval(interval)
        //             activ = false
        //         } else {
        //             camera.position.x += 0.01
        //             camera.position.z -= 0.027
        //         }
        //         console.log(mesh2.position)
        //         console.log(camera.position)
        //         camera.lookAt(mesh2.position)
        //         renderer.render(scene, camera)
        //     },1)
            // camera.position.z = 4
            // camera.lookAt(mesh2.position)

            // window.requestAnimationFrame(tick)
        // }
        // tick()
})

// renderer.setSize(size.width, size.height)
renderer.setSize(1200, 1200)

renderer.render(scene, camera)