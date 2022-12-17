import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { InfoBar } from '../components/InfoBar';
import { ISkillTotal } from '../interfaces';

interface IProps {
	skillTotal: ISkillTotal;
}
export const SkillTotal = ({ skillTotal }: IProps) => {
	const { toggleSkillTotalIsOpen } = useContext(AppContext);

	return (
		<div className="skillWrapper" key={skillTotal.skill.idCode}>
			<div
				key={skillTotal.skill.idCode}
				className={`skill ${skillTotal.isOpen ? 'isOpen' : 'isClosed'}`}
				onClick={() => toggleSkillTotalIsOpen(skillTotal)}
			>
				<div className="name">
					<span className="total">{skillTotal.total}x</span>{' '}
					{skillTotal.skill.name}
				</div>
			</div>
			{skillTotal.isOpen && (
				<div className="skillInfo">
					<div className="description">
						{skillTotal.skill.description}
					</div>
					<InfoBar skill={skillTotal.skill} />
					<div className="subJobList">
						{skillTotal.jobs.map((job) => {
							return (
								<div className="job">
									<span className="date">{job.publicationDate}</span> <a href={job.url} target="_blank">{job.title}</a>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
