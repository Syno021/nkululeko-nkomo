import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Edges, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function IconCard({ position = [0, 0, 0], icon = '⭐', label = '', onSelect }) {
	const groupRef = useRef();
	const [hovered, setHovered] = useState(false);
	const spinComplete = useRef(false);
	const spinProgress = useRef(0);

	// Trigger full spin animation on mount
	useEffect(() => {
		spinComplete.current = false;
		spinProgress.current = 0;
	}, []);

	// Animate full 360-degree spin on load
	useFrame((_, delta) => {
		if (!spinComplete.current && groupRef.current) {
			spinProgress.current += delta * 0.8; // Adjust speed (0.8 = ~2 seconds for full rotation)
			if (spinProgress.current >= Math.PI * 2) {
				spinProgress.current = Math.PI * 2;
				spinComplete.current = true;
			}
			groupRef.current.rotation.y = spinProgress.current;
		}
	});

	return (
		<group
			ref={groupRef}
			position={position}
			onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
			onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
			onClick={(e) => { e.stopPropagation(); if (onSelect) onSelect(); }}
			scale={hovered ? 1.08 : 1}
		>
			<RoundedBox args={[2.8, 2.8, 0.28]} radius={0.22} smoothness={8}>
				<meshStandardMaterial
					color={hovered ? '#0f1e38' : '#0b1630'}
					metalness={0.35}
					roughness={0.35}
					emissive={hovered ? '#1ec8ff' : '#0a0a1a'}
					emissiveIntensity={hovered ? 0.2 : 0.06}
				/>
				<Edges scale={1.01} threshold={12} color={hovered ? '#7de3ff' : '#a7b6ff'} />
			</RoundedBox>
			{/* Front face */}
			<Text position={[0, 0.25, 0.18]} fontSize={1.3} color="#eaf2ff" anchorX="center" anchorY="middle" material-side={THREE.DoubleSide}>{icon}</Text>
			<Text position={[0, -1.2, 0.18]} fontSize={0.36} color="#e8f0ff" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#06111f" material-side={THREE.DoubleSide}>{label}</Text>
			{/* Back face (mirrored) */}
			<Text position={[0, 0.25, -0.18]} rotation={[0, Math.PI, 0]} fontSize={1.3} color="#eaf2ff" anchorX="center" anchorY="middle" material-side={THREE.DoubleSide}>{icon}</Text>
			<Text position={[0, -1.2, -0.18]} rotation={[0, Math.PI, 0]} fontSize={0.36} color="#e8f0ff" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#06111f" material-side={THREE.DoubleSide}>{label}</Text>
		</group>
	);
}


