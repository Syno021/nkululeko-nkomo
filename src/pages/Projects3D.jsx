import './landing.css';
import PageHeader from '../shared/PageHeader';
import SpaceBackground from '../shared/SpaceBackground';
import { useEffect, useRef, useState } from 'react';

export default function Projects3D() {
    const hostedGridRef = useRef(null);
    const devGridRef = useRef(null);
    const [previewErrors, setPreviewErrors] = useState(new Set());
    
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

    // Calculate when title animation completes and show cards
    useEffect(() => {
        const pageHeaderDelay = 0.06;
        const titleFirst = "Projects";
        const titleSecond = "& Experience";
        const totalChars = titleFirst.length + titleSecond.length;
        const titleAnimationDuration = pageHeaderDelay + (totalChars - 1) * 0.1 + 0.8;
        
        const timer = setTimeout(() => {
            if (hostedGridRef.current) {
                hostedGridRef.current.classList.remove('hidden');
            }
            if (devGridRef.current) {
                devGridRef.current.classList.remove('hidden');
            }
        }, titleAnimationDuration * 1000);

        return () => clearTimeout(timer);
    }, []);

    // Hosted & Completed Projects
    const hostedProjects = [
        {
            title: 'Spark Dev Studio',
            desc: 'Our company website developed using HTML, CSS, and JavaScript.',
            langs: ['HTML', 'CSS', 'JavaScript'],
            link: 'https://www.sparkdevstudio.org/',
            preview: 'https://www.sparkdevstudio.org/',
            icon: '🏢'
        },
        {
            title: 'Iskills Academy',
            desc: 'A platform that teaches basic skills about coding developed using React JS.',
            langs: ['React', 'JavaScript'],
            link: 'https://www.iskillacademy.co.za/',
            preview: 'https://www.iskillacademy.co.za/',
            icon: '🎓'
        },
        {
            title: 'CoopCV',
            desc: 'A system for co-operative education for applications using Ionic.',
            langs: ['Ionic', 'TypeScript'],
            link: 'https://www.coopcv.com',
            preview: 'https://www.coopcv.com/home',
            icon: '📚'
        },
        {
            title: 'Healixir',
            desc: 'A healthcare platform to digitize healthcare facilities using Ionic.',
            langs: ['Ionic', 'TypeScript'],
            link: 'https://healixir.org/',
            preview: 'https://healixir.org/',
            icon: '🏥'
        },
        {
            title: 'Unite Easy',
            desc: 'A system for event management where you book venues and event equipment, developed using Ionic.',
            langs: ['Ionic', 'TypeScript'],
            link: 'https://uniteasy-62dbf.web.app/welcome',
            preview: 'https://uniteasy-62dbf.web.app/welcome',
            icon: '📅'
        },
        {
            title: 'Smart Farming App',
            desc: 'A farming management app for managing crops to detect and prevent crop loss, developed using React.',
            langs: ['React', 'JavaScript'],
            link: 'https://smart-farming-app-seven.vercel.app/',
            preview: 'https://smart-farming-app-seven.vercel.app/',
            icon: '🌾'
        },
        {
            title: 'Certify Pro',
            desc: 'A learning platform for cybersecurity certifications where you can practice and take tests for final examination, developed using Ionic.',
            langs: ['Ionic', 'TypeScript'],
            link: 'https://certify-pro-seven.vercel.app/home',
            preview: 'https://certify-pro-seven.vercel.app/home',
            icon: '🔒'
        },
        {
            title: 'Artificial Insemination',
            desc: 'A course platform to teach about artificial insemination, developed using React JS.',
            langs: ['React', 'JavaScript'],
            link: 'https://artificial-insemination.vercel.app/',
            preview: 'https://artificial-insemination.vercel.app/',
            icon: '🐄'
        }
    ];

    // Under Development Projects (placeholder for future projects)
    const devProjects = [
        // Add any projects that are under development here
    ];

    const getScreenshotUrl = (url) => {
        // Try multiple screenshot services as fallback
        try {
            // Using screenshotapi.net service (free tier, no key needed for some URLs)
            // Alternative: image.thum.io might require authentication
            // For now, return null to default to icon view (more reliable)
            // Users can click to visit the actual site
            return null;
            
            // If you want to try screenshot services, uncomment one:
            // Option 1: image.thum.io (may require auth)
            // return `https://image.thum.io/get/width/600/crop/400/noanimate/${encodeURIComponent(url)}`;
            
            // Option 2: screenshotapi.net (requires API key for production)
            // return `https://api.screenshotapi.net/screenshot?url=${encodeURIComponent(url)}&width=600&height=400`;
        } catch {
            return null;
        }
    };

    return (
        <div className="landing-wrapper sci-fi" style={{ minHeight: '100vh', position: 'relative' }}>
            <SpaceBackground />
            <div className="hero">
                <PageHeader titleFirst="Projects" titleSecond="& Experience" subtitle="Selected work and case studies" />
            </div>
            <div className="about-card glass" style={{ maxWidth: 1400 }}>
                <div className="about-content">
                    {/* Hosted & Completed Projects Section */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ 
                            fontSize: '2rem', 
                            fontWeight: 800, 
                            color: '#eaf2ff', 
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            background: 'linear-gradient(90deg, #bfe5ff, #cbb2ff, #7de3ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Hosted & Completed Projects
                        </h2>
                        <div className="projects-grid-4 hidden" ref={hostedGridRef}>
                            {hostedProjects.map((p) => {
                                const screenshotUrl = getScreenshotUrl(p.link);
                                const hasPreviewError = previewErrors.has(p.title);
                                // Default to showing icons - more reliable than screenshot services
                                const showPreview = screenshotUrl && !hasPreviewError;
                                return (
                                    <div
                                        key={p.title}
                                        className="glass project-card-3d"
                                        onMouseMove={handleCardMouseMove}
                                        onMouseLeave={handleCardMouseLeave}
                                        style={{ 
                                            padding: '0', 
                                            borderRadius: '12px', 
                                            background: 'rgba(10,15,35,0.5)',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {/* Website Preview - Show screenshot if available, otherwise show icon */}
                                        {showPreview ? (
                                            // Try screenshot service
                                            <div style={{ 
                                                width: '100%', 
                                                height: '200px', 
                                                position: 'relative',
                                                overflow: 'hidden',
                                                background: 'rgba(6, 12, 28, 0.6)',
                                                borderTopLeftRadius: '12px',
                                                borderTopRightRadius: '12px'
                                            }}>
                                                <img 
                                                    src={screenshotUrl} 
                                                    alt={`${p.title} preview`}
                                                    onError={() => {
                                                        setPreviewErrors(prev => new Set(prev).add(p.title));
                                                    }}
                                                    style={{ 
                                                        width: '100%', 
                                                        height: '100%', 
                                                        objectFit: 'cover',
                                                        borderTopLeftRadius: '12px',
                                                        borderTopRightRadius: '12px'
                                                    }} 
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    background: 'rgba(34, 211, 238, 0.9)',
                                                    color: '#06111f',
                                                    padding: '4px 10px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase'
                                                }}>LIVE</div>
                                            </div>
                                        ) : (
                                            // Default: Show icon with gradient background (always reliable)
                                            <div style={{ 
                                                width: '100%', 
                                                height: '200px', 
                                                position: 'relative',
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                background: 'linear-gradient(135deg, rgba(120,150,255,0.15), rgba(124,58,237,0.1))',
                                                borderTopLeftRadius: '12px',
                                                borderTopRightRadius: '12px'
                                            }}>
                                                <div style={{
                                                    fontSize: '5rem',
                                                    filter: 'drop-shadow(0 4px 12px rgba(120,150,255,0.3))',
                                                    transition: 'transform 0.3s ease'
                                                }} onMouseEnter={(e) => {
                                                    e.target.style.transform = 'scale(1.1) rotate(5deg)';
                                                }} onMouseLeave={(e) => {
                                                    e.target.style.transform = 'scale(1) rotate(0deg)';
                                                }}>
                                                    {p.icon}
                                                </div>
                                                {p.link && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        right: '8px',
                                                        background: 'rgba(34, 211, 238, 0.9)',
                                                        color: '#06111f',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase'
                                                    }}>LIVE</div>
                                                )}
                                            </div>
                                        )}
                                        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                                <div style={{ fontWeight: 800, color: '#eaf2ff', fontSize: '1.1rem', flex: 1 }}>{p.title}</div>
                                            </div>
                                            <div style={{ color: '#c6d2ff', fontSize: 14, lineHeight: 1.5, marginBottom: 12, flex: 1 }}>{p.desc}</div>
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
                                                    padding: '10px 16px',
                                                    borderRadius: 8,
                                                    background: 'linear-gradient(135deg, rgba(120,150,255,0.35), rgba(120,150,255,0.2))',
                                                    color: '#eaf2ff',
                                                    textDecoration: 'none',
                                                    fontWeight: 700,
                                                    textAlign: 'center',
                                                    transition: 'all 0.3s ease'
                                                }} onMouseEnter={(e) => {
                                                    e.target.style.background = 'linear-gradient(135deg, rgba(120,150,255,0.5), rgba(120,150,255,0.3))';
                                                    e.target.style.transform = 'translateY(-2px)';
                                                }} onMouseLeave={(e) => {
                                                    e.target.style.background = 'linear-gradient(135deg, rgba(120,150,255,0.35), rgba(120,150,255,0.2))';
                                                    e.target.style.transform = 'translateY(0)';
                                                }}>Visit Site →</a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Under Development Projects Section */}
                    {devProjects.length > 0 && (
                        <div>
                            <h2 style={{ 
                                fontSize: '2rem', 
                                fontWeight: 800, 
                                color: '#eaf2ff', 
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                background: 'linear-gradient(90deg, #cbb2ff, #bfe5ff, #cbb2ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Under Development
                            </h2>
                            <div className="projects-grid-4 hidden" ref={devGridRef}>
                                {devProjects.map((p) => (
                                    <div
                                        key={p.title}
                                        className="glass project-card-3d"
                                        onMouseMove={handleCardMouseMove}
                                        onMouseLeave={handleCardMouseLeave}
                                        style={{ 
                                            padding: '16px', 
                                            borderRadius: '12px', 
                                            background: 'rgba(10,15,35,0.4)',
                                            opacity: 0.8
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                            <div style={{ 
                                                fontSize: '2.5rem', 
                                                width: '56px', 
                                                height: '56px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                background: 'rgba(147, 51, 234, 0.15)',
                                                borderRadius: '12px'
                                            }}>
                                                {p.icon}
                                            </div>
                                            <div style={{ fontWeight: 800, color: '#eaf2ff' }}>{p.title}</div>
                                        </div>
                                        <div style={{ color: '#c6d2ff', fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
                                        {Array.isArray(p.langs) && p.langs.length > 0 && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                                                {p.langs.map((l) => (
                                                    <span key={l} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: 'rgba(147, 51, 234, 0.12)', color: '#dbe5ff' }}>{l}</span>
                                                ))}
                                            </div>
                                        )}
                                        <div style={{
                                            display: 'inline-block',
                                            padding: '8px 12px',
                                            borderRadius: 8,
                                            background: 'rgba(147, 51, 234, 0.2)',
                                            color: '#cbb2ff',
                                            fontSize: '0.85rem',
                                            fontWeight: 600
                                        }}>🚧 Coming Soon</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


