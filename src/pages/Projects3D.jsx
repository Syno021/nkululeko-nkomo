import './landing.css';
import PageHeader from '../shared/PageHeader';
import SpaceBackground from '../shared/SpaceBackground';

export default function Projects3D() {
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
    const items = [
        {
            title: 'E-Commerce Platform',
            desc: 'React + Node.js store with auth, search, payments.',
            langs: ['React', 'Node.js', 'MongoDB'],
            image: 'https://via.placeholder.com/80?text=EC',
            link: 'https://example.com/ecommerce'
        },
        {
            title: 'Task Management App',
            desc: 'Flutter app with sync, reminders, collaboration.',
            langs: ['Flutter', 'Dart', 'Firebase'],
            image: 'https://via.placeholder.com/80?text=TM',
            link: 'https://example.com/tasks'
        },
        {
            title: 'Portfolio Website',
            desc: 'Responsive portfolio with galleries and blog.',
            langs: ['Next.js', 'Tailwind', 'Vercel'],
            image: 'https://via.placeholder.com/80?text=PF',
            link: 'https://example.com/portfolio'
        },
        {
            title: 'Real Estate Listings',
            desc: 'Filters, maps, virtual tours, valuation.',
            langs: ['React', 'Mapbox', 'Express'],
            image: 'https://via.placeholder.com/80?text=RE',
            link: 'https://example.com/real-estate'
        },
        {
            title: 'Fitness Tracker',
            desc: 'Workouts, nutrition, progress visualization.',
            langs: ['React Native', 'TypeScript'],
            image: 'https://via.placeholder.com/80?text=FT',
            link: 'https://example.com/fitness'
        },
        {
            title: 'Educational Platform',
            desc: 'Courses, quizzes, progress tracking.',
            langs: ['Vue', 'Node.js', 'PostgreSQL'],
            image: 'https://via.placeholder.com/80?text=ED',
            link: 'https://example.com/education'
        },
        {
            title: 'Chat Application',
            desc: 'Realtime chat with groups and media.',
            langs: ['Socket.io', 'React', 'Redis'],
            image: 'https://via.placeholder.com/80?text=CH',
            link: 'https://example.com/chat'
        },
        {
            title: 'Analytics Dashboard',
            desc: 'Data viz and KPI monitoring.',
            langs: ['React', 'D3.js', 'Node.js'],
            image: 'https://via.placeholder.com/80?text=AD',
            link: 'https://example.com/analytics'
        },
        {
            title: 'Booking System',
            desc: 'Reservations with calendar integration.',
            langs: ['Laravel', 'MySQL', 'Vue'],
            image: 'https://via.placeholder.com/80?text=BK',
            link: 'https://example.com/booking'
        },
        {
            title: 'AI Image Tagger',
            desc: 'Auto-tag images using ML.',
            langs: ['Python', 'FastAPI', 'React'],
            image: 'https://via.placeholder.com/80?text=AI',
            link: 'https://example.com/ai-tagger'
        }
    ];

    return (
        <div className="landing-wrapper sci-fi" style={{ minHeight: '100vh', position: 'relative' }}>
            <SpaceBackground />
            <div className="hero">
                <PageHeader titleFirst="Projects" titleSecond="& Experience" subtitle="Selected work and case studies" />
            </div>
            <div className="about-card glass" style={{ maxWidth: 1400 }}>
                <div className="about-content">
                    <div className="projects-grid-5">
                        {items.map((p) => (
                            <div
                                key={p.title}
                                className="glass project-card-3d"
                                onMouseMove={handleCardMouseMove}
                                onMouseLeave={handleCardMouseLeave}
                                style={{ padding: '16px', borderRadius: '10px', background: 'rgba(10,15,35,0.4)' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                    <img src={p.image} alt={p.title} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }} />
                                    <div style={{ fontWeight: 800, color: '#eaf2ff' }}>{p.title}</div>
                                </div>
                                <div style={{ color: '#c6d2ff', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
                                {Array.isArray(p.langs) && p.langs.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                                        {p.langs.map((l) => (
                                            <span key={l} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: 'rgba(120,150,255,0.12)', color: '#dbe5ff' }}>{l}</span>
                                        ))}
                                    </div>
                                )}
                                {p.link && (
                                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                                        display: 'inline-block',
                                        padding: '8px 12px',
                                        borderRadius: 8,
                                        background: 'linear-gradient(135deg, rgba(120,150,255,0.35), rgba(120,150,255,0.2))',
                                        color: '#eaf2ff',
                                        textDecoration: 'none',
                                        fontWeight: 700
                                    }}>View Project</a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


