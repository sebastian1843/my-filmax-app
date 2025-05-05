module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Para buscar clases en la carpeta app (si la usas)
    './pages/**/*.{js,ts,jsx,tsx}', // Para buscar clases en las páginas
    './components/**/*.{js,ts,jsx,tsx}', // Para buscar clases en los componentes
  ],
  theme: {
    extend: {}, // Si deseas personalizar el tema más adelante
  },
  plugins: [], // Si deseas usar plugins de Tailwind
}
