import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

export default function Landing() {
	const titleFirstRef = useRef(null);
	const titleSecondRef = useRef(null);
	const taglineRef = useRef(null);
	const typingRef = useRef(null);
	const navigate = useNavigate();

	// Parallax tilt on the CTA based on mouse movement
	useEffect(() => {
		const heroEl = document.querySelector('.hero');
		const ctaEl = document.querySelector('.btn-cta');
		if (!heroEl || !ctaEl) return;
		const onMove = (e) => {
			const rect = heroEl.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			const tiltX = (0.5 - y) * 8;
			const tiltY = (x - 0.5) * 12;
			ctaEl.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
		};
		const onLeave = () => {
			ctaEl.style.transform = '';
		};
		heroEl.addEventListener('mousemove', onMove);
		heroEl.addEventListener('mouseleave', onLeave);
		return () => {
			heroEl.removeEventListener('mousemove', onMove);
			heroEl.removeEventListener('mouseleave', onLeave);
		};
	}, []);

	useEffect(() => {
		const splitText = (element) => {
			if (!element) return [];
			const original = element.textContent;
			element.innerHTML = original
				.split("")
				.map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`) 
				.join("");
			return element.querySelectorAll('span');
		};

		const firstSpans = splitText(titleFirstRef.current);
		const secondSpans = splitText(titleSecondRef.current);
		const allTitleSpans = [...firstSpans, ...secondSpans];

		if (taglineRef.current) {
			const text = taglineRef.current.innerHTML;
			taglineRef.current.innerHTML = text
				.split('&nbsp;')
				.map((word) => `<span>${word}&nbsp;</span>`) 
				.join("");
		}

		const startAnimations = () => {
			allTitleSpans.forEach((span, index) => {
				span.style.animation = `slideUp 0.8s ease-out forwards ${index * 0.1}s`;
			});
			setTimeout(() => {
				if (!taglineRef.current) return;
				Array.from(taglineRef.current.querySelectorAll('span')).forEach((span, index) => {
					span.style.animation = `slideLeft 0.3s ease-out forwards ${index * 0.05 + 1.2}s`;
				});
			}, 1200);
		};

		const typing = () => {
			const fullText = "Hi, I'm SYNO. I'm a passionate full-stack developer specializing in web and app development. I graduated from the University of Technology with a degree in Computer Science in 2019. Since then, I've been building innovative solutions for clients across various industries. My expertise includes React, Node.js, Flutter, and cloud infrastructures. I believe in clean code and user-centered design principles. When I'm not coding, you can find me hiking or exploring new technologies.";
			let idx = 0;
			const step = () => {
				if (!typingRef.current) return;
				if (idx < fullText.length) {
					typingRef.current.textContent += fullText.charAt(idx);
					idx += 1;
					setTimeout(step, 30);
				}
			};
			setTimeout(step, 2500);
		};

		const t = setTimeout(() => {
			startAnimations();
			typing();
		}, 100);

		return () => clearTimeout(t);
	}, []);

	return (
		<div className="landing-wrapper">
			<div className="hero">
				<div className="content-container">
					<div className="title-container">
						<h1 className="animated-title neon" id="title-first" ref={titleFirstRef}>SYNO THE</h1>
						<h1 className="animated-title neon" id="title-second" ref={titleSecondRef}>DEVELOPER</h1>
					</div>
					<p className="animated-tagline subneon" ref={taglineRef}>
						Web/App&nbsp;Development&nbsp;-&nbsp;Your&nbsp;idea,&nbsp;My&nbsp;Code
					</p>
				</div>
			</div>

			<div className="about-card glass">
				<h2>About Me</h2>
				<div className="about-content">
					<span ref={typingRef}></span><span className="typing-cursor"></span>
				</div>
				<div className="cta-wrapper">
					<div className="click-hint"><span>Click me</span> <span className="hint-arrow">⬇</span></div>
					<button className="read-more btn-cta" onClick={() => navigate('/scene')}>See more</button>
				</div>
			</div>
		</div>
	);
}


