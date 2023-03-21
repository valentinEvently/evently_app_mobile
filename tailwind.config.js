/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/screens/**/*.{js,ts,jsx,tsx}',
    './src/navigations/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F207A0',
        secondary: '#080029',
        inputPrimary: '#2D2649',
        inputMagenta: 'rgba(242, 75, 209, 0.3)',
        inputLightGray: '#CDCDCD',
        inputGray: '#BEBDBD',
        white: '#FFFFFF',
        degrade: 'rgba(0, 0, 0, 0.8)',
        borderBottom: '#E84776',
        inputMorado: '#A50285'
      }
    },
    textColor: {
      primary: '#FF69E1',
      // secondary: '#024873',
      secondary: '#BEBDBD',
      tertiary: '#6D7D8D',
      quaternary: '#98ABC0',
      lightGray: '#CDCDCD',
      darkGray: '#999999',
      darkGray400: '#595656',
      orange: '#FB9164',
      white: '#FFFFFF',
      borderBottom: '#E84776'
    }
  },
  plugins: []
}
