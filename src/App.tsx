import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { IJob, ISkill, ISkillTotal } from './interfaces';
import * as tools from './tools';
import { FiLoader } from 'react-icons/fi';
import { InfoBar } from './components/InfoBar';
import React from 'react';

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';

function App() {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);
	const [skillTotals, setSkillTotals] = useState<ISkillTotal[]>([]);

	useEffect(() => {
		setTimeout(() => {
			(async () => {
				// build jobs
				const jobsResponse = await fetch(jobUrl);
				const _jobs = await jobsResponse.json();
				_jobs.sort((a: IJob, b: IJob) =>
					a.publicationDate > b.publicationDate ? -1 : 1
				);

				// build skills
				const skillsResponse = await axios.get(skillsUrl);
				const _skills: ISkill[] = skillsResponse.data;
				tools.expandSkillsInJobs(_jobs, _skills);
				_skills.forEach((_skill) => {
					_skill.isOpen = false;
				});

				// build skillTotals
				const _skillTotals = tools.getSkillTotals(_jobs);
				console.log(_skillTotals);

				setJobs(_jobs);
				setSkills(_skills);
				setSkillTotals(_skillTotals);
			})();
		}, 2000);
	}, []);

	const toggleSkillTotalIsOpen = (skillTotal: ISkillTotal) => {
		skillTotal.isOpen = !skillTotal.isOpen;
		setSkillTotals([...skillTotals]);
	};

	const handleInfoBarToggle = (skill: ISkill) => {
		skill.isOpen = !skill.isOpen;
		setSkills([...skills]);
	};

	return (
		<div className="App">
			<a id="jobs"></a>
			<h2>Get a Job</h2>
			<main className="content">
				{jobs.length === 0 ? (
					<div className="loadingArea">
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
								<h3 className="show_smartphone">
									{jobs.length} jobs
								</h3>
								<h3 className="show_computer">
									There are {jobs.length} jobs:
								</h3>
								<div className="skillsLink">
									<a href="#skills">
										{skillTotals.length} skills
									</a>
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
																	<React.Fragment key={skill.idCode}>
																		<div className="nameDescription">
																			<span
																				className="skill"
																				key={
																					skill.idCode
																				}
																				onClick={() =>
																					handleInfoBarToggle(
																						skill
																					)
																				}
																			>
																				{
																					skill.name
																				}
																			</span>
																			<span className="description">
																				- {
																					skill.description
																				}
																			</span>
																		</div>
																		{skill.isOpen && (
																			<div className="infoBox">
																				<InfoBar
																					skill={
																						skill
																					}
																				/>
																			</div>
																		)}
																	</React.Fragment>
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
								<h3>There are {skillTotals.length} skills:</h3>
								<div className="skillsLink">
									<a href="#jobs">jobs</a>
								</div>
							</div>
							<div className="skills">
								{skillTotals.map((skillTotal) => {
									return (
										<div className="skillWrapper" key={skillTotal.skill.idCode}>
											<div
												key={skillTotal.skill.idCode}
												className={`skill ${
													skillTotal.isOpen
														? 'isOpen'
														: 'isClosed'
												}`}
												onClick={() =>
													toggleSkillTotalIsOpen(
														skillTotal
													)
												}
											>
												<div className="name">
													<span className="total">
														{skillTotal.total}x
													</span>{' '}
													{skillTotal.skill.name}
												</div>
											</div>
											{skillTotal.isOpen && (
												<div className="skillInfo">
													<div className="description">
														{
															skillTotal.skill
																.description
														}
													</div>
													<InfoBar
														skill={skillTotal.skill}
													/>
												</div>
											)}
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
