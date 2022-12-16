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
			// load jobs
			const jobsResponse = await fetch(jobUrl);
			const _jobs = await jobsResponse.json();
			_jobs.sort(
				(a: IJob, b: IJob) => a.publicationDate < b.publicationDate
			);

			// load skills
			const skillsResponse = await axios.get(skillsUrl);
			const _skills = skillsResponse.data;

			tools.expandSkillsInJobs(_jobs, _skills);

			setJobs(_jobs);
			setSkills(_skills);
		})();
	}, []);

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
									<div className="header">
										<div className="title">
											<a href={job.url} target="_blank">
												{job.title}
											</a>
										</div>
										<div className="company">
											{job.company}
										</div>
										<div className="publicationDate">
											Posted: {job.publicationDate}
										</div>
									</div>
									<div className="skills">
										{job.skills && (
											<>
												{job.skills.map((skill) => {
													return (
														<div className="skill">
															<a
																href={skill.url}
																target="_blank"
															>
																{skill.name}
															</a>{' '}
															-{' '}
															{skill.description}
														</div>
													);
												})}
											</>
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
