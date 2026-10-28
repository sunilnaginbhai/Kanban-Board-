import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function Tour({ steps, onClose }) {
    const [i, setI] = useState(0);
    const [rect, setRect] = useState(null);
    const nextRef = useRef(null);
    const step = steps[i];
    const first = i === 0;
    const last = i === steps.length - 1;
    const next = () => (last ? onClose() : setI(n => n + 1));
    const back = () => setI(n => Math.max(0, n - 1));

    // Find the highlighted element, scroll it into view and keep its position fresh.
    useLayoutEffect(() => {
        const el = step.sel && document.querySelector(step.sel);
        if (!el) { setRect(null); return; }
        el.scrollIntoView({ block: 'center' });
        const measure = () => {
            const r = el.getBoundingClientRect();
            setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        };
        measure();
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure, true);
        return () => {
            window.removeEventListener('resize', measure);
            window.removeEventListener('scroll', measure, true);
        };
    }, [step]);

    useEffect(() => { nextRef.current?.focus(); }, [i]);

    useEffect(() => {
        const onKey = e => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') back();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    const W = Math.min(340, window.innerWidth - 24);
    let pos;
    if (!rect) pos = { left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: W };
    else if (rect.height > window.innerHeight * 0.45) pos = { left: (window.innerWidth - W) / 2, bottom: 16, width: W };
    else {
        const left = Math.min(Math.max(12, rect.left + rect.width / 2 - W / 2), window.innerWidth - W - 12);
        const below = rect.top + rect.height + 14;
        pos = below + 200 < window.innerHeight
            ? { top: below, left, width: W }
            : { bottom: window.innerHeight - rect.top + 14, left, width: W };
    }

    return (
        <>
            <div className="fixed inset-0 z-60" />
            {rect ? (
                <div className="pointer-events-none fixed z-60 rounded-xl ring-1 ring-white/70 motion-safe:transition-all motion-safe:duration-200"
                    style={{ top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12, boxShadow: '0 0 0 9999px rgba(9,9,11,.6)' }} />
            ) : (
                <div className="fade-in pointer-events-none fixed inset-0 z-60 bg-zinc-950/60" />
            )}
            <div role="dialog" aria-modal="true" aria-labelledby="tour-title" style={pos}
                className="fade-in fixed z-70 rounded-xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                <div className="mb-3 h-0.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700" aria-hidden="true">
                    <div className="h-full bg-indigo-500 transition-all" style={{ width: ((i + 1) / steps.length) * 100 + '%' }} />
                </div>
                <p className="text-xs tabular-nums text-zinc-500">{i + 1} of {steps.length}</p>
                <h2 id="tour-title" className="mt-1 text-[15px] font-semibold tracking-tight">{step.title}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{step.body}</p>
                <div className="mt-4 flex items-center gap-2">
                    {!last && (
                        <button onClick={onClose} className="h-8 rounded-md px-2 text-[13px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Skip</button>
                    )}
                    <div className="ml-auto flex gap-2">
                        {!first && (
                            <button onClick={back} className="h-8 rounded-md border border-zinc-200 px-3 text-[13px] font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Back</button>
                        )}
                        <button ref={nextRef} onClick={next}
                            className="h-8 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                            {first ? 'Start tour' : last ? 'Done' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
