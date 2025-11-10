import { useEffect, useRef } from 'react';
import './landing.css';
import PageHeader from '../shared/PageHeader';
import SpaceBackground from '../shared/SpaceBackground';

// Core Skills - Your main expertise
const coreSkills = [
	{ 
		icon: '⚛️', 
		name: 'React.js', 
		desc: 'Building dynamic and interactive user interfaces with component-based architecture', 
		tags: ['Hooks', 'Context API', 'Router', 'State Management'] 
	},
	{ 
		icon: '📱', 
		name: 'React Native', 
		desc: 'Cross-platform mobile app development for iOS and Android', 
		tags: ['Native Modules', 'Navigation', 'Redux'] 
	},
	{ 
		icon: '🖥️', 
		name: 'Node.js', 
		desc: 'Server-side JavaScript development for scalable backend solutions', 
		tags: ['Express', 'REST APIs', 'WebSockets', 'NPM'] 
	},
	{ 
		icon: '⚡', 
		name: 'Ionic Framework', 
		desc: 'Hybrid mobile app development with web technologies', 
		tags: ['Angular', 'Capacitor', 'Cordova', 'PWA'] 
	},
	{ 
		icon: '📝', 
		name: 'WordPress', 
		desc: 'Content management and website development with custom themes and plugins', 
		tags: ['Themes', 'Plugins', 'Customization', 'WooCommerce'] 
	},
	{ 
		icon: '🎨', 
		name: 'HTML+CSS', 
		desc: 'Creating beautiful, responsive, and accessible web interfaces', 
		tags: ['Flexbox', 'Grid', 'Animations', 'Responsive'] 
	},
];

// Additional Knowledge - Skills you're familiar with
const knowledgeSkills = [
	{ 
		icon: '🔷', 
		name: 'C#', 
		desc: 'Enterprise-level application development with .NET ecosystem', 
		tags: ['.NET', 'ASP.NET', 'MVC', 'Entity Framework'] 
	},
	{ 
		icon: '☕', 
		name: 'Java', 
		desc: 'Robust backend development and enterprise solutions', 
		tags: ['Spring Boot', 'Maven', 'JPA', 'REST'] 
	},
	{ 
		icon: '🐍', 
		name: 'Python', 
		desc: 'Scripting, automation, and backend development', 
		tags: ['Django', 'Flask', 'Automation'] 
	},
	{ 
		icon: '🦋', 
		name: 'Flutter', 
		desc: 'Cross-platform mobile development with Dart', 
		tags: ['Widgets', 'State Management', 'Material Design'] 
	},
];

