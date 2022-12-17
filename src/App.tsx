import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';
import { JobsArea } from './components/JobsArea';
import { SkillsArea } from './components/SkillsArea';
import { PageLoadingArea } from './components/PageLoadingArea';

function App() {
	const { jobs } = useContext(AppContext);

	return (
		<div className="App">
			<a id="jobs"></a>
			<h2>Get a Job</h2>
			<main className="content">
				{jobs.length === 0 ? (
					<PageLoadingArea />
				) : (
					<>
						<JobsArea />
						<SkillsArea />
					</>
				)}
			</main>
		</div>
	);
}

export default App;
