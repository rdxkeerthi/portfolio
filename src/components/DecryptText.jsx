import React, { useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

export default function DecryptText({ text, speed = 30, delay = 0, className = "" }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const startTimeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        if (!isMounted) return;

        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, [text, speed, delay]);

  const placeholder = React.useMemo(() => {
    return text.split('').map(char => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join('');
  }, [text]);

  return <span className={className}>{displayText || placeholder}</span>;
}
