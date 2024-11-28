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
	safelist: [
		"position-1",
		"position-2",
		"position-3",
		"position-4",
		"position-5",
		"position-6",
		"position-7",
		"position-8",
		"position-9",
		"position-10",
		"position-11",
	],
	plugins: [],
};
