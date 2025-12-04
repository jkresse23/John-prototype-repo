import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        zip: {
          purple: {
            50: '#F5F3FF',
            100: '#E8E0FF',
            200: '#D1C0FF',
            300: '#B8A0FF',
            400: '#9F80FF',
            500: '#8660FF',
            600: '#6D40FF',
            700: '#5420FF',
            800: '#3B00FF',
            900: '#2200CC',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

