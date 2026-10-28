import { addDays, format } from 'date-fns';

const d = n => format(addDays(new Date(), n), 'yyyy-MM-dd');

export const makeSamples = () =>
    [
        { title: 'Design the landing page', description: 'Hero, pricing and sign-up flow.', priority: 'high', dueDate: d(2), status: 'inprogress' },
        { title: 'Fix login redirect bug', description: 'Users land on a blank page after sign in.', priority: 'high', dueDate: d(-1), status: 'todo' },
        { title: 'Write release notes', description: 'Summarise what shipped this week.', priority: 'low', dueDate: d(5), status: 'todo' },
        { title: 'Plan sprint review', description: 'Agenda and demo order.', priority: 'medium', dueDate: d(3), status: 'todo' },
        { title: 'Collect user feedback', description: 'Five short calls with new users.', priority: 'low', dueDate: d(7), status: 'inprogress' },
        { title: 'Set up CI pipeline', description: 'Run tests on every pull request.', priority: 'medium', dueDate: d(-3), status: 'completed' },
    ].map((t, i) => ({ ...t, id: crypto.randomUUID(), createdAt: Date.now() - i * 1000 }));