import { useEffect, useState } from 'react';
import './App.scss';

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';

function App() {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(jobUrl);
			const _jobs = await response.json();
			setJobs(_jobs);
		})();
	}, []);

	return (
		<div className="App">
			<h2>Job Site</h2>
			<p>There are {jobs.length} jobs.</p>
		</div>
	);
}

export default App;
