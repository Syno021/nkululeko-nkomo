import { useEffect, useRef } from 'react';
import '../pages/landing.css';

export default function PageHeader({ titleFirst, titleSecond, subtitle }) {
    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const taglineRef = useRef(null);

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

        const firstSpans = splitText(firstRef.current);
        const secondSpans = splitText(secondRef.current);
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

        const t = setTimeout(() => {
            startAnimations();
        }, 60);

        return () => clearTimeout(t);
    }, []);

    return (
        <div className="content-container">
            <div className="title-container">
                <h1 className="animated-title neon" ref={firstRef}>{titleFirst}</h1>
                {titleSecond ? (
                    <h1 className="animated-title neon" ref={secondRef}>{titleSecond}</h1>
                ) : (
                    <h1 className="animated-title neon" ref={secondRef} style={{ display: 'inline-block', height: 0, overflow: 'hidden' }}> </h1>
                )}
            </div>
            {subtitle ? (
                <p className="animated-tagline subneon" ref={taglineRef}>{subtitle}</p>
            ) : null}
        </div>
    );
}


