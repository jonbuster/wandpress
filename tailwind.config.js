/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
          'Oxygen-Sans', 'Ubuntu', 'Cantarell', '"Helvetica Neue"', 'sans-serif',
        ],
      },
      colors: {
        /* WordPress admin palette */
        wp: {
          bg:            '#f0f0f1',
          surface:       '#ffffff',
          'surface-alt': '#f6f7f7',
          border:        '#c3c4c7',
          'border-light':'#dcdcde',
          text:          '#1d2327',
          muted:         '#646970',
          link:          '#2271b1',
          'link-hover':  '#135e96',
          primary:       '#2271b1',
          'primary-hover':'#135e96',
          'primary-light':'#d0dff4',
          success:       '#00a32a',
          'success-bg':  '#edfaef',
          warning:       '#dba617',
          'warning-bg':  '#fcf9e8',
          danger:        '#d63638',
          'danger-bg':   '#fde8e8',
          info:          '#72aee6',
          'info-bg':     '#e5f0fb',
          dark:          '#1d2327',
          'dark-surface':'#2c3338',
          topbar:        '#1d2327',
          sidebar:       '#1d2327',
        },
      },
      borderRadius: {
        sm:  '2px',
        DEFAULT: '4px',
        md:  '6px',
        lg:  '8px',
      },
      boxShadow: {
        sm:  '0 1px 1px rgba(0,0,0,.04)',
        DEFAULT: '0 1px 4px rgba(0,0,0,.07)',
        md:  '0 2px 8px rgba(0,0,0,.10)',
        lg:  '0 4px 16px rgba(0,0,0,.14)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to:   { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
          to:   { height: '0', opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 220ms ease-out',
        'accordion-up':   'accordion-up 220ms ease-out',
        'fade-in':        'fade-in 200ms ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
