import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { IJob, ISkill } from './interfaces';
import * as tools from './tools';

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(jobUrl);
			const _jobs = await response.json();
			_jobs.sort(
				(a: IJob, b: IJob) => a.publicationDate < b.publicationDate
			);
			setJobs(_jobs);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(skillsUrl);
			const _skills = response.data;
			setSkills(_skills);
		})();
	}, []);

	useEffect(() => {
		tools.expandSkillsInJobs(jobs, skills, setJobs);
	}, [jobs, skills]);

	return (
		<div className="App">
			<h2>Job Site</h2>
			<main className="content">
				<section className="jobArea">
					<h3>There are {jobs.length} jobs.</h3>
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
									<div className="publicationDate">
										{job.publicationDate}
									</div>
									<div className="skillList">
										{job.skillList}
									</div>
									<div className="skills">
										{job.skills && (
											<>Skills: {job.skills.length}</>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</section>
				<section className="skillArea">
					<h3>There are {skills.length} skills.</h3>
					<div className="skills">
						{skills.map((skill) => {
							return (
								<div key={skill.idCode} className="skill">
									<div className="name">
										<a target="_blank" href={skill.url}>
											{skill.name}
										</a>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
