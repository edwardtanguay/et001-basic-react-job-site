import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { IJob, ISkill } from './interfaces';
import * as tools from './tools';
import { FaSpinner } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);

	useEffect(() => {
		setTimeout(() => {
			(async () => {
				const jobsResponse = await fetch(jobUrl);
				const _jobs = await jobsResponse.json();
				_jobs.sort((a: IJob, b: IJob) =>
					a.publicationDate > b.publicationDate ? -1 : 1
				);

				const skillsResponse = await axios.get(skillsUrl);
				const _skills = skillsResponse.data;

				tools.expandSkillsInJobs(_jobs, _skills);

				setJobs(_jobs);
				setSkills(_skills);
			})();
		}, 2000);
	}, []);

	return (
		<div className="App">
			<a id="jobs"></a>
			<h2>Get a Job</h2>
			<main className="content">
				{jobs.length === 0 ? (
					<div>
						<h3 className="loadingMessage">
							Loading live data...{' '}
						</h3>
						<div className="loadingGraphic">
							<FiLoader className="spinner" />
						</div>
					</div>
				) : (
					<>
						<section className="jobArea">
							<div className="responsiveHeader">
								<h3>There are {jobs.length} jobs:</h3>
								<div className="skillsLink">
									<a href="#skills">skills</a>
								</div>
							</div>
							<div className="jobs">
								{jobs.map((job) => {
									return (
										<div key={job.id} className="job">
											<div className="header">
												<div className="title">
													<a
														href={job.url}
														target="_blank"
													>
														{job.title}
													</a>
												</div>
												<div className="company">
													{job.company}
												</div>
												<div className="publicationDate">
													Posted:{' '}
													{job.publicationDate}
												</div>
											</div>
											<div className="skills">
												{job.skills && (
													<>
														{job.skills.map(
															(skill) => {
																return (
																	<div className="skill">
																		<a
																			href={
																				skill.url
																			}
																			target="_blank"
																		>
																			{
																				skill.name
																			}
																		</a>{' '}
																		-{' '}
																		{
																			skill.description
																		}
																	</div>
																);
															}
														)}
													</>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</section>
						<section className="skillArea">
							<a id="skills"></a>
							<div className="responsiveHeader">
								<h3>There are {skills.length} skills:</h3>
								<div className="skillsLink">
									<a href="#jobs">jobs</a>
								</div>
							</div>
							<div className="skills">
								{skills.map((skill) => {
									return (
										<div
											key={skill.idCode}
											className="skill"
										>
											<div className="name">
												<a
													target="_blank"
													href={skill.url}
												>
													{skill.name}
												</a>
											</div>
										</div>
									);
								})}
							</div>
						</section>
					</>
				)}
			</main>
		</div>
	);
}

export default App;
