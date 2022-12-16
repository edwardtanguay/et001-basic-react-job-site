import { useEffect, useState } from 'react';
import './App.scss';

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';

interface IJob {
	id: number;
	title: string;
	url: string;
	company: string;
	description: string;
	skillList: string;
	publicationDate: string;
}

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);

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
			<div className="jobs">
				{jobs.map((job) => {
					return (
						<div key={job.id} className="job">
							<div className="title">
								<a href={job.url} target="_blank">
									{job.title}
								</a>
							</div>
							<div className="company">{job.company}</div>
							<div className="publicationDate">{job.publicationDate}</div>
							<div className="skillList">{job.skillList}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
