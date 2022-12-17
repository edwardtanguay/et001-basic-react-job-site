import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { InfoBar } from '../components/InfoBar';

export const SkillsArea = () => {
	const { jobs, skillTotals, toggleSkillTotalIsOpen } =
		useContext(AppContext);

	return (
		<section className="skillsArea">
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
									skillTotal.isOpen ? 'isOpen' : 'isClosed'
								}`}
								onClick={() =>
									toggleSkillTotalIsOpen(skillTotal)
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
										{skillTotal.skill.description}
									</div>
									<InfoBar skill={skillTotal.skill} />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
};