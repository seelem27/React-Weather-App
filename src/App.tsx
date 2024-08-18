import { useContext } from 'react';
import './App.css';
import Weather from './pages/Weather';
import ThemeContext from './context/ThemeContext';

function App() {
	const {darkTheme}= useContext(ThemeContext);

	return (
		<div className={`${darkTheme ? 'dark' : 'light'} min-h-screen antialiased font-custom`}>
			<Weather />
		</div>
	)
}

export default App
