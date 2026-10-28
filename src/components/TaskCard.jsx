import { useDraggable } from '@dnd-kit/core';
import { format, isBefore, parseISO, startOfToday } from 'date-fns';
import { GripVertical } from 'lucide-react';
import { PRIORITY_LABEL, STATUSES, ui } from '../constants';
import { PriorityIcon } from './icons';


export default function TaskCard({ task, onEdit, onMove }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id, data: { status: task.status }
    })

    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
    const due = parseISO(task.dueDate);
    const late = task.status !== 'completed' && isBefore(due, startOfToday());

    return (
        <article ref={setNodeRef} style={style} data-card
            className={`group relative rounded-lg border bg-white p-3 transition-colors dark:bg-zinc-900 ${isDragging ? 'z-20 border-indigo-500 shadow-lg' : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'}`}>
            <button onClick={() => onEdit(task)} className="block w-full rounded text-left">
                <h3 className="break-words pr-6 text-[13.5px] font-medium leading-snug">{task.title}</h3>
                {task.description && <p className="mt-1 line-clamp-1 break-words text-[13px] text-zinc-500">{task.description}</p>}
            </button>
            <button {...listeners} {...attributes} aria-label="Drag task"
                className="absolute right-1.5 top-2 cursor-grab touch-none rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100 dark:hover:bg-zinc-800">
                <GripVertical size={16} />
            </button>
            <div className="mt-2.5 flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5"><PriorityIcon level={task.priority} />{PRIORITY_LABEL[task.priority]}</span>
                <span className={late ? 'text-rose-600 dark:text-rose-400' : ''}>{format(due, 'd MMM')}</span>
                {late && <span className="text-rose-600 dark:text-rose-400">Overdue</span>}
                <select value={task.status} onChange={e => onMove(task.id, { status: e.target.value })} aria-label="Move to"
                    className={ui.field + ' ml-auto h-7 w-auto md:hidden'}>
                    {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
            </div>
        </article>
    )
}

