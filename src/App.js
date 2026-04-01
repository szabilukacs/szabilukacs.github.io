import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// --- Static Data ---
const skills = [
  { name: 'C/C++', type: 'CORE', hex: '0x43' },
  { name: 'ARM Assembly', type: 'LOW-LEVEL', hex: '0x41' },
  { name: 'RTOS', type: 'SYS', hex: '0x52' },
  { name: 'Microcontrollers', type: 'HW', hex: '0x4D' },
  { name: 'Embedded Linux', type: 'OS', hex: '0x4C' },
  { name: 'Protocol Design', type: 'NET', hex: '0x50' }
];

const experienceData = [
  { year: '2019 - 2023', role: 'BSc Computer Engineering', org: 'Tech University', type: 'EDU' },
  { year: '2023 - 2024', role: 'Junior Firmware Engineer', org: 'Workspace Alpha', type: 'WORK' },
  { year: '2024 - 2025', role: 'Embedded Developer', org: 'Workspace Beta', type: 'WORK' },
  { year: '2025 - Present', role: 'Senior Embedded Engineer', org: 'Workspace Gamma', type: 'WORK' }
];

// --- PRELOADER: Colorful Hacker Boot Sequence ---
const BootSequence = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  
  const bootMessages = [
    <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>==================================================</span>,
    <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>=   EMBEDDED.DEV SECURE TERMINAL v9.0.1          =</span>,
    <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>==================================================</span>,
    <span style={{ color: '#94a3b8' }}>[SYS] Allocating memory pages... <span style={{color: '#10b981'}}>[OK]</span></span>,
    <span style={{ color: '#94a3b8' }}>[SYS] Injecting kernel payload... <span style={{color: '#10b981'}}>[OK]</span></span>,
    <span style={{ color: '#fbbf24' }}>[WRN] Unrecognized protocol detected on port 22.</span>,
    <span style={{ color: '#94a3b8' }}>[NET] Rerouting IP tables... <span style={{color: '#10b981'}}>[OK]</span></span>,
    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>[SEC] FIREWALL ENGAGED. ENCRYPTED PACKETS DROPPED.</span>,
    <span style={{ color: '#0ea5e9' }}>[HCK] Executing buffer overflow exploit...</span>,
    <span style={{ color: '#10b981' }}>[HCK] 0x00FA89B1: 89 50 4E 47 0D 0A 1A 0A -{'>'} BYPASS SUCCESS</span>,
    <span style={{ color: '#94a3b8' }}>[SYS] Decrypting user portfolio...</span>,
    <span style={{ color: '#fbbf24' }}>[||||||||||          ] 50%</span>,
    <span style={{ color: '#fbbf24' }}>[||||||||||||||||||||] 100%</span>,
    <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem', display: 'block', marginTop: '10px' }}>ACCESS GRANTED.</span>,
    <span style={{ color: '#f8fafc', marginTop: '10px', display: 'block' }}>Loading graphical interface...</span>
  ];

  useEffect(() => {
    let i = 0;
    // Removed the 1.5s timeout. It starts typing instantly now.
    const interval = setInterval(() => {
      setLogs(prev => [...prev, bootMessages[i]]);
      i++;
      if (i === bootMessages.length) {
        clearInterval(interval);
        setTimeout(onComplete, 600); // Quick pause so they can read "Access Granted"
      }
    }, 45); // Rapid typing speed
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div className="boot-sequence mono" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}>
      <div className="crt-overlay"></div>
      <div className="boot-content">
        {logs.map((log, index) => <div key={index} className="boot-log">{log}</div>)}
        <div className="cursor blinking">█</div>
      </div>
    </motion.div>
  );
};

