import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Bounds, useBounds, Environment, Sparkles, Float, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import IconCard from '../shared/IconCard';

function FocusOnSelect({ onBackgroundClick }) {
	const api = useBounds();
	return (
		<group
			onClick={(e) => {
				e.stopPropagation();
				api.refresh(e.object).fit();
			}}
			onPointerMissed={(e) => {
				if (e.type === 'click') {
					api.refresh().fit();
					// Stop animation when clicking on empty space
					if (onBackgroundClick) {
						onBackgroundClick();
					}
				}
			}}
		/>
	);
}

function CameraController({ stopAnimation }) {
	const { camera } = useThree();
	const controlsRef = useRef();
	const animationComplete = useRef(false);
	const animationProgress = useRef(0);
	const initialCameraPosition = useRef(new THREE.Vector3());
	const initialTarget = useRef(new THREE.Vector3());

	useEffect(() => {
		// Store initial camera state
		initialCameraPosition.current.copy(camera.position);
		if (controlsRef.current) {
			initialTarget.current.copy(controlsRef.current.target);
		}
		animationComplete.current = false;
		animationProgress.current = 0;
	}, []);

	// Stop animation when stopAnimation is called
	useEffect(() => {
		if (stopAnimation) {
			animationComplete.current = true;
		}
	}, [stopAnimation]);

	useFrame((_, delta) => {
		if (!animationComplete.current && controlsRef.current) {
			animationProgress.current += delta * 0.3; // Adjust speed (0.3 = ~10 seconds for full rotation)
			
			if (animationProgress.current >= Math.PI * 2) {
				animationProgress.current = Math.PI * 2;
				animationComplete.current = true;
			}

			// Rotate camera around the scene in a circle
			const radius = 20;
			const height = 4;
			const angle = animationProgress.current;
			
			camera.position.x = Math.cos(angle) * radius;
			camera.position.z = Math.sin(angle) * radius;
			camera.position.y = height + Math.sin(angle * 0.5) * 2; // Slight vertical movement
			
			// Make camera look at center
			controlsRef.current.target.set(0, 0, 0);
			camera.lookAt(0, 0, 0);
			controlsRef.current.update();
		}
	});

	return (
		<OrbitControls
			ref={controlsRef}
			enablePan
			panSpeed={0.6}
			enableDamping
			dampingFactor={0.08}
			minDistance={6}
			maxDistance={36}
			minPolarAngle={Math.PI / 3}
			maxPolarAngle={(Math.PI / 2) + 0.15}
		/>
	);
}

export default function Portfolio3D() {
    const navigate = useNavigate();
    const [stopAnimation, setStopAnimation] = useState(false);
    const items = useMemo(() => {
        // Asymmetric, unconventional layout with varied depths and float settings
        return [
            { pos: [-7.2, 3.4, -1.6], label: 'My Skills', icon: '🛠️', route: '/skills', float: { speed: 0.9, rot: 0.35, floatI: 1.0 } },
            { pos: [3.8, 4.2, 1.4], label: 'Projects & Experience', icon: '🚀', route: '/projects', float: { speed: 1.2, rot: 0.25, floatI: 0.7 } },
            { pos: [-1.1, -2.8, 2.8], label: 'Services', icon: '🧰', route: '/services', float: { speed: 0.8, rot: 0.5, floatI: 1.2 } },
            { pos: [7.4, -1.3, -1.2], label: 'Contact', icon: '✉️', route: '/contact', float: { speed: 1.1, rot: 0.3, floatI: 0.9 } },
        ];
    }, []);

	const handleClick = (e) => {
		// Only stop animation if clicking on the background (not on cards)
		// The cards will handle their own clicks via stopPropagation
		if (e.target === e.currentTarget || e.target.tagName === 'CANVAS') {
			setStopAnimation(true);
		}
	};

	return (
		<div 
			style={{ width: '100vw', height: '100vh', background: '#050a16', overflow: 'hidden', cursor: stopAnimation ? 'default' : 'pointer' }}
			onClick={handleClick}
		>
			<Canvas camera={{ position: [0, 0, 16], fov: 50 }} dpr={[1, 2]}>
				<color attach="background" args={["#050a16"]} />
				<fog attach="fog" args={["#050a16", 18, 70]} />
				<Suspense fallback={null}>
					<ambientLight intensity={0.5} />
					<directionalLight position={[6, 10, 6]} intensity={1} />
					<Environment preset="night" />
					<Sparkles count={250} scale={[40, 12, 10]} size={2} speed={0.5} color="#7de3ff" />

					{/* Bounds lets us smoothly frame a clicked object */}
					<Bounds fit clip observe margin={1.2}>
                        {items.map((item, idx) => (
                            <Float key={idx} speed={item.float?.speed ?? 1} rotationIntensity={item.float?.rot ?? 0.2} floatIntensity={item.float?.floatI ?? 0.8}>
                                <IconCard
                                    position={item.pos}
                                    icon={item.icon}
                                    label={item.label}
                                    onSelect={() => navigate(item.route)}
                                />
                            </Float>
                        ))}
						<FocusOnSelect onBackgroundClick={() => setStopAnimation(true)} />
					</Bounds>

					<ContactShadows position={[0, -3.8, 0]} opacity={0.5} scale={40} blur={2.6} far={8} color="#021528" />

					{/* Camera controller with automatic rotation on load */}
					<CameraController stopAnimation={stopAnimation} />
				</Suspense>
			</Canvas>
		</div>
	);
}


