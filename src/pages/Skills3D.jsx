import './landing.css';
import PageHeader from '../shared/PageHeader';
import SpaceBackground from '../shared/SpaceBackground';

const skills = [
	{ icon: '💻', name: 'React', desc: 'SPA development, hooks, context, routing', tags: ['Hooks', 'Router', 'Redux Toolkit'] },
	{ icon: '🖥️', name: 'Node.js', desc: 'APIs, auth, queues, file processing', tags: ['Express', 'NestJS', 'JWT'] },
	{ icon: '📱', name: 'Flutter', desc: 'Cross-platform apps with state mgmt', tags: ['Provider', 'Bloc'] },
	{ icon: '☁️', name: 'AWS', desc: 'Serverless, CI/CD, infra as code', tags: ['Lambda', 'S3', 'CloudFront'] },
	{ icon: '🔄', name: 'CI/CD', desc: 'Automated builds, tests, deployments', tags: ['GitHub Actions', 'Docker'] },
	{ icon: '🎨', name: 'UI/UX', desc: 'Accessible, responsive, modern design', tags: ['Tailwind', 'Figma'] },
	{ icon: '🔒', name: 'Security', desc: 'Best practices for web & mobile', tags: ['OWASP', 'Auth', 'Rate limit'] },
	{ icon: '📊', name: 'Data', desc: 'Visualization and analytics dashboards', tags: ['D3.js', 'SQL'] },
	{ icon: '⚙️', name: 'TypeScript', desc: 'Typesafe apps and libraries', tags: ['Generics', 'Interfaces'] },
	{ icon: '🗄️', name: 'Databases', desc: 'SQL/NoSQL modelling and tuning', tags: ['Postgres', 'MongoDB'] },
];

export default function Skills3D() {
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
		<div className="landing-wrapper sci-fi" style={{ minHeight: '100vh', position: 'relative' }}>
			<SpaceBackground />
			<div className="hero">
				<PageHeader titleFirst="My Skills" titleSecond="" subtitle="Technologies and tools I work with" />
			</div>
			<div className="about-card glass" style={{ maxWidth: 1400 }}>
				<div className="about-content">
					<div className="projects-grid-5">
						{skills.map((s) => (
							<div
								key={s.name}
								className="glass project-card-3d"
								onMouseMove={handleCardMouseMove}
								onMouseLeave={handleCardMouseLeave}
								style={{ padding: '16px', borderRadius: '10px', background: 'rgba(10,15,35,0.4)' }}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
									<div style={{ fontSize: '28px' }}>{s.icon}</div>
									<div style={{ fontWeight: 800, color: '#eaf2ff' }}>{s.name}</div>
								</div>
								{typeof s.desc === 'string' && (
									<div style={{ color: '#c6d2ff', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>{s.desc}</div>
								)}
								{Array.isArray(s.tags) && s.tags.length > 0 && (
									<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
										{s.tags.map((t) => (
											<span key={t} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: 'rgba(120,150,255,0.12)', color: '#dbe5ff' }}>{t}</span>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}


