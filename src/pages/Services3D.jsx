import { useEffect, useRef } from 'react';
import './landing.css';
import PageHeader from '../shared/PageHeader';
import SpaceBackground from '../shared/SpaceBackground';

const services = [
    { 
        icon: '⚛️', 
        name: 'React Web Development', 
        desc: 'Building modern, interactive web applications with React. Single Page Apps (SPAs), marketing sites, and enterprise solutions. Fast, accessible, SEO-ready with SSR/SSG capabilities when needed. Integrated APIs, forms, and state management.', 
        tags: ['SPAs', 'SSR/SSG', 'API Integration', 'State Management', 'Component Architecture']
    },
    { 
        icon: '📱', 
        name: 'Mobile App Development', 
        desc: 'Cross-platform mobile applications for iOS and Android. Using React Native (Expo) and Ionic Framework with Capacitor. Native plugins, OTA updates, and seamless user experiences across all devices.', 
        tags: ['React Native', 'Expo', 'Ionic', 'iOS', 'Android', 'Cross-platform']
    },
    { 
        icon: '🧱', 
        name: 'HTML/CSS Websites', 
        desc: 'Lightweight, fast-loading static websites and landing pages. Semantic HTML5, modern CSS3 with animations, responsive design, and excellent performance across all devices. Perfect for portfolios, marketing pages, and simple business sites.', 
        tags: ['Responsive Design', 'CSS Animations', 'Performance', 'Accessibility', 'SEO']
    },
    { 
        icon: '📰', 
        name: 'WordPress Development', 
        desc: 'Custom WordPress websites, blogs, and WooCommerce stores. Custom theme development, plugin creation, performance optimization, and secure hosting setups. Content management solutions tailored to your needs.', 
        tags: ['Custom Themes', 'Plugins', 'WooCommerce', 'Performance', 'Security']
    },
    { 
        icon: '🖥️', 
        name: 'Backend Development', 
        desc: 'Server-side solutions with Node.js and Express. RESTful APIs, WebSocket implementations, database integration, and scalable backend architectures. Building the foundation that powers your applications.', 
        tags: ['Node.js', 'Express', 'REST APIs', 'WebSockets', 'Database Integration']
    },
    { 
        icon: '🚀', 
        name: 'Full-Stack Solutions', 
        desc: 'End-to-end development from frontend to backend. Complete web and mobile applications with integrated APIs, databases, authentication, and deployment. Full project lifecycle management from concept to launch.', 
        tags: ['Full-Stack', 'Project Management', 'API Design', 'Database Design', 'Deployment']
    },
    { 
        icon: '🎨', 
        name: 'UI/UX Design & Development', 
        desc: 'Creating beautiful, user-centered interfaces with modern design principles. Responsive layouts, smooth animations, accessibility compliance, and intuitive user experiences that engage and convert.', 
        tags: ['UI Design', 'UX', 'Responsive', 'Animations', 'Accessibility']
    },
    { 
        icon: '💡', 
        name: 'Consulting & Mentoring', 
        desc: 'Technical consulting for your projects, code reviews, architecture guidance, and developer mentoring. Drawing from my experience as a tutor and team lead to help you and your team succeed.', 
        tags: ['Consulting', 'Code Reviews', 'Architecture', 'Mentoring', 'Best Practices']
    },
];

export default function Services3D() {
    const servicesRef = useRef(null);

    // Animate cards in sequence after mount
    useEffect(() => {
        const timer = setTimeout(() => {
            if (servicesRef.current) {
                const cards = servicesRef.current.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        if (card) {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }
                    }, index * 100 + 300); // Start after 300ms, then stagger
                });
            }
        }, 500); // Initial delay

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
                    titleFirst="Services" 
                    titleSecond="" 
                    subtitle="What I can build for you" 
                />
            </div>
            
            <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 1.5rem' }}>
                <div className="about-card glass" style={{ maxWidth: '100%', margin: '0 auto' }}>
                    <div style={{ 
                        textAlign: 'center', 
                        marginBottom: '40px',
                        paddingBottom: '25px',
                        borderBottom: '2px solid rgba(120,150,255,0.2)'
                    }}>
                        <h2 style={{ 
                            fontSize: '2.2rem', 
                            fontWeight: 800, 
                            color: '#eaf2ff',
                            marginBottom: '12px',
                            textShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                        }}>
                            What I Offer
                        </h2>
                        <p style={{ 
                            color: '#c6d2ff', 
                            fontSize: '1.1rem',
                            marginTop: '10px',
                            lineHeight: 1.6
                        }}>
                            Comprehensive development services to bring your digital vision to life
                        </p>
                    </div>
                    <div className="about-content">
                        <div className="services-grid" ref={servicesRef} style={{ marginTop: '20px' }}>
                            {services.map((s) => (
                                <div
                                    key={s.name}
                                    className="glass project-card-3d service-card"
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                    style={{ 
                                        padding: '24px', 
                                        borderRadius: '12px', 
                                        background: 'rgba(10,15,35,0.5)',
                                        border: '1px solid rgba(120,150,255,0.25)',
                                        minHeight: '280px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        opacity: 0,
                                        transform: 'translateY(25px) scale(0.95)',
                                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                                        willChange: 'opacity, transform'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                                        <div style={{ fontSize: '40px' }}>{s.icon}</div>
                                        <div style={{ fontWeight: 800, color: '#eaf2ff', fontSize: '1.3rem', flex: 1 }}>{s.name}</div>
                                    </div>
                                    <div style={{ color: '#c6d2ff', fontSize: 15, lineHeight: 1.7, marginBottom: 18, flexGrow: 1 }}>
                                        {s.desc}
                                    </div>
                                    {Array.isArray(s.tags) && s.tags.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
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

                {/* Call to Action */}
                <div style={{ 
                    maxWidth: 1400, 
                    margin: '50px auto 0', 
                    padding: '30px',
                    textAlign: 'center'
                }}>
                    <div className="glass" style={{
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
                            Ready to start your project?
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#c6d2ff',
                            marginTop: '15px',
                            lineHeight: 1.6
                        }}>
                            Let's discuss how I can help bring your ideas to life with cutting-edge technology and creative solutions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