// --- GENERATIVE BACKGROUND: Auto-Routing Traces ---
const AutoRouterBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let traces = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Trace {
      constructor() {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { this.x = Math.random() * canvas.width; this.y = 0; } 
        else if (edge === 1) { this.x = canvas.width; this.y = Math.random() * canvas.height; } 
        else if (edge === 2) { this.x = Math.random() * canvas.width; this.y = canvas.height; } 
        else { this.x = 0; this.y = Math.random() * canvas.height; } 

        this.path = [{x: this.x, y: this.y}];
        this.life = 0;
        this.maxLife = 100 + Math.random() * 150;
        this.color = Math.random() > 0.7 ? '#10b981' : '#334155'; 
        this.active = true;
        this.vx = 0; this.vy = 0;
        this.pickDirection();
      }

      pickDirection() {
        const dirs = [
          {vx: 3, vy: 0}, {vx: -3, vy: 0}, {vx: 0, vy: 3}, {vx: 0, vy: -3},
          {vx: 2, vy: 2}, {vx: -2, vy: -2}, {vx: 2, vy: -2}, {vx: -2, vy: 2}
        ];
        const d = dirs[Math.floor(Math.random() * dirs.length)];
        this.vx = d.vx; this.vy = d.vy;
      }

      update() {
        if (!this.active) return;
        if (Math.random() < 0.05) this.pickDirection(); 

        this.x += this.vx; this.y += this.vy;
        this.path.push({x: this.x, y: this.y});
        this.life++;

        if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.active = false;
        }
      }

      draw(ctx) {
        if (this.path.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        const alpha = Math.max(0, 1 - this.life / this.maxLife);
        ctx.globalAlpha = alpha;
        
        ctx.moveTo(this.path[0].x, this.path[0].y);
        for(let i=1; i<this.path.length; i++) { ctx.lineTo(this.path[i].x, this.path[i].y); }
        ctx.stroke();
        
        if (this.active) {
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color === '#10b981' ? '#fbbf24' : '#64748b'; 
            ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    const render = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.1 && traces.length < 20) traces.push(new Trace());

      traces.forEach(t => { t.update(); t.draw(ctx); });
      traces = traces.filter(t => t.active || t.life < t.maxLife);
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="auto-router-canvas" />;
};


// --- Mobile Touch Oscilloscope Trail ---
const OscilloscopeTrail = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia("(pointer: coarse)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    const handleTouchMove = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        points.current.push({ x: e.changedTouches[i].clientX, y: e.changedTouches[i].clientY, age: 0 });
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (points.current.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#10b981';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let time = Date.now() / 80;
        points.current = points.current.filter(p => p.age < 25);
        
        points.current.forEach((p, i) => {
          p.age += 1;
          const waveOffset = Math.sin(p.x / 15 + time) * 12 * (1 - p.age / 25);
          const drawX = p.x;
          const drawY = p.y + waveOffset;
          if (i === 0) ctx.moveTo(drawX, drawY);
          else ctx.lineTo(drawX, drawY);
        });
        ctx.stroke();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="osc-trail-canvas mobile-visible" />;
};

// --- 3D Hero Microcontroller with Gyro Tilt ---
const FloatingMCU = () => {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { damping: 25, stiffness: 120 });
  const smoothTiltY = useSpring(tiltY, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        tiltX.set(e.gamma);
        tiltY.set(e.beta - 45); 
      }
    };
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [tiltX, tiltY]);

  return (
    <div className="mcu-scene">
      <motion.div className="mcu-3d-container" animate={{ rotateZ: 360, y: [-10, 10, -10] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
        <motion.div style={{ rotateY: smoothTiltX, rotateX: smoothTiltY, width: '100%', height: '100%', transformStyle: 'preserve-3d' }} className="mcu-gyro-wrapper">
          <div className="mcu-3d-body">
            <span className="mcu-logo mono">STM32</span>
            <div className="mcu-dot"></div>
            <div className="mcu-pins-h top"></div>
            <div className="mcu-pins-h bottom"></div>
            <div className="mcu-pins-v left"></div>
            <div className="mcu-pins-v right"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- High-Density Decorative PCB Components ---
const PcbComponent = ({ type, top, left, rotation = 0, label = "", mobileShow = false }) => {
  const style = { top, left, transform: `rotate(${rotation}deg)` };
  const visibilityClass = mobileShow ? "smd-comp mobile-visible" : "smd-comp desktop-only";

  if (type === 'ic') return (<div className={`smd-ic ${visibilityClass}`} style={style}><div className="ic-body"><span className="ic-dot"></span></div><div className="ic-pins top">{[1,2,3,4].map(p => <div key={p} className="pin"/>)}</div><div className="ic-pins bottom">{[1,2,3,4].map(p => <div key={p} className="pin"/>)}</div></div>);
  if (type === 'ic-large') return (<div className={`smd-ic large ${visibilityClass}`} style={style}><div className="ic-body"><span className="ic-dot"></span><span className="ic-label">MCU</span></div><div className="ic-pins top">{[1,2,3,4,5,6].map(p => <div key={p} className="pin"/>)}</div><div className="ic-pins bottom">{[1,2,3,4,5,6].map(p => <div key={p} className="pin"/>)}</div><div className="ic-pins left side">{[1,2,3,4].map(p => <div key={p} className="pin"/>)}</div><div className="ic-pins right side">{[1,2,3,4].map(p => <div key={p} className="pin"/>)}</div></div>);
  if (type === 'resistor') return (<div className={`smd-resistor ${visibilityClass}`} style={style}><div className="res-pad"></div><div className="res-body">103</div><div className="res-pad"></div></div>);
  if (type === 'capacitor') return (<div className={`smd-capacitor ${visibilityClass}`} style={style}><div className="cap-pad"></div><div className="cap-body"></div><div className="cap-pad"></div></div>);
  if (type === 'test-point') return (<div className={`test-point ${visibilityClass}`} style={style}><div className="tp-ring"><div className="tp-hole"></div></div>{label && <span className="tp-label mono">{label}</span>}</div>);
  if (type === 'via-cluster') return (<div className={`via-cluster ${visibilityClass}`} style={style}>{[1,2,3,4,5,6].map(v => <div key={v} className="tiny-via"><div className="tiny-hole"></div></div>)}</div>);
  return null;
};

// --- Timeline Item (PCB Node) ---
const TimelineItem = ({ item, index, total, timelineScroll }) => {
  const activationPoint = index / (total - 1) - 0.1;
  const isLit = useTransform(timelineScroll, value => value >= activationPoint);
  const traceColor = useTransform(isLit, lit => lit ? 'var(--pcb-trace-copper)' : 'var(--pcb-trace-silver)');
  const glowShadow = useTransform(isLit, lit => lit ? 'drop-shadow(0 0 6px var(--pcb-trace-glow))' : 'none');
  const padBg = useTransform(isLit, lit => lit ? '#fef3c7' : 'var(--bg-main)');
  const isLeft = index % 2 === 0;

  return (
    <div className={`timeline-row ${isLeft ? 'row-left' : 'row-right'}`}>
      <motion.svg className={`branch-trace ${isLeft ? 'branch-left' : 'branch-right'}`} style={{ filter: glowShadow }}>
        {isLeft ? <motion.polyline points="100,15 40,15 15,40" fill="none" stroke={traceColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                : <motion.polyline points="0,15 60,15 85,40" fill="none" stroke={traceColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
      </motion.svg>
      <div className="timeline-content left-content">
        {isLeft && (
          <motion.div className="card pcb-card" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <span className="timeline-year">{item.year}</span><h3>{item.role}</h3><p>{item.org}</p><span className="node-type">[{item.type}]</span>
          </motion.div>
        )}
      </div>
      <div className="timeline-center">
        <motion.div className="pcb-via" style={{ borderColor: traceColor, backgroundColor: padBg, boxShadow: useTransform(isLit, lit => lit ? '0 0 15px var(--pcb-trace-glow)' : 'none') }}>
          <div className="via-hole" />
        </motion.div>
      </div>
      <div className="timeline-content right-content">
        {!isLeft && (
          <motion.div className="card pcb-card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <span className="timeline-year">{item.year}</span><h3>{item.role}</h3><p>{item.org}</p><span className="node-type">[{item.type}]</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Interactive Oscilloscope Game ---
const OscilloscopeGame = ({ triggerHaptic }) => {
  const canvasRef = useRef(null);
  const [trigger, setTrigger] = useState(85); 
  const [zoom, setZoom] = useState(2); 

  const isSynced = trigger > 42 && trigger < 58; 
  const isDecoded = isSynced && zoom >= 7 && zoom <= 8;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let phase = 0;

    const bitPattern = [0,1,0,1,1,0,0,1, 0,1,0,0,1,1,0,1, 0,1,1,0,0,1,0,1]; 

    const render = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
      ctx.lineWidth = 1;
      for(let i=0; i<canvas.width; i+=40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
      for(let i=0; i<canvas.height; i+=40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

      if (!isSynced) phase += 6; 

      const baseAmplitude = 50;
      const centerY = canvas.height / 2;
      
      ctx.beginPath();
      ctx.strokeStyle = '#10b981'; 
      ctx.lineWidth = 3;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#10b981';

      const bitWidth = 20 * zoom;
      
      let prevY = null;
      for (let x = 0; x < canvas.width; x++) {
         const virtualX = x + phase;
         const bitIndex = Math.floor(virtualX / bitWidth) % bitPattern.length;
         const bit = bitPattern[Math.abs(bitIndex)];
         
         const targetY = centerY + (bit === 1 ? -baseAmplitude : baseAmplitude);
         
         if (x === 0) {
           ctx.moveTo(x, targetY);
         } else {
           if (prevY !== null && prevY !== targetY) ctx.lineTo(x, targetY);
           else ctx.lineTo(x, targetY);
         }
         prevY = targetY;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      const triggerY = canvas.height - (trigger / 100) * canvas.height;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
      ctx.setLineDash([5, 5]);
      ctx.moveTo(0, triggerY);
      ctx.lineTo(canvas.width, triggerY);
      ctx.stroke();
      ctx.setLineDash([]);

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationId);
  }, [trigger, zoom, isSynced]);

  return (
    <div className="osc-container">
      <div className="osc-screen-wrapper">
        <canvas ref={canvasRef} width={600} height={280} className="osc-canvas" style={{ width: '100%' }} />
        
        <AnimatePresence>
          {isDecoded && (
            <motion.div className="osc-decode-overlay mono" initial={{opacity:0}} animate={{opacity:1}}>
              &gt; UART DECODED [115200 8N1]:<br/>"SYSTEM_READY"
            </motion.div>
          )}
        </AnimatePresence>
        {!isSynced && <div className="osc-warning mono">NO SYNC</div>}
        {isSynced && <div className="osc-synced mono">TRIG'D</div>}
      </div>

      <div className="osc-controls">
        <div className="osc-knob-group">
          <label className="mono">TRIG LVL</label>
          <input type="range" min="0" max="100" value={trigger} onChange={(e) => { triggerHaptic(); setTrigger(e.target.value); }} className="osc-slider" />
        </div>
        <div className="osc-knob-group">
          <label className="mono">TIME/DIV</label>
          <input type="range" min="1" max="10" value={zoom} onChange={(e) => { triggerHaptic(); setZoom(e.target.value); }} className="osc-slider" />
        </div>
      </div>
    </div>
  );
};

// --- Physics Node / Neural Net Graph Game ---
const NeuralNetGame = ({ triggerHaptic }) => {
  const canvasRef = useRef(null);
  const state = useRef({
    nodes: [], links: [], pulses: [],
    draggedNode: null, width: 0, height: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      state.current.width = canvas.width = canvas.parentElement.clientWidth;
      state.current.height = canvas.height = 300; 
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const numNodes = 40;
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
      id: i,
      x: Math.random() * state.current.width,
      y: Math.random() * state.current.height,
      vx: 0, vy: 0,
      radius: 4 + Math.random() * 3
    }));

    const links = [];
    nodes.forEach(n1 => {
      const neighbors = nodes
        .filter(n2 => n1.id !== n2.id)
        .sort((a, b) => Math.hypot(a.x - n1.x, a.y - n1.y) - Math.hypot(b.x - n1.x, b.y - n1.y))
        .slice(0, 2);
      neighbors.forEach(n2 => {
        if (!links.some(l => (l.source === n1 && l.target === n2) || (l.source === n2 && l.target === n1))) {
          links.push({ source: n1, target: n2 });
        }
      });
    });

    state.current.nodes = nodes;
    state.current.links = links;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { nodes, links, pulses, draggedNode, width, height } = state.current;

      nodes.forEach(n => {
        n.vx += (width/2 - n.x) * 0.0005; 
        n.vy += (height/2 - n.y) * 0.0005;
        nodes.forEach(n2 => {
          if (n !== n2) {
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 100) {
              const force = 5 / (dist * dist);
              n.vx += (dx / dist) * force;
              n.vy += (dy / dist) * force;
            }
          }
        });
      });

      links.forEach(l => {
        const dx = l.target.x - l.source.x;
        const dy = l.target.y - l.source.y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = (dist - 60) * 0.02; 
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (draggedNode !== l.source) { l.source.vx += fx; l.source.vy += fy; }
        if (draggedNode !== l.target) { l.target.vx -= fx; l.target.vy -= fy; }
      });

      nodes.forEach(n => {
        if (draggedNode !== n) {
          n.x += n.vx;
          n.y += n.vy;
        }
        n.vx *= 0.85; 
        n.vy *= 0.85;
        n.x = Math.max(n.radius, Math.min(width - n.radius, n.x));
        n.y = Math.max(n.radius, Math.min(height - n.radius, n.y));
      });

      ctx.lineWidth = 1;
      links.forEach(l => {
        ctx.beginPath();
        ctx.moveTo(l.source.x, l.source.y);
        ctx.lineTo(l.target.x, l.target.y);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
        ctx.stroke();
      });

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += 0.05;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }
        
        const lx = p.source.x + (p.target.x - p.source.x) * p.progress;
        const ly = p.source.y + (p.target.y - p.source.y) * p.progress;
        
        ctx.beginPath();
        ctx.arc(lx, ly, 4, 0, Math.PI*2);
        ctx.fillStyle = '#10b981';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#10b981';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = draggedNode === n ? '#fbbf24' : '#38bdf8';
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getEventCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left,
      y: (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top
    };
  };

  const handlePointerDown = (e) => {
    const { x, y } = getEventCoords(e);
    const closest = state.current.nodes.reduce((acc, n) => {
      const dist = Math.hypot(n.x - x, n.y - y);
      return dist < acc.dist ? { node: n, dist } : acc;
    }, { node: null, dist: Infinity });

    if (closest.dist < 25) {
      state.current.draggedNode = closest.node;
      triggerHaptic();
    }
  };

  const handlePointerMove = (e) => {
    if (state.current.draggedNode) {
      const { x, y } = getEventCoords(e);
      state.current.draggedNode.x = x;
      state.current.draggedNode.y = y;
      state.current.draggedNode.vx = 0;
      state.current.draggedNode.vy = 0;
    }
  };

  const handlePointerUp = () => { state.current.draggedNode = null; };

  const handleDoubleClick = (e) => {
    const { x, y } = getEventCoords(e);
    const closest = state.current.nodes.reduce((acc, n) => {
      const dist = Math.hypot(n.x - x, n.y - y);
      return dist < acc.dist ? { node: n, dist } : acc;
    }, { node: null, dist: Infinity });

    if (closest.dist < 30) {
      triggerHaptic();
      state.current.links.forEach(l => {
        if (l.source === closest.node) state.current.pulses.push({ source: l.source, target: l.target, progress: 0 });
        else if (l.target === closest.node) state.current.pulses.push({ source: l.target, target: l.source, progress: 0 });
      });
    }
  };

  return (
    <div className="physics-node-container" style={{ position: 'relative', width: '100%', height: '300px', background: '#020617', borderRadius: '8px', border: '2px solid var(--border-color)', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,0,0,1)' }}>
      <div className="mono" style={{ position: 'absolute', top: '10px', left: '10px', color: '#64748b', fontSize: '0.7rem', pointerEvents: 'none' }}>
        SYS_TOPOLOGY_MAP<br/>
        <span style={{ color: 'var(--accent-primary)' }}>Drag nodes to interact. Double-click to ping.</span>
      </div>
      <canvas 
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
};


const Portfolio = () => {
  const [isBooting, setIsBooting] = useState(true); 
  
  const [activeSection, setActiveSection] = useState('home');
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false); 
  const containerRef = useRef(null);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 350 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [binaryBits, setBinaryBits] = useState(Array(8).fill(0));
  const [targetValue, setTargetValue] = useState(42);
  const [score, setScore] = useState(0);
  const [gameMessage, setGameMessage] = useState('Decode the target value!');
  
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [monitorLogs, setMonitorLogs] = useState(['> kernel_init() ... OK', '> mount_fs() ... OK']);

  const [showCvModal, setShowCvModal] = useState(false);
  const [logicInputs, setLogicInputs] = useState({ a: 0, b: 0 });
  const logicSolved = logicInputs.a && logicInputs.b;
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  const [bug, setBug] = useState({ active: false, x: 0, y: 0, id: 0 });
  const [bugsCaught, setBugsCaught] = useState(0);
  const [toast, setToast] = useState(null);
  const [isZapping, setIsZapping] = useState(false);
  const [zappedBugId, setZappedBugId] = useState(null);
  const bugCaughtRef = useRef(false); 

  const [solderedBanks, setSolderedBanks] = useState([]);
  const allBanksPowered = solderedBanks.length === skills.length;

  const timelineRef = useRef(null);
  const { scrollYProgress: timelineScroll } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const traceHeight = useTransform(timelineScroll, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleMouseMove = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isBooting) return;
    const text = '> Initializing embedded environment... Ready.';
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) { setTerminalText(text.substring(0, i + 1)); i++; } 
      else { clearInterval(typing); }
    }, 40);
    const cursorBlink = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => { clearInterval(typing); clearInterval(cursorBlink); };
  }, [isBooting]);

  useEffect(() => {
    if (isOverclocked || isBooting) return;
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40 + 30)); 
      setMemoryUsage(Math.floor(Math.random() * 30 + 40)); 
      setTemperature(Math.floor(Math.random() * 15 + 45)); 
    }, 2000);
    return () => clearInterval(interval);
  }, [isOverclocked, isBooting]);

  useEffect(() => {
    if (isBooting) return;
    const timer = setInterval(() => { setUptimeSeconds(prev => prev + 1); }, 1000);
    return () => clearInterval(timer);
  }, [isBooting]);

  const formatUptime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (logicSolved && showCvModal) {
      setTimeout(() => {
        alert("Authentication successful. Mocking Datasheet Download...");
        setShowCvModal(false);
        setLogicInputs({ a: 0, b: 0 });
      }, 1000);
    }
  }, [logicSolved, showCvModal]);

  useEffect(() => {
    if (isBooting) return;
    const spawnBug = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 800) return;
      if (Math.random() > 0.6 && !bug.active) {
        bugCaughtRef.current = false; 
        setBug({ active: true, x: Math.random() * (window.innerWidth - 100) + 50, y: Math.random() * (window.innerHeight - 150) + 100, id: Date.now() });
      }
    };
    const interval = setInterval(spawnBug, 8000);
    return () => clearInterval(interval);
  }, [bug.active, isBooting]);

  useEffect(() => {
    if(bug.active && zappedBugId !== bug.id) {
      const hideTimer = setTimeout(() => setBug(prev => ({...prev, active: false})), 4500);
      return () => clearTimeout(hideTimer);
    }
  }, [bug.id, bug.active, zappedBugId]);

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const catchBug = (e) => {
    e.stopPropagation();
    if (bugCaughtRef.current) return;
    bugCaughtRef.current = true;
    
    setZappedBugId(bug.id); 
    triggerHaptic();
    setIsZapping(true);
    
    setTimeout(() => {
      setBug(prev => ({ ...prev, active: false }));
      setBugsCaught(prev => prev + 1);
      setIsZapping(false);
      setZappedBugId(null);
      setToast('> [DEBUG] Hardware bug neutralized. Memory freed.');
      setTimeout(() => setToast(null), 3500);
    }, 400); 
  };

  const triggerOverclock = () => {
    if (isOverclocked) return;
    triggerHaptic();
    setIsOverclocked(true);
    setCpuUsage(99);
    setMemoryUsage(98);
    setTemperature(96);
    setMonitorLogs(['> OVERCLOCK INITIATED', '> ERPT: THERMAL LIMIT EXCEEDED!', '> UNDERVOLTING TO PREVENT DAMAGE...']);
    setTimeout(() => {
      setIsOverclocked(false);
      setMonitorLogs(['> thermal_throttle() ... OK', '> system_stable() ... OK']);
    }, 5000);
  };

  const flipBit = (index) => {
    triggerHaptic();
    const newBits = [...binaryBits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBinaryBits(newBits);
    if (parseInt(newBits.join(''), 2) === targetValue) {
      setScore(score + 1);
      setGameMessage('🎉 ACK received! Next frame...');
      setTimeout(() => {
        setBinaryBits(Array(8).fill(0));
        setTargetValue(Math.floor(Math.random() * 200 + 20));
        setGameMessage('Decode the target value!');
      }, 1500);
    }
  };

  const resetGame = () => {
    triggerHaptic();
    setBinaryBits(Array(8).fill(0));
    setTargetValue(Math.floor(Math.random() * 200 + 20));
    setScore(0);
    setGameMessage('Decode the target value!');
  };

  const toggleTheme = () => {
    triggerHaptic();
    setIsLightMode(!isLightMode);
  };

  const handleSolder = (skillName) => {
    if (!solderedBanks.includes(skillName)) {
      triggerHaptic();
      setSolderedBanks(prev => [...prev, skillName]);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isBooting ? (
        <BootSequence key="bootloader" onComplete={() => setIsBooting(false)} />
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`portfolio-container ${isOverclocked ? 'overclocked' : ''} ${isLightMode ? 'light-mode' : ''}`} 
          ref={containerRef}
        >
          {/* Global Generative Background */}
          <AutoRouterBackground />
          <OscilloscopeTrail />
          <motion.div className={`custom-cursor hidden-mobile ${isZapping ? 'zapping' : ''}`} style={{ left: cursorXSpring, top: cursorYSpring }} />

          <AnimatePresence>
            {bug.active && (
              <motion.div className={`jtag-bug ${zappedBugId === bug.id ? 'zapped' : ''}`} initial={{ opacity: 0, scale: 0 }}
                animate={
                  zappedBugId === bug.id 
                    ? { opacity: 0, scale: 1.5, filter: 'blur(4px)', backgroundColor: '#ffffff' }
                    : { opacity: 1, scale: 1, x: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0], y: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0] }
                }
                exit={{ opacity: 0, scale: 0 }} transition={zappedBugId === bug.id ? { duration: 0.4 } : { duration: 4.5, ease: "linear" }}
                style={{ left: bug.x, top: bug.y }} onClick={catchBug} whileHover={zappedBugId === bug.id ? {} : { scale: 1.1 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: zappedBugId === bug.id ? 0 : 1 }}>
                  <path d="M22 11.5l-4-4"></path><path d="M2 11.5l4-4"></path><path d="M20 18l-3-1"></path><path d="M4 18l3-1"></path><path d="M15 22v-3"></path><path d="M9 22v-3"></path><path d="M12 19v-9"></path>
                  <rect x="7" y="5" width="10" height="14" rx="4"></rect><path d="M9 5v-2a2 2 0 0 1 4 0v2"></path>
                </svg>
                <div className="target-ring"></div>
                {zappedBugId === bug.id && <div className="zap-flash"></div>}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {toast && (
              <motion.div className="toast-notification mono" initial={{ opacity: 0, y: 50, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }}>
                {toast}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CV Security Modal */}
          {showCvModal && (
            <div className="cv-modal-overlay">
              <motion.div className="cv-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div className="modal-header">
                  <h3 className="mono">Security Clearance</h3>
                  <button className="close-btn" onClick={() => { triggerHaptic(); setShowCvModal(false) }}>✕</button>
                </div>
                <p className="modal-sub">Close the circuit: <code>A AND B = 1</code></p>
                
                <div className="logic-circuit-board simplified">
                  <div className="inputs-col">
                    <div className="input-row">
                      <span className="mono">A</span><button className={`logic-switch ${logicInputs.a ? 'on' : 'off'}`} onClick={() => { triggerHaptic(); setLogicInputs({...logicInputs, a: logicInputs.a ? 0 : 1}) }}>{logicInputs.a}</button>
                    </div>
                    <div className="input-row">
                      <span className="mono">B</span><button className={`logic-switch ${logicInputs.b ? 'on' : 'off'}`} onClick={() => { triggerHaptic(); setLogicInputs({...logicInputs, b: logicInputs.b ? 0 : 1}) }}>{logicInputs.b}</button>
                    </div>
                  </div>
                  <div className="gates-col"><div className="logic-gate and-gate mono">AND</div></div>
                  <div className="output-col">
                    <div className={`status-led ${logicSolved ? 'granted' : 'denied'}`} /><span className="mono status-text">{logicSolved ? 'UNLOCKED' : 'LOCKED'}</span>
                  </div>
                  <svg className="circuit-wires" preserveAspectRatio="none">
                     <path d="M 60,30 L 120,30 L 120,50 L 150,50" stroke={logicInputs.a ? '#10b981' : '#475569'} />
                     <path d="M 60,90 L 120,90 L 120,70 L 150,70" stroke={logicInputs.b ? '#10b981' : '#475569'} />
                     <path d="M 220,60 L 260,60" stroke={logicSolved ? '#10b981' : '#ef4444'} />
                  </svg>
                </div>
              </motion.div>
            </div>
          )}

          {/* Navigation */}
          <motion.nav className="nav" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="logo"><span className="bracket">{'<'}</span><span className="name">Embedded.Dev</span><span className="bracket">{'/>'}</span></div>
            
            <div className="nav-instruments desktop-only">
              <div className="instrument-panel">
                <span className="uptime-label mono">PWR_ON</span><div className="segment-container"><span className="segment-text">{formatUptime(uptimeSeconds)}</span></div>
              </div>
              <div className="instrument-panel">
                <span className="uptime-label mono">BUGS_FIXED</span><div className="segment-container"><span className="segment-text bug-text">{bugsCaught.toString().padStart(3, '0')}</span></div>
              </div>
            </div>

            <div className="nav-actions">
              <div className="theme-switch" onClick={toggleTheme} title="Toggle Light/Dark Mode">
                <div className={`switch-track ${isLightMode ? 'light' : 'dark'}`}>
                  <div className={`switch-knob ${isLightMode ? 'right' : 'left'}`} />
                </div>
                <span className="theme-label mono">{isLightMode ? 'LGT' : 'DRK'}</span>
              </div>

              <div className="mobile-toggle" onClick={() => { triggerHaptic(); setIsMobileMenuOpen(true); }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
              
              <div className="nav-links desktop-only">
                {['Home', 'About', 'Experience', 'Skills', 'Lab', 'Contact'].map((item, i) => (
                  <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={() => setActiveSection(item.toLowerCase())}
                    className={activeSection === item.toLowerCase() ? 'active' : ''} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }}>
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.nav>

          {/* New Modern Mobile Drawer Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div className="mobile-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div className="mobile-side-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} onClick={(e) => e.stopPropagation()}>
                  <button className="close-menu-btn" onClick={() => { triggerHaptic(); setIsMobileMenuOpen(false); }}>✕</button>
                  <div className="mobile-menu-links">
                    {['Home', 'About', 'Experience', 'Skills', 'Lab', 'Contact'].map((item, i) => (
                      <a key={item} href={`#${item.toLowerCase()}`} onClick={() => { triggerHaptic(); setActiveSection(item.toLowerCase()); setIsMobileMenuOpen(false); }}
                         className={activeSection === item.toLowerCase() ? 'active mono' : 'mono'}>
                        {item}
                      </a>
                    ))}
                  </div>
                  <div className="mobile-menu-stats mono">
                    <div>PWR_ON: {formatUptime(uptimeSeconds)}</div>
                    <div style={{color: '#ef4444'}}>BUGS_FIXED: {bugsCaught}</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section */}
          <section className="hero" id="home">
            <motion.div className="hero-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
              <FloatingMCU />
              <div className="terminal-header mono"><span className="terminal-text">{terminalText}{showCursor && <span className="cursor">█</span>}</span></div>
              <h1>Firmware & Systems<br /><span className="highlight">Architect</span></h1>
              <p className="subtitle">Crafting robust low-level solutions.<br />Bridging bare-metal execution with high-level architecture.</p>
              <div className="cta-buttons">
                <motion.button className="btn-secondary" onClick={() => { triggerHaptic(); setShowCvModal(true) }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Download Datasheet</motion.button>
              </div>
            </motion.div>
          </section>

          {/* About Section */}
          <section className="about" id="about">
            <div className="about-content">
              <motion.div className="about-text" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2>System <span className="highlight">Overview</span></h2>
                <p>I am an <strong>Embedded Systems Developer</strong> specializing in bare-metal C programming, RTOS environments, and microcontroller architectures.</p>
                <p>I focus on building efficient, clean, and safe firmware solutions for IoT devices, automotive systems, and complex industrial automation.</p>
                <div className="expertise-tags mono">
                  {['Bare Metal', 'RTOS', 'ARM Cortex', 'STM32', 'I2C/SPI/UART', 'Power Optimization'].map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
              <motion.div className="system-monitor" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="monitor-header">
                  <span className="monitor-title mono">SYS_MONITOR</span>
                  <div>
                    <button className="overclock-btn mono" onClick={triggerOverclock}>[ OVR_CLK ]</button>
                    <span className="monitor-status mono" style={{ color: isOverclocked ? '#ef4444' : 'var(--accent-primary)' }}>● LIVE</span>
                  </div>
                </div>
                <div className="monitor-stats-grid mono">
                  <div className="stat-compact"><span className="stat-label">CPU</span><span className={`stat-value ${isOverclocked ? 'critical-text' : ''}`}>{cpuUsage}%</span><div className="stat-bar-bg"><motion.div className={`stat-bar cpu ${isOverclocked ? 'critical-bg' : ''}`} animate={{ width: `${cpuUsage}%` }} /></div></div>
                  <div className="stat-compact"><span className="stat-label">RAM</span><span className={`stat-value ${isOverclocked ? 'critical-text' : ''}`}>{memoryUsage}%</span><div className="stat-bar-bg"><motion.div className={`stat-bar memory ${isOverclocked ? 'critical-bg' : ''}`} animate={{ width: `${memoryUsage}%` }} /></div></div>
                  <div className="stat-compact"><span className="stat-label">TMP</span><span className={`stat-value ${isOverclocked ? 'critical-text' : ''}`}>{temperature}°C</span><div className="stat-bar-bg"><motion.div className={`stat-bar temp ${isOverclocked ? 'critical-bg' : ''}`} animate={{ width: `${(temperature/100)*100}%` }} /></div></div>
                </div>
                <div className={`monitor-logs mono ${isOverclocked ? 'critical-logs' : ''}`}>
                  {monitorLogs.map((log, i) => <div key={i}>{log}</div>)}
                </div>
              </motion.div>
            </div>
          </section>

          {/* HIGH DENSITY PCB EXPERIENCE TIMELINE */}
          <section className="experience" id="experience" ref={timelineRef}>
            <div className="section-header pcb-header">
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Signal <span className="highlight">Trace</span></motion.h2>
              <p className="section-sub mono pcb-silkscreen">REV 4.2 // HIGH_DENSITY.BRD</p>
            </div>

            <div className="timeline-container">
              <motion.div className="data-packet" animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
              <motion.div className="data-packet" animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }} />

              <div className="decorative-trace desktop-only" style={{ left: '25%', height: '100%', top: '0%' }}></div>
              <div className="decorative-trace desktop-only" style={{ left: '75%', height: '80%', top: '10%' }}></div>

              <PcbComponent type="ic-large" top="5%" left="15%" rotation={0} />
              <PcbComponent type="capacitor" top="8%" left="28%" rotation={90} />
              <PcbComponent type="capacitor" top="9%" left="28%" rotation={90} />
              <PcbComponent type="resistor" top="12%" left="18%" rotation={0} />
              <PcbComponent type="test-point" top="15%" left="82%" label="TP1" />
              <PcbComponent type="via-cluster" top="20%" left="75%" />
              <PcbComponent type="resistor" top="22%" left="80%" rotation={90} />
              <PcbComponent type="ic" top="30%" left="82%" rotation={90} />
              <PcbComponent type="resistor" top="36%" left="75%" rotation={45} />
              <PcbComponent type="capacitor" top="38%" left="88%" rotation={0} />
              <PcbComponent type="test-point" top="42%" left="18%" label="TP2" />
              <PcbComponent type="via-cluster" top="46%" left="22%" />
              <PcbComponent type="ic-large" top="55%" left="78%" rotation={90} />
              <PcbComponent type="capacitor" top="62%" left="72%" rotation={0} />
              <PcbComponent type="capacitor" top="64%" left="72%" rotation={0} />
              <PcbComponent type="resistor" top="68%" left="85%" rotation={0} />
              <PcbComponent type="test-point" top="75%" left="85%" label="TP3" />
              <PcbComponent type="resistor" top="80%" left="18%" rotation={45} />
              <PcbComponent type="ic" top="85%" left="22%" rotation={0} />
              <PcbComponent type="test-point" top="88%" left="15%" label="RX" />
              <PcbComponent type="test-point" top="90%" left="15%" label="TX" />
              <PcbComponent type="via-cluster" top="95%" left="80%" />
              <PcbComponent type="resistor" top="98%" left="75%" rotation={90} />

              <div className="pcb-main-trace-bg" />
              <motion.div className="pcb-main-trace-glow" style={{ height: traceHeight }} />
              
              {experienceData.map((item, i) => <TimelineItem key={i} item={item} index={i} total={experienceData.length} timelineScroll={timelineScroll} />)}
            </div>
          </section>

          {/* SKILLS MATRIX WITH SOLDER BRIDGES */}
          <section className="skills" id="skills">
            <div className="section-header">
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Technical <span className="highlight">Matrix</span></motion.h2>
              <p className="section-sub">{allBanksPowered ? 'All memory banks online.' : 'Solder the jumpers to initialize memory banks.'}</p>
            </div>

            <div className="skills-matrix">
              {skills.map((skill, i) => {
                const isPowered = solderedBanks.includes(skill.name);
                return (
                  <motion.div key={skill.name} className={`skill-node ${isPowered ? 'powered' : 'unpowered'}`} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    whileHover={isPowered ? { y: -4, borderColor: 'var(--accent-primary)', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.1)' } : {}}>
                    
                    <div className="card-top-bar">
                      <motion.div className="node-hex mono" animate={isPowered ? { color: ['var(--text-muted)', 'var(--accent-primary)', 'var(--text-muted)'] } : {}} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                        {skill.hex}
                      </motion.div>
                      <div className="solder-jumper" onClick={() => handleSolder(skill.name)} title="Click to bridge pad">
                        <span className="jumper-label mono">JP{i+1}</span>
                        <div className="jumper-pads">
                          <div className="solder-pad" />
                          <motion.div className="solder-blob" initial={{ scale: 0 }} animate={{ scale: isPowered ? 1 : 0 }} transition={{ type: "spring", stiffness: 300 }} />
                          <div className="solder-pad" />
                        </div>
                      </div>
                    </div>

                    <div className="node-info">
                      <span className="node-type mono">[{skill.type}]</span>
                      <h3 className="node-name">{skill.name}</h3>
                    </div>
                    <motion.div className="data-flow-line" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* HARDWARE LAB (GAMES) SECTION */}
          <section className="lab" id="lab">
            <div className="section-header">
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Hardware <span className="highlight">Lab</span></motion.h2>
              <p className="section-sub">Diagnostic tools and topology mapping.</p>
            </div>

            <div className="lab-grid">
              {/* Game 1: Logic Analyzer (Full Width) */}
              <motion.div className="game-container lab-box full-width" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="lab-box-header mono">Logic Analyzer</div>
                <div className="game-info mono">
                  <div className="game-stat"><span className="stat-label">Target (DEC)</span><span className="stat-number">{targetValue}</span></div>
                  <div className="game-stat separator">|</div>
                  <div className="game-stat"><span className="stat-label">Current</span><span className="stat-number">{parseInt(binaryBits.join(''), 2)}</span></div>
                  <div className="game-stat score-board"><span className="stat-label">Score</span><span className="stat-number highlight">{score}</span></div>
                </div>
                <div className="game-message mono">{gameMessage}</div>
                <div className="binary-display">
                  {binaryBits.map((bit, index) => (
                    <motion.div key={index} className={`bit ${bit === 1 ? 'active' : ''}`} onClick={() => flipBit(index)}
                      whileHover={{ y: -2, borderColor: 'var(--accent-primary)' }} whileTap={{ scale: 0.95 }}
                      animate={{ backgroundColor: bit === 1 ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-main)', color: bit === 1 ? 'var(--accent-primary)' : 'var(--text-muted)', borderColor: bit === 1 ? 'var(--accent-primary)' : 'var(--border-color)' }}>
                      <div className="bit-value mono">{bit}</div>
                      <div className="bit-power mono">2^{7 - index}</div>
                    </motion.div>
                  ))}
                </div>
                <button className="btn-secondary reset-button mono" onClick={resetGame}>[ RESET_BUS ]</button>
              </motion.div>

              {/* Game 2: Oscilloscope */}
              <motion.div className="lab-box" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="lab-box-header mono">Digital Oscilloscope</div>
                <OscilloscopeGame triggerHaptic={triggerHaptic} />
              </motion.div>

              {/* Game 3: Neural Net Graph */}
              <motion.div className="lab-box" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="lab-box-header mono">System Topology Graph</div>
                <NeuralNetGame triggerHaptic={triggerHaptic} />
              </motion.div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section className="contact" id="contact">
            <div className="section-header">
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Init <span className="highlight">Connection</span></motion.h2>
            </div>
            <div className="contact-links">
              {['GitHub', 'LinkedIn', 'Email'].map((link, i) => (
                <motion.a key={link} href="#" className="contact-btn pcb-pad mono" whileHover="hover" whileTap={{ scale: 0.95 }} onClick={triggerHaptic}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="led-container">
                    <motion.span className="tx-rx-led" variants={{ hover: { opacity: [0, 1, 0, 1, 1, 0], backgroundColor: ['var(--accent-primary)', '#fbbf24', 'var(--accent-primary)'] } }} transition={{ duration: 0.3, repeat: Infinity }} />
                  </div>
                  <span className="btn-text">{link}</span>
                  <div className="pad-trace left-trace"></div>
                  <div className="pad-trace right-trace"></div>
                </motion.a>
              ))}
            </div>
          </section>

          <style jsx>{`
            /* --- GLOBAL CSS VARIABLES --- */
            :root {
              /* Default Dark Theme */
              --bg-main: #1e293b; 
              --bg-card: #334155; 
              --border-color: #475569; 
              --text-main: #f8fafc; 
              --text-muted: #cbd5e1; 
              --accent-primary: #10b981; 
              --accent-secondary: #0ea5e9; 
              --pcb-board: #1c2738; 
              --pcb-trace-copper: #fbbf24; 
              --pcb-trace-glow: rgba(251, 191, 36, 0.6);
              --pcb-trace-silver: #64748b; 
              --pcb-silkscreen: #e2e8f0;
              
              --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
              --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
            }

            /* --- LIGHT THEME OVERRIDES --- */
            .portfolio-container.light-mode {
              --bg-main: #f8fafc; 
              --bg-card: #ffffff; 
              --border-color: #cbd5e1; 
              --text-main: #0f172a; 
              --text-muted: #475569; 
              --accent-primary: #059669; 
              --accent-secondary: #0284c7; 
              --pcb-board: #e2e8f0; 
              --pcb-trace-copper: #d97706; 
              --pcb-trace-glow: rgba(217, 119, 6, 0.5);
              --pcb-trace-silver: #94a3b8; 
              --pcb-silkscreen: #334155;
            }

            * { margin: 0; padding: 0; box-sizing: border-box; }
            html { scroll-behavior: smooth; }
            .portfolio-container { background: var(--bg-main); color: var(--text-main); font-family: var(--font-sans); overflow-x: hidden; line-height: 1.6; transition: background 0.4s ease, color 0.4s ease; position: relative; min-height: 100vh;}
            
            .portfolio-container.overclocked { animation: overclockShake 0.4s infinite; }
            @keyframes overclockShake { 0% { transform: translate(1px, 1px) rotate(0deg); } 25% { transform: translate(-1px, -2px) rotate(-1deg); } 50% { transform: translate(-3px, 0px) rotate(1deg); } 75% { transform: translate(3px, 2px) rotate(0deg); } 100% { transform: translate(1px, -1px) rotate(0deg); } }

            .mono { font-family: var(--font-mono); }
            section { padding: 6rem 5%; position: relative; z-index: 2; }
            .section-header { text-align: center; margin-bottom: 4rem; }
            .section-header h2 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); letter-spacing: -0.02em; }
            .section-sub { color: var(--text-muted); font-size: 1.1rem; margin-top: 0.5rem; }

            /* PRELOADER */
            .boot-sequence { height: 100vh; width: 100vw; background: #020617; color: #10b981; padding: 2rem; display: flex; flex-direction: column; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 99999; }
            .crt-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px); pointer-events: none; z-index: 2; }
            .boot-content { z-index: 1; text-shadow: 0 0 5px rgba(16, 185, 129, 0.6); }
            .boot-log { font-size: 1rem; line-height: 1.4; margin-bottom: 2px; }
            .boot-sequence .cursor { display: inline-block; margin-top: 2px; width: 10px; height: 1.2em; background: #10b981; vertical-align: bottom; }
            .boot-sequence .cursor.blinking { animation: blink 1s infinite; }

            /* GENERATIVE BACKGROUND */
            .auto-router-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; }
            .osc-trail-canvas { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 1; }

            /* CURSOR & ZAP */
            .custom-cursor { position: fixed; width: 20px; height: 20px; border: 2px solid var(--accent-primary); border-radius: 50%; pointer-events: none; z-index: 10000; transform: translate(-50%, -50%); transition: background 0.2s, border-color 0.2s, transform 0.1s; mix-blend-mode: difference; }
            .custom-cursor.zapping { border-color: #ef4444; background: rgba(239, 68, 68, 0.4); transform: translate(-50%, -50%) scale(1.5); box-shadow: 0 0 20px #ef4444; mix-blend-mode: normal; }

            /* JTAG BUG */
            .jtag-bug { position: fixed; z-index: 9998; cursor: crosshair; user-select: none; filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.8)); display: flex; align-items: center; justify-content: center; border-radius: 50%; }
            .target-ring { position: absolute; width: 60px; height: 60px; border: 2px dashed rgba(239, 68, 68, 0); border-radius: 50%; transition: 0.3s; pointer-events: none; }
            .jtag-bug:hover .target-ring { border-color: rgba(239, 68, 68, 0.8); animation: spinTarget 4s linear infinite; }
            @keyframes spinTarget { 100% { transform: rotate(360deg); } }
            .zap-flash { position: absolute; width: 100%; height: 100%; background: radial-gradient(circle, #fff 20%, #fbbf24 60%, transparent 100%); border-radius: 50%; mix-blend-mode: overlay; pointer-events: none; }
            .toast-notification { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: var(--bg-card); border: 1px solid var(--accent-primary); color: var(--accent-primary); padding: 1rem 2rem; border-radius: 8px; z-index: 9999; box-shadow: 0 10px 25px rgba(0,0,0,0.5); font-size: 0.85rem; }

            /* 3D MCU */
            .mcu-scene { perspective: 800px; display: flex; justify-content: center; margin-bottom: 2rem; }
            .mcu-3d-container { width: 100px; height: 100px; transform-style: preserve-3d; }
            .mcu-gyro-wrapper { display: flex; align-items: center; justify-content: center; }
            .mcu-3d-body { width: 100%; height: 100%; background: #0f172a; border-radius: 6px; border: 2px solid var(--border-color); position: relative; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px #000, 10px 20px 30px rgba(0,0,0,0.6); }
            .mcu-logo { font-size: 1.2rem; font-weight: 800; color: #64748b; letter-spacing: 2px; text-shadow: -1px -1px 0 #000; }
            .mcu-dot { position: absolute; bottom: 8px; left: 8px; width: 6px; height: 6px; background: #334155; border-radius: 50%; box-shadow: inset 1px 1px 3px #000; }
            .mcu-pins-h { position: absolute; width: 80%; height: 10px; left: 10%; background-image: repeating-linear-gradient(90deg, transparent, transparent 4px, silver 4px, silver 8px); }
            .mcu-pins-h.top { top: -10px; }
            .mcu-pins-h.bottom { bottom: -10px; }
            .mcu-pins-v { position: absolute; height: 80%; width: 10px; top: 10%; background-image: repeating-linear-gradient(0deg, transparent, transparent 4px, silver 4px, silver 8px); }
            .mcu-pins-v.left { left: -10px; }
            .mcu-pins-v.right { right: -10px; }

            /* CV MODAL */
            .cv-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 9999; }
            .cv-modal { background: var(--bg-card); border: 1px solid var(--border-color); padding: 2rem; border-radius: 12px; max-width: 400px; width: 90%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); position: relative; }
            .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
            .modal-header h3 { color: var(--accent-secondary); font-size: 1.2rem; }
            .close-btn { background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; }
            .modal-sub { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; text-align: center; }
            .logic-circuit-board.simplified { position: relative; background: var(--bg-main); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; min-height: 150px; }
            .circuit-wires { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
            .circuit-wires path { fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.3s ease; }
            .inputs-col, .gates-col, .output-col { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 1rem; }
            .input-row { display: flex; align-items: center; gap: 0.5rem; }
            .logic-switch { width: 36px; height: 36px; border-radius: 4px; font-family: var(--font-mono); font-weight: bold; cursor: pointer; border: 2px solid; transition: all 0.2s; background: var(--bg-card); color: var(--text-muted); border-color: var(--border-color); }
            .logic-switch.on { background: rgba(16, 185, 129, 0.1); border-color: var(--accent-primary); color: var(--accent-primary); box-shadow: 0 0 10px rgba(16, 185, 129, 0.2); }
            .gates-col { justify-content: center; }
            .logic-gate { background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.8rem 1rem; border-radius: 4px; font-size: 0.8rem; color: var(--text-muted); letter-spacing: 2px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .output-col { align-items: center; gap: 0.5rem; }
            .status-led { width: 24px; height: 24px; border-radius: 50%; border: 3px solid var(--bg-card); transition: all 0.3s ease; }
            .status-led.denied { background: #ef4444; box-shadow: inset 0 0 5px rgba(0,0,0,0.5), 0 0 15px rgba(239, 68, 68, 0.5); }
            .status-led.granted { background: var(--accent-primary); box-shadow: inset 0 0 5px rgba(0,0,0,0.5), 0 0 20px rgba(16, 185, 129, 0.8); }
            .status-text { font-size: 0.7rem; color: var(--text-muted); }

            /* NAVBAR */
            .nav { position: fixed; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 5%; background: var(--bg-main); opacity: 0.95; backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-color); z-index: 1000; transition: background 0.4s ease; }
            .logo { font-size: 1.2rem; font-weight: 800; font-family: var(--font-mono); color: var(--text-main); }
            .bracket { color: var(--accent-primary); }
            
            .nav-actions { display: flex; align-items: center; gap: 2rem; }
            .nav-links { display: flex; gap: 2rem; }
            .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color 0.2s; }
            .nav-links a:hover, .nav-links a.active { color: var(--accent-primary); }
            .mobile-toggle { display: none; cursor: pointer; }
            
            .nav-instruments { display: flex; gap: 1.5rem; margin-right: auto; margin-left: 3rem; }
            .instrument-panel { display: flex; align-items: center; gap: 0.8rem; background: var(--bg-card); padding: 0.3rem 0.8rem; border-radius: 4px; border: 1px solid var(--border-color); box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
            .uptime-label { font-size: 0.6rem; color: var(--text-muted); letter-spacing: 1px; }
            .segment-container { display: flex; align-items: center; }
            .segment-text { font-size: 1rem; color: var(--accent-primary); letter-spacing: 2px; text-shadow: 0 0 5px rgba(16, 185, 129, 0.3); font-weight: bold; }
            .bug-text { color: #ef4444; text-shadow: 0 0 5px rgba(239, 68, 68, 0.3); }

            .theme-switch { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; user-select: none; }
            .switch-track { width: 40px; height: 20px; border-radius: 10px; background: #0f172a; position: relative; border: 2px solid var(--border-color); transition: background 0.3s; }
            .switch-track.light { background: #e2e8f0; }
            .switch-knob { width: 14px; height: 14px; background: #fbbf24; border-radius: 50%; position: absolute; top: 1px; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .switch-knob.left { transform: translateX(2px); background: #94a3b8; }
            .switch-knob.right { transform: translateX(20px); background: #fbbf24; box-shadow: 0 0 5px #fbbf24; }
            .theme-label { font-size: 0.7rem; color: var(--text-muted); font-weight: bold; }

            /* HERO */
            .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; }
            .terminal-header { color: var(--accent-primary); margin-bottom: 1.5rem; font-size: 0.9rem; }
            .cursor { animation: blink 1s infinite; color: var(--accent-primary); }
            .cursor.hidden { opacity: 0; animation: none; }
            @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
            h1 { font-size: 4.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
            .highlight { background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .hero .subtitle { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto; }
            .cta-buttons { display: flex; gap: 1rem; justify-content: center; }
            .btn-secondary { background: var(--bg-card); border: 1px solid var(--accent-primary); color: var(--accent-primary); padding: 0.85rem 2rem; font-size: 1rem; font-weight: 600; border-radius: 4px; cursor: pointer; font-family: var(--font-sans); transition: all 0.2s; }
            .btn-secondary:hover { background: rgba(16, 185, 129, 0.1); }

            /* ABOUT */
            .about-content { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center; max-width: 1100px; margin: 0 auto; }
            .about-text h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1.5rem; }
            .about-text p { color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.2rem; }
            .about-text strong { color: var(--text-main); font-weight: 600; }
            .expertise-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 2rem; }
            .tag { padding: 0.4rem 0.8rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 4px; font-size: 0.75rem; color: var(--accent-primary); }
            .system-monitor { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
            .monitor-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; font-size: 0.8rem; }
            .monitor-title { color: var(--text-muted); }
            .overclock-btn { background: none; border: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 4px; cursor: pointer; margin-right: 10px; transition: all 0.2s; }
            .overclock-btn:hover { border-color: #ef4444; color: #ef4444; background: rgba(239, 68, 68, 0.1); }
            .monitor-status { animation: pulse 2s infinite; }
            .stat-compact { display: grid; grid-template-columns: 40px 45px 1fr; align-items: center; gap: 1rem; margin-bottom: 1rem; font-size: 0.8rem; }
            .stat-label { color: var(--text-muted); }
            .stat-value { color: var(--text-main); text-align: right; }
            .stat-bar-bg { height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden; }
            .stat-bar { height: 100%; border-radius: 2px; transition: background 0.3s; }
            .stat-bar.cpu { background: var(--accent-secondary); }
            .stat-bar.memory { background: var(--accent-primary); }
            .stat-bar.temp { background: #fbbf24; }
            .critical-text { color: #ef4444 !important; font-weight: bold; }
            .critical-bg { background: #ef4444 !important; }
            .monitor-logs { background: var(--bg-main); padding: 1rem; border-radius: 4px; color: var(--text-muted); font-size: 0.75rem; line-height: 1.8; margin-top: 1rem; border: 1px solid var(--border-color); transition: border-color 0.3s, color 0.3s; }
            .critical-logs { border-color: #ef4444; color: #ef4444; background: rgba(239, 68, 68, 0.05); }

            /* EXPERIENCE */
            .experience { background-color: var(--pcb-board); background-image: radial-gradient(rgba(128,128,128,0.1) 1px, transparent 1px); background-size: 20px 20px; padding-top: 8rem; padding-bottom: 8rem; border-top: 4px solid var(--border-color); border-bottom: 4px solid var(--border-color); overflow: hidden; transition: background-color 0.4s ease; }
            .pcb-silkscreen { color: var(--pcb-silkscreen); opacity: 0.8; font-weight: bold; letter-spacing: 0.1em; }
            .timeline-container { position: relative; max-width: 1000px; margin: 0 auto; padding: 2rem 0; }
            
            .pcb-main-trace-bg { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 4px; height: 100%; background: var(--pcb-trace-silver); border-radius: 2px; }
            .pcb-main-trace-glow { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 4px; background: var(--pcb-trace-copper); box-shadow: 0 0 10px var(--pcb-trace-glow), 0 0 20px var(--pcb-trace-glow); border-radius: 2px; transform-origin: top; z-index: 1; }
            .data-packet { position: absolute; left: 50%; transform: translateX(-50%); width: 10px; height: 20px; background: #fff; box-shadow: 0 0 15px #fff, 0 0 30px var(--accent-primary); border-radius: 10px; z-index: 6; }
            .portfolio-container.overclocked .pcb-main-trace-glow { background: #ef4444; box-shadow: 0 0 15px #ef4444, 0 0 30px #ef4444; }

            .decorative-trace { position: absolute; width: 1px; background: var(--pcb-trace-silver); opacity: 0.3; }
            .timeline-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6rem; position: relative; }
            .timeline-content { width: 42%; position: relative; z-index: 4; }
            .timeline-center { width: 16%; display: flex; justify-content: center; position: relative; z-index: 5; }
            .branch-trace { position: absolute; top: 50%; transform: translateY(-50%); width: 100px; height: 50px; z-index: 2; overflow: visible; }
            .branch-left { right: 50%; }
            .branch-right { left: 50%; }
            .pcb-via { width: 26px; height: 26px; border-radius: 50%; border: 4px solid; display: flex; align-items: center; justify-content: center; transition: all 0.4s ease; background: var(--bg-main); }
            .via-hole { width: 10px; height: 10px; border-radius: 50%; background: #000; box-shadow: inset 0 2px 4px rgba(0,0,0,0.8); }
            .portfolio-container.light-mode .via-hole { background: var(--bg-main); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2); }
            .pcb-card { background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); padding: 2rem; border-radius: 8px; text-align: left; box-shadow: 0 10px 30px rgba(0,0,0,0.05); position: relative; }
            .timeline-year { font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-primary); margin-bottom: 0.75rem; display: block; font-weight: 700; }
            .pcb-card h3 { font-size: 1.25rem; margin-bottom: 0.25rem; font-weight: 700; color: var(--text-main); }
            .pcb-card p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem; }
            .pcb-card .node-type { display: inline-block; padding: 0.25rem 0.6rem; background: var(--bg-main); font-family: var(--font-mono); font-size: 0.7rem; border-radius: 2px; color: var(--text-muted); border: 1px solid var(--border-color); }

            /* SMD COMPONENTS */
            .smd-comp { z-index: 1; }
            .smd-ic { position: absolute; width: 36px; height: 36px; background: #0f172a; border-radius: 2px; border: 1px solid #1e293b; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
            .smd-ic.large { width: 50px; height: 50px; }
            .ic-body { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; }
            .ic-dot { position: absolute; bottom: 4px; left: 4px; width: 4px; height: 4px; background: #334155; border-radius: 50%; }
            .ic-label { font-size: 10px; color: #64748b; font-weight: bold; font-family: sans-serif; }
            .ic-pins { position: absolute; display: flex; justify-content: space-around; }
            .ic-pins.top { top: -4px; width: 100%; flex-direction: row; }
            .ic-pins.bottom { bottom: -4px; width: 100%; flex-direction: row; }
            .ic-pins.side { top: 0; height: 100%; flex-direction: column; }
            .ic-pins.left { left: -4px; }
            .ic-pins.right { right: -4px; }
            .pin { width: 3px; height: 3px; background: silver; border-radius: 1px; }
            .side .pin { width: 4px; height: 2px; }
            .smd-resistor { position: absolute; width: 18px; height: 8px; background: #0f172a; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .res-pad { width: 3px; height: 8px; background: silver; }
            .res-body { color: #64748b; font-size: 5px; font-family: monospace; }
            .smd-capacitor { position: absolute; width: 16px; height: 10px; background: #a16207; display: flex; align-items: center; justify-content: space-between; border-radius: 1px; }
            .cap-pad { width: 3px; height: 10px; background: silver; }
            .test-point { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 2px; }
            .tp-ring { width: 14px; height: 14px; border-radius: 50%; border: 3px solid var(--pcb-trace-copper); background: var(--bg-card); display: flex; align-items: center; justify-content: center; }
            .tp-hole { width: 4px; height: 4px; border-radius: 50%; background: #000; }
            .portfolio-container.light-mode .tp-hole { background: var(--bg-main); }
            .tp-label { font-size: 10px; color: var(--pcb-silkscreen); opacity: 0.8; }
            .via-cluster { position: absolute; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
            .tiny-via { width: 10px; height: 10px; border-radius: 50%; background: var(--pcb-trace-silver); display: flex; align-items: center; justify-content: center; }
            .tiny-hole { width: 4px; height: 4px; border-radius: 50%; background: var(--pcb-board); }

            /* SKILLS MATRIX & SOLDER BRIDGES */
            .skills { background: var(--bg-main); }
            .skills-matrix { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; margin-bottom: 4rem; }
            .skill-node { background: var(--bg-card); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 8px; display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden; transition: all 0.4s ease; }
            
            .card-top-bar { display: flex; justify-content: space-between; width: 100%; align-items: flex-start; z-index: 2; }
            .solder-jumper { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: crosshair; padding: 5px; border-radius: 4px; transition: background 0.2s;}
            .solder-jumper:hover { background: rgba(16, 185, 129, 0.05); }
            .jumper-label { font-size: 0.55rem; color: var(--text-muted); }
            .jumper-pads { display: flex; gap: 2px; position: relative; width: 24px; height: 14px; justify-content: center; }
            .solder-pad { width: 10px; height: 14px; background: var(--pcb-trace-copper); border-radius: 2px; border: 1px solid rgba(0,0,0,0.2); }
            .solder-blob { position: absolute; width: 18px; height: 12px; background: #cbd5e1; border-radius: 8px; top: 1px; box-shadow: inset 0 2px 4px #fff, 0 2px 4px rgba(0,0,0,0.3); z-index: 2; pointer-events: none; }

            .skill-node.unpowered { opacity: 0.5; filter: grayscale(80%); border-color: var(--border-color); }
            .skill-node.unpowered .node-hex { color: var(--text-muted) !important; animation: none !important; }
            .skill-node.unpowered .data-flow-line { display: none; }
            .skill-node.powered { opacity: 1; filter: grayscale(0%); }

            .node-hex { font-size: 0.75rem; background: var(--bg-main); font-weight: 700; padding: 0.4rem 0.6rem; border-radius: 4px; color: var(--text-muted); border: 1px solid var(--border-color); width: fit-content; }
            .node-info { display: flex; flex-direction: column; z-index: 1; width: 100%; }
            .node-type { font-size: 0.7rem; color: var(--accent-primary); margin-bottom: 0.2rem; }
            .node-name { font-size: 1.1rem; font-weight: 700; color: var(--text-main); }
            .data-flow-line { position: absolute; bottom: 0; left: 0; height: 2px; width: 100%; background: linear-gradient(90deg, transparent, var(--accent-primary), transparent); opacity: 0; transition: opacity 0.3s; }
            .skill-node.powered:hover .data-flow-line { opacity: 1; }

            /* --- HARDWARE LAB --- */
            .lab { background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
            .lab-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; max-width: 1100px; margin: 0 auto; }
            .lab-box { background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
            .lab-box.full-width { grid-column: 1 / -1; }
            .lab-box-header { color: var(--accent-secondary); font-size: 0.8rem; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;}
            
            .game-info { display: flex; justify-content: center; align-items: center; gap: 2.5rem; background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid var(--border-color); }
            .game-stat { display: flex; flex-direction: column; }
            .separator { font-size: 2rem; color: var(--border-color); font-weight: 300; }
            .stat-label { font-size: 0.75rem; color: var(--text-muted); }
            .stat-number { font-size: 2.5rem; font-weight: 800; color: var(--text-main); line-height: 1; margin-top: 0.5rem; }
            .score-board .stat-number { color: var(--accent-primary); }
            .game-message { color: var(--accent-secondary); font-size: 1rem; min-height: 1.5rem; margin-bottom: 2rem; text-align: center; }
            .binary-display { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
            .bit { width: 55px; height: 80px; border: 2px solid var(--border-color); border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: var(--bg-card); transition: all 0.2s; }
            .bit-value { font-size: 1.75rem; font-weight: 700; color: var(--text-muted); }
            .bit-power { font-size: 0.65rem; margin-top: 5px; color: var(--text-muted); opacity: 0.7; }
            .reset-button { font-size: 0.8rem; padding: 0.6rem 1.2rem; display: block; margin: 0 auto; }

            .osc-container { display: flex; flex-direction: column; gap: 1.5rem; flex-grow: 1; }
            .osc-screen-wrapper { position: relative; background: #020617; border: 2px solid #334155; border-radius: 8px; overflow: hidden; padding: 10px; box-shadow: inset 0 0 20px rgba(0,0,0,1); }
            .portfolio-container.light-mode .osc-screen-wrapper { border-color: #94a3b8; }
            .osc-warning { position: absolute; top: 20px; right: 20px; color: #ef4444; font-size: 0.8rem; font-weight: bold; text-shadow: 0 0 5px #ef4444; animation: blink 1s infinite; }
            .osc-synced { position: absolute; top: 20px; right: 20px; color: #10b981; font-size: 0.8rem; font-weight: bold; text-shadow: 0 0 5px #10b981; }
            .osc-decode-overlay { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(15, 23, 42, 0.8); border: 1px solid #10b981; color: #10b981; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.8rem; text-align: center; box-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }
            .osc-controls { display: flex; justify-content: center; gap: 3rem; background: var(--bg-card); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color); }
            .osc-knob-group { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 100%; max-width: 150px; }
            .osc-knob-group label { font-size: 0.7rem; color: var(--text-muted); }
            .osc-slider { width: 100%; cursor: ew-resize; accent-color: var(--accent-primary); }

            /* --- CONTACT --- */
            .contact { text-align: center; border-top: 1px solid var(--border-color); padding-bottom: 6rem;}
            .contact-links { display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
            .contact-btn { position: relative; width: 160px; display: flex; justify-content: center; align-items: center; background: var(--bg-card); border: 2px solid var(--border-color); height: 50px; border-radius: 4px; text-decoration: none; font-size: 0.9rem; color: var(--text-muted); transition: all 0.2s; overflow: hidden; }
            .contact-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: rgba(16, 185, 129, 0.05); }
            .led-container { position: absolute; top: 8px; left: 10px; width: 8px; height: 8px; }
            .tx-rx-led { display: block; width: 6px; height: 6px; border-radius: 50%; background-color: var(--text-muted); opacity: 0; box-shadow: 0 0 5px currentColor; }
            .portfolio-container.overclocked .tx-rx-led { background-color: #ef4444 !important; opacity: 1; animation: none !important; }
            .pad-trace { position: absolute; top: 50%; width: 15px; height: 2px; background: var(--border-color); transition: background 0.3s; }
            .contact-btn:hover .pad-trace { background: var(--accent-primary); box-shadow: 0 0 5px var(--accent-primary); }
            .left-trace { left: 0; transform: translateY(-50%); }
            .right-trace { right: 0; transform: translateY(-50%); }

            /* --- MOBILE --- */
            .mobile-visible { display: none; }

            .mobile-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); z-index: 10000; display: flex; justify-content: flex-end; }
            .mobile-side-drawer { width: 280px; height: 100%; background: var(--bg-main); border-left: 2px solid var(--accent-primary); box-shadow: -10px 0 30px rgba(0,0,0,0.5); display: flex; flex-direction: column; padding: 4rem 2rem 2rem 2rem; position: relative; }
            .portfolio-container.light-mode .mobile-side-drawer { background: var(--bg-card); }
            .close-menu-btn { position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--text-muted); font-size: 1.8rem; cursor: pointer; }
            .mobile-menu-links { display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 100%; }
            .mobile-menu-links a { color: var(--text-main); font-size: 1.2rem; text-decoration: none; padding: 0.8rem 1rem; width: 100%; border-radius: 6px; border: 1px solid transparent; transition: 0.2s; text-align: left; }
            .mobile-menu-links a.active { color: var(--accent-primary); border-color: var(--accent-primary); background: rgba(16, 185, 129, 0.1); }
            .mobile-menu-links a:active { transform: translateX(5px); }
            .mobile-menu-stats { margin-top: auto; color: var(--text-muted); font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem; }

            @media (max-width: 800px) {
              .hidden-mobile { display: none !important; }
              .desktop-only { display: none !important; }
              .mobile-toggle { display: block; z-index: 1001; cursor: pointer; }
              
              h1 { font-size: 3rem; }
              .hero { padding-top: 6rem; }
              .cta-buttons { flex-direction: column; }
              .about-content { grid-template-columns: 1fr; gap: 3rem; }
              .game-info { flex-direction: column; gap: 1rem; }
              .separator { display: none; }
              .bit { width: 45px; height: 65px; }

              .logic-circuit-board { flex-direction: column; gap: 2rem; }
              .circuit-wires { display: none; }
              .gates-col { margin-left: 0; flex-direction: row; }

              .lab-grid { grid-template-columns: 1fr; }
              .lab-box.full-width { grid-column: auto; }
              .osc-controls { flex-direction: column; gap: 1.5rem; align-items: center;}

              /* Timeline mobile adjustments */
              .pcb-main-trace-bg, .pcb-main-trace-glow, .data-packet { left: 30px; }
              .timeline-row { flex-direction: column; align-items: flex-start; margin-bottom: 2.5rem; }
              .timeline-center { position: absolute; left: 17px; top: 0; width: 26px; height: 100%; }
              .branch-trace { display: none; }
              .timeline-content.left-content, .timeline-content.right-content { width: 100%; padding-left: 70px; }
              .pcb-card { padding: 1.5rem; }
              
              /* Handle SMDs on mobile */
              .mobile-visible { display: flex !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Portfolio;