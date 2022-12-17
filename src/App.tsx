import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';
import { FiLoader } from 'react-icons/fi';
import { JobsArea } from './components/JobsArea';
import { SkillsArea } from './components/SkillsArea';

function App() {
	const { jobs} =
		useContext(AppContext);

	return (
		<div className="App">
			<a id="jobs"></a>
			<h2>Get a Job</h2>
			<main className="content">
				{jobs.length === 0 ? (
					<div className="loadingArea">
						<h3 className="loadingMessage">
							Loading live data...{' '}
						</h3>
						<div className="loadingGraphic">
							<FiLoader className="spinner" />
						</div>
					</div>
				) : (
					<>
						<JobsArea />
						<SkillsArea/>
					</>
				)}
			</main>
		</div>
	);
}

export default App;
