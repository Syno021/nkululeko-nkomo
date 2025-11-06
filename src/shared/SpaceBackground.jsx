import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
    const canvasRef = useRef(null);
    const animationRef = useRef(0);
    const objectsRef = useRef({ stars: [], bodies: [], shooting: [] });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width || (canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth);
            height = rect.height || (canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight);
            canvas.width = Math.floor(width * devicePixelRatio);
            canvas.height = Math.floor(height * devicePixelRatio);
            ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
            seedScene();
        };

        const rand = (min, max) => Math.random() * (max - min) + min;

        const seedScene = () => {
            const densityBase = prefersReduced ? 0.5 : 1;
            const starCount = Math.floor((width * height) / 15000 * densityBase);
            const stars = Array.from({ length: starCount }).map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 1 + 0.2, // depth (parallax)
                r: Math.random() * 1.2 + 0.3,
                twinkle: Math.random() * Math.PI * 2
            }));

            // A few planets and moons drifting slowly across
            const bodies = [];
            const bodyDefs = [
                { radius: 60, color: ['#88aaff', '#4b6bd6'], speed: 0.02, y: 0.25 },
                { radius: 36, color: ['#ffd6a8', '#f0a15b'], speed: 0.035, y: 0.58 },
                { radius: 22, color: ['#c6b7ff', '#8b6bf2'], speed: 0.05, y: 0.78 },
            ];
            bodyDefs.forEach((def, i) => {
                const startX = Math.random() * width;
                bodies.push({
                    x: startX,
                    y: height * def.y,
                    radius: def.radius,
                    colorA: def.color[0],
                    colorB: def.color[1],
                    speed: def.speed * (prefersReduced ? 0.6 : 1),
                    ring: i === 0 ? { inner: def.radius + 10, outer: def.radius + 16 } : null,
                });
            });

            objectsRef.current = { stars, bodies, shooting: [] };
        };

        const drawPlanet = (x, y, radius, colorA, colorB) => {
            const grad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.4, radius * 0.2, x, y, radius);
            grad.addColorStop(0, colorA);
            grad.addColorStop(1, colorB);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawRing = (x, y, inner, outer) => {
            ctx.save();
            ctx.strokeStyle = 'rgba(200, 210, 255, 0.32)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(x, y, (inner + outer) / 2, (inner + outer) / 3, 0.2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        };

        let lastTime = 0;
        const loop = (t) => {
            animationRef.current = requestAnimationFrame(loop);
            const dt = Math.min(32, t - lastTime) / 16.67; // normalize to ~60fps units
            lastTime = t;

            const { stars, bodies, shooting } = objectsRef.current;
            ctx.clearRect(0, 0, width, height);

            // background subtle vignette
            const grd = ctx.createLinearGradient(0, 0, 0, height);
            grd.addColorStop(0, 'rgba(5, 10, 20, 0.6)');
            grd.addColorStop(1, 'rgba(3, 6, 14, 0.9)');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, width, height);

            // stars
            stars.forEach((s) => {
                s.x -= (0.3 + s.z) * dt;
                if (s.x < -2) s.x = width + 2;
                s.twinkle += 0.03 * dt;
                const alpha = 0.5 + Math.sin(s.twinkle) * 0.4;
                ctx.fillStyle = `rgba(220,238,255,${alpha})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // occasional shooting stars
            if (!prefersReduced && Math.random() < 0.01) {
                shooting.push({ x: width + 20, y: rand(0, height * 0.6), vx: -rand(8, 12), vy: rand(1, 3) * (Math.random() < 0.5 ? 1 : -1), life: 1 });
            }
            for (let i = shooting.length - 1; i >= 0; i--) {
                const s = shooting[i];
                s.x += s.vx * dt;
                s.y += s.vy * dt;
                s.life -= 0.02 * dt;
                if (s.life <= 0 || s.x < -50 || s.y < -50 || s.y > height + 50) {
                    shooting.splice(i, 1);
                    continue;
                }
                const grad = ctx.createLinearGradient(s.x, s.y, s.x - 60, s.y + 20);
                grad.addColorStop(0, 'rgba(180, 230, 255, 0.9)');
                grad.addColorStop(1, 'rgba(180, 230, 255, 0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - 80, s.y + 26);
                ctx.stroke();
            }

            // planets and moons
            bodies.forEach((b) => {
                b.x -= b.speed * 60 * dt; // convert speed to px/sec feel
                if (b.x < -b.radius - 120) b.x = width + b.radius + 120; // loop
                drawPlanet(b.x, b.y, b.radius, b.colorA, b.colorB);
                if (b.ring) drawRing(b.x, b.y, b.ring.inner, b.ring.outer);
            });

            // window frame vignette to feel like looking through glass
            const frameGrad = ctx.createRadialGradient(width/2, height/2, Math.min(width, height) * 0.3, width/2, height/2, Math.max(width, height) * 0.8);
            frameGrad.addColorStop(0, 'rgba(0,0,0,0)');
            frameGrad.addColorStop(1, 'rgba(0,0,0,0.35)');
            ctx.fillStyle = frameGrad;
            ctx.fillRect(0, 0, width, height);

            // subtle window beams
            ctx.fillStyle = 'rgba(120,150,255,0.06)';
            ctx.fillRect(0, 0, 6, height);
            ctx.fillRect(width - 6, 0, 6, height);
        };

        const onVis = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationRef.current);
            } else {
                lastTime = performance.now();
                animationRef.current = requestAnimationFrame(loop);
            }
        };

        resize();
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', onVis);
        lastTime = performance.now();
        animationRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVis);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="landing-canvas"
            style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
    );
}


