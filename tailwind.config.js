/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'violet-3': '#f4f0fe',
        'violet-4': '#ebe4ff',
        'violet-11': '#6550b9',
      },
      boxShadow: {
        'popover-sm': 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
        'popover-md':
          'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px var(--violet-7)',
        'black-sm': '0 0 0 2px black',
        'black-md': '0 2px 10px rgba(0, 0, 0, 0.5)',
        'violet-7-sm': '0 0 0 1px #c2b5f5',
        'violet-8-sm': '0 0 0 2px #aa99ec',
      },
      minWidth: {
        'screen-md': '75vw',
      },
      animation: {
        'slide-up-and-fade': 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-and-fade': 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-and-fade': 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-and-fade': 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
      keyframes: {
        slideUpAndFade: {
          from: {opacity: 0, transform: 'translateY(2px)'},
          to: {opacity: 1, transform: 'translateY(0)'},
        },
        slideRightAndFade: {
          from: {opacity: 0, transform: 'translateX(-2px)'},
          to: {opacity: 1, transform: 'translateX(0)'},
        },
        slideDownAndFade: {
          from: {opacity: 0, transform: 'translateY(-2px)'},
          to: {opacity: 1, transform: 'translateY(0)'},
        },
        slideLeftAndFade: {
          from: {opacity: 0, transform: 'translateX(2px)'},
          to: {opacity: 1, transform: 'translateX(0)'},
        },
        hide: {
          from: {opacity: 1},
          to: {opacity: 0},
        },
        slideIn: {
          from: {transform: 'translateX(calc(100% + 24px))'},
          to: {transform: 'translateX(0)'},
        },
        swipeOut: {
          from: {transform: 'translateX(var(--radix-toast-swipe-end-x))'},
          to: {transfrom: 'translateX(calc(100% + 24px))'},
        },
      },
      willChange: {
        'transform-opacity': 'transform, opacity',
      },
      translate: {
        center: 'translate(-50%, -50%)',
      },
    },
  },
  plugins: [],
}
