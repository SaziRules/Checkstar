"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook from "react-pageflip";

const PAGE_W    = 900;
const PRELOAD   = 4;
const ARROW_PAD = 144;

// ── Canvas page ───────────────────────────────────────────────────────────────

const PDFPage = forwardRef<
  HTMLDivElement,
  { pageNum: number; pdf: any; pageH: number; shouldRender: boolean }
>(({ pageNum, pdf, pageH, shouldRender }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const taskRef   = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    if (!shouldRender || !pdf || !canvasRef.current) return;
    taskRef.current?.cancel();
    let active = true;
    pdf.getPage(pageNum).then((page: any) => {
      if (!active || !canvasRef.current) return;
      const baseVp = page.getViewport({ scale: 1 });
      const vp     = page.getViewport({ scale: PAGE_W / baseVp.width });
      const canvas = canvasRef.current;
      const ctx    = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width  = Math.round(vp.width);
      canvas.height = Math.round(vp.height);
      const task = page.render({ canvasContext: ctx, viewport: vp });
      taskRef.current = task;
      task.promise.catch(() => {});
    });
    return () => { active = false; taskRef.current?.cancel(); taskRef.current = null; };
  }, [shouldRender, pdf, pageNum]);

  return (
    <div ref={ref} style={{ width: PAGE_W, height: pageH }} className="overflow-hidden bg-white">
      {shouldRender
        ? <canvas ref={canvasRef} className="block w-full" />
        : <div className="w-full h-full bg-ink-100 animate-pulse" />}
    </div>
  );
});
PDFPage.displayName = "PDFPage";

const BlankPage = forwardRef<HTMLDivElement, { pageH: number }>(({ pageH }, ref) => (
  <div ref={ref} style={{ width: PAGE_W, height: pageH }} className="bg-white" />
));
BlankPage.displayName = "BlankPage";

// ── Flip sound ────────────────────────────────────────────────────────────────

function playFlipSound(ctxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    const dur = 0.11;
    const n   = Math.round(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.8) * (1 - Math.pow(1 - Math.min(t * 8, 1), 2));
    }
    const src   = ctx.createBufferSource();
    src.buffer  = buf;
    const bp    = ctx.createBiquadFilter();
    bp.type     = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 0.6;
    const shelf = ctx.createBiquadFilter();
    shelf.type  = "highshelf"; shelf.frequency.value = 3000; shelf.gain.value = 6;
    const gain  = ctx.createGain();
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    src.connect(bp); bp.connect(shelf); shelf.connect(gain); gain.connect(ctx.destination);
    src.start();
  } catch { /* silently skip */ }
}

// ── SVG icons ─────────────────────────────────────────────────────────────────

const ChevL    = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevR    = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
const IcoDl    = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IcoClose = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoBook  = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const IcoShare = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const IcoCopy  = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

// Social brand icons (inline SVG to avoid extra deps)
const IcoWA = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.533 5.851L.057 23.997l6.305-1.654A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.877 9.877 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.608 6.608 2.118 12 2.118c5.392 0 9.882 4.49 9.882 9.882 0 5.392-4.49 9.882-9.882 9.882z"/>
  </svg>
);

const IcoFB = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IcoX = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// ── Main viewer ───────────────────────────────────────────────────────────────

type FlipState = "read" | "fold_corner" | "user_fold" | "flipping";

