/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        bold: 700,
      },
      fontSize:{
        'info-bar':['13px', '15px']
      },
      borderRadius: {
        '8': '5px', // Define a custom class `rounded-8`
      },
      colors: {
        'primary': "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        "light-pink":"#e94560",
        "dark-pink":"#BA374D",
        "info-bar":"#114175",
        "social-icon-bg":"#0000005d",
        "main-bg":"#f7f9fd ",
        "light-pink-100":'#ffe1e6',
        "text-pink":"#ea6b87",
        "hover-light-pink":"#f4bec3",
        "google-blue":"#4285F4",
        "facebook-blue":"#3b5998",
        "google-blue-hover":"#357ae8",
        "facebook-blue-hover":"#2f477a",
      },
      width: {
        'search-min':'600px',
        'search-max':'700px',
        'search-card':'450px',
      },
      minHeight: {
        'seatch-card':'250px'
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'hero': "url('assets/images/collection-background.svg')",
        'card': "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: [],
}