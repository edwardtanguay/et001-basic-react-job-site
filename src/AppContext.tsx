import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IJob, ISkill, ISkillTotal } from './interfaces';
import * as tools from './tools';

interface IAppContext {
	jobs: IJob[];
	skillTotals: ISkillTotal[];
	handleInfoBarToggle: (skill: ISkill) => void;
	toggleSkillTotalIsOpen: (skillTotal: ISkillTotal) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const jobUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';
const mockApiWaitSeconds = 1;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);
	const [skillTotals, setSkillTotals] = useState<ISkillTotal[]>([]);

	useEffect(() => {
		setTimeout(() => {
			(async () => {

				// build jobs
				const jobsResponse = await fetch(jobUrl);
				const _jobs = await jobsResponse.json();
				_jobs.sort((a: IJob, b: IJob) =>
					a.publicationDate > b.publicationDate ? -1 : 1
				);

				// build skills
				const skillsResponse = await axios.get(skillsUrl);
				const _skills: ISkill[] = skillsResponse.data;
				tools.expandSkillsInJobs(_jobs, _skills);
				_skills.forEach((_skill) => {
					_skill.isOpen = false;
				});

				// build skillTotals
				const _skillTotals = tools.getSkillTotals(_jobs);

				setJobs(_jobs);
				setSkills(_skills);
				setSkillTotals(_skillTotals);
			})();
		}, mockApiWaitSeconds * 1000);
	}, []);

	const toggleSkillTotalIsOpen = (skillTotal: ISkillTotal) => {
		skillTotal.isOpen = !skillTotal.isOpen;
		setSkillTotals([...skillTotals]);
	};

	const handleInfoBarToggle = (skill: ISkill) => {
		skill.isOpen = !skill.isOpen;
		setSkills([...skills]);
	};

	return (
		<AppContext.Provider
			value={{
				jobs,
				skillTotals,
				handleInfoBarToggle,
				toggleSkillTotalIsOpen,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