export default function Skills3D() {
	const coreSkillsRef = useRef(null);
	const knowledgeSkillsRef = useRef(null);
	const confidenceMessageRef = useRef(null);

	// Calculate when title animation completes
	// PageHeader starts animations after 60ms delay
	// Title: "My Skills" = 8 characters
	// Animation: 60ms delay + (chars - 1) * 0.1s delay + 0.8s duration = 0.06 + (8-1)*0.1 + 0.8 = 1.56s
	// Subtitle: starts at 1.2s (relative), so 0.06 + 1.2 = 1.26s absolute
	// Subtitle: "A comprehensive toolkit to bring your ideas to life" = 9 words
	// Last word starts: 1.26 + (9-1)*0.05 = 1.66s, completes at 1.66 + 0.3 = 1.96s
	// Wait a bit longer to ensure all animations complete
	useEffect(() => {
		const pageHeaderDelay = 0.06; // 60ms delay in PageHeader
		const titleChars = "My Skills".length; // 8 characters
		const subtitleWords = "A comprehensive toolkit to bring your ideas to life".split(' ').length; // 9 words
		
		// Title animation: delay + (titleChars - 1) * 0.1 + 0.8
		const titleAnimationDuration = pageHeaderDelay + (titleChars - 1) * 0.1 + 0.8;
		
		// Subtitle animation: delay + 1.2s start + (subtitleWords - 1) * 0.05 + 0.3s duration
		const subtitleStartDelay = pageHeaderDelay + 1.2;
		const subtitleLastWordStart = subtitleStartDelay + (subtitleWords - 1) * 0.05;
		const subtitleAnimationDuration = subtitleLastWordStart + 0.3;
		
		// Use the longer of the two, plus a small buffer
		const totalAnimationDuration = Math.max(titleAnimationDuration, subtitleAnimationDuration) + 0.2;
		
		const timer = setTimeout(() => {
			if (coreSkillsRef.current) {
				coreSkillsRef.current.classList.remove('hidden');
			}
			if (knowledgeSkillsRef.current) {
				knowledgeSkillsRef.current.classList.remove('hidden');
			}
			if (confidenceMessageRef.current) {
				confidenceMessageRef.current.classList.remove('hidden');
			}
		}, totalAnimationDuration * 1000);

		return () => clearTimeout(timer);
	}, []);

	const handleCardMouseMove = (e) => {
		const el = e.currentTarget;
		const rect = el.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		el.style.setProperty('--mx', `${x}%`);
		el.style.setProperty('--my', `${y}%`);
	};

	const handleCardMouseLeave = (e) => {
		const el = e.currentTarget;
		el.style.removeProperty('--mx');
		el.style.removeProperty('--my');
	};

	return (
		<div className="landing-wrapper sci-fi" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '60px' }}>
			<SpaceBackground />
			<div className="hero" style={{ paddingTop: '30px', paddingBottom: '20px', height: 'auto', minHeight: '200px' }}>
				<PageHeader 
					titleFirst="My Skills" 
					titleSecond="" 
					subtitle="A comprehensive toolkit to bring your ideas to life" 
				/>
			</div>
			
			{/* Core Skills Section */}
			<div style={{ marginBottom: '50px' }}>
				<div className="about-card glass" style={{ maxWidth: 1600, margin: '0 auto 30px' }}>
					<div style={{ 
						textAlign: 'center', 
						marginBottom: '35px',
						paddingBottom: '20px',
						borderBottom: '2px solid rgba(120,150,255,0.2)'
					}}>
						<h2 style={{ 
							fontSize: '2.2rem', 
							fontWeight: 800, 
							color: '#eaf2ff',
							marginBottom: '10px',
							textShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
						}}>
							Core Skills
						</h2>
						<p style={{ 
							color: '#c6d2ff', 
							fontSize: '1.1rem',
							marginTop: '8px'
						}}>
							Technologies I master and use daily to build exceptional solutions
						</p>
					</div>
					<div className="about-content">
						<div className="projects-grid-core hidden" ref={coreSkillsRef}>
							{coreSkills.map((s) => (
								<div
									key={s.name}
									className="glass project-card-3d core-skill-card"
									onMouseMove={handleCardMouseMove}
									onMouseLeave={handleCardMouseLeave}
									style={{ 
										padding: '24px', 
										borderRadius: '12px', 
										background: 'rgba(10,15,35,0.5)',
										border: '1px solid rgba(120,150,255,0.25)',
										minHeight: '220px',
										display: 'flex',
										flexDirection: 'column'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
										<div style={{ fontSize: '36px' }}>{s.icon}</div>
										<div style={{ fontWeight: 800, color: '#eaf2ff', fontSize: '1.3rem' }}>{s.name}</div>
									</div>
									<div style={{ color: '#c6d2ff', fontSize: 15, lineHeight: 1.6, marginBottom: 16, flexGrow: 1 }}>
										{s.desc}
									</div>
									{Array.isArray(s.tags) && s.tags.length > 0 && (
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
											{s.tags.map((t) => (
												<span 
													key={t} 
													style={{ 
														fontSize: 12, 
														padding: '6px 12px', 
														borderRadius: 999, 
														background: 'rgba(34, 211, 238, 0.15)', 
														color: '#7de3ff',
														border: '1px solid rgba(34, 211, 238, 0.25)'
													}}
												>
													{t}
												</span>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Additional Knowledge Section */}
			<div style={{ marginTop: '40px' }}>
				<div className="about-card glass" style={{ maxWidth: 1600, margin: '0 auto' }}>
					<div style={{ 
						textAlign: 'center', 
						marginBottom: '30px',
						paddingBottom: '20px',
						borderBottom: '2px solid rgba(120,150,255,0.15)'
					}}>
						<h2 style={{ 
							fontSize: '1.8rem', 
							fontWeight: 700, 
							color: '#dbe5ff',
							marginBottom: '8px'
						}}>
							Additional Knowledge
						</h2>
						<p style={{ 
							color: '#9fb2ff', 
							fontSize: '1rem',
							marginTop: '6px'
						}}>
							Technologies I'm familiar with and continue to explore
						</p>
					</div>
					<div className="about-content">
						<div className="projects-grid-knowledge hidden" ref={knowledgeSkillsRef}>
							{knowledgeSkills.map((s) => (
								<div
									key={s.name}
									className="glass project-card-3d knowledge-skill-card"
									onMouseMove={handleCardMouseMove}
									onMouseLeave={handleCardMouseLeave}
									style={{ 
										padding: '20px', 
										borderRadius: '12px', 
										background: 'rgba(10,15,35,0.4)',
										border: '1px solid rgba(120,150,255,0.18)',
										minHeight: '180px',
										display: 'flex',
										flexDirection: 'column'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
										<div style={{ fontSize: '32px' }}>{s.icon}</div>
										<div style={{ fontWeight: 700, color: '#eaf2ff', fontSize: '1.2rem' }}>{s.name}</div>
									</div>
									<div style={{ color: '#b8c8ff', fontSize: 14, lineHeight: 1.5, marginBottom: 14, flexGrow: 1 }}>
										{s.desc}
									</div>
									{Array.isArray(s.tags) && s.tags.length > 0 && (
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
											{s.tags.map((t) => (
												<span 
													key={t} 
													style={{ 
														fontSize: 11, 
														padding: '5px 10px', 
														borderRadius: 999, 
														background: 'rgba(120,150,255,0.12)', 
														color: '#c6d2ff'
													}}
												>
													{t}
												</span>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Confidence Message */}
			<div style={{ 
				maxWidth: 1400, 
				margin: '50px auto 0', 
				padding: '30px',
				textAlign: 'center'
			}}>
				<div className="glass hidden" ref={confidenceMessageRef} style={{
					padding: '35px',
					borderRadius: '16px',
					background: 'rgba(10,15,35,0.5)',
					border: '2px solid rgba(34, 211, 238, 0.3)',
					boxShadow: '0 0 40px rgba(34, 211, 238, 0.15)'
				}}>
					<p style={{
						fontSize: '1.4rem',
						fontWeight: 700,
						color: '#7de3ff',
						margin: 0,
						lineHeight: 1.6,
						textShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
					}}>
						With these skills, I have everything needed to turn your vision into reality.
					</p>
					<p style={{
						fontSize: '1.1rem',
						color: '#c6d2ff',
						marginTop: '15px',
						lineHeight: 1.6
					}}>
						From web applications to mobile apps, backend services to frontend interfaces — I'm ready to build.
					</p>
				</div>
			</div>
		</div>
	);
}


