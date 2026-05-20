import type { Config } from 'tailwindcss';
export default { content: ['./src/**/*.{ts,tsx}'], theme: { extend: { aspectRatio: { tv: '16 / 9' } } }, plugins: [] } satisfies Config;
