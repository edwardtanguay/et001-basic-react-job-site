import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Job } from './Job';

export const Jobs = () => {
	const { jobs } = useContext(AppContext);

	return (
		<div className="jobs">
			{jobs.map((job) => {
				return <Job key={job.id} job={job} />;
			})}
		</div>
	);
};
