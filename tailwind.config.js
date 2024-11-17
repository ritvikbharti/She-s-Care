export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    colors:{
      primary_hard : '#5a5fed',
      primary_dark : '#202445',
      regal_blue: '#272d4d',
      secondary_dark : '#333a65',
      primary_gray : 'rgb(148 163 184)',
      dark : {
        400 : '#464f8b',
        600 : '#333a65',
        900 : '#272d4d'
      },
      white : '#fff',
      primary :{
        text : {
          100 : '#9094b5'
        }
      }
    }, 
    extend: {
    },
  },
  plugins: [],
}