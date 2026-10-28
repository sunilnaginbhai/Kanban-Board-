import { DoneIcon, ProgressIcon, TodoIcon } from './components/icons';

export const STATUSES = [
    { id: 'todo', label: 'Todo', Icon: TodoIcon, tone: 'text-zinc-400' },
    { id: 'inprogress', label: 'In Progress', Icon: ProgressIcon, tone: 'text-amber-500' },
    { id: 'completed', label: 'Completed', Icon: DoneIcon, tone: 'text-emerald-500' },
];

export const PRIORITY_LABEL = { low: 'Low', medium: 'Medium', high: 'High' };
export const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

// One shared set of class strings keeps every control consistent.
export const ui = {
    btn: 'inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800',
    primary: 'inline-flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 px-3 text-[13px] font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
    icon: 'grid size-8 place-items-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
    field: 'h-8 w-full rounded-md border border-zinc-200 bg-white px-2.5 text-[13px] outline-none transition-shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900',
    kbd: 'rounded border border-zinc-200 bg-zinc-50 px-1 font-mono text-[11px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800',
};