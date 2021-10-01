import flagsISO from './flags.json';

const FLAG_DB_URI =
	'https://raw.githubusercontent.com/AlfieGoldson/flags/master/flags/flags-iso/flat';

export const flags = flagsISO.map((iso: string, size = 64) => ({
	iso,
	src: `${FLAG_DB_URI}/${size}/${iso}.png`,
}));

export const flagOptions = flagsISO.map((iso: string) => ({
	value: iso,
	label: iso,
}));

console.log(flags);
