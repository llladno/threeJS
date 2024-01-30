import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import {Canvas} from "@react-three/fiber";
import Box from "./components/Box";
import {OrbitControls} from "@react-three/drei";
import {Model} from "./assets/Model/Scene";

function App() {
    const [value, setValue] = useState('')
    const [data, setData] = useState("")
    const [pos, setPos] = useState(20)
function click(){
        setData(value)
}

useEffect(()=>{

},[pos])

    setTimeout(()=>{
        let val = pos - 0.01
        setPos(val)
    },1)




    return (
        <div>
            <input onChange={(event)=> setValue(event.target.value)}/>
            <button onClick={click}>change</button>

            <Suspense fallback={null}>
                <Canvas camera={{position: [0, 0, 10], fov: 75, near: 3}}>
                    <OrbitControls />
                    <ambientLight intensity={Math.PI / 2}/>
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                    <Box position={[-6, 0, 0]} data={data}/>
                    <Box position={[6, 0, 0]} data={data}/>
                    <Model position={[0,0,0]}></Model>
                </Canvas>
            </Suspense>
        </div>

    );
}

export default App;
