import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { InfoBar } from '../components/InfoBar';

export const Jobs = () => {
	const { jobs, handleInfoBarToggle } = useContext(AppContext);

	return (
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
							<div className="company">{job.company}</div>
							<div className="publicationDate">
								Posted: {job.publicationDate}
							</div>
						</div>
						<div className="skills">
							{job.skills && (
								<>
									{job.skills.map((skill) => {
										return (
											<React.Fragment key={skill.idCode}>
												<div className="nameDescription">
													<span
														className="skill"
														key={skill.idCode}
														onClick={() =>
															handleInfoBarToggle(
																skill
															)
														}
													>
														{skill.name}
													</span>
													<span className="description">
														- {skill.description}
													</span>
												</div>
												{skill.isOpen && (
													<div className="infoBox">
														<InfoBar
															skill={skill}
														/>
													</div>
												)}
											</React.Fragment>
										);
									})}
								</>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};