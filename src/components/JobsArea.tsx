import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Jobs } from './Jobs';

export const JobsArea = () => {
	const { jobs, skillTotals, handleInfoBarToggle } = useContext(AppContext);

	return (
		<section className="jobArea">
			<div className="responsiveHeader">
				<h3 className="show_smartphone">{jobs.length} jobs</h3>
				<h3 className="show_computer">There are {jobs.length} jobs:</h3>
				<div className="skillsLink">
					<a href="#skills">{skillTotals.length} skills</a>
				</div>
			</div>
			<Jobs/>
		</section>
	);
};
