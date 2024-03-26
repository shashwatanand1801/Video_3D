import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

console.log(THREE)
console.log(GLTFLoader)
const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()

const loader = new GLTFLoader();

var mesh;
var strDownloadMime = "image/octet-stream";

var saveLink = document.createElement('div');
        saveLink.style.position = 'absolute';
        saveLink.style.top = '10px';
        saveLink.style.width = '100%';
        saveLink.style.color = 'white !important';
        saveLink.style.textAlign = 'center';
        saveLink.innerHTML =
            '<a href="#" id="saveLink">Save Frame</a>';
        document.body.appendChild(saveLink);
        document.getElementById("saveLink").addEventListener('click', clkBtn);

loader.load('assets/COMGQHYFJQYHZTDY.glb', function(glb){
    console.log(glb)
    const root = glb.scene
    root.scale.set(2,2,2)
    console.log(root.children[0])
    mesh = root.children[0]

    scene.add(root)
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log("An error occurred")
})


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 1, 5)
scene.add(light)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,0.4,2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    preserveDrawingBuffer: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.render(scene, camera)
renderer.setClearColor( 0x000000, 0 );

function animate() {
    requestAnimationFrame(animate)
    mesh.rotation.y += 0.05
    renderer.render(scene, camera)
}

animate()

function clkBtn(){
    var intervalId = setInterval(saveAsImage, 5);

    setTimeout(function(){
        clearInterval(intervalId);
    }, 6000)
}


function saveFile (strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

function saveAsImage() {
    var imgData, imgNode;

    try {
        var strMime = "image/jpeg";
        imgData = renderer.domElement.toDataURL(strMime);

        saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

    } catch (e) {
        console.log(e);
        return;
    }

}

