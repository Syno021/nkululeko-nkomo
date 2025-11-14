import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

export default function Landing() {
	const titleFirstRef = useRef(null);
	const titleSecondRef = useRef(null);
	const taglineRef = useRef(null);
	const aboutCardRef = useRef(null);
	const experienceCardsRef = useRef(null);
	const navigate = useNavigate();

	// Parallax tilt on the fixed CTA based on mouse movement
	useEffect(() => {
		const ctaEl = document.querySelector('.btn-cta-fixed');
		if (!ctaEl) return;
		const onMove = (e) => {
			const x = e.clientX / window.innerWidth;
			const y = e.clientY / window.innerHeight;
			const tiltX = (0.5 - y) * 6;
			const tiltY = (x - 0.5) * 10;
			ctaEl.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
		};
		const onLeave = () => {
			ctaEl.style.transform = '';
		};
		window.addEventListener('mousemove', onMove);
		ctaEl.addEventListener('mouseleave', onLeave);
		return () => {
			window.removeEventListener('mousemove', onMove);
			ctaEl.removeEventListener('mouseleave', onLeave);
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

		// Calculate when title animation completes
		// Total characters: firstSpans.length + secondSpans.length
		// Last character starts at: (allTitleSpans.length - 1) * 0.1s
		// Animation duration: 0.8s
		// Total time: (allTitleSpans.length - 1) * 0.1 + 0.8
		const titleAnimationDuration = (allTitleSpans.length - 1) * 0.1 + 0.8;

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
			
			// Show card after title animation completes
			setTimeout(() => {
				if (aboutCardRef.current) {
					aboutCardRef.current.classList.remove('hidden');
				}
			}, titleAnimationDuration * 1000);

			// Show experience cards after about card appears
			setTimeout(() => {
				if (experienceCardsRef.current) {
					experienceCardsRef.current.classList.remove('hidden');
					// Animate cards in sequence
					const cards = experienceCardsRef.current.querySelectorAll('.experience-card');
					cards.forEach((card, index) => {
						setTimeout(() => {
							card.classList.add('animate-in');
						}, index * 150);
					});
				}
			}, titleAnimationDuration * 1000 + 800);
		};

		const t = setTimeout(() => {
			startAnimations();
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

			<div className="about-card glass hidden" ref={aboutCardRef}>
				<div className="about-content">
					<p>Hi, I’m Nkululeko Nkomo, a passionate Software Developer dedicated to building innovative, meaningful solutions that make an impact. 🚀
This website you’re exploring is my personal portfolio, showcasing my skills, experience, and the services I offer. It was crafted with React.js, enhanced with 3D graphics and smooth animations to create a more immersive and interactive user experience.

I consider myself a diligent and committed individual — when I set my mind on something, I make sure it gets done, and done well. 💪

My academic journey began at Mangosuthu University of Technology (MUT), where I earned my Diploma in Information Technology in 2022. I later advanced my expertise by completing my Advanced Diploma in Software Development in 2025. 🎓

Below, you’ll find a glimpse into my professional journey since I first stepped into the world of software development. If you’d like to dive deeper and get to know me even better, feel free to click the “See More” button — where you’ll be mid blown… or maybe not 😅,

Enjoy your stay, and welcome to my world of code and creativity! 🌍💻</p>
				</div>
			</div>

			<button className="btn-cta-fixed" onClick={() => navigate('/scene')}>See more</button>

			<div className="experience-section hidden" ref={experienceCardsRef}>
				<h2 className="experience-section-title">Professional Journey</h2>
				<div className="experience-grid">
					<div className="experience-card glass featured">
						<div className="featured-badge">Top 10</div>
						<div className="experience-header">
							<div className="experience-icon">🏆</div>
							<div className="experience-title-group">
								<h3 className="experience-title">Entrepreneurship Recognition</h3>
								<p className="experience-company">KZN Innovation Summit 2025</p>
							</div>
						</div>
						<div className="experience-period">KwaZulu-Natal, South Africa — 2025</div>
						<p className="experience-description">
							In 2025, I was selected among the Top 10 Entrepreneurs in the KZN Innovation Summit Pitching Competition, where over 100 business ideas were submitted. This recognition highlighted the innovation and potential impact of my entrepreneurial project, representing a significant milestone in my professional and personal development journey. The experience provided valuable exposure to business strategy, startup development, and networking with industry professionals and investors.
						</p>
						<div className="experience-tags">
							<span className="tag">Entrepreneurship</span>
							<span className="tag">Innovation</span>
							<span className="tag">Business Strategy</span>
							<span className="tag">Startup Development</span>
						</div>
					</div>

					<div className="experience-card glass">
						<div className="experience-header">
							<div className="experience-icon">💼</div>
							<div className="experience-title-group">
								<h3 className="experience-title">Innovation Lab Intern</h3>
								<p className="experience-company">Mangosuthu University of Technology (MUT)</p>
							</div>
						</div>
						<div className="experience-period">July 2022 – January 2024</div>
						<p className="experience-description">
							During my internship at the MUT Innovation Lab, I collaborated with a team of developers to design and implement various digital solutions using Ionic, HTML, CSS, and JavaScript. This experience allowed me to strengthen my understanding of front-end development, cross-platform app design, and problem-solving in a real-world context. I was actively involved in project development cycles, user interface design, and testing processes.
						</p>
						<div className="experience-tags">
							<span className="tag">Ionic</span>
							<span className="tag">HTML/CSS</span>
							<span className="tag">JavaScript</span>
							<span className="tag">Front-end</span>
						</div>
					</div>

					<div className="experience-card glass featured">
						<div className="featured-badge">Current Role</div>
						<div className="experience-header">
							<div className="experience-icon">🚀</div>
							<div className="experience-title-group">
								<h3 className="experience-title">Co-founder & Developer</h3>
								<p className="experience-company">SparkDev</p>
							</div>
						</div>
						<div className="experience-period">January 2024 – Present</div>
						<p className="experience-description">
							Following my internship, I co-founded SparkDev, a technology-driven company focused on developing innovative digital solutions. At SparkDev, I work with a diverse tech stack, including React, Ionic, WordPress, and Expo, to build responsive web and mobile applications. My role involves full-stack development, client engagement, project management, and mentoring junior developers. This venture has deepened my expertise in teamwork, agile development, and entrepreneurship.
						</p>
						<div className="experience-tags">
							<span className="tag">React</span>
							<span className="tag">Ionic</span>
							<span className="tag">WordPress</span>
							<span className="tag">Expo</span>
							<span className="tag">Full-stack</span>
						</div>
					</div>

					<div className="experience-card glass academic">
						<div className="experience-header">
							<div className="experience-icon">🎓</div>
							<div className="experience-title-group">
								<h3 className="experience-title">Academic Engagement & Community Involvement</h3>
								<p className="experience-company">Mangosuthu University of Technology</p>
							</div>
						</div>
						<div className="experience-period">2024</div>
						<div className="experience-description">
							<div className="academic-role">
								<h4 className="role-title">STEM Programme Tutor</h4>
								<p className="role-description">
									I received a certificate of recognition for tutoring primary school learners (Grades 5–7) as part of the STEM Community Engagement Programme at MUT. This initiative aimed to inspire young learners to explore science, technology, engineering, and mathematics through interactive sessions and hands-on learning.
								</p>
							</div>
							<div className="academic-role">
								<h4 className="role-title">IT Tutor — Department of Information Technology</h4>
								<p className="role-description">
									I also served as a tutor for undergraduate IT students, focusing on Java programming and Software Development Fundamentals. I provided academic support through tutorials, coding sessions, and mentoring, which helped students strengthen their understanding of programming logic and best practices. I was awarded a <strong>Certificate of Tutoring Excellence</strong> in recognition of my contribution.
								</p>
							</div>
						</div>
						<div className="experience-tags">
							<span className="tag">Teaching</span>
							<span className="tag">Mentoring</span>
							<span className="tag">Java</span>
							<span className="tag">STEM</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


