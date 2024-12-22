/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        algar: {
          'teal-100': '#C3FFEB',
          'teal-300': '#1EFFD2',
          'teal-400': '#00EBAF',
          'teal-500': '#28BEA5',
          'teal-700': '#239687',
          'teal-800': '#055550',
          'teal-900': '#003732',

          'blue-100': '#B9FFFF',
          'blue-300': '#00FAFF',
          'blue-400': '#00E6FF',
          'blue-500': '#00BEFF',
          'blue-700': '#006EE6',
          'blue-900': '#003764',

          'gray-100': '#DCF0F0',
          'gray-300': '#B4BEBE',
          'gray-400': '#8C9696',
          'gray-500': '#646E6E',
          'gray-700': '#3C4646',
          'gray-900': '#232D32',

          'green-100': '#D2FFAA',
          'green-200': '#C8FF50',
          'green-400': '#7DFF37',
          'green-500': '#41FF28',
          'green-700': '#00AA14',
          'green-900': '#005A00',

          'yellow-100': '#FFFFA5',
          'yellow-300': '#FFEB00',
          'yellow-400': '#FFD22D',
          'yellow-500': '#FFC300',
          'yellow-700': '#FF8200',
          'yellow-900': '#FF6400',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'algar-gradient-1':
          'linear-gradient(90deg, rgb(40, 190, 165), rgb(0, 230, 255))',
        'algar-gradient-2':
          'linear-gradient(90deg, rgb(0, 235, 175), rgb(0, 190, 255))',
        'algar-gradient-3':
          'linear-gradient(90deg, rgb(30, 255, 210), rgb(255, 210, 45))',
        'algar-gradient-4':
          'linear-gradient(90deg, rgb(40, 190, 165), rgb(125, 255, 55))',
        'algar-gradient-5':
          'linear-gradient(90deg, rgb(0, 235, 175), rgb(180, 255, 20))',
        'algar-gradient-6':
          'linear-gradient(90deg, rgb(0, 230, 255), rgb(180, 255, 20))',
      },
      fontFamily: {
        exo: ['Exo', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
