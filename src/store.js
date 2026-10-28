import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { makeSamples } from './samples.js';

// persist() saves the whole store to LocalStorage and restores it on refresh.
export const useStore = create(
    persist(
        set => ({
            tasks: [],
            dark: false,
            toured: false,
            add: d => set(s => ({ tasks: [...s.tasks, { status: 'todo', ...d, id: crypto.randomUUID(), createdAt: Date.now() }] })),
            update: (id, c) => set(s => ({ tasks: s.tasks.map(t => (t.id === id ? { ...t, ...c } : t)) })),
            remove: id => set(s => ({ tasks: s.tasks.filter(t => t.id !== id) })),
            restore: t => set(s => ({ tasks: [...s.tasks, t] })),
            loadSamples: () => set(s => ({ tasks: [...s.tasks, ...makeSamples()] })),
            clearAll: () => set({ tasks: [] }),
            toggleDark: () => set(s => ({ dark: !s.dark })),
            markToured: () => set({ toured: true }),
        }),
        { name: 'taskly-v1' }
    )
);