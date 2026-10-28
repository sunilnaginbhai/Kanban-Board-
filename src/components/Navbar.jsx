import { Compass, Download, Moon, Plus, Sun } from 'lucide-react';
import { ui } from '../constants';
import { LogoMark } from './icons';

export default function Navbar({ dark, onStartTour, onExport, onToggleTheme, onAddTask }) {
    return (
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex h-12 max-w-6xl items-center gap-1 px-4">
                <div className="mr-auto flex items-center gap-2 text-[15px] font-semibold tracking-tight">
                    <LogoMark /> Taskly
                </div>
                <button onClick={onStartTour} aria-label="Take the tour" title="Take the tour (?)" className={ui.icon}>
                    <Compass size={17} />
                </button>
                <button data-tour="export" onClick={onExport} aria-label="Export tasks" title="Export tasks as JSON" className={ui.icon}>
                    <Download size={17} />
                </button>
                <button data-tour="theme" onClick={onToggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode" className={ui.icon}>
                    {dark ? <Sun size={17} /> : <Moon size={17} />}
                </button>
                <button data-tour="add" onClick={onAddTask} className={ui.primary + ' ml-2'}>
                    <Plus size={15} /> New task
                    <kbd className="ml-1 hidden rounded bg-white/15 px-1 font-mono text-[11px] sm:inline dark:bg-zinc-900/10">N</kbd>
                </button>
            </div>
        </header>
    );
}
