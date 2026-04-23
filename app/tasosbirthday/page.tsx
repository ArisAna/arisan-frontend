'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './birthday.css';

type CurtainState = 'closed' | 'opening' | 'open' | 'closing';

export default function TasosBirthday() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const launchRocketRef = useRef<HTMLDivElement>(null);
  const launchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rsvpNameRef = useRef<HTMLInputElement>(null);
  const rsvpAttendanceRef = useRef<HTMLSelectElement>(null);
  const rsvpGuestsRef = useRef<HTMLSelectElement>(null);
  const rsvpKidsRef = useRef<HTMLSelectElement>(null);
  const rsvpMessageRef = useRef<HTMLTextAreaElement>(null);

  const [countdown, setCountdown] = useState({ days: '--', hours: '--', mins: '--', secs: '--' });
  const [ageDays, setAgeDays] = useState('1826');
  const [ageHours, setAgeHours] = useState('43824');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [tooltipText, setTooltipText] = useState('🎵 Η αγαπημένη μουσική του Τάσου!');
  const [ytSrc, setYtSrc] = useState('https://www.youtube.com/embed/vH-D8_mjGxU?enablejsapi=1&autoplay=0');
  const [curtainState, setCurtainState] = useState<CurtainState>('closed');
  const [videoVisible, setVideoVisible] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // ── STARFIELD ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let rafId: number;

    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.0003 + 0.0001,
      twinkle: Math.random() * Math.PI * 2,
    }));

    type ShootingStar = { x: number; y: number; len: number; speed: number; angle: number; alpha: number; life: number };
    let shootingStars: ShootingStar[] = [];

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const shootInterval = setInterval(() => {
      shootingStars.push({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height * 0.5,
        len: Math.random() * 100 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        alpha: 1, life: 1,
      });
    }, 3000);

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach(s => {
        s.twinkle += s.speed * 60;
        const alpha = s.alpha * (0.7 + 0.3 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x * canvas!.width, s.y * canvas!.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,224,255,${alpha})`;
        ctx.fill();
      });
      shootingStars = shootingStars.filter(ss => ss.life > 0);
      shootingStars.forEach(ss => {
        ss.life -= 0.012;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len,
        );
        grad.addColorStop(0, `rgba(255,200,255,${ss.life})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(shootInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // ── LAUNCH ROCKET ──
  const launchRocketFn = useCallback(() => {
    const r = launchRocketRef.current;
    if (!r) return;
    r.classList.add('go');
    setTimeout(() => {
      r.classList.remove('go');
      r.style.bottom = '-120px';
      r.style.opacity = '0';
      r.style.animation = 'none';
      void r.offsetWidth;
      r.style.animation = '';
    }, 3600);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      launchRocketFn();
      launchIntervalRef.current = setInterval(launchRocketFn, 25000);
    }, 2000);
    return () => {
      clearTimeout(t);
      if (launchIntervalRef.current) clearInterval(launchIntervalRef.current);
    };
  }, [launchRocketFn]);

  // ── SPARKLES ──
  useEffect(() => {
    const emojis = ['⭐', '✨', '💫', '🌟', '⚡'];
    function spawnSparkle(x: number, y: number) {
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div');
        el.className = 'sparkle';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
        el.style.top = (y + (Math.random() - 0.5) * 60) + 'px';
        el.style.animationDelay = (Math.random() * 0.3) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
      }
    }
    function handler(e: MouseEvent) { spawnSparkle(e.clientX, e.clientY); }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // ── COUNTDOWN ──
  useEffect(() => {
    function update() {
      const target = new Date('2026-05-29T00:00:00');
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ days: '0', hours: '0', mins: '0', secs: '0' });
        return;
      }
      setCountdown({
        days: String(Math.floor(diff / 86400000)),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        mins: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        secs: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── AGE FACTS ──
  useEffect(() => {
    const born = new Date('2021-05-29T00:00:00');
    const diff = Date.now() - born.getTime();
    setAgeDays(Math.floor(diff / 86400000).toLocaleString('el-GR'));
    setAgeHours(Math.floor(diff / 3600000).toLocaleString('el-GR'));
  }, []);

  // ── QR CODE ──
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => {
      const el = document.getElementById('qrcode');
      if (el && el.childElementCount === 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).QRCode(el, {
          text: 'https://maps.app.goo.gl/W9oRhZB4yxXdExGw9',
          width: 200, height: 200,
          colorDark: '#6644ff',
          colorLight: '#0e0010',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          correctLevel: (window as any).QRCode.CorrectLevel.H,
        });
      }
    };
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  // ── SCROLL ANIMATIONS ──
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseInt((e.target as HTMLElement).dataset.delay ?? '0');
          setTimeout(() => e.target.classList.add('visible'), delay);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── TOOLTIP HIDE ──
  useEffect(() => {
    const t = setTimeout(() => setTooltipVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // ── VIDEO CURTAIN ──
  function openCurtain() {
    if (posterRef.current) posterRef.current.style.display = 'none';
    setCurtainState('opening');
    setTimeout(() => {
      setVideoVisible(true);
      setCurtainState('open');
      if (videoRef.current) {
        videoRef.current.controls = true;
        videoRef.current.play();
      }
    }, 2200);
  }

  function closeCurtain() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.controls = false;
      videoRef.current.currentTime = 0;
    }
    setVideoVisible(false);
    setCurtainState('closing');
    setTimeout(() => {
      setCurtainState('closed');
      if (posterRef.current) posterRef.current.style.display = 'flex';
    }, 2200);
  }

  // ── MUSIC ──
  function toggleMusic() {
    if (!musicPlaying) {
      setYtSrc('https://www.youtube.com/embed/vH-D8_mjGxU?autoplay=1&loop=1&playlist=vH-D8_mjGxU');
      setMusicPlaying(true);
      setTooltipText('🎵 Παίζει η μουσική!');
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 2000);
    } else {
      setYtSrc('https://www.youtube.com/embed/vH-D8_mjGxU');
      setMusicPlaying(false);
    }
  }

  // ── RSVP ──
  function submitRSVP() {
    const name = rsvpNameRef.current?.value.trim() ?? '';
    const attendance = rsvpAttendanceRef.current?.value ?? '';
    if (!name || !attendance) {
      alert('Παρακαλώ συμπλήρωσε το όνομα και την απάντησή σου!');
      return;
    }
    const guests = rsvpGuestsRef.current?.value ?? '0';
    const kids = rsvpKidsRef.current?.value ?? '0';
    const message = rsvpMessageRef.current?.value.trim() ?? '';
    const subject = `RSVP Πάρτι Τάσου - ${name}`;
    const body = `Όνομα: ${name}\nΣυμμετοχή: ${attendance}\nΆτομα: ${guests}\nΠαιδιά: ${kids}\nΜήνυμα: ${message || '-'}`;
    window.open(`mailto:anastasatos.a@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setRsvpSubmitted(true);
  }

  const curtainLeftClass = `curtain curtain-left${curtainState === 'opening' || curtainState === 'open' ? ' open' : curtainState === 'closing' ? ' close' : ''}`;
  const curtainRightClass = `curtain curtain-right${curtainState === 'opening' || curtainState === 'open' ? ' open' : curtainState === 'closing' ? ' close' : ''}`;

  return (
    <div className="birthday-root">
      <canvas id="starfield" ref={canvasRef} />

      {/* Launching rocket */}
      <div id="launch-rocket" ref={launchRocketRef}>
        <svg width="60" height="120" viewBox="0 0 80 160" fill="none">
          <path d="M40 8 C40 8 65 40 65 85 L40 105 L15 85 C15 40 40 8 40 8Z" fill="#cc66ff"/>
          <path d="M40 8 C40 8 52 40 52 85 L40 105 L28 85 C28 40 40 8 40 8Z" fill="#aa44ee"/>
          <circle cx="40" cy="55" r="12" fill="#ffe0ff" opacity="0.9"/>
          <circle cx="40" cy="55" r="8" fill="#99aaff" opacity="0.7"/>
          <path d="M15 85 L2 100 L15 105Z" fill="#ff44aa"/>
          <path d="M65 85 L78 100 L65 105Z" fill="#ff44aa"/>
          <path d="M28 100 Q40 108 52 100 L52 115 Q40 125 28 115Z" fill="#330022"/>
        </svg>
        <div className="launch-exhaust">
          <div className="exhaust-flame" style={{width:'18px',height:'28px',background:'linear-gradient(to bottom,#fff5a0,#ff8800)'}}/>
          <div className="exhaust-flame" style={{width:'12px',height:'20px',background:'linear-gradient(to bottom,#ff8800,#ff3300)'}}/>
          <div className="exhaust-flame" style={{width:'7px',height:'14px',background:'linear-gradient(to bottom,#ff3300,transparent)'}}/>
        </div>
      </div>

      {/* Floating decorative planets */}
      <div className="floaty-planet" style={{width:'60px',height:'60px',top:'18vh',left:'4vw',background:'radial-gradient(circle at 35% 35%,#884400,#331100)',boxShadow:'0 0 20px rgba(200,100,0,0.3)',animationDuration:'7s'}}/>
      <div className="floaty-planet" style={{width:'40px',height:'40px',top:'55vh',right:'5vw',background:'radial-gradient(circle at 40% 35%,#004488,#001133)',boxShadow:'0 0 16px rgba(0,100,255,0.3)',animationDuration:'9s',animationDelay:'-3s'}}/>
      <div className="floaty-planet" style={{width:'28px',height:'28px',top:'80vh',left:'8vw',background:'radial-gradient(circle at 35% 30%,#888800,#332200)',boxShadow:'0 0 12px rgba(200,200,0,0.25)',animationDuration:'11s',animationDelay:'-6s'}}/>

      {/* Music */}
      <div id="music-tooltip" style={{opacity: tooltipVisible ? 1 : 0}}>{tooltipText}</div>
      <button id="music-btn" onClick={toggleMusic} title="Μουσική">{musicPlaying ? '⏸️' : '🎵'}</button>
      <iframe id="yt-frame" width="0" height="0" src={ytSrc} allow="autoplay" />

      {/* ════ HERO ════ */}
      <section id="hero">
        <div className="planet-bg">
          <div className="planet-crater" style={{width:'80px',height:'80px',top:'20%',left:'15%'}}/>
          <div className="planet-crater" style={{width:'40px',height:'40px',top:'50%',left:'60%'}}/>
          <div className="planet-crater" style={{width:'55px',height:'55px',top:'65%',left:'30%'}}/>
        </div>
        <div className="planet-rings"/>

        <div className="rocket-wrap">
          <svg className="rocket" viewBox="0 0 80 160" fill="none">
            <path d="M40 8 C40 8 65 40 65 85 L40 105 L15 85 C15 40 40 8 40 8Z" fill="#cc66ff"/>
            <path d="M40 8 C40 8 52 40 52 85 L40 105 L28 85 C28 40 40 8 40 8Z" fill="#aa44ee"/>
            <circle cx="40" cy="55" r="12" fill="#ffe0ff" opacity="0.9"/>
            <circle cx="40" cy="55" r="8" fill="#99aaff" opacity="0.7"/>
            <path d="M15 85 L2 100 L15 105Z" fill="#ff44aa"/>
            <path d="M65 85 L78 100 L65 105Z" fill="#ff44aa"/>
            <path d="M28 100 Q40 108 52 100 L52 115 Q40 125 28 115Z" fill="#ff6622"/>
            <circle cx="30" cy="105" r="4" fill="#ffaa44" opacity="0.8"/>
            <circle cx="40" cy="110" r="5" fill="#ff8822" opacity="0.9"/>
            <circle cx="50" cy="105" r="4" fill="#ffaa44" opacity="0.8"/>
          </svg>
          <div className="rocket-trail">
            <div className="trail-dot" style={{width:'8px',height:'8px',opacity:0.8}}/>
            <div className="trail-dot" style={{width:'6px',height:'6px',opacity:0.5}}/>
            <div className="trail-dot" style={{width:'4px',height:'4px',opacity:0.3}}/>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">🚀 Αποστολη: Γενεθλια!</div>
          <h1 className="hero-title">
            <span className="name">Τάσος</span>
            <span className="number">5</span>
          </h1>
          <p className="hero-subtitle">Χρόνια πολλά, αστροναύτη μας! ⭐</p>

          <div className="countdown-wrap">
            <div className="countdown-label">Αντιστροφη μετρηση μεχρι τα γενεθλια</div>
            <div className="countdown">
              <div className="cd-unit"><div className="cd-number">{countdown.days}</div><div className="cd-label">Μερες</div></div>
              <div className="cd-unit"><div className="cd-number">{countdown.hours}</div><div className="cd-label">Ωρες</div></div>
              <div className="cd-unit"><div className="cd-number">{countdown.mins}</div><div className="cd-label">Λεπτα</div></div>
              <div className="cd-unit"><div className="cd-number">{countdown.secs}</div><div className="cd-label">Δευτ.</div></div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Κανε scroll</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ════ MEMORIES ════ */}
      <section id="memories">
        <div className="section-label" data-animate="">📽️ Αναμνησεις</div>
        <h2 className="section-title" data-animate="">5 Χρόνια Ταξίδι</h2>
        <p className="section-sub" data-animate="">Από την πρώτη στιγμή που ήρθες στον κόσμο μας, το σύμπαν έγινε πιο φωτεινό</p>
        <div className="section-divider" data-animate=""/>

        <div className="video-container" data-animate="" id="video-wrap">
          <div id="video-poster" ref={posterRef} onClick={openCurtain}>
            <svg width="100%" height="100%" viewBox="0 0 480 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#1a0055"/>
                  <stop offset="60%" stopColor="#0d0035"/>
                  <stop offset="100%" stopColor="#040015"/>
                </radialGradient>
                <radialGradient id="nebulaGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4400aa" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#000020" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="nebulaGrad2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#220066" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#000010" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="planet1G" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#7744cc"/>
                  <stop offset="50%" stopColor="#330077"/>
                  <stop offset="100%" stopColor="#110033"/>
                </radialGradient>
                <radialGradient id="planet2G" cx="40%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#cc4488"/>
                  <stop offset="100%" stopColor="#440022"/>
                </radialGradient>
                <radialGradient id="planet3G" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#4488cc"/>
                  <stop offset="100%" stopColor="#001144"/>
                </radialGradient>
                <radialGradient id="sunG" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ffffaa"/>
                  <stop offset="50%" stopColor="#ffaa00"/>
                  <stop offset="100%" stopColor="#ff4400"/>
                </radialGradient>
                <radialGradient id="playGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6644ff" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#4400ff" stopOpacity="0"/>
                </radialGradient>
                <filter id="glow2">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="bigGlow">
                  <feGaussianBlur stdDeviation="10" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="starGlow">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <rect width="480" height="640" fill="url(#bgGrad)"/>
              <ellipse cx="120" cy="200" rx="180" ry="120" fill="url(#nebulaGrad)"/>
              <ellipse cx="360" cy="420" rx="150" ry="100" fill="url(#nebulaGrad2)"/>
              <ellipse cx="240" cy="500" rx="200" ry="80" fill="url(#nebulaGrad)"/>
              <ellipse cx="240" cy="320" rx="30" ry="280" fill="rgba(100,80,200,0.07)" transform="rotate(-25 240 320)"/>
              <ellipse cx="240" cy="320" rx="18" ry="260" fill="rgba(120,100,220,0.05)" transform="rotate(-25 240 320)"/>
              <circle cx="18" cy="22" r="0.8" fill="white" opacity="0.9"/>
              <circle cx="45" cy="55" r="1" fill="white" opacity="0.7"/>
              <circle cx="78" cy="15" r="0.8" fill="white" opacity="0.8"/>
              <circle cx="112" cy="38" r="1.2" fill="#ccddff" opacity="0.9"/>
              <circle cx="155" cy="12" r="0.8" fill="white" opacity="0.6"/>
              <circle cx="190" cy="48" r="1" fill="white" opacity="0.8"/>
              <circle cx="230" cy="18" r="0.8" fill="white" opacity="0.7"/>
              <circle cx="270" cy="42" r="1.2" fill="#ffeecc" opacity="0.8"/>
              <circle cx="310" cy="10" r="0.8" fill="white" opacity="0.9"/>
              <circle cx="350" cy="35" r="1" fill="white" opacity="0.7"/>
              <circle cx="390" cy="15" r="0.8" fill="white" opacity="0.8"/>
              <circle cx="430" cy="48" r="1.2" fill="#ccddff" opacity="0.7"/>
              <circle cx="460" cy="22" r="0.8" fill="white" opacity="0.6"/>
              <circle cx="52" cy="180" r="2" fill="white" opacity="0.95" filter="url(#starGlow)"/>
              <circle cx="410" cy="155" r="2.5" fill="#ffeecc" opacity="0.9" filter="url(#starGlow)"/>
              <circle cx="235" cy="160" r="1.8" fill="white" opacity="0.9" filter="url(#starGlow)"/>
              <circle cx="130" cy="490" r="2" fill="#ccddff" opacity="0.85" filter="url(#starGlow)"/>
              <circle cx="380" cy="510" r="2.2" fill="white" opacity="0.9" filter="url(#starGlow)"/>
              <circle cx="460" cy="430" r="1.8" fill="#ffeecc" opacity="0.85" filter="url(#starGlow)"/>
              <circle cx="20" cy="400" r="2" fill="white" opacity="0.9" filter="url(#starGlow)"/>
              <path d="M410,60 L412,68 L420,70 L412,72 L410,80 L408,72 L400,70 L408,68Z" fill="white" opacity="0.8"/>
              <path d="M60,380 L61.5,386 L68,388 L61.5,390 L60,396 L58.5,390 L52,388 L58.5,386Z" fill="#ccddff" opacity="0.7"/>
              <path d="M440,540 L441.5,546 L448,548 L441.5,550 L440,556 L438.5,550 L432,548 L438.5,546Z" fill="white" opacity="0.75"/>
              <line x1="300" y1="55" x2="355" y2="85" stroke="white" strokeWidth="1.5" opacity="0.7" strokeLinecap="round"/>
              <circle cx="300" cy="55" r="2" fill="white" opacity="0.9"/>
              <circle cx="370" cy="530" r="110" fill="url(#planet1G)" filter="url(#bigGlow)"/>
              <ellipse cx="370" cy="530" rx="148" ry="22" fill="none" stroke="#9966ff" strokeWidth="7" opacity="0.35"/>
              <ellipse cx="370" cy="530" rx="165" ry="28" fill="none" stroke="#7744ff" strokeWidth="4" opacity="0.2"/>
              <ellipse cx="370" cy="530" rx="135" ry="16" fill="none" stroke="#cc88ff" strokeWidth="3" opacity="0.25"/>
              <circle cx="348" cy="510" r="18" fill="rgba(0,0,0,0.2)"/>
              <circle cx="390" cy="545" r="12" fill="rgba(0,0,0,0.15)"/>
              <ellipse cx="365" cy="520" rx="30" ry="8" fill="rgba(120,80,200,0.2)" transform="rotate(-15 365 520)"/>
              <circle cx="75" cy="210" r="42" fill="url(#planet2G)" opacity="0.9"/>
              <circle cx="62" cy="200" r="8" fill="rgba(0,0,0,0.2)"/>
              <circle cx="85" cy="220" r="5" fill="rgba(0,0,0,0.15)"/>
              <circle cx="420" cy="175" r="22" fill="url(#planet3G)" opacity="0.85"/>
              <ellipse cx="420" cy="175" rx="30" ry="6" fill="none" stroke="#88ccff" strokeWidth="2.5" opacity="0.4"/>
              <circle cx="30" cy="60" r="50" fill="url(#sunG)" opacity="0.18"/>
              <circle cx="30" cy="60" r="28" fill="url(#sunG)" opacity="0.5"/>
              <circle cx="30" cy="60" r="14" fill="#ffffcc" opacity="0.9"/>
              <g transform="translate(280,230) rotate(-30)" filter="url(#glow2)">
                <path d="M0,-42 C0,-42 24,0 24,34 L0,48 L-24,34 C-24,0 0,-42 0,-42Z" fill="#9966ff"/>
                <path d="M0,-42 C0,-42 10,0 10,34 L0,48 L-10,34 C-10,0 0,-42 0,-42Z" fill="#7744ee"/>
                <circle cx="0" cy="-8" r="10" fill="#eeddff" opacity="0.95"/>
                <circle cx="0" cy="-8" r="6" fill="#99aaff" opacity="0.8"/>
                <path d="M-24,34 L-37,52 L-24,58Z" fill="#ff4488"/>
                <path d="M24,34 L37,52 L24,58Z" fill="#ff4488"/>
                <ellipse cx="-4" cy="52" rx="8" ry="13" fill="#ff6622" opacity="0.95"/>
                <ellipse cx="4" cy="55" rx="5" ry="9" fill="#ffaa44" opacity="0.85"/>
                <ellipse cx="0" cy="60" rx="4" ry="8" fill="#ffee88" opacity="0.7"/>
              </g>
              <circle cx="160" cy="350" r="3" fill="#886699" opacity="0.6"/>
              <circle cx="175" cy="340" r="2" fill="#776688" opacity="0.5"/>
              <circle cx="190" cy="355" r="2.5" fill="#886699" opacity="0.55"/>
              <circle cx="205" cy="345" r="1.8" fill="#776688" opacity="0.5"/>
              <circle cx="220" cy="358" r="2.2" fill="#886699" opacity="0.6"/>
              <circle cx="240" cy="320" r="55" fill="url(#playGlow)" opacity="0.6">
                <animate attributeName="r" values="55;68;55" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="240" cy="320" r="42" fill="url(#playGlow)" opacity="0.4">
                <animate attributeName="r" values="42;52;42" dur="2.5s" begin="0.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" begin="0.4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="240" cy="320" r="34" fill="rgba(68,0,255,0.55)" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"/>
              <polygon points="230,306 230,334 258,320" fill="white" opacity="0.97"/>
              <rect x="120" y="570" width="240" height="40" rx="20" fill="rgba(68,0,255,0.4)" stroke="rgba(150,120,255,0.5)" strokeWidth="1"/>
              <text x="240" y="596" textAnchor="middle" fontFamily="Fredoka One, cursive" fontSize="17" fill="white" opacity="0.95">▶ Δες τον Τάσο!</text>
            </svg>
          </div>
          <div className={curtainLeftClass} id="curtain-left"/>
          <div className={curtainRightClass} id="curtain-right"/>
          <video
            id="birthday-video"
            ref={videoRef}
            playsInline
            preload="metadata"
            src="/tasosbirthday/uploads/0-02-04-1b8dc48bf56e905dd81984aeeadb02224da43f993edebbe43cc6a0525662c02c_8998c288f212bf6a.mp4"
            className={videoVisible ? 'visible' : ''}
            onEnded={closeCurtain}
          >
            Ο browser σου δεν υποστηρίζει video.
          </video>
          <div className="video-glow"/>
        </div>

        <div className="photos-grid" style={{marginTop:'20px'}}>
          <div className="photo-slot" id="photo1">
            <img src="/tasosbirthday/uploads/Gemini_Generated_Image_v8w7idv8w7idv8w7.png" alt="Τάσος στην παραλία"/>
          </div>
          <div className="photo-slot" id="photo2">
            <img src="/tasosbirthday/uploads/Gemini_Generated_Image_w9ealkw9ealkw9ea.png" alt="Τάσος γελάει"/>
          </div>
        </div>
      </section>

      {/* ════ FUN FACTS ════ */}
      <section id="facts">
        <div className="section-label" data-animate="">📊 Στοιχεια Αποστολης</div>
        <h2 className="section-title" data-animate="">Τα Νούμερα του Τάσου</h2>
        <p className="section-sub" data-animate="">Επίσημα δεδομένα του Αστροναύτη Αναστάσιου</p>
        <div className="section-divider" data-animate=""/>

        <div className="facts-grid">
          <div className="fact-card" data-animate="" data-delay="0">
            <div className="fact-icon">🚀</div>
            <div className="fact-value">{ageDays}</div>
            <div className="fact-label">Ημερες στο συμπαν</div>
          </div>
          <div className="fact-card" data-animate="" data-delay="100">
            <div className="fact-icon">⭐</div>
            <div className="fact-value">{ageHours}</div>
            <div className="fact-label">Ωρες περιπετειας</div>
          </div>
          <div className="fact-card" data-animate="" data-delay="200">
            <div className="fact-icon">🌙</div>
            <div className="fact-value">60</div>
            <div className="fact-label">Πανσεληνοι που ειδε</div>
          </div>
          <div className="fact-card" data-animate="" data-delay="300">
            <div className="fact-icon">🌎</div>
            <div className="fact-value">5</div>
            <div className="fact-label">Γυροι γυρω απο τον Ηλιο</div>
          </div>
          <div className="fact-card" data-animate="" data-delay="400">
            <div className="fact-icon">💫</div>
            <div className="fact-value">∞</div>
            <div className="fact-label">Αγαπη απο τους γονεις</div>
          </div>
          <div className="fact-card" data-animate="" data-delay="500">
            <div className="fact-icon">🛸</div>
            <div className="fact-value">1</div>
            <div className="fact-label">Μοναδικος στο συμπαν</div>
          </div>
        </div>

        <div className="solar-facts">
          <p className="solar-title">🪐 Ενδιαφέροντα Στοιχεία για το Ηλιακό μας Σύστημα</p>
          <div className="solar-grid">
            <div className="solar-fact" data-animate="">
              <div className="solar-fact-icon">☀️</div>
              <div className="solar-fact-text">Ο Ήλιος είναι τόσο μεγάλος που <strong>χωράει μέσα του η Γη 1.3 εκατομμύρια φορές!</strong></div>
            </div>
            <div className="solar-fact" data-animate="" data-delay="100">
              <div className="solar-fact-icon">🪐</div>
              <div className="solar-fact-text">Ο Κρόνος έχει <strong>146 φεγγάρια</strong> — φανταστικό, σαν να έχει 146 φίλους!</div>
            </div>
            <div className="solar-fact" data-animate="" data-delay="200">
              <div className="solar-fact-icon">🔴</div>
              <div className="solar-fact-text">Ένα φεγγάρι του Άρη (Φόβος) ανατέλλει <strong>3 φορές τη μέρα!</strong></div>
            </div>
            <div className="solar-fact" data-animate="" data-delay="300">
              <div className="solar-fact-icon">💎</div>
              <div className="solar-fact-text">Στον Ουρανό και στον Ποσειδώνα <strong>βρέχει διαμάντια</strong> — κυριολεκτικά!</div>
            </div>
            <div className="solar-fact" data-animate="" data-delay="400">
              <div className="solar-fact-icon">🌪️</div>
              <div className="solar-fact-text">Η Μεγάλη Κόκκινη Κηλίδα του Δία είναι <strong>καταιγίδα που διαρκεί 350+ χρόνια</strong></div>
            </div>
            <div className="solar-fact" data-animate="" data-delay="500">
              <div className="solar-fact-icon">🌊</div>
              <div className="solar-fact-text">Η Ευρώπη (φεγγάρι του Δία) κρύβει <strong>έναν ωκεανό δύο φορές μεγαλύτερο της Γης!</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ INVITATION ════ */}
      <section id="invitation">
        <div className="section-label" data-animate="">🎉 Προσκληση</div>
        <h2 className="section-title" data-animate="">Έλα στο Πάρτι!</h2>
        <p className="section-sub" data-animate="">Η αποστολή σου, αν επιλέξεις να την αποδεχτείς, είναι να έρθεις και να γιορτάσουμε μαζί!</p>
        <div className="section-divider" data-animate=""/>

        <div className="invite-card" data-animate="">
          <div className="invite-decoration tl">🚀</div>
          <div className="invite-decoration br">🚀</div>
          <div className="invite-eyebrow">✨ Επισημη Προσκληση Διαστημικης Αποστολης</div>
          <h3 className="invite-heading">Ο Τάσος γιορτάζει<br/>τα 5α του Γενέθλια!</h3>
          <div className="invite-details">
            <div className="invite-row">
              <div className="invite-row-icon">📅</div>
              <div>
                <div className="invite-row-label">Ημερομηνια</div>
                <div className="invite-row-value">Σάββατο, 30 Μαΐου 2026</div>
              </div>
            </div>
            <div className="invite-row">
              <div className="invite-row-icon">📍</div>
              <div>
                <div className="invite-row-label">Τοποθεσια</div>
                <div className="invite-row-value">Πολιτικά Ευβοίας</div>
              </div>
            </div>
            <div className="invite-row">
              <div className="invite-row-icon">👨‍👩‍👦</div>
              <div>
                <div className="invite-row-label">Απο</div>
                <div className="invite-row-value">Άρης Αναστασάτος & Μαρίκα Σακελλαροπούλου (+ Μάρκος)</div>
              </div>
            </div>
          </div>
          <p className="dress-note">🌟 Dress code: Ό,τι σε κάνει να νιώθεις αστροναύτης!</p>
        </div>
      </section>

      {/* ════ LOCATION / QR ════ */}
      <section id="location">
        <div className="section-label" data-animate="">📍 Πως να ερθεις</div>
        <h2 className="section-title" data-animate="">Συντεταγμένες Αποστολής</h2>
        <p className="section-sub" data-animate="">Σκάναρε τον κώδικα ή πάτα το link για χάρτη</p>
        <div className="section-divider" data-animate=""/>

        <div className="qr-wrap" data-animate="">
          <div id="qrcode"/>
          <div className="qr-label">Πολιτικά Ευβοίας — Google Maps</div>
          <a className="qr-link" href="https://maps.app.goo.gl/W9oRhZB4yxXdExGw9" target="_blank" rel="noopener noreferrer">
            🗺️ Άνοιξε στο χάρτη
          </a>
        </div>
      </section>

      {/* ════ MESSAGE ════ */}
      <section id="message">
        <div className="section-label" data-animate="">💌 Μηνυμα</div>
        <h2 className="section-title" data-animate="">Από τους Γονείς</h2>
        <div className="section-divider" data-animate=""/>

        <div className="message-card" data-animate="">
          <div className="message-quote">&ldquo;</div>
          <p className="message-text">
            Τάσο μας, πριν 5 χρόνια ήρθες στη ζωή μας και έκανες το σύμπαν μας πιο φωτεινό από κάθε αστέρι.
            Κάθε μέρα μαζί σου είναι μια νέα περιπέτεια, ένα νέο ταξίδι στο άγνωστο — και εμείς δεν θα θέλαμε
            να ταξιδεύουμε με κανέναν άλλον. Είσαι η μεγαλύτερη μας υπερηφάνεια. Χρόνια σου πολλά!
          </p>
          <div className="message-sig">Με όλη μας την αγάπη, Μπαμπάς, Μαμά & Μάρκος 🚀</div>
          <div className="hearts">
            <span className="heart">💜</span>
            <span className="heart">💖</span>
            <span className="heart">💜</span>
          </div>
        </div>
      </section>

      {/* ════ RSVP ════ */}
      <section id="rsvp">
        <div className="section-label" data-animate="">✉️ RSVP</div>
        <h2 className="section-title" data-animate="">Επιβεβαίωσε τη Συμμετοχή σου</h2>
        <p className="section-sub" data-animate="">Πες μας αν θα έρθεις ώστε να σε περιμένουμε!</p>
        <div className="section-divider" data-animate=""/>

        <div className="rsvp-form" data-animate="">
          {!rsvpSubmitted ? (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-name">Ονοματεπωνυμο</label>
                <input className="form-input" type="text" id="rsvp-name" ref={rsvpNameRef} placeholder="π.χ. Γιώργης Παπαδόπουλος"/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-attendance">Συμμετοχη</label>
                <select className="form-select" id="rsvp-attendance" ref={rsvpAttendanceRef}>
                  <option value="">Επίλεξε...</option>
                  <option value="yes">✅ Ναι, θα έρθω!</option>
                  <option value="no">❌ Δεν μπορώ να έρθω</option>
                  <option value="maybe">🤔 Ίσως, θα επιβεβαιώσω</option>
                </select>
              </div>
              <div className="form-group">
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                  <div>
                    <label className="form-label" htmlFor="rsvp-guests">Αριθμος Ενηλικων</label>
                    <select className="form-select" id="rsvp-guests" ref={rsvpGuestsRef}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2" defaultValue="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="rsvp-kids">Αριθμος Παιδιων</label>
                    <select className="form-select" id="rsvp-kids" ref={rsvpKidsRef}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="rsvp-message">Μηνυμα για τον Τασο (προαιρετικο)</label>
                <textarea className="form-textarea" id="rsvp-message" ref={rsvpMessageRef} placeholder="Ένα ευχάριστο μήνυμα..."/>
              </div>
              <button className="form-submit" onClick={submitRSVP}>
                🚀 Αποστολή!
              </button>
            </>
          ) : (
            <div className="rsvp-success">
              <h3>🎉 Ευχαριστούμε!</h3>
              <p>Λάβαμε την απάντησή σου!<br/>Ανυπομονούμε να σε δούμε στο πάρτι του Τάσου! 🚀⭐</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>Φτιαγμένο με <span>💜</span> για τον <span>Τάσο</span> — 29 Μαΐου 2026</p>
      </footer>
    </div>
  );
}
