import React, { useState, useEffect, useRef } from "react";

/**
 * Countdown component
 *
 * Props:
 *   start    — boolean; set to true to begin the countdown
 *   duration — number of seconds (default 3)
 *   onComplete — callback fired once when the count reaches 0
 *
 * The countdown re-triggers every time `start` flips from false → true,
 * which is exactly what the multi-shot sequence in Booth.jsx needs.
 */
export default function Countdown({ start, duration = 3, onComplete }) {
  const [count, setCount] = useState(null);
  // Track whether we've already fired onComplete for this run
  const firedRef = useRef(false);

  // When `start` flips to true, reset and begin counting
  useEffect(() => {
    if (start) {
      firedRef.current = false;
      setCount(duration);
    } else {
      setCount(null);
    }
  }, [start, duration]);

  // Tick every second
  useEffect(() => {
    if (count === null || count <= 0) return;

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  // Fire onComplete exactly once when count hits 0
  useEffect(() => {
    if (count === 0 && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }, [count, onComplete]);

  if (count === null || count === 0) return null;

  return (
    <div className="flex items-center justify-center my-4">
      <span
        key={count} // re-mount on each tick for the pop animation
        className="text-6xl font-extrabold text-pink-600 animate-ping-once"
        style={{
          animation: "countPop 0.5s ease-out",
        }}
      >
        {count}
      </span>

      <style>{`
        @keyframes countPop {
          0%   { transform: scale(1.8); opacity: 0.4; }
          100% { transform: scale(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  );
}