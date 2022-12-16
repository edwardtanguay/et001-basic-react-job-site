export interface IJob {
	id: number;
	title: string;
	url: string;
	company: string;
	description: string;
	skillList: string;
	skills: ISkill[];
	publicationDate: string;
}

export interface ISkill {
	idCode: string;
	name: string;
	url: string;
	description: string;
}
