import { IJob, ISkill } from './interfaces';

/**
 * expandSkillsInJobs fills skills property from skillList
 * 
 * example: expandSkillsInJobs(jobs1, skills1);
 * 
 */
export const expandSkillsInJobs = (jobs: IJob[], skills: ISkill[], setJobs: (jobs: IJob[]) => {}) => {
	console.log(jobs.length, skills.length);
	jobs.forEach(job => {
		job.skills = [
			{
				name: 'nnn',
				idCode: 'iii',
				description: 'ddd',
				url: 'uuu'
			}
		]
	});
	console.log(jobs)
	setJobs([...jobs]);	
};
