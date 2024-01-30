import React, {useRef, useState } from 'react';
import {ThreeElements, useFrame, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";

const Box = (props:any) => {

    const [create] = useLoader(TextureLoader, [
        "wood.jpg"
    ])

    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((state, delta) => {
        ref.current.rotation.x += delta
        ref.current.rotation.z += 0.01
    })
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 4 : 2}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[props.data ? props.data : 1, 1, 1]} />
            <meshStandardMaterial map={create} />
        </mesh>
    )
};

export default Box;