/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors:{
 "button":"#338573",
    },
    extend: {
      screens:{
        'sm-max': { 'max': '771px' },
        'smm-max': { 'max': '680px' },
        'smmm-max': { 'max': '565px' },
        "col":{'max':'525px'},
        'smmm-maxx': { 'max': '435px' },
        'minn': { 'max': '390px' },
      },
      fontFamily :{
        'poppins':"Poppins",
        "logoo":"Nato Sans Hebrew",
      }
    },
    lineHeight:{
      "1":"5rem",
    },
    borderRadius:{
      "button":"0.625rem",
    },
    fontSize:{
      "logo":"2.5rem",
      "btntxt":"1.5rem",
      "headertxt":"3.375rem",
      "headersubtxt":"1.25rem"
    }
  },
  plugins: [],
}

