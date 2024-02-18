import { App } from './App.js';

try {
	App.getInstance().initialize();
} catch (error) {
	const exceptionAlertLines = [
		'------------------------------------',
		'BSOD (Bird Screen Of Death)',
		'------------------------------------',
		'Quacksident occured.',
		'',
		`${error.name}: ${error.message}`,
		'',
		"It's not a duckup, it's a feature.",
		'Open the element inspector to deduck this feature.',
	];
	alert(exceptionAlertLines.join('\n'));
	throw error;
}
