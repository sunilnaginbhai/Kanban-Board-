import { useEffect, useMemo, useRef, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { PRIORITY_RANK } from './constants';
import { useStore } from './store';
import { TOUR_STEPS } from './tourSteps';
import BoardFilters from './components/BoardFilters';
import BoardStats from './components/BoardStats';
import Navbar from './components/Navbar';
import TaskBoard from './components/TaskBoard';
import TaskDrawer from './components/TaskDrawer';
import Tour from './components/Tour';

export default function App() {
  const { tasks, dark, toured, add, update, remove, restore, loadSamples, clearAll, toggleDark, markToured } = useStore();
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [drawer, setDrawer] = useState(null);
  const [tour, setTour] = useState(false);
  const seeded = useRef(false);
  const searchRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const startTour = () => {
    if (tasks.length === 0) {
      loadSamples();
      seeded.current = true;
    }
    setTour(true);
  };

  const closeTour = () => {
    setTour(false);
    markToured();
    if (seeded.current) {
      seeded.current = false;
      toast('Sample tasks added', {
        description: 'Keep them to explore, or start fresh.',
        action: { label: 'Clear them', onClick: clearAll },
      });
    }
  };

  useEffect(() => {
    if (toured) return;
    const timer = setTimeout(startTour, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = event => {
      if (drawer || tour || event.metaKey || event.ctrlKey || event.altKey) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
      if (event.key === 'n') {
        event.preventDefault();
        setDrawer({ task: null, status: 'todo' });
      } else if (event.key === '/') {
        event.preventDefault();
        searchRef.current?.focus();
      } else if (event.key === '?') {
        startTour();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(query.trim().toLowerCase()) &&
      (priority === 'all' || task.priority === priority) &&
      (status === 'all' || task.status === status)
    );
    return filtered.sort((a, b) =>
      sort === 'due' ? a.dueDate.localeCompare(b.dueDate)
        : sort === 'priority' ? PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
          : b.createdAt - a.createdAt
    );
  }, [tasks, query, priority, status, sort]);

  const openNewTask = (taskStatus = 'todo') => setDrawer({ task: null, status: taskStatus });
  const clearFilters = () => {
    setQuery('');
    setPriority('all');
    setStatus('all');
  };
  const onDragEnd = ({ active, over }) => {
    if (over && over.id !== active.data.current.status) {
      update(active.id, { status: over.id });
    }
  };
  const deleteTask = task => {
    remove(task.id);
    setDrawer(null);
    toast('Task deleted', { action: { label: 'Undo', onClick: () => restore(task) } });
  };
  const saveTask = data => {
    if (drawer.task) {
      update(drawer.task.id, data);
      toast.success('Changes saved');
    } else {
      add(data);
      toast.success('Task created');
    }
    setDrawer(null);
  };
  const exportTasks = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'taskly-tasks.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Tasks exported');
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar dark={dark} onStartTour={startTour} onExport={exportTasks}
        onToggleTheme={toggleDark} onAddTask={() => openNewTask()} />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Board</h1>
          <BoardStats tasks={tasks} />
        </div>

        <BoardFilters query={query} onQueryChange={setQuery} searchRef={searchRef}
          priority={priority} onPriorityChange={setPriority}
          status={status} onStatusChange={setStatus}
          sort={sort} onSortChange={setSort} />

        <main className="mt-5">
          <TaskBoard tasks={tasks} visibleTasks={visibleTasks} onDragEnd={onDragEnd}
            onAddTask={openNewTask} onLoadSamples={loadSamples}
            onClearFilters={clearFilters} onEditTask={task => setDrawer({ task })}
            onMoveTask={update} />
        </main>
      </div>

      {drawer && (
        <TaskDrawer key={drawer.task?.id ?? 'new'} task={drawer.task} defaultStatus={drawer.status}
          onSave={saveTask} onDelete={deleteTask} onClose={() => setDrawer(null)} />
      )}
      {tour && <Tour steps={TOUR_STEPS} onClose={closeTour} />}
      <Toaster position="bottom-center" theme={dark ? 'dark' : 'light'} />
    </div>
  );
}
