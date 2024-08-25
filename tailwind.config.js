/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      flex: {
        '3': '3 1 0%',
        '4': '4 1 0%',
        '6': '6 1 0%',
      },
      height: {
        'home-c': 'calc(100vh - 64px)',   // homeContainer height
        'menu-c': 'calc(var(--home-c) - 80px)', // menuContainer height
        'util-c': 'calc(var(--home-c) - 40px)', // utilContainer height
        'chat-c': 'calc(var(--util-c) - 56px)', // chatContainer height
      },
      colors: {
      'c-violet-1': 'fcd6f9',
      'c-violet-2': 'ffc6fe',
      'c-violet-3': 'f6b2ff',
      'c-violet-4': 'ceafff',
      'c-violet-5': 'c19bff',
      'c-violet-6': '3a015c',
      'c-violet-7': '32004f',
      'c-violet-8': '220135',
      'c-violet-9': '190028',
      'c-violet-10': '11001c',
    },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }), // Add the scrollbar plugin
  ],

}

