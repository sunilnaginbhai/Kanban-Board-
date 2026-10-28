import { Search } from 'lucide-react';
import { PRIORITY_LABEL, STATUSES, ui } from '../constants';

export default function BoardFilters({ query, onQueryChange, searchRef, priority, onPriorityChange, status, onStatusChange, sort, onSortChange }) {
    const filterField = ui.field + ' w-auto pr-7';

    return (
        <div className="mt-5 flex flex-wrap items-center gap-2">
            <div data-tour="search" className="relative min-w-48 max-w-sm flex-1">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input ref={searchRef} type="search" value={query} onChange={event => onQueryChange(event.target.value)}
                    placeholder="Search tasks" aria-label="Search by title" className={ui.field + ' pl-8'} />
                {!query && <kbd className={ui.kbd + ' pointer-events-none absolute right-2 top-1/2 -translate-y-1/2'}>/</kbd>}
            </div>
            <div data-tour="filters" className="flex flex-wrap gap-2">
                <select value={priority} onChange={event => onPriorityChange(event.target.value)}
                    aria-label="Filter by priority" className={filterField}>
                    <option value="all">All priorities</option>
                    {Object.entries(PRIORITY_LABEL).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
                <select value={status} onChange={event => onStatusChange(event.target.value)}
                    aria-label="Filter by status" className={filterField}>
                    <option value="all">All statuses</option>
                    {STATUSES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
                <select value={sort} onChange={event => onSortChange(event.target.value)}
                    aria-label="Sort tasks" className={filterField}>
                    <option value="newest">Newest first</option>
                    <option value="due">Due date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>
        </div>
    );
}
