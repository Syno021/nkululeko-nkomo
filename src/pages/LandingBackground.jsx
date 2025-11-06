import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { useRef } from 'react';

function RotatingField() {
	const group = useRef();
	useFrame((_, delta) => {
		if (group.current) {
			group.current.rotation.y += delta * 0.05;
		}
	});
	return (
		<group ref={group}>
			<Stars radius={80} depth={40} count={1800} factor={3} saturation={0} fade speed={0.8} />
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}> 
				<circleGeometry args={[80, 64]} />
				<meshBasicMaterial color="#0b1633" />
			</mesh>
		</group>
	);
}

export default function LandingBackground() {
	return (
		<div className="landing-canvas">
			<Canvas camera={{ position: [0, 0, 12], fov: 55 }} dpr={[1, 2]}>
				<ambientLight intensity={0.5} />
				<directionalLight position={[3, 5, 3]} intensity={0.8} />
				<Environment preset="night" />
				<RotatingField />
			</Canvas>
		</div>
	);
}


