import { IJob, ISkill } from './interfaces';

/**
 * expandSkillsInJobs fills skills property from skillList
 * 
 * example: expandSkillsInJobs(jobs1, skills1);
 * 
 */
export const expandSkillsInJobs = (jobs: IJob[], skills: ISkill[]) => {
	jobs.forEach((job: IJob) => {
		const idCodes = job.skillList.split(',').map((m) => m.trim());
		job.skills = [];
		idCodes.forEach((idCode) => {
			const skill: ISkill | undefined = skills.find(
				(skill: ISkill) => skill.idCode === idCode
			);
			if (skill) {
				job.skills.push(skill);
			}
		});
	});
};
