module.exports = {
	content: ['./src/routes/**/*.{svelte,js,ts}'],
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				garden: {
					...require('daisyui/src/colors/themes')['[data-theme=garden]'],
					primary: 'blue',
					'primary-focus': 'mediumblue'
				}
			}
		]
	}
};
