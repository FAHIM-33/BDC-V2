
/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prim: "var(--primary)",
        sec: "var(--second)",
        low: 'var(--low)',
        mid: 'var(--mid)',
        high: 'var(--high)',
        background: 'var(--background)',
        fadegray: '#8f8f8f2d',
      }
    },
  },
  plugins: [],
}
