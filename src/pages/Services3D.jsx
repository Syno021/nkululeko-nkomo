import './landing.css';
import PageHeader from '../shared/PageHeader';
import SpaceBackground from '../shared/SpaceBackground';

export default function Services3D() {
    const services = [
        { icon: '⚛️', name: 'React Websites', desc: 'Single Page Apps and marketing sites with React. Fast, accessible, SEO-ready (SSR/SSG when needed), integrated APIs and forms.' },
        { icon: '🧱', name: 'HTML/CSS Websites', desc: 'Lightweight static sites and landing pages with semantic HTML, modern CSS, and great performance on all devices.' },
        { icon: '📰', name: 'WordPress Websites', desc: 'Blogs, business sites, and WooCommerce stores. Custom themes, plugins, performance tuning, and secure hosting setups.' },
        { icon: '📲', name: 'Mobile Apps (Ionic & React Expo)', desc: 'Cross‑platform apps for iOS/Android. Ionic + Capacitor and React Native (Expo) for rapid delivery, native plugins, and OTA updates.' },
    ];

    return (
        <div className="landing-wrapper sci-fi" style={{ minHeight: '100vh', position: 'relative' }}>
            <SpaceBackground />
            <div className="hero">
                <PageHeader titleFirst="Services" titleSecond="" subtitle="What I can build for you" />
            </div>
            <div className="about-card glass" style={{ maxWidth: 1100 }}>
                <div className="about-content">
                    <div className="services-grid-2">
                        {services.map((s) => (
                            <div key={s.name} className="glass" style={{ padding: '16px', borderRadius: '10px', background: 'rgba(10,15,35,0.4)', border: '1px solid rgba(120,150,255,0.15)' }}>
                                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{s.icon}</div>
                                <div style={{ fontWeight: 800, color: '#eaf2ff', marginBottom: '6px' }}>{s.name}</div>
                                <div style={{ color: '#c6d2ff' }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


