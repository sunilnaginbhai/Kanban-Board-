import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { ui } from '../constants';
import TaskCard from './TaskCard';

export default function Column({ status, tasks, onEdit, onMove, onAdd }) {
    const { setNodeRef, isOver } = useDroppable({ id: status.id });
    const { Icon } = status;
    return (
        <section ref={setNodeRef} aria-label={status.label}
            className={`flex min-h-40 flex-col rounded-xl p-1.5 transition-colors ${isOver ? 'bg-indigo-500/5 ring-1 ring-indigo-500/40' : 'bg-zinc-100/80 dark:bg-zinc-900/50'}`}>
            <div className="flex h-8 items-center gap-2 px-2">
                <Icon className={status.tone} />
                <h2 className="text-[13px] font-medium">{status.label}</h2>
                <span className="text-xs tabular-nums text-zinc-500">{tasks.length}</span>
                <button onClick={() => onAdd(status.id)} aria-label={`Add task to ${status.label}`} title="Add task"
                    className={ui.icon + ' ml-auto size-6'}><Plus size={15} /></button>
            </div>
            <div className="mt-1 flex flex-col gap-1.5">
                {tasks.length === 0 && <p className="py-8 text-center text-[13px] text-zinc-500">Drop a task here</p>}
                {tasks.map(t => <TaskCard key={t.id} task={t} onEdit={onEdit} onMove={onMove} />)}
            </div>
        </section>
    );
}