function BookViewer({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef      = useRef<any>(null);
  const audioCtxRef  = useRef<AudioContext | null>(null);

  const [pdf,          setPdf        ] = useState<any>(null);
  const [numPages,     setNumPages   ] = useState(0);
  const [pageH,        setPageH      ] = useState(Math.round(PAGE_W * Math.SQRT2));
  const [status,       setStatus     ] = useState<"loading" | "ready" | "error">("loading");
  const [currentPage,  setCurrentPage] = useState(0);
  const [rendered,     setRendered   ] = useState<Set<number>>(new Set([1, 2, 3, 4]));
  const [scale,        setScale      ] = useState(0);
  const [isMobile,     setIsMobile   ] = useState(false);
  const [isFlipping,   setIsFlipping ] = useState(false);
  const [flipState,    setFlipState  ] = useState<FlipState>("read");
  const [shareOpen,    setShareOpen  ] = useState(false);
  const [copied,       setCopied     ] = useState(false);
  const [clickSide,    setClickSide  ] = useState<"left" | "right" | null>(null);

  // ── Load PDF ──────────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc   = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) return;
        const first = await doc.getPage(1);
        const vp    = first.getViewport({ scale: 1 });
        setPdf(doc);
        setNumPages(doc.numPages);
        setPageH(Math.round(PAGE_W * (vp.height / vp.width)));
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [src]);

  // ── Responsive scale (width AND height) ───────────────────────────────────

  useEffect(() => {
    const V_PAD = 48;
    const update = () => {
      if (!containerRef.current) return;
      const cw     = containerRef.current.offsetWidth;
      const ch     = containerRef.current.offsetHeight;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const availW = Math.max(cw - (mobile ? 32 : ARROW_PAD), 100);
      const availH = Math.max(ch - V_PAD * 2, 100);
      const scaleW = availW / (mobile ? PAGE_W : PAGE_W * 2);
      const scaleH = pageH > 0 ? availH / pageH : scaleW;
      setScale(Math.min(scaleW, scaleH));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, [pageH]);

  // ── ESC / body scroll ─────────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (shareOpen) setShareOpen(false); else onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, shareOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ── Page list ─────────────────────────────────────────────────────────────

  const pages = useMemo<(number | null)[]>(() => {
    if (status !== "ready" || numPages === 0) return [];
    const arr: (number | null)[] = Array.from({ length: numPages }, (_, i) => i + 1);
    if (!isMobile && numPages % 2 !== 0) arr.splice(arr.length - 1, 0, null);
    return arr;
  }, [status, numPages, isMobile]);

  // ── Callbacks ─────────────────────────────────────────────────────────────

  const expandRendered = useCallback((center: number) => {
    setRendered(prev => {
      const next = new Set(prev);
      for (let i = Math.max(1, center - PRELOAD); i <= Math.min(numPages, center + PRELOAD); i++)
        next.add(i);
      return next;
    });
  }, [numPages]);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
    expandRendered(e.data + 1);
    playFlipSound(audioCtxRef);
    setIsFlipping(false);
    setClickSide(null);
  }, [expandRendered]);

  const onChangeState = useCallback((e: any) => {
    setFlipState(e.data as FlipState);
    if (e.data === "read") setClickSide(null);
  }, []);

  const flipNext = () => {
    setIsFlipping(true);
    setClickSide("right");
    bookRef.current?.pageFlip().flipNext();
  };

  const flipPrev = () => {
    setIsFlipping(true);
    setClickSide("left");
    bookRef.current?.pageFlip().flipPrev();
  };

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = src;
    a.download = title.toLowerCase().replace(/\s+/g, "-") + ".pdf";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareItems = [
    {
      label: "WhatsApp",
      icon: <IcoWA />,
      color: "#25D366",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — Checkstar Specials: ${typeof window !== "undefined" ? window.location.href : ""}`)}`,
    },
    {
      label: "Facebook",
      icon: <IcoFB />,
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
    },
    {
      label: "X / Twitter",
      icon: <IcoX />,
      color: "#000",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} — Checkstar Specials`)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
    },
  ];

  // ── Geometry ──────────────────────────────────────────────────────────────

  const isOnCover = currentPage === 0;
  const isOnBack  = pages.length > 0 && currentPage >= pages.length - 1;
  const oneCol    = !isMobile && !isFlipping && (isOnCover || isOnBack);

  const displayNatW    = oneCol ? PAGE_W : PAGE_W * 2;
  const innerOffsetNat = (oneCol && isOnCover) ? -PAGE_W : 0;
  const displayW       = displayNatW * scale;
  const displayH       = pageH       * scale;
  const innerOffset    = innerOffsetNat * scale;

  const isFirst   = currentPage === 0;
  const isLast    = pages.length > 0 && currentPage >= pages.length - (isMobile ? 1 : 2);
  const dispL     = currentPage + 1;
  const dispR     = currentPage + 2;
  const showRange = !isMobile && !oneCol && dispR <= pages.length;

  const isAnimating = flipState === "flipping" || flipState === "user_fold";

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 shrink-0">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-orange">Checkstar</p>
          <p className="text-sm font-bold text-white leading-tight">{title}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            title="Download PDF"
            className="flex items-center gap-1.5 px-3 py-2 rounded-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors text-xs"
          >
            <IcoDl />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-1"
          >
            <IcoClose />
          </button>
        </div>
      </div>

      {/* ── Book area ────────────────────────────────────────────────────── */}
      <div ref={containerRef} className="flex-1 flex flex-col items-center justify-center py-6 overflow-hidden">

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 border-[3px] border-white/10 border-t-orange rounded-full animate-spin" />
            <p className="text-sm text-white/40 font-light">Loading catalogue…</p>
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-red-400">Failed to load catalogue.</p>
        )}

        {status === "ready" && scale > 0 && (
          <div className="relative flex items-center justify-center w-full px-4 md:px-[72px]">

            {/* Prev arrow */}
            <button
              onClick={flipPrev}
              disabled={isFirst}
              aria-label="Previous page"
              className={`absolute left-0 w-14 h-14 rounded-full hidden md:flex items-center justify-center
                border transition-all duration-200 cursor-pointer disabled:opacity-20
                ${clickSide === "left"
                  ? "bg-orange/20 border-orange/50 text-orange shadow-[0_0_20px_rgba(231,91,19,0.4)]"
                  : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                }`}
            >
              <ChevL />
            </button>

            {/* Book wrapper */}
            <div
              style={{
                width:      displayW,
                height:     displayH,
                overflow:   "hidden",
                transition: isFlipping ? "none" : "width 0.4s ease",
                position:   "relative",
              }}
            >
              {/* Page-turn click zones — visible on hover, pulse on click */}
              {!isMobile && !oneCol && (
                <>
                  <div
                    onClick={flipPrev}
                    className={`absolute left-0 top-0 bottom-0 w-1/2 z-10 cursor-pointer
                      flex items-center justify-start pl-4 group
                      ${isFirst ? "pointer-events-none" : ""}`}
                    aria-hidden="true"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full
                      bg-black/0 group-hover:bg-black/25 transition-all duration-300
                      ${clickSide === "left" && isAnimating ? "bg-orange/20 scale-125" : "group-hover:scale-110"}`}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`opacity-0 group-hover:opacity-60 transition-opacity duration-300
                          ${clickSide === "left" && isAnimating ? "opacity-90" : ""}`}>
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </div>
                  </div>
                  <div
                    onClick={flipNext}
                    className={`absolute right-0 top-0 bottom-0 w-1/2 z-10 cursor-pointer
                      flex items-center justify-end pr-4 group
                      ${isLast ? "pointer-events-none" : ""}`}
                    aria-hidden="true"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full
                      bg-black/0 group-hover:bg-black/25 transition-all duration-300
                      ${clickSide === "right" && isAnimating ? "bg-orange/20 scale-125" : "group-hover:scale-110"}`}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`opacity-0 group-hover:opacity-60 transition-opacity duration-300
                          ${clickSide === "right" && isAnimating ? "opacity-90" : ""}`}>
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              {/* Translate for cover/back single-page mode */}
              <div style={{
                transform:  `translateX(${innerOffset}px)`,
                transition: isFlipping ? "none" : "transform 0.4s ease",
              }}>
                <div style={{
                  transform:       `scale(${scale})`,
                  transformOrigin: "top left",
                  width:           PAGE_W * 2,
                  position:        "relative",
                }}>
                  {/* Book shadow */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    boxShadow: isAnimating
                      ? "0 32px 100px rgba(0,0,0,0.75), 0 8px 30px rgba(0,0,0,0.4)"
                      : "0 28px 90px rgba(0,0,0,0.6), 0 6px 22px rgba(0,0,0,0.3)",
                    transition: "box-shadow 0.3s ease",
                  }} />

                  <HTMLFlipBook
                    key={`${src}-${pageH}-${isMobile ? "m" : "d"}`}
                    ref={bookRef}
                    width={PAGE_W}    height={pageH}
                    size="fixed"
                    minWidth={PAGE_W} maxWidth={PAGE_W}
                    minHeight={pageH} maxHeight={pageH}
                    startPage={0}
                    drawShadow        flippingTime={700}
                    usePortrait={isMobile}
                    startZIndex={0}   autoSize={false}
                    maxShadowOpacity={0.55}
                    showCover
                    mobileScrollSupport clickEventForward
                    useMouseEvents    swipeDistance={28}
                    showPageCorners   disableFlipByClick={false}
                    onFlip={onFlip}
                    onChangeState={onChangeState}
                    className="" style={{}}
                  >
                    {pages.map((n, i) =>
                      n === null
                        ? <BlankPage key={`blank-${i}`} pageH={pageH} />
                        : <PDFPage   key={n} pageNum={n} pdf={pdf} pageH={pageH} shouldRender={rendered.has(n)} />
                    )}
                  </HTMLFlipBook>
                </div>
              </div>
            </div>

            {/* Next arrow */}
            <button
              onClick={flipNext}
              disabled={isLast}
              aria-label="Next page"
              className={`absolute right-0 w-14 h-14 rounded-full hidden md:flex items-center justify-center
                border transition-all duration-200 cursor-pointer disabled:opacity-20
                ${clickSide === "right"
                  ? "bg-orange/20 border-orange/50 text-orange shadow-[0_0_20px_rgba(231,91,19,0.4)]"
                  : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                }`}
            >
              <ChevR />
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      {status === "ready" && (
        <div className="relative flex items-center justify-between px-4 py-3 border-t border-white/10 shrink-0">

          {/* Mobile prev/next */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={flipPrev} disabled={isFirst}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 disabled:opacity-25 transition-colors">
              <ChevL />
            </button>
            <button onClick={flipNext} disabled={isLast}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 disabled:opacity-25 transition-colors">
              <ChevR />
            </button>
          </div>

          {/* Page counter — centred */}
          <span className="absolute left-1/2 -translate-x-1/2 text-xs tabular-nums text-white/40">
            {showRange ? `${dispL}–${dispR} of ${numPages}` : `${dispL} of ${numPages}`}
          </span>

          {/* Share area */}
          <div className="flex items-center gap-1 ml-auto relative">

            {/* Share popover */}
            {shareOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-ink border border-white/12 rounded-sm shadow-float overflow-hidden min-w-[180px]">
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 px-3 pt-3 pb-2">
                  Share specials
                </p>
                {shareItems.map(({ label, icon, color, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShareOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/8 transition-colors"
                  >
                    <span style={{ color }} className="shrink-0">{icon}</span>
                    <span className="text-xs font-medium text-white/80">{label}</span>
                  </a>
                ))}
                <div className="border-t border-white/10 mx-3" />
                <button
                  onClick={() => { handleCopyLink(); setShareOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/8 transition-colors w-full text-left"
                >
                  <span className={`shrink-0 transition-colors ${copied ? "text-green-400" : "text-white/50"}`}>
                    {copied ? <IcoCheck /> : <IcoCopy />}
                  </span>
                  <span className="text-xs font-medium text-white/80">
                    {copied ? "Link copied!" : "Copy link"}
                  </span>
                </button>
              </div>
            )}

            <button
              onClick={() => setShareOpen((o) => !o)}
              aria-label="Share"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs transition-colors
                ${shareOpen
                  ? "text-orange bg-orange/10"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
            >
              <IcoShare />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Exported trigger ──────────────────────────────────────────────────────────

export function FlipbookViewer({ pdfUrl, title }: { pdfUrl: string; title: string }) {
  const [open,    setOpen   ] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-white/15 transition-colors duration-200"
      >
        <IcoBook />
        Browse Catalogue
      </button>

      {mounted && open && createPortal(
        <BookViewer src={pdfUrl} title={title} onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  );
}
