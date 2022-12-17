import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';
import { FiLoader } from 'react-icons/fi';
import { InfoBar } from './components/InfoBar';
import React from 'react';

function App() {
	const { jobs, skillTotals, handleInfoBarToggle, toggleSkillTotalIsOpen } =
		useContext(AppContext);

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
																	<React.Fragment
																		key={
																			skill.idCode
																		}
																	>
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
																				-{' '}
																				{
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
										<div
											className="skillWrapper"
											key={skillTotal.skill.idCode}
										>
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
