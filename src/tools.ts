import { IJob, ISkill } from './interfaces';

/**
 * expandSkillsInJobs fills skills property from skillList
 * 
 * example: expandSkillsInJobs(jobs1, skills1);
 * 
 */
export const expandSkillsInJobs = (jobs: IJob[], skills: ISkill[]) => {
	console.log(jobs.length, skills.length)
};
