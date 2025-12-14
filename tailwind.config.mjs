/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#1e3a5f',
                secondary: '#06b6d4',
            },
            fontFamily: {
                sans: ['Tajawal', 'Cairo', 'sans-serif'],
                heading: ['Tajawal', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
