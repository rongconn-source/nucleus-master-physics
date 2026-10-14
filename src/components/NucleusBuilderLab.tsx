import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  KNOWN_ISOTOPES,
  PHYSICAL_CONSTANTS,
  analyzeNuclide,
  getElementInfo,
} from '../data/nuclearData';
import { MathFormula } from './MathFormula';
import {
  Atom,
  Plus,
  Minus,
  Zap,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Eye,
} from 'lucide-react';

interface EmittedParticle {
  id: number;
  type: 'alpha' | 'beta-' | 'beta+' | 'neutrino';
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  label: string;
  color: string;
  trail: { x: number; y: number }[];
}

interface DraggedNucleon {
  type: 'proton' | 'neutron';
  x: number;
  y: number;
  fromNucleus: boolean;
}

function getBucketLayout(width: number, height: number) {
  const bucketY = height - 42;
  const bucketH = 50;
  const bucketW = Math.min(204, Math.max(142, (width - 48) * 0.44));
  const gap = Math.min(36, Math.max(14, width * 0.05));
  const pBucketX = width / 2 - gap / 2 - bucketW / 2;
  const nBucketX = width / 2 + gap / 2 + bucketW / 2;
  return { bucketY, bucketW, bucketH, pBucketX, nBucketX };
}

export const NucleusBuilderLab: React.FC = () => {
  const [Z, setZ] = useState<number>(6);
  const [N, setN] = useState<number>(8); // Default Carbon-14
  const [showElectronCloud, setShowElectronCloud] = useState<boolean>(true);
  const [showForceField, setShowForceField] = useState<boolean>(true);
  const [lastDecayEquation, setLastDecayEquation] = useState<string | null>(null);
  const [decayNotice, setDecayNotice] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const emittedParticlesRef = useRef<EmittedParticle[]>([]);
  const recoilRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });
  const flashAlphaRef = useRef<number>(0);
  const draggedRef = useRef<DraggedNucleon | null>(null);
  const stateRef = useRef({ Z, N, showElectronCloud, showForceField });

  const nuclide = analyzeNuclide(Z, N);

  useEffect(() => {
    stateRef.current = { Z, N, showElectronCloud, showForceField };
  }, [Z, N, showElectronCloud, showForceField]);

  const triggerAlphaDecay = useCallback(() => {
    if (Z < 2 || N < 2) {
      setDecayNotice('Hạt nhân cần có ít nhất 2 Proton và 2 Neutron để phát xạ hạt α (⁴₂He).');
      return;
    }
    const parentElem = getElementInfo(Z);
    const daughterElem = getElementInfo(Z - 2);
    const parentA = Z + N;
    const daughterA = parentA - 4;

    setLastDecayEquation(
      `{}^{${parentA}}_{${Z}}\\text{${parentElem.symbol}} \\rightarrow {}^{4}_{2}\\text{He} + {}^{${daughterA}}_{${Z - 2}}\\text{${daughterElem.symbol}}`
    );
    setDecayNotice(
      `Phóng xạ α: Hạt nhân mẹ phát ra hạt nhân ⁴₂He bay với tốc độ ~ 2.10⁷ m/s, hạt nhân con lùi về 2 ô trong bảng tuần hoàn.`
    );

    const angle = -Math.PI / 5 + (Math.random() - 0.5) * 0.4;
    const speed = 5.2;
    emittedParticlesRef.current.push({
      id: Date.now() + Math.random(),
      type: 'alpha',
      x: 0,
      y: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      radius: 18,
      label: 'α (⁴₂He)',
      color: '#F59E0B',
      trail: [],
    });

    recoilRef.current.vx = -Math.cos(angle) * 3.8;
    recoilRef.current.vy = -Math.sin(angle) * 3.8;
    flashAlphaRef.current = 0.85;

    setZ((prev) => Math.max(0, prev - 2));
    setN((prev) => Math.max(0, prev - 2));
  }, [Z, N]);

  const triggerBetaMinusDecay = useCallback(() => {
    if (N < 1) {
      setDecayNotice('Hạt nhân cần có ít nhất 1 Neutron để thực hiện phân rã β⁻ (n → p + e⁻ + ν̃_e).');
      return;
    }
    const parentElem = getElementInfo(Z);
    const daughterElem = getElementInfo(Z + 1);
    const A = Z + N;

    setLastDecayEquation(
      `{}^{${A}}_{${Z}}\\text{${parentElem.symbol}} \\rightarrow {}^{0}_{-1}e + {}^{${A}}_{${Z + 1}}\\text{${daughterElem.symbol}} + \\tilde{\\nu}_e`
    );
    setDecayNotice(
      `Phóng xạ β⁻: 1 Neutron trong hạt nhân biến đổi thành 1 Proton, đồng thời phát ra electron (e⁻) và phản hạt neutrino (ν̃_e). Số khối A giữ nguyên, Z tăng 1.`
    );

    const angle = -Math.PI / 3 + (Math.random() - 0.5) * 0.5;
    emittedParticlesRef.current.push(
      {
        id: Date.now() + Math.random(),
        type: 'beta-',
        x: 0,
        y: 0,
        vx: Math.cos(angle) * 7.8,
        vy: Math.sin(angle) * 7.8,
        alpha: 1,
        radius: 10,
        label: 'β⁻ (e⁻)',
        color: '#06B6D4',
        trail: [],
      },
      {
        id: Date.now() + Math.random() + 1,
        type: 'neutrino',
        x: 0,
        y: 0,
        vx: Math.cos(angle + 0.55) * 8.5,
        vy: Math.sin(angle + 0.55) * 8.5,
        alpha: 1,
        radius: 7,
        label: 'ν̃_e',
        color: '#A855F7',
        trail: [],
      }
    );

    recoilRef.current.vx = -Math.cos(angle) * 1.6;
    recoilRef.current.vy = -Math.sin(angle) * 1.6;
    flashAlphaRef.current = 0.75;

    setZ((prev) => Math.min(95, prev + 1));
    setN((prev) => Math.max(0, prev - 1));
  }, [Z, N]);

  const triggerBetaPlusDecay = useCallback(() => {
    if (Z < 1) {
      setDecayNotice('Hạt nhân cần có ít nhất 1 Proton để thực hiện phân rã β⁺ (p → n + e⁺ + ν_e).');
      return;
    }
    const parentElem = getElementInfo(Z);
    const daughterElem = getElementInfo(Z - 1);
    const A = Z + N;

    setLastDecayEquation(
      `{}^{${A}}_{${Z}}\\text{${parentElem.symbol}} \\rightarrow {}^{0}_{+1}e + {}^{${A}}_{${Z - 1}}\\text{${daughterElem.symbol}} + \\nu_e`
    );
    setDecayNotice(
      `Phóng xạ β⁺: 1 Proton trong hạt nhân biến đổi thành 1 Neutron, phát ra positron (e⁺) và hạt neutrino (ν_e). Số khối A giữ nguyên, Z giảm 1.`
    );

    const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5;
    emittedParticlesRef.current.push(
      {
        id: Date.now() + Math.random(),
        type: 'beta+',
        x: 0,
        y: 0,
        vx: Math.cos(angle) * 7.8,
        vy: Math.sin(angle) * 7.8,
        alpha: 1,
        radius: 10,
        label: 'β⁺ (e⁺)',
        color: '#10B981',
        trail: [],
      },
      {
        id: Date.now() + Math.random() + 1,
        type: 'neutrino',
        x: 0,
        y: 0,
        vx: Math.cos(angle - 0.5) * 8.5,
        vy: Math.sin(angle - 0.5) * 8.5,
        alpha: 1,
        radius: 7,
        label: 'ν_e',
        color: '#A855F7',
        trail: [],
      }
    );

    recoilRef.current.vx = -Math.cos(angle) * 1.6;
    recoilRef.current.vy = -Math.sin(angle) * 1.6;
    flashAlphaRef.current = 0.75;

    setZ((prev) => Math.max(0, prev - 1));
    setN((prev) => Math.min(150, prev + 1));
  }, [Z, N]);

  // 60 FPS Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.04;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (
        canvas.width !== Math.floor(rect.width * dpr) ||
        canvas.height !== Math.floor(rect.height * dpr)
      ) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = (height - 76) * 0.5;

      // Clear background
      ctx.fillStyle = '#090F1D';
      ctx.fillRect(0, 0, width, height);

      // Subtle polar coordinate grid
      const maxGridR = Math.min(width * 0.42, (height - 90) * 0.46);
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75, 1.0].forEach((frac) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxGridR * frac, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.moveTo(centerX - maxGridR * 1.08, centerY);
      ctx.lineTo(centerX + maxGridR * 1.08, centerY);
      ctx.moveTo(centerX, centerY - maxGridR * 1.05);
      ctx.lineTo(centerX, centerY + maxGridR * 1.05);
      ctx.stroke();

      const {
        Z: curZ,
        N: curN,
        showElectronCloud: cloudOn,
        showForceField: forceOn,
      } = stateRef.current;
      const curAnalysis = analyzeNuclide(curZ, curN);
      const A = curZ + curN;

      // Update recoil spring physics
      const rec = recoilRef.current;
      rec.x += rec.vx;
      rec.y += rec.vy;
      rec.vx *= 0.88;
      rec.vy *= 0.88;
      rec.x *= 0.85;
      rec.y *= 0.85;

      const nucCenterX = centerX + rec.x;
      const nucCenterY = centerY + rec.y;

      // Electron cloud orbits if enabled
      if (cloudOn && curZ > 0) {
        const shells = [2, 8, 18, 32, 32];
        let remainingE = Math.min(curZ, 36);
        shells.forEach((cap, sIdx) => {
          if (remainingE <= 0) return;
          const count = Math.min(remainingE, cap);
          remainingE -= count;
          const orbitR = Math.min(maxGridR * 0.96, 76 + sIdx * 24);

          ctx.strokeStyle = 'rgba(6, 182, 212, 0.16)';
          ctx.setLineDash([4, 6]);
          ctx.beginPath();
          ctx.arc(centerX, centerY, orbitR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          for (let i = 0; i < count; i++) {
            const eAngle =
              (i / count) * Math.PI * 2 +
              time * (0.45 - sIdx * 0.08) * (sIdx % 2 === 0 ? 1 : -1);
            const ex = centerX + Math.cos(eAngle) * orbitR;
            const ey = centerY + Math.sin(eAngle) * orbitR;

            ctx.fillStyle = '#22D3EE';
            ctx.beginPath();
            ctx.arc(ex, ey, 3.2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Strong Nuclear Force Halo / Unstable Warning Aura
      if (A > 0 && forceOn) {
        const haloRadius = Math.min(85, 22 + Math.pow(A, 0.42) * 12);
        const grad = ctx.createRadialGradient(
          nucCenterX,
          nucCenterY,
          4,
          nucCenterX,
          nucCenterY,
          haloRadius * 1.45
        );
        if (curAnalysis.isStable) {
          grad.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
          grad.addColorStop(0.6, 'rgba(6, 182, 212, 0.09)');
          grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        } else {
          const pulse = 0.24 + 0.08 * Math.sin(time * 4);
          grad.addColorStop(0, `rgba(244, 63, 94, ${pulse})`);
          grad.addColorStop(0.6, 'rgba(245, 158, 11, 0.12)');
          grad.addColorStop(1, 'rgba(244, 63, 94, 0)');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nucCenterX, nucCenterY, haloRadius * 1.45, 0, Math.PI * 2);
        ctx.fill();
      }

      // Flash effect on radioactive decay
      if (flashAlphaRef.current > 0.01) {
        const flashGrad = ctx.createRadialGradient(
          nucCenterX,
          nucCenterY,
          2,
          nucCenterX,
          nucCenterY,
          130
        );
        flashGrad.addColorStop(0, `rgba(250, 204, 21, ${flashAlphaRef.current})`);
        flashGrad.addColorStop(0.5, `rgba(6, 182, 212, ${flashAlphaRef.current * 0.5})`);
        flashGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(nucCenterX, nucCenterY, 130, 0, Math.PI * 2);
        ctx.fill();
        flashAlphaRef.current *= 0.88;
      }

      // Draw Nucleons
      const maxDisplayNucleons = Math.min(A, 120);
      const nucleonRadius = A <= 16 ? 12.5 : A <= 40 ? 10 : A <= 90 ? 8.2 : 7;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const vibrationAmp = curAnalysis.isStable ? 0.65 : 2.15;

      const particles: ('proton' | 'neutron')[] = [];
      let pLeft = curZ;
      let nLeft = curN;
      while (particles.length < maxDisplayNucleons && (pLeft > 0 || nLeft > 0)) {
        if (
          pLeft > 0 &&
          (nLeft === 0 || pLeft / Math.max(1, curZ) >= nLeft / Math.max(1, curN))
        ) {
          particles.push('proton');
          pLeft--;
        } else if (nLeft > 0) {
          particles.push('neutron');
          nLeft--;
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const pType = particles[i];
        const r = i === 0 ? 0 : nucleonRadius * 0.82 * Math.sqrt(i);
        const theta = i * goldenAngle;
        const jiggleX = Math.sin(time * 3.2 + i * 1.7) * vibrationAmp;
        const jiggleY = Math.cos(time * 2.9 + i * 2.3) * vibrationAmp;

        const px = nucCenterX + r * Math.cos(theta) + jiggleX;
        const py = nucCenterY + r * Math.sin(theta) + jiggleY;

        const sphereGrad = ctx.createRadialGradient(
          px - nucleonRadius * 0.3,
          py - nucleonRadius * 0.3,
          nucleonRadius * 0.15,
          px,
          py,
          nucleonRadius
        );

        if (pType === 'proton') {
          sphereGrad.addColorStop(0, '#FDA4AF');
          sphereGrad.addColorStop(0.45, '#F43F5E');
          sphereGrad.addColorStop(1, '#9F1239');
        } else {
          sphereGrad.addColorStop(0, '#BAE6FD');
          sphereGrad.addColorStop(0.45, '#0284C7');
          sphereGrad.addColorStop(1, '#0C4A6E');
        }

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(px, py, nucleonRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(15, 23, 42, 0.65)';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (nucleonRadius >= 9.5) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `600 ${Math.round(nucleonRadius * 0.9)}px "IBM Plex Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pType === 'proton' ? '+' : '0', px, py + 0.5);
        }
      }

      // Draw emitted radioactive particles
      const activeParticles: EmittedParticle[] = [];
      emittedParticlesRef.current.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.012;
        pt.trail.push({ x: centerX + pt.x, y: centerY + pt.y });
        if (pt.trail.length > 18) pt.trail.shift();

        if (pt.alpha > 0.02) {
          activeParticles.push(pt);

          for (let t = 0; t < pt.trail.length - 1; t++) {
            const ratio = t / pt.trail.length;
            ctx.strokeStyle = pt.color;
            ctx.globalAlpha = ratio * pt.alpha * 0.65;
            ctx.lineWidth = pt.radius * ratio * 0.7;
            ctx.beginPath();
            ctx.moveTo(pt.trail[t].x, pt.trail[t].y);
            ctx.lineTo(pt.trail[t + 1].x, pt.trail[t + 1].y);
            ctx.stroke();
          }

          ctx.globalAlpha = Math.min(1, pt.alpha * 1.2);
          const drawX = centerX + pt.x;
          const drawY = centerY + pt.y;

          if (pt.type === 'alpha') {
            const offsets = [
              { dx: -5, dy: -5, c: '#F43F5E' },
              { dx: 5, dy: 5, c: '#F43F5E' },
              { dx: 5, dy: -5, c: '#38BDF8' },
              { dx: -5, dy: 5, c: '#38BDF8' },
            ];
            offsets.forEach((o) => {
              ctx.fillStyle = o.c;
              ctx.beginPath();
              ctx.arc(drawX + o.dx, drawY + o.dy, 7, 0, Math.PI * 2);
              ctx.fill();
            });
          } else {
            ctx.fillStyle = pt.color;
            ctx.beginPath();
            ctx.arc(drawX, drawY, pt.radius, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = '#F8FAFC';
          ctx.font = '600 12px "IBM Plex Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(pt.label, drawX, drawY - pt.radius - 8);
          ctx.globalAlpha = 1;
        }
      });
      emittedParticlesRef.current = activeParticles;

      // Drop zone hint around nucleus when dragging
      if (draggedRef.current) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.setLineDash([6, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Interactive Particle Buckets at bottom of Canvas (Responsive & Centered Inside Box)
      const { bucketY, bucketW, bucketH, pBucketX, nBucketX } = getBucketLayout(width, height);
      const fontSize = bucketW < 165 ? 11 : 12;

      // Helper to draw a perfectly contained particle bucket
      const drawBucket = (
        bx: number,
        borderColor: string,
        sphereColor: string,
        textColor: string,
        labelText: string
      ) => {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx - bucketW / 2, bucketY - bucketH / 2, bucketW, bucketH, 12);
        ctx.fill();
        ctx.stroke();

        ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
        const textWidth = ctx.measureText(labelText).width;
        const spheresWidth = 38; // 3 overlapping spheres
        const gapBetween = 10;
        const totalContentW = spheresWidth + gapBetween + textWidth;
        const startX = bx - totalContentW / 2;

        // Draw 3 spheres
        [9, 19, 29].forEach((offset) => {
          ctx.fillStyle = sphereColor;
          ctx.beginPath();
          ctx.arc(startX + offset, bucketY, 8.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw label cleanly inside box
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, startX + spheresWidth + gapBetween, bucketY + 0.5);
      };

      drawBucket(
        pBucketX,
        'rgba(244, 63, 94, 0.45)',
        '#F43F5E',
        '#FECDD3',
        'Kéo Proton (p⁺)'
      );

      drawBucket(
        nBucketX,
        'rgba(56, 189, 248, 0.45)',
        '#0284C7',
        '#BAE6FD',
        'Kéo Neutron (n⁰)'
      );

      // Draw currently dragged nucleon
      if (draggedRef.current) {
        const dg = draggedRef.current;
        ctx.fillStyle = dg.type === 'proton' ? '#F43F5E' : '#0284C7';
        ctx.beginPath();
        ctx.arc(dg.x, dg.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 12px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dg.type === 'proton' ? 'p⁺' : 'n⁰', dg.x, dg.y);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Pointer drag-and-drop handlers for the PhET canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { bucketY, bucketW, bucketH, pBucketX, nBucketX } = getBucketLayout(
      rect.width,
      rect.height
    );

    // Check Proton bucket
    if (Math.abs(x - pBucketX) <= bucketW / 2 && Math.abs(y - bucketY) <= bucketH / 2 + 4) {
      draggedRef.current = { type: 'proton', x, y, fromNucleus: false };
      canvas.setPointerCapture(e.pointerId);
      return;
    }

    // Check Neutron bucket
    if (Math.abs(x - nBucketX) <= bucketW / 2 && Math.abs(y - bucketY) <= bucketH / 2 + 4) {
      draggedRef.current = { type: 'neutron', x, y, fromNucleus: false };
      canvas.setPointerCapture(e.pointerId);
      return;
    }

    // Check if dragging out of the nucleus
    const centerX = rect.width / 2;
    const centerY = (rect.height - 76) * 0.5;
    const distFromCenter = Math.hypot(x - centerX, y - centerY);
    if (distFromCenter <= 75 && Z + N > 0) {
      const removeProton = Z > 0 && (N === 0 || Math.random() < Z / (Z + N));
      if (removeProton) {
        setZ((prev) => Math.max(0, prev - 1));
        draggedRef.current = { type: 'proton', x, y, fromNucleus: true };
      } else {
        setN((prev) => Math.max(0, prev - 1));
        draggedRef.current = { type: 'neutron', x, y, fromNucleus: true };
      }
      canvas.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggedRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    draggedRef.current.x = e.clientX - rect.left;
    draggedRef.current.y = e.clientY - rect.top;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggedRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = (rect.height - 76) * 0.5;

    const dist = Math.hypot(x - centerX, y - centerY);
    if (dist <= 115) {
      if (draggedRef.current.type === 'proton') {
        setZ((prev) => Math.min(95, prev + 1));
      } else {
        setN((prev) => Math.min(150, prev + 1));
      }
      recoilRef.current.vy = -1.5;
    }

    draggedRef.current = null;
    try {
      canvasRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not captured
    }
  };

  const presetIsotopes = KNOWN_ISOTOPES.filter((iso) => iso.isPreset);

  return (
    <div className="space-y-6">
      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT ZONE: Interactive PhET Stage (7 cols on lg) */}
        <div className="lg:col-span-7 min-w-0 flex flex-col bg-[#111C30] border border-slate-800 rounded-2xl overflow-hidden">
          {/* Top Stage Overlay Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-800/80 bg-[#0D1627]">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Standard Nuclide Notation ^A_Z X */}
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 rounded-xl shrink-0">
                <div className="flex flex-col items-end font-mono text-xs leading-tight tabular-nums text-cyan-300 font-semibold">
                  <span title="Số khối A">{nuclide.A}</span>
                  <span title="Nguyên tử số Z" className="text-rose-400">
                    {nuclide.Z}
                  </span>
                </div>
                <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {nuclide.symbol}
                </span>
              </div>

              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                  {nuclide.isotopeName}
                </h2>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 font-mono tabular-nums">
                  <span>Z = {nuclide.Z}p</span>
                  <span aria-hidden="true">·</span>
                  <span>N = {nuclide.N}n</span>
                  <span aria-hidden="true">·</span>
                  <span>A = {nuclide.A}</span>
                </div>
              </div>
            </div>

            {/* Dual-Coded Semantic Stability Status */}
            <div className="flex items-center gap-2 shrink-0">
              {nuclide.isStable ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>● BỀN VỮNG (STABLE)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-700/50 text-rose-300 text-xs font-semibold whitespace-nowrap">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>▲ KHÔNG BỀN (PHÓNG XẠ)</span>
                </div>
              )}
            </div>
          </div>

          {/* Non-Overlapping Sub-Toolbar for View Toggles & Half-life Readout */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 bg-[#0A1220] border-b border-slate-800/70">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowElectronCloud((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                  showElectronCloud
                    ? 'bg-cyan-950/80 border-cyan-600/50 text-cyan-200'
                    : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Đám mây e⁻
              </button>
              <button
                type="button"
                onClick={() => setShowForceField((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                  showForceField
                    ? 'bg-violet-950/80 border-violet-600/50 text-violet-200'
                    : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Trường lực hạt nhân
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono tabular-nums">
              <span>
                <span className="text-slate-400">Chu kì T: </span>
                <span className="text-cyan-300 font-semibold">{nuclide.halfLife}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>
                <span className="text-slate-400">Bán kính R: </span>
                <span className="text-slate-200">{nuclide.radiusFm.toFixed(2)} fm</span>
              </span>
            </div>
          </div>

          {/* 60 FPS Interactive Canvas */}
          <div className="relative flex-1 min-h-[380px] select-none">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-full min-h-[380px] block cursor-grab active:cursor-grabbing touch-none"
            />
          </div>

          {/* Bottom Control Deck: Add/Remove Nucleons + Trigger Radioactive Decay */}
          <div className="p-5 bg-[#0D1627] border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Proton Controls */}
              <div className="flex items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 min-w-0">
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-rose-400 block truncate">
                    Proton (p⁺) · Điện tích +1e
                  </span>
                  <span className="text-xs text-slate-400 font-mono tabular-nums block truncate">
                    m_p = 1,00728 u · Z = {Z}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setZ((v) => Math.max(0, v - 1))}
                    disabled={Z <= 0}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
                    title="Bớt 1 Proton"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZ((v) => Math.min(95, v + 1))}
                    className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm p⁺
                  </button>
                </div>
              </div>

              {/* Neutron Controls */}
              <div className="flex items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 min-w-0">
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-sky-400 block truncate">
                    Neutron (n⁰) · Không mang điện
                  </span>
                  <span className="text-xs text-slate-400 font-mono tabular-nums block truncate">
                    m_n = 1,00866 u · N = {N}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setN((v) => Math.max(0, v - 1))}
                    disabled={N <= 0}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
                    title="Bớt 1 Neutron"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setN((v) => Math.min(150, v + 1))}
                    className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm n⁰
                  </button>
                </div>
              </div>
            </div>

            {/* Radioactive Decay Trigger Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                Kích hoạt phân rã phóng xạ:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={triggerAlphaDecay}
                  className="px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  Phóng xạ α (⁴₂He)
                </button>
                <button
                  type="button"
                  onClick={triggerBetaMinusDecay}
                  className="px-3 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  Phóng xạ β⁻ (e⁻)
                </button>
                <button
                  type="button"
                  onClick={triggerBetaPlusDecay}
                  className="px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  Phóng xạ β⁺ (e⁺)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZ(6);
                    setN(6);
                    setLastDecayEquation(null);
                    setDecayNotice(null);
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Đặt về ¹²C
                </button>
              </div>
            </div>

            {/* Live Decay Reaction Equation Banner */}
            {lastDecayEquation && (
              <div className="p-3.5 rounded-xl bg-slate-900/95 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-cyan-400 block mb-1">
                    Phương trình phân rã vừa kích hoạt:
                  </span>
                  <p className="text-xs text-slate-300">{decayNotice}</p>
                </div>
                <div className="px-3.5 py-2 rounded-lg bg-[#0B1120] border border-slate-800 overflow-x-auto shrink-0">
                  <MathFormula tex={lastDecayEquation} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT ZONE: Preset Isotopes & Real-Time Energy Telemetry (5 cols on lg) */}
        <div className="lg:col-span-5 min-w-0 flex flex-col gap-5">
          {/* Quick Preset Isotopes from Grade 12 Curriculum */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Atom className="w-4 h-4 text-cyan-400 shrink-0" />
                Đồng vị chuẩn SGK Vật lý 12
              </h3>
              <span className="text-xs text-slate-400">Bấm chọn để nạp nhanh</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 gap-2">
              {presetIsotopes.map((iso) => {
                const isSelected = iso.Z === Z && iso.N === N;
                return (
                  <button
                    key={`${iso.Z}-${iso.N}`}
                    type="button"
                    onClick={() => {
                      setZ(iso.Z);
                      setN(iso.N);
                      setLastDecayEquation(null);
                      setDecayNotice(null);
                    }}
                    className={`px-2.5 py-2 rounded-xl border text-left transition-all min-w-0 ${
                      isSelected
                        ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 font-mono text-xs tabular-nums">
                      <span className="font-bold text-sm text-white truncate">
                        <sup>{iso.A}</sup>
                        <sub>{iso.Z}</sub>
                        {iso.symbol}
                      </span>
                      <span
                        className={`text-[10px] shrink-0 ${
                          iso.isStable ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {iso.isStable ? 'Bền' : iso.decayMode}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 border border-slate-800/80 rounded-xl p-3">
              {nuclide.description}
            </p>
          </div>

          {/* Real-Time Mass Defect & Binding Energy Breakdown */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Thông số Độ hụt khối & Năng lượng liên kết
              </h3>
              <p className="text-xs text-slate-400">
                Tính tự động theo hằng số chuẩn SGK: <MathFormula tex="1\text{ amu} = 931,5\text{ MeV}/c^2" />
              </p>
            </div>

            <div className="space-y-3">
              {/* Step 1: Total Nucleon Mass vs Nuclear Mass */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span>Tổng khối lượng các nucleon riêng rẽ (<MathFormula tex="m_0" />):</span>
                  <span className="font-mono tabular-nums text-slate-200 font-semibold">
                    {nuclide.totalNucleonMassU.toFixed(5)} amu
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span>Khối lượng hạt nhân tạo thành (<MathFormula tex="m_X" />):</span>
                  <span className="font-mono tabular-nums text-cyan-300 font-semibold">
                    {nuclide.massU.toFixed(5)} amu
                  </span>
                </div>
              </div>

              {/* Step 2: Mass Defect Delta m */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-300">
                    1. Độ hụt khối (<MathFormula tex="\Delta m = Z m_p + (A-Z)m_n - m_X" />):
                  </span>
                  <span className="font-mono tabular-nums text-base font-bold text-amber-300 whitespace-nowrap">
                    {nuclide.deltaM_u.toFixed(5)} amu
                  </span>
                </div>
                <div className="text-[11px] font-mono tabular-nums text-slate-400 break-words">
                  = {Z} × {PHYSICAL_CONSTANTS.m_p} + {N} × {PHYSICAL_CONSTANTS.m_n} -{' '}
                  {nuclide.massU.toFixed(5)} = {nuclide.deltaM_u.toFixed(5)} amu
                </div>
              </div>

              {/* Step 3: Binding Energy W_lk */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-300">
                    2. Năng lượng liên kết (<MathFormula tex="W_{\text{lk}} = \Delta m \cdot c^2" />):
                  </span>
                  <span className="font-mono tabular-nums text-base font-bold text-cyan-300 whitespace-nowrap">
                    {nuclide.W_lk_MeV.toFixed(2)} MeV
                  </span>
                </div>
                <div className="text-[11px] font-mono tabular-nums text-slate-400 break-words">
                  = {nuclide.deltaM_u.toFixed(5)} × 931,5 MeV = {nuclide.W_lk_MeV.toFixed(2)} MeV
                </div>
              </div>

              {/* Step 4: Specific Binding Energy W_lkr */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xs font-medium text-slate-300">
                    3. Năng lượng liên kết riêng (<MathFormula tex="W_{\text{lkr}} = \frac{W_{\text{lk}}}{A}" />):
                  </span>
                  <span className="font-mono tabular-nums text-base font-bold text-emerald-300 whitespace-nowrap">
                    {nuclide.W_lkr_MeV.toFixed(3)} MeV/nucleon
                  </span>
                </div>

                {/* Stability Benchmark Progress Bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-emerald-300 transition-all duration-200"
                      style={{
                        width: `${Math.min(100, (nuclide.W_lkr_MeV / 8.8) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                    <span>0 MeV/nucl</span>
                    <span>Đỉnh bền vững ⁵⁶Fe (~8,8 MeV/nucleon)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
