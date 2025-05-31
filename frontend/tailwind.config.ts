// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // or 'media' if you prefer OS-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
