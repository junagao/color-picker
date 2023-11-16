import {slateDark, whiteA} from '@radix-ui/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...slateDark,
        ...whiteA,
      },
      boxShadow: {
        'popover-sm': 'hsl(206 22% 7% / 35%) 0px 0px 25px -10px, hsl(206 22% 7% / 20%) 0px 5px 20px -15px',
        'popover-dark-sm': 'hsl(10 10% 90% / 10%) 0px -5px 25px -10px, hsl(10 10% 90% / 5%) 10px 15px 20px -15px',
        'slate-4': '0 0 0 1px #272a2d',
        'slate-4-md': '0 0 0 2px #272a2d',
        'slate-11': '0 0 0 1px #60646c',
        'slate-11-md': '0 0 0 2px #60646c',
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
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
          from: {transform: 'translateX(calc(100% + var(--viewport-padding)))'},
          to: {transform: 'translateX(0)'},
        },
        swipeOut: {
          from: {transform: 'translateX(var(--radix-toast-swipe-end-x))'},
          to: {transform: 'translateX(calc(100% + var(--viewport-padding)))'},
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
