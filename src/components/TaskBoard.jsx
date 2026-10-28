import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { STATUSES, ui } from '../constants';
import Column from './Column';

export default function TaskBoard({ tasks, visibleTasks, onDragEnd, onAddTask, onLoadSamples, onClearFilters, onEditTask, onMoveTask }) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
        useSensor(KeyboardSensor)
    );
    const emptyBox = 'rounded-xl border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-800';

    if (tasks.length === 0) {
        return (
            <div className={emptyBox}>
                <p className="text-sm font-medium">No tasks yet</p>
                <p className="mt-1 text-[13px] text-zinc-500">Create a task, or load a few samples to look around.</p>
                <div className="mt-5 flex justify-center gap-2">
                    <button onClick={() => onAddTask('todo')} className={ui.primary}>New task</button>
                    <button onClick={onLoadSamples} className={ui.btn}>Load samples</button>
                </div>
            </div>
        );
    }

    if (visibleTasks.length === 0) {
        return (
            <div className={emptyBox}>
                <p className="text-sm font-medium">No tasks match</p>
                <p className="mt-1 text-[13px] text-zinc-500">Try a different search or clear the filters.</p>
                <button onClick={onClearFilters} className={ui.btn + ' mt-5'}>Clear filters</button>
            </div>
        );
    }

    return (
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            <div data-tour="board" className="grid items-start gap-3 md:grid-cols-3">
                {STATUSES.map(status => (
                    <Column key={status.id} status={status}
                        tasks={visibleTasks.filter(task => task.status === status.id)}
                        onEdit={onEditTask} onMove={onMoveTask} onAdd={onAddTask} />
                ))}
            </div>
        </DndContext>
    );
}
