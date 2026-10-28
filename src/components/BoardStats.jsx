import { format } from 'date-fns';

export default function BoardStats({ tasks }) {
    const today = format(new Date(), 'yyyy-MM-dd');
    const done = tasks.filter(task => task.status === 'completed').length;
    const doing = tasks.filter(task => task.status === 'inprogress').length;
    const overdue = tasks.filter(task => task.status !== 'completed' && task.dueDate < today).length;
    const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

    return (
        <div data-tour="stats" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-zinc-500">
            <span><b className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{tasks.length}</b> tasks</span>
            <span><b className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{doing}</b> in progress</span>
            <span className={overdue ? 'text-rose-600 dark:text-rose-400' : ''}>
                <b className="font-medium tabular-nums">{overdue}</b> overdue
            </span>
            <span className="flex items-center gap-2">
                <span className="h-1 w-20 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
                    role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100" aria-label="Completion">
                    <span className="block h-full rounded-full bg-indigo-500 transition-all" style={{ width: pct + '%' }} />
                </span>
                <span className="tabular-nums">{pct}% done</span>
            </span>
        </div>
    );
}
