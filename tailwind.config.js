/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./assets/**/*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "serif"],
				orbitron: ["Orbitron", "sans-serif"],
			},
			screens: {
				xs: "480px",
			},
		},
	},
	plugins: [],
};
