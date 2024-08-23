import { App } from './App.js';
import { Console } from './Console.js';

Console.log(
	"%c🔒 Trying to bypass the authentication by hacking your way around in the code? No no no, we don't allow that at this time!",
);

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
