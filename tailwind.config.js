/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
   theme: {
     extend: {},
     colors: {
       'lightBlack': '#1b1e28',
       'lightGray': '#8590a5',
       'hover': '#d7e4ec'
     },
   },
   daisyui: {
     themes: [],
   },
   plugins: [ require('flowbite/plugin'), require("daisyui")],
 }
 
 