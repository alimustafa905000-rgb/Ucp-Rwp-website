// hooks/useScrollEffects.js

import { useEffect, useState } from 'react';

/**
 * Tracks scroll progress, navbar state, and back-to-top visibility.
 */
export function useScrollEffects() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setShowBackToTop(scrollTop > 300);
      setScrolled(scrollTop > 40);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, scrolled, showBackToTop };
}

/**
 * Reveal animations – triggers .visible class on elements with:
 * .reveal, .reveal-left, .reveal-right, .reveal-up
 * (Used with CSS transitions)
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-up'
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Legacy counter hook – animates .count elements with data-target.
 * If you're using useDataCountCounters, you don't need this.
 */
export function useCounters(deps = []) {
  useEffect(() => {
    function animateCount(el) {
      const target = +el.dataset.target;
      const duration = 1800;
      const start = performance.now();
      function step(ts) {
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    const counters = document.querySelectorAll('.count');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * ✅ FIXED: Animates ANY element with a `data-count` attribute.
 * Works with CSS modules because it doesn't rely on class names.
 * Supports numbers with +, #, or plain integers.
 */
export function useDataCountCounters(deps = []) {
  useEffect(() => {
    function animateCounter(element) {
      const targetText = element.dataset.count;
      if (!targetText) return;

      // Parse suffixes and clean number
      const hasPlus = targetText.includes('+');
      const hasHash = targetText.includes('#');
      const suffix = targetText.replace(/^[#0-9]+/, '').replace('+', '');
      const cleanTarget = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
      if (isNaN(cleanTarget) || cleanTarget === 0) return;

      let current = 0;
      const increment = Math.ceil(cleanTarget / 50); // step size

      const timer = setInterval(() => {
        current += increment;
        if (current >= cleanTarget) {
          current = cleanTarget;
          clearInterval(timer);
        }

        // Build display string
        let display = String(current);
        if (suffix) display += suffix;
        if (hasPlus && !suffix) display += '+';
        if (hasHash) display = '#' + display;

        element.textContent = display;
      }, 25);
    }

    // 🔥 Selector: any element with data-count, not just .stat-num
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}