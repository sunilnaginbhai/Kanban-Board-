import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PRIORITY_LABEL, STATUSES, ui } from '../constants';
import { PriorityIcon } from './icons';

export default function TaskDrawer({ task, defaultStatus = 'todo', onSave, onDelete, onClose }) {
    const [form, setForm] = useState(task ?? { title: '', description: '', priority: 'medium', dueDate: '', status: defaultStatus });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const onKey = e => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const set = (f, v) => setForm(prev => ({ ...prev, [f]: v }));

    const submit = ev => {
        ev.preventDefault();
        const e = {};
        if (!form.title.trim()) e.title = 'Enter a title.';
        else if (form.title.length > 80) e.title = 'Keep the title under 80 characters.';
        if (!form.dueDate) e.dueDate = 'Pick a due date.';
        setErrors(e);
        if (Object.keys(e).length === 0) onSave({ ...form, title: form.title.trim() });
    };

    const row = 'grid grid-cols-[88px_1fr] items-start gap-y-1 text-[13px]';
    const rowLabel = 'flex h-8 items-center text-zinc-500';

    return (
        <div className="fixed inset-0 z-40">
            <div className="fade-in absolute inset-0 bg-zinc-950/30" onClick={onClose} />
            <form role="dialog" aria-modal="true" aria-labelledby="drawer-title" onSubmit={submit} noValidate
                className="slide-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex h-12 items-center border-b border-zinc-200 px-5 dark:border-zinc-800">
                    <h2 id="drawer-title" className="text-[13px] font-medium text-zinc-500">{task ? 'Edit task' : 'New task'}</h2>
                    <button type="button" onClick={onClose} aria-label="Close" className={ui.icon + ' ml-auto -mr-2'}><X size={16} /></button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
                    <div>
                        <label htmlFor="title" className="sr-only">Title</label>
                        <input id="title" autoFocus value={form.title} onChange={e => set('title', e.target.value)} placeholder="Task title"
                            className="w-full bg-transparent text-xl font-semibold tracking-tight outline-none placeholder:text-zinc-400" />
                        {errors.title && <p className="mt-1 text-[13px] text-rose-600">{errors.title}</p>}
                        <label htmlFor="desc" className="sr-only">Description</label>
                        <textarea id="desc" rows="4" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Add a description"
                            className="mt-3 w-full resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-zinc-400" />
                    </div>

                    <div className="space-y-2 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                        <div className={row}>
                            <label htmlFor="status" className={rowLabel}>Status</label>
                            <select id="status" value={form.status} onChange={e => set('status', e.target.value)} className={ui.field + ' w-44'}>
                                {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                            </select>
                        </div>
                        <div className={row}>
                            <span className={rowLabel} id="prio-label">Priority</span>
                            <div role="radiogroup" aria-labelledby="prio-label"
                                className="inline-flex w-fit rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-900">
                                {Object.keys(PRIORITY_LABEL).map(p => (
                                    <button key={p} type="button" role="radio" aria-checked={form.priority === p} onClick={() => set('priority', p)}
                                        className={`flex h-7 items-center gap-1.5 rounded px-2.5 transition-colors ${form.priority === p ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>
                                        <PriorityIcon level={p} />{PRIORITY_LABEL[p]}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={row}>
                            <label htmlFor="due" className={rowLabel}>Due date</label>
                            <div>
                                <input id="due" type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} className={ui.field + ' w-44'} />
                                {errors.dueDate && <p className="mt-1 text-[13px] text-rose-600">{errors.dueDate}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
                    {task && <button type="button" onClick={() => onDelete(task)} className="h-8 rounded-md px-2 text-[13px] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40">Delete</button>}
                    <div className="ml-auto flex gap-2">
                        <button type="button" onClick={onClose} className={ui.btn}>Cancel</button>
                        <button type="submit" className={ui.primary}>{task ? 'Save changes' : 'Create task'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
