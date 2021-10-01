import { createTheme } from '@mui/material';

export const themeOptions = createTheme({
	palette: {
		primary: {
			main: '#03cc90',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#232734',
			paper: '#3f4354',
		},
		text: {
			primary: '#ffffff',
			secondary: 'rgba(255, 255, 255, 0.7)',
			disabled: 'rgba(255, 255, 255, 0.5)',
		},
	},
});
