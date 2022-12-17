import { ImInfo } from 'react-icons/im';
import { ImYoutube } from 'react-icons/im';
import { BsGoogle } from 'react-icons/bs';
import { ISkill } from '../interfaces';

interface IProps {
	skill: ISkill;
}

export const InfoBar = ({skill}: IProps) => {
	return (
		<div className="iconBar">
			<div className="iconWrapper">
				<a target="_blank" href={skill.url}>
					<ImInfo className="icon iconInfo" />
				</a>
			</div>

			<div className="iconWrapper">
				<a
					target="_blank"
					href={`https://www.google.com/search?q=${skill.idCode}+web+development`}
				>
					<BsGoogle className="icon iconGoogle" />
				</a>
				<div className="extra extraGoogle">en</div>
			</div>

			<div className="iconWrapper">
				<a
					target="_blank"
					href={`https://www.google.de/search?q=${skill.idCode}+web+development+deutsch`}
				>
					<BsGoogle className="icon iconGoogle" />
				</a>
				<div className="extra extraGoogle">de</div>
			</div>

			<div className="iconWrapper">
				<a
					target="_blank"
					href={`https://www.youtube.com/results?search_query=web+development+${skill.idCode}`}
				>
					<ImYoutube className="icon iconYoutube" />
				</a>
				<div className="extra extraYoutube">en</div>
			</div>

			<div className="iconWrapper">
				<a
					target="_blank"
					href={`https://www.youtube.com/results?search_query=web+development+deutsch+${skill.idCode}`}
				>
					<ImYoutube className="icon iconYoutube" />
				</a>
				<div className="extra extraYoutube">de</div>
			</div>
		</div>
	);
};
