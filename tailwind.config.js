module.exports = {
	darkMode: 'class',
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		backgroundImage: {
			'main': "url('/public/asset.png')"
		}
	  },
	},
	plugins: [],
  }