import React, { useEffect, useRef } from "react";
import { useIsCoarsePointer, useReducedMotion } from "../hooks/useReducedMotion";

// A minimal magnetic cursor: a dot + an outline ring that lerps toward the mouse.
// When hovering [data-magnetic] elements, the ring expands.
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const coarse = useIsCoarsePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (coarse || reduced) return;
    document.body.classList.add("custom-cursor-on");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let frame;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`;
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      frame = requestAnimationFrame(loop);
    };

    const onEnter = (e) => {
      const el = e.target.closest("[data-magnetic], a, button, input, textarea");
      if (!el || !ringRef.current) return;
      ringRef.current.classList.add("is-active");
    };
    const onLeave = (e) => {
      const el = e.target.closest("[data-magnetic], a, button, input, textarea");
      if (!el || !ringRef.current) return;
      ringRef.current.classList.remove("is-active");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(frame);
      document.body.classList.remove("custom-cursor-on");
    };
  }, [coarse, reduced]);

  if (coarse || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        data-testid="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "#C8903A",
          pointerEvents: "none",
          zIndex: 9999,
          marginLeft: -3,
          marginTop: -3,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        data-testid="custom-cursor-ring"
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: 999,
          border: "1px solid rgba(200,144,58,0.7)",
          pointerEvents: "none",
          zIndex: 9999,
          marginLeft: -17,
          marginTop: -17,
          transition: "width .25s ease, height .25s ease, opacity .25s ease",
        }}
      />
      <style>{`
        .custom-cursor-ring.is-active {
          width: 56px !important;
          height: 56px !important;
          margin-left: -28px !important;
          margin-top: -28px !important;
          border-color: rgba(42,139,122,0.9) !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
