import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-alt': '#111111',
        'bg-light': '#161616',
        red: {
          DEFAULT: '#CC0000',
          dark: '#990000',
          light: '#FF3333',
        },
        gray: {
          DEFAULT: '#888888',
          dark: '#333333',
          light: '#CCCCCC',
        },
      },
      fontFamily: {
        impact: ['Anton', 'Impact', 'sans-serif'],
        mono: ['Source Code Pro', 'Courier New', 'monospace'],
      },
      animation: {
        'glitch': 'glitch-main 6s infinite',
        'flicker': 'flicker 8s infinite',
        'blink': 'blink-cursor 1s infinite',
      },
    },
  },
  plugins: [],
}
export default config
