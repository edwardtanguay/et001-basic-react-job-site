import { useContext } from 'react';
import { AppContext } from '../AppContext';
import React from 'react';
import { IJob } from "../interfaces";
import { InfoBar } from '../components/InfoBar';

interface IProps {
	job: IJob;
}
export const Job = ({ job }: IProps) => {
	const { jobs, handleInfoBarToggle } = useContext(AppContext);

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
												handleInfoBarToggle(skill)
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
											<InfoBar skill={skill} />
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
};
