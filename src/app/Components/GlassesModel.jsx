/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: AlbertVictory (https://sketchfab.com/albert_victory)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/glasses-4b8a1e54f3084c63828fe8c324198aec
Title: Glasses
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function GlassesModel(props) {
  const { nodes, materials } = useGLTF('/models/glasses1.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.main_plastik_0.geometry}
            material={materials.plastik}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_1_plastik_0.geometry}
            material={materials.plastik}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_1_kr_2_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_1_kr_1_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_1_kr_4_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_1_kr_3_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_1vint_metal_2_0.geometry}
            material={materials.metal_2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hrom_1_hrom_0.geometry}
            material={materials.hrom}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.glass_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_2_plastik_0.geometry}
            material={materials.plastik}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_2_kr_2_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_2_kr_1_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_2_kr_4_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_2_kr_3_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dushka_2_vint_metal_2_0.geometry}
            material={materials.metal_2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hrom_2__0.geometry}
            material={materials.hrom_2__0}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text__0.geometry}
            material={materials.hrom_2__0}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/glasses1.glb')
