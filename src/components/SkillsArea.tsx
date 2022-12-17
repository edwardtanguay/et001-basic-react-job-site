import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { SkillTotal } from './SkillTotal';

export const SkillsArea = () => {
	const { skillTotals} =
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
						<SkillTotal skillTotal={skillTotal}/>
					);
				})}
			</div>
		</section>
	);
};