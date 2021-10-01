import { ThemeProvider } from '@mui/material';
import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.css';
import { themeOptions } from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider theme={themeOptions}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default MyApp;
