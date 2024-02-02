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
import './style.scss'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from '@tweenjs/tween.js';

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(3,1,2);
const material = new THREE.MeshBasicMaterial({color:'purple',
wireframe: true})
const mesh = new THREE.Mesh(geometry, material);
const color2 = new THREE.Color( 0xEEEDEB )
scene.background =  color2

const size = {
    width: window.innerWidth,
    height: 1200,
}

const camera = new THREE.PerspectiveCamera(85, size.width/size.height)

camera.position.z = 5
camera.position.y = 2.5
camera.rotation.x = -0.2


mesh.scale.x = 1


scene.add(camera)


// const mesh2 = new THREE.Mesh(geometry, material2);
// scene.add(mesh2)


const lightAmbient = new THREE.AmbientLight(0xFFFFFF, 2)
const light = new THREE.PointLight(0xFFFFFF, 250)
light.position.set(2,8,7)
scene.add(light)
scene.add(lightAmbient)

const canvas = document.getElementsByClassName('canvas')[0]

const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const clock = new THREE.Clock()

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();

// renderer.setSize(size.width, size.height)
renderer.setSize(window.innerWidth, 1200)

renderer.render(scene, camera)



const loaderrr = new GLTFLoader()
loaderrr.load('./monic/scene.gltf', (obj)=> {
    console.log(obj)
    const group = new THREE.Group()

    let root = obj.scene
    // console.log(obj)
    // let root = obj.scene
    // root.scale.x = 10
    // root.scale.y = 10
    // root.scale.z = 10
    // // root.position.x = 2.5
    // // root.rotation.y = 3.14
    // // root.rotation.x = 0.1
    // scene.add(root)
    // console.log(root)
    // // camera.lookAt(root.rotation)
    // renderer.render(scene, camera)
    loaderrr.load('./desk/scene.gltf', (obj)=> {
        let root2 = obj.scene
        root2.scale.x = 10
        root2.scale.y = 10
        root2.scale.z = 10
        group.add(root)
        group.add(root2)
        scene.add(group)
    })
    // root.scale.x = 5
    // root.scale.y = 5
    // root.scale.z = 5
    root.position.y = 1.81

    // root.rotation.y = 3.14
    // root.rotation.x = 0.1
    console.log(root)
    // camera.lookAt(root.rotation)
    renderer.render(scene, camera)
    var start = { x: 0, y: 0, z: 0 };
    var end = { x:0, y: -1, z: 4 };
    let rotats = {x:0,y:0,z:0}
    let rotate = {x:0,y:0,z:0}

    const interval = setInterval(()=>{
        group.rotation.y += 0.003
    }, 10)


    window.addEventListener(`scroll`, function scr(){
        console.log('scroll')
        this.removeEventListener(`scroll`,scr )


        setTimeout(()=>{
            let mainPlace = document.getElementsByClassName('mainPlace')[0]
            mainPlace.style.opacity = '1'
            canvas.style.opacity = '0'
            scroll(0,0)
            setTimeout(()=> canvas.style.display = 'none', 500)
        },1000)
        clearInterval(interval)
        const interval2 = setInterval(()=>{
            if (+group.rotation.y.toFixed(1) % 6.2 > 3.2){
                group.rotation.y += 0.08
                console.log('work')
                console.log(group.rotation.y.toFixed(1) % 3.1)
            } else {
                group.rotation.y -= 0.08
            }
            if (group.rotation.y.toFixed(1) % 6.2 === 0) {
                group.rotation.y = 0
                clearInterval(interval2)
                tick()
            }
        },10)
        const tick = ()=> {

            const elepsedTime = clock.getElapsedTime()

            TWEEN.update()
            setTimeout(()=>{
                var tween = new TWEEN.Tween(start)
                    .to(end, 100) // Продолжительность в миллисекундах
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .onUpdate(function () {
                        // Обновление позиции объекта
                        // console.log('lok')
                        group.position.set(start.x, start.y, start.z);
                        renderer.render(scene, camera)
                    })
                    .start();
            },100)
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }

    })
})

// loaderrr.load('./desk/scene.gltf', (obj)=> {
//     console.log(obj)
//     let root = obj.scene
//     root.scale.x = 10
//     root.scale.y = 10
//     root.scale.z = 10
//     // root.position.x = 2.5
//     // root.rotation.y = 3.14
//     // root.rotation.x = 0.1
//     scene.add(root)
//     console.log(root)
//     // camera.lookAt(root.rotation)
//     renderer.render(scene, camera)
//
// })