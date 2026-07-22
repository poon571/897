"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/landing.module.css";

export function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let current = 0;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(current);
          }, 25);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elementRef} className={styles.statNumber}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function Reveal({ children, type = "reveal", delayClass = "" }) {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`${styles[type]} ${delayClass ? styles[delayClass] : ""}`}>
      {children}
    </div>
  );
}
