import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    background: #0d1117;
    color: #e6edf3;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── NAV ── */
  .lp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 5vw;
    background: rgba(13,17,23,0.85);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid #21262d;
  }
  .lp-logo {
    font-size: 1.15rem; font-weight: 700;
    color: #e6edf3; text-decoration: none;
    display: flex; align-items: center; gap: 10px;
  }
  .lp-logo-icon {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(124,58,237,0.35);
  }
  .lp-nav-links { display: flex; align-items: center; gap: 2rem; }
  .lp-nav-links a {
    color: #8b949e; text-decoration: none;
    font-size: 0.88rem; transition: color 0.2s;
  }
  .lp-nav-links a:hover { color: #e6edf3; }
  .lp-btn-nav {
    background: linear-gradient(135deg, #7c3aed, #4f46e5) !important;
    color: #fff !important;
    padding: 0.45rem 1.1rem; border-radius: 7px;
    font-weight: 600; font-size: 0.85rem; text-decoration: none;
    box-shadow: 0 4px 12px rgba(124,58,237,0.3);
    transition: opacity 0.2s, transform 0.15s;
  }
  .lp-btn-nav:hover { opacity: 0.9; transform: translateY(-1px); }

  /* ── HERO ── */
  .lp-hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 6rem 5vw 4rem;
    position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse at 70% 20%, rgba(124,58,237,0.12) 0%, transparent 55%),
      radial-gradient(ellipse at 15% 80%, rgba(79,70,229,0.09) 0%, transparent 50%),
      #0d1117;
  }
  .lp-hero-grid {
    width: 100%; max-width: 1160px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
    position: relative; z-index: 1;
  }
  .lp-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.3);
    padding: 0.3rem 0.85rem; border-radius: 999px;
    font-size: 0.75rem; font-weight: 600; color: #a78bfa;
    margin-bottom: 1.4rem; text-transform: uppercase; letter-spacing: 0.08em;
  }
  .lp-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.8);
    animation: lp-pulse-anim 2s infinite;
  }
  @keyframes lp-pulse-anim {
    0%,100% { box-shadow: 0 0 5px rgba(34,197,94,0.8); }
    50%      { box-shadow: 0 0 12px rgba(34,197,94,1); }
  }
  .lp-hero h1 {
    font-size: clamp(2.4rem, 4.5vw, 3.6rem);
    font-weight: 700; line-height: 1.12;
    letter-spacing: -0.03em; margin-bottom: 1.3rem;
    color: #e6edf3;
  }
  .lp-hero h1 span {
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lp-hero-p {
    font-size: 1rem; color: #8b949e; margin-bottom: 2rem;
    max-width: 440px; line-height: 1.75;
  }
  .lp-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .lp-btn-primary {
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    color: #fff;
    padding: 0.75rem 1.6rem; border-radius: 8px;
    font-weight: 600; font-size: 0.92rem; text-decoration: none;
    display: inline-flex; align-items: center; gap: 0.45rem;
    box-shadow: 0 4px 15px rgba(124,58,237,0.35);
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .lp-btn-primary:hover {
    opacity: 0.9; transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(124,58,237,0.45);
  }
  .lp-btn-ghost {
    border: 1px solid #30363d; color: #c9d1d9;
    padding: 0.75rem 1.6rem; border-radius: 8px;
    font-weight: 500; font-size: 0.92rem; text-decoration: none;
    transition: border-color 0.2s, color 0.2s, transform 0.15s;
  }
  .lp-btn-ghost:hover {
    border-color: rgba(124,58,237,0.4); color: #e6edf3;
    transform: translateY(-2px);
  }

  /* ── CHAT DEMO ── */
  .lp-chat-demo {
    background: #161b22;
    border: 1px solid #21262d;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 0 0 1px rgba(124,58,237,0.1), 0 40px 80px rgba(0,0,0,0.5);
  }
  .lp-chat-header {
    padding: 0.9rem 1.2rem;
    background: #161b22;
    border-bottom: 1px solid #21262d;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .lp-chat-av {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; font-weight: 700; color: #fff;
  }
  .lp-chat-title { font-size: 0.88rem; font-weight: 600; color: #e6edf3; }
  .lp-chat-sub {
    font-size: 0.75rem; color: #22c55e;
    display: flex; align-items: center; gap: 0.3rem;
  }
  .lp-green-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
    box-shadow: 0 0 5px rgba(34,197,94,0.8);
    animation: lp-pulse-anim 2s infinite;
  }
  .lp-chat-body {
    padding: 1.2rem; min-height: 280px;
    display: flex; flex-direction: column; gap: 0.9rem;
    overflow-y: auto;
    background: #0d1117;
  }
  .lp-msg { display: flex; gap: 0.6rem; align-items: flex-end; }
  .lp-msg-out { flex-direction: row-reverse; }
  .lp-msg-av {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem; font-weight: 700; color: #fff;
  }
  .lp-msg-inner { display: flex; flex-direction: column; }
  .lp-msg-inner-out { align-items: flex-end; }
  .lp-msg-bubble {
    max-width: 72%; padding: 0.55rem 0.9rem;
    border-radius: 14px; font-size: 0.875rem; line-height: 1.5;
  }
  .lp-bubble-in {
    background: #1c2128; color: #c9d1d9;
    border: 1px solid #2d333b;
    border-bottom-left-radius: 4px;
  }
  .lp-bubble-out {
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    color: #f0ebff; font-weight: 500;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 10px rgba(124,58,237,0.35);
  }
  .lp-msg-time { font-size: 0.68rem; color: #484f58; margin-top: 2px; }
  .lp-typing {
    display: flex; gap: 4px; padding: 0.55rem 0.9rem;
    background: #1c2128; border: 1px solid #2d333b;
    border-radius: 14px; border-bottom-left-radius: 4px;
    width: fit-content;
  }
  .lp-typing-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #484f58;
  }
  .lp-typing-dot:nth-child(1) { animation: lp-bounce 1.2s ease-in-out 0s infinite; }
  .lp-typing-dot:nth-child(2) { animation: lp-bounce 1.2s ease-in-out 0.2s infinite; }
  .lp-typing-dot:nth-child(3) { animation: lp-bounce 1.2s ease-in-out 0.4s infinite; }
  @keyframes lp-bounce {
    0%,60%,100% { transform: translateY(0); }
    30%          { transform: translateY(-5px); }
  }
  .lp-chat-input {
    border-top: 1px solid #21262d;
    padding: 0.8rem 1.2rem;
    display: flex; align-items: center; gap: 0.6rem;
    background: #161b22;
  }
  .lp-input-mock {
    flex: 1; background: #0d1117; border: 1px solid #30363d;
    border-radius: 9px; padding: 0.55rem 0.9rem;
    font-size: 0.84rem; color: #484f58;
  }
  .lp-send-btn {
    width: 34px; height: 34px; border-radius: 9px;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(124,58,237,0.35);
  }

  /* ── STATS ── */
  .lp-stats {
    border-top: 1px solid #21262d;
    border-bottom: 1px solid #21262d;
    padding: 2.5rem 5vw;
    background: #161b22;
  }
  .lp-stats-inner {
    max-width: 1160px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2rem; text-align: center;
  }
  .lp-stat-num {
    font-size: 2.4rem; font-weight: 700;
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lp-stat-label { font-size: 0.88rem; color: #8b949e; margin-top: 0.25rem; }

  /* ── SECTIONS ── */
  .lp-section { padding: 6rem 5vw; background: #0d1117; }
  .lp-section-dark { background: #161b22; }
  .lp-section-inner { max-width: 1160px; margin: 0 auto; }
  .lp-section-label {
    font-size: 0.72rem; font-weight: 600; color: #a78bfa;
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.85rem;
  }
  .lp-section-title {
    font-size: clamp(1.7rem, 3vw, 2.4rem);
    font-weight: 700; margin-bottom: 0.85rem; line-height: 1.2;
    letter-spacing: -0.02em; color: #e6edf3;
  }
  .lp-section-sub { font-size: 0.95rem; color: #8b949e; max-width: 500px; line-height: 1.75; }

  /* ── FEATURES GRID ── */
  .lp-features-grid {
    margin-top: 3rem;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
  }
  .lp-feature-card {
    background: #161b22; border: 1px solid #21262d;
    border-radius: 12px; padding: 1.5rem;
    transition: border-color 0.2s, transform 0.2s, background 0.2s;
    position: relative; overflow: hidden;
  }
  .lp-feature-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #7c3aed, #4f46e5);
    opacity: 0; transition: opacity 0.2s;
    border-radius: 3px 0 0 3px;
  }
  .lp-feature-card:hover {
    border-color: rgba(124,58,237,0.4);
    background: rgba(124,58,237,0.04);
    transform: translateY(-3px);
  }
  .lp-feature-card:hover::before { opacity: 1; }
  .lp-feature-icon {
    width: 40px; height: 40px; border-radius: 9px;
    background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.25);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
  }
  .lp-feature-icon svg {
    width: 20px; height: 20px; stroke: #a78bfa;
    fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round;
  }
  .lp-feature-card h3 {
    font-size: 0.95rem; font-weight: 600; margin-bottom: 0.5rem; color: #e6edf3;
  }
  .lp-feature-card p { font-size: 0.875rem; color: #8b949e; line-height: 1.65; }

  /* ── STEPS ── */
  .lp-steps {
    margin-top: 3rem;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  }
  .lp-step { position: relative; padding-left: 1rem; }
  .lp-step::before {
    content: '';
    position: absolute; left: 0; top: 1.8rem; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #7c3aed, transparent);
    border-radius: 2px;
  }
  .lp-step-num {
    font-size: 0.72rem; font-weight: 700; color: #a78bfa;
    margin-bottom: 0.85rem; display: block; letter-spacing: 0.06em;
  }
  .lp-step h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.45rem; color: #e6edf3; }
  .lp-step p { font-size: 0.875rem; color: #8b949e; line-height: 1.65; }

  /* ── CTA SECTION ── */
  .lp-cta-section {
    padding: 7rem 5vw;
    text-align: center; position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 65%),
      #0d1117;
  }
  .lp-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
  .lp-cta-section h2 {
    font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 700;
    margin-bottom: 0.85rem; line-height: 1.15; letter-spacing: -0.02em;
    background: linear-gradient(135deg, #a78bfa, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .lp-cta-section > .lp-cta-inner > p { color: #8b949e; font-size: 1rem; margin-bottom: 2.25rem; }
  .lp-cta-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }

  /* ── FOOTER ── */
  .lp-footer {
    border-top: 1px solid #21262d;
    padding: 1.75rem 5vw;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
    background: #161b22;
  }
  .lp-footer p { font-size: 0.82rem; color: #484f58; }
  .lp-footer-links { display: flex; gap: 1.5rem; }
  .lp-footer-links a {
    font-size: 0.82rem; color: #484f58; text-decoration: none; transition: color 0.2s;
  }
  .lp-footer-links a:hover { color: #a78bfa; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .lp-hero-grid { grid-template-columns: 1fr; }
    .lp-chat-demo { max-width: 420px; margin: 0 auto; }
    .lp-features-grid { grid-template-columns: 1fr 1fr; }
    .lp-steps { grid-template-columns: 1fr; gap: 2rem; }
    .lp-stats-inner { grid-template-columns: 1fr; gap: 1.25rem; }
  }
  @media (max-width: 600px) {
    .lp-features-grid { grid-template-columns: 1fr; }
    .lp-nav-link-hide { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .lp-pulse, .lp-typing-dot, .lp-green-dot { animation: none; }
  }
`;

const MESSAGES = [
  { type: "in",  av: "AV", col: "linear-gradient(135deg,#7c3aed,#4f46e5)", text: "Hey! Did you see the new design mockups?",      time: "2:41 PM" },
  { type: "out", av: "ME", col: "linear-gradient(135deg,#4f46e5,#7c3aed)", text: "Just opened them — they look great 🔥",          time: "2:42 PM" },
  { type: "in",  av: "AV", col: "linear-gradient(135deg,#7c3aed,#4f46e5)", text: "Glad you like it. Want to hop on a quick call?", time: "2:42 PM" },
  { type: "out", av: "ME", col: "linear-gradient(135deg,#4f46e5,#7c3aed)", text: "Sure, give me 5 mins",                           time: "2:43 PM" },
  { type: "in",  av: "AV", col: "linear-gradient(135deg,#7c3aed,#4f46e5)", text: "Perfect, I'll share the link in #general!",      time: "2:43 PM" },
];

const FEATURES = [
  {
    title: "Instant delivery",
    desc: "WebSocket connections mean messages appear the moment they're sent — no polling, no refresh.",
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    title: "Named rooms",
    desc: "Create topic-based rooms on the fly. Jump between #general, #dev, or #random from the dashboard.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    title: "See who's online",
    desc: "Live presence indicators so you always know who's around before you start a thread.",
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    title: "Persistent dashboard",
    desc: "Your rooms, your history, your team — all in one clean view the moment you log in.",
    icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  },
  {
    title: "Auth built in",
    desc: "Secure register and login flows included. Your conversations stay private to signed-in members.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: "Message history",
    desc: "Catch up on what you missed. Room history loads when you join so context is never lost.",
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></>,
  },
];

function ChatDemo() {
  const bodyRef   = useRef(null);
  const timerRef  = useRef(null);
  const indexRef  = useRef(0);
  const visibleRef = useRef([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    function showNext() {
      if (!mountedRef.current) return;
      const body = bodyRef.current;
      if (!body) return;

      if (indexRef.current >= MESSAGES.length) {
        timerRef.current = setTimeout(() => {
          if (!mountedRef.current) return;
          visibleRef.current = [];
          indexRef.current = 0;
          render(false);
          timerRef.current = setTimeout(showNext, 400);
        }, 3000);
        return;
      }

      render(true);
      timerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        render(false);
        indexRef.current++;
        timerRef.current = setTimeout(showNext, 1400);
      }, 900);
    }

    function render(showTyping) {
      const body = bodyRef.current;
      if (!body) return;
      body.innerHTML = "";
      visibleRef.current.forEach((m) => body.appendChild(buildMsgEl(m)));
      if (showTyping && indexRef.current < MESSAGES.length) {
        body.appendChild(buildTypingEl(MESSAGES[indexRef.current].col));
      } else if (!showTyping && indexRef.current < MESSAGES.length) {
        const m = MESSAGES[indexRef.current];
        visibleRef.current.push(m);
        const node = buildMsgEl(m);
        node.style.opacity = "0";
        node.style.transform = "translateY(8px)";
        node.style.transition = "opacity 0.25s, transform 0.25s";
        body.appendChild(node);
        requestAnimationFrame(() => {
          node.style.opacity = "1";
          node.style.transform = "translateY(0)";
        });
      }
      body.scrollTop = body.scrollHeight;
    }

    timerRef.current = setTimeout(showNext, 600);
    return () => {
      mountedRef.current = false;
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="lp-chat-demo">
      <div className="lp-chat-header">
        <div className="lp-chat-av">💬</div>
        <div>
          <div className="lp-chat-title"># design-team</div>
          <div className="lp-chat-sub">
            <span className="lp-green-dot" /> 4 online
          </div>
        </div>
      </div>
      <div className="lp-chat-body" ref={bodyRef} />
      <div className="lp-chat-input">
        <div className="lp-input-mock">Message #design-team…</div>
        <div className="lp-send-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function buildMsgEl(m) {
  const wrap = document.createElement("div");
  wrap.className = "lp-msg" + (m.type === "out" ? " lp-msg-out" : "");

  const av = document.createElement("div");
  av.className = "lp-msg-av";
  av.style.background = m.col;
  av.textContent = m.av;

  const inner = document.createElement("div");
  inner.className = "lp-msg-inner" + (m.type === "out" ? " lp-msg-inner-out" : "");

  const bubble = document.createElement("div");
  bubble.className = "lp-msg-bubble " + (m.type === "out" ? "lp-bubble-out" : "lp-bubble-in");
  bubble.textContent = m.text;

  const time = document.createElement("div");
  time.className = "lp-msg-time";
  time.textContent = m.time;

  inner.appendChild(bubble);
  inner.appendChild(time);
  wrap.appendChild(av);
  wrap.appendChild(inner);
  return wrap;
}

function buildTypingEl(col) {
  const wrap = document.createElement("div");
  wrap.className = "lp-msg";

  const av = document.createElement("div");
  av.className = "lp-msg-av";
  av.style.background = col;
  av.textContent = "•";

  const ind = document.createElement("div");
  ind.className = "lp-typing";
  for (let i = 0; i < 3; i++) {
    const d = document.createElement("div");
    d.className = "lp-typing-dot";
    ind.appendChild(d);
  }

  wrap.appendChild(av);
  wrap.appendChild(ind);
  return wrap;
}

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Landing() {
  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">

        {/* NAV */}
        <nav className="lp-nav">
          <Link to="/" className="lp-logo">
            <span className="lp-logo-icon">💬</span>
            NexTalk
          </Link>
          <div className="lp-nav-links">
            <a href="#features" className="lp-nav-link-hide">Features</a>
            <a href="#how" className="lp-nav-link-hide">How it works</a>
            <Link to="/register" className="lp-btn-nav">Get started free</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero-grid">
            <div>
              <div className="lp-eyebrow">
                <span className="lp-pulse" />
                Real-time &bull; Zero delay
              </div>
              <h1>Chat at the <span>speed of thought</span></h1>
              <p className="lp-hero-p">
                Instant messaging, persistent rooms, and a clean dashboard — built for teams who actually need to move fast.
              </p>
              <div className="lp-ctas">
                <Link to="/register" className="lp-btn-primary">
                  Start chatting free <ArrowIcon />
                </Link>
                <Link to="/login" className="lp-btn-ghost">Sign in</Link>
              </div>
            </div>
            <ChatDemo />
          </div>
        </section>

        {/* STATS */}
        <div className="lp-stats">
          <div className="lp-stats-inner">
            <div>
              <div className="lp-stat-num">50ms</div>
              <div className="lp-stat-label">Average message delivery</div>
            </div>
            <div>
              <div className="lp-stat-num">∞</div>
              <div className="lp-stat-label">Chat rooms — create as many as you need</div>
            </div>
            <div>
              <div className="lp-stat-num">100%</div>
              <div className="lp-stat-label">Free to get started, no credit card</div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <section className="lp-section" id="features">
          <div className="lp-section-inner">
            <p className="lp-section-label">Features</p>
            <h2 className="lp-section-title">Everything a team needs to talk</h2>
            <p className="lp-section-sub">No bloat. Just the tools that actually matter for real-time collaboration.</p>
            <div className="lp-features-grid">
              {FEATURES.map((f) => (
                <div className="lp-feature-card" key={f.title}>
                  <div className="lp-feature-icon">
                    <svg viewBox="0 0 24 24">{f.icon}</svg>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="lp-section lp-section-dark" id="how">
          <div className="lp-section-inner">
            <p className="lp-section-label">How it works</p>
            <h2 className="lp-section-title">Up and talking in three steps</h2>
            <p className="lp-section-sub">No configuration, no setup calls — just create an account and start.</p>
            <div className="lp-steps">
              {[
                { num: "STEP 01", title: "Create your account",    desc: "Register with your email in seconds. No credit card, no onboarding checklist." },
                { num: "STEP 02", title: "Open or create a room",  desc: "Pick an existing room from the dashboard or name a new one for your topic or team." },
                { num: "STEP 03", title: "Start the conversation", desc: "Type, send, see replies land in real time. Share the room link and your teammates join instantly." },
              ].map((s) => (
                <div className="lp-step" key={s.num}>
                  <span className="lp-step-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lp-cta-section">
          <div className="lp-cta-inner">
            <h2>Ready to ditch the lag?</h2>
            <p>Join teams already having faster conversations on NexTalk.</p>
            <div className="lp-cta-btns">
              <Link to="/register" className="lp-btn-primary">
                Create free account <ArrowIcon />
              </Link>
              <Link to="/login" className="lp-btn-ghost">Already have an account?</Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <p>© 2026 NexTalk. All rights reserved.</p>
          <div className="lp-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Status</a>
          </div>
        </footer>

      </div>
    </>
  );
}