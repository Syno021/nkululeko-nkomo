import './landing.css';
import PageHeader from '../shared/PageHeader';
import SpaceBackground from '../shared/SpaceBackground';
import { useState, useEffect, useRef } from 'react';

export default function Contact3D() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const contactGridRef = useRef(null);

    const updateField = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            alert('Please fill in your name, email, and message.');
            return;
        }
        setSending(true);
        const mailto = `mailto:nkomonkululeko021@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + form.name)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.name + ' <' + form.email + '>')}`;
        window.location.href = mailto;
        setTimeout(() => setSending(false), 800);
    };

    // Calculate when title animation completes and show cards
    useEffect(() => {
        const pageHeaderDelay = 0.06; // 60ms delay in PageHeader
        const titleFirst = "Contact"; // 7 characters
        const totalChars = titleFirst.length; // 7 characters
        
        // Title animation: delay + (totalChars - 1) * 0.1 + 0.8
        const titleAnimationDuration = pageHeaderDelay + (totalChars - 1) * 0.1 + 0.8;
        
        const timer = setTimeout(() => {
            if (contactGridRef.current) {
                contactGridRef.current.classList.remove('hidden');
            }
        }, titleAnimationDuration * 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="landing-wrapper sci-fi" style={{ minHeight: '100vh', position: 'relative' }}>
            <SpaceBackground />
            <div className="hero">
                <PageHeader titleFirst="Contact" titleSecond="" subtitle="Let’s build something great together" />
            </div>
            <div className="about-card glass" style={{ maxWidth: 1200 }}>
                <div className="about-content">
                    <div className="contact-grid hidden" ref={contactGridRef}>
                        <div className="contact-panel glass">
                            <div className="contact-heading">Get in touch</div>
                            <p className="contact-copy">Feel free to reach out for collaborations, freelance work, or just a friendly hello.</p>
                            <div className="contact-list">
                                <div className="contact-item">
                                    <div className="contact-label">Email</div>
                                    <a className="contact-value" href="mailto:nkomonkululeko021@gmail.com">nkomonkululeko021@gmail.com</a>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-label">Phone</div>
                                    <a className="contact-value" href="tel:+27676816790">+27(0)67 681 6790</a>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-label">Location</div>
                                    <div className="contact-value">Durban, Kwa-Zulu Natal</div>
                                </div>
                            </div>
                        </div>
                        <form className="contact-form glass" onSubmit={handleSubmit} noValidate>
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="name">Full name</label>
                                    <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={updateField} required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">Email address</label>
                                    <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={updateField} required />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." value={form.message} onChange={updateField} required />
                            </div>
                            <div className="form-actions">
                                <button className="btn-cta" type="submit" disabled={sending}>{sending ? 'Preparing email…' : 'Send message'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


