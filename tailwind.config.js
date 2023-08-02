/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'outline': '#79747E',
      'on-surface': '#1C1B1F',
      'surface': '#FFFBFE',
      'surface-variant': '#E7E0EC',
      'surface-container': '#F5F0F4',
      'surface-low': '#D0C9D4',
      'surface-high': '#F5F0F4',
      'surface-highest': '#EBE6EA',
      'primary': '#006973',
      'on-primary': '#ffffff',
      'primary-container': '#95f1ff',
      'on-primary-container': '#001f24',
      'secondary': '#4a6267',
      'secondary-container': '#cde7ec',
      'on-secondary-container': '#051f23',
      'tertiary-container': '#ffd9e2',
      'on-tertiary-container': '#3e001d',
      'disabled': '#D0C9D4'
    },
    extend: {},
  },
  plugins: [],
}