import { useEffect } from 'react';
import './App.scss';

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';

function App() {
	useEffect(() => {
		(async () => {
      const response = await fetch(jobUrl);
      const jobs = await response.json();
		})();
	}, []);

	return (
		<div className="App">
			<h2>Job Site</h2>
			<p>This is the job site.</p>
		</div>
	);
}

export default App;
