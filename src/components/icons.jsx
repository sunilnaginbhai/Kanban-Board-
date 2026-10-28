// Small custom icons: a monochrome brand mark, status circles and priority bars.
export const LogoMark = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect width="20" height="20" rx="5" fill="currentColor" />
        <rect x="4.5" y="5" width="3" height="10" rx="1" className="fill-white dark:fill-zinc-900" />
        <rect x="8.5" y="5" width="3" height="6.5" rx="1" className="fill-white dark:fill-zinc-900" />
        <rect x="12.5" y="5" width="3" height="3.5" rx="1" className="fill-white dark:fill-zinc-900" />
    </svg>
);

export const TodoIcon = ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.4 2" />
    </svg>
);

export const ProgressIcon = ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5a3.5 3.5 0 0 1 0 7z" fill="currentColor" />
    </svg>
);

export const DoneIcon = ({ size = 16, className }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="currentColor" />
        <path d="M5.2 8.2l1.9 1.9 3.7-3.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LEVEL = { low: 1, medium: 2, high: 3 };
export const PriorityIcon = ({ level, size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true"
        className={level === 'high' ? 'text-rose-500' : 'text-zinc-700 dark:text-zinc-300'}>
        {[0, 1, 2].map(i => {
            const h = 4 + i * 3.5;
            return <rect key={i} x={1 + i * 4.5} y={13 - h} width="3" height={h} rx=".8" fill="currentColor" opacity={i < LEVEL[level] ? 1 : 0.2} />;
        })}
    </svg>
);

