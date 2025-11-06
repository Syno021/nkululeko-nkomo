import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Edges } from '@react-three/drei';
import * as THREE from 'three';

export default function SkillBox({ position = [0, 0, 0], label = '', onSelect }) {
	const meshRef = useRef();
	const [isActive, setIsActive] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [dragging, setDragging] = useState(false);
	const dragStart = useRef({ x: 0, y: 0 });
	const rotationOnDown = useRef(new THREE.Euler());

	useFrame((_, delta) => {
		if (!dragging && !isActive && meshRef.current) {
			meshRef.current.rotation.y += delta * 0.2; // idle slow spin
		}
	});

	return (
		<group position={position}>
			<group
				ref={meshRef}
				onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
				onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
				onPointerDown={(e) => {
					e.stopPropagation();
					setDragging(true);
					dragStart.current = { x: e.pointer.x, y: e.pointer.y };
					rotationOnDown.current.copy(meshRef.current.rotation);
				}}
				onPointerUp={(e) => {
					e.stopPropagation();
					setDragging(false);
					setIsActive(false);
				}}
				onPointerMove={(e) => {
					if (!dragging) return;
					e.stopPropagation();
					setIsActive(true);
					const deltaX = e.pointer.x - dragStart.current.x;
					const deltaY = e.pointer.y - dragStart.current.y;
					meshRef.current.rotation.y = rotationOnDown.current.y + deltaX * Math.PI * 2;
					meshRef.current.rotation.x = rotationOnDown.current.x + deltaY * Math.PI * 2;
				}}
				onClick={(e) => {
					e.stopPropagation();
					if (onSelect) onSelect();
				}}
				scale={hovered ? 1.06 : 1}
			>
				<RoundedBox args={[2, 2.6, 0.5]} radius={0.12} smoothness={6} castShadow receiveShadow>
					<meshStandardMaterial color={isActive ? '#7de3ff' : '#8ea6ff'} metalness={0.35} roughness={0.3} emissive={hovered ? '#1ec8ff' : '#0a0a1a'} emissiveIntensity={hovered ? 0.25 : 0.05} />
					<Edges scale={1.01} threshold={15} color={hovered ? '#7de3ff' : '#a7b6ff'} />
				</RoundedBox>
			</group>
			<Text position={[0, -1.7, 0.35]} fontSize={0.34} color="#e8f0ff" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#07101f">
				{label}
			</Text>
		</group>
	);
}


