import { FiLoader } from 'react-icons/fi';

export const PageLoadingArea = () => {
	return (
		<div className="loadingArea">
			<h3 className="loadingMessage">Loading live data... </h3>
			<div className="loadingGraphic">
				<FiLoader className="spinner" />
			</div>
		</div>
	);
};
