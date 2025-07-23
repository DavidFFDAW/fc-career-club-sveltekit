export type CSVDatas = {
	header: string[];
	datas: Record<string, string>[];
};

export const slugify = (text: string) => {
	return text
		.trim()
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[ÀÁÂÃÄÅ]/g, 'a')
		.replace(/[àáâãäå]/g, 'a')
		.replace(/[ÈÉÊË]/g, 'e')
		.replace(/[èéêë]/g, 'e')
		.replace(/[ÌÍÎÏ]/g, 'i')
		.replace(/[ìíîï]/g, 'i')
		.replace(/[ÒÓÔÕÖ]/g, 'o')
		.replace(/[òóôõö]/g, 'o')
		.replace(/[ÙÚÛÜ]/g, 'u')
		.replace(/[ùúûü]/g, 'u')
		.replace(/[Ñ]/g, 'n')
		.replace(/[ñ]/g, 'n')
		.replace(/[Ç]/g, 'c')
		.replace(/[ç]/g, 'c')
		.replace(/[ÿ]/g, 'y')
		.replace(/[ý]/g, 'y')
		.replace(/[Æ]/g, 'ae')
		.replace(/[æ]/g, 'ae')
		.replace(/[Ø]/g, 'oe')
		.replace(/[ø]/g, 'oe')
		.replace(/[Å]/g, 'aa')
		.replace(/[å]/g, 'aa')
		.replace(/[Þ]/g, 'th')
		.replace(/[þ]/g, 'th')
		.replace(/[Ð]/g, 'd')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/[()$?&`'"=!¿¡]/gi, '')
		.replace(/^-+|-+$/g, '')
		.replace(/^the-/i, ''); // remove leading 'the-' if present
};

export function readFile(
	file: File | Blob,
	type: 'text' | 'dataURL' = 'text',
	reader: FileReader = new FileReader()
): Promise<string | ArrayBuffer> {
	return new Promise((resolve, reject) => {
		reader.onload = () => {
			resolve(reader.result as string | ArrayBuffer);
		};
		reader.onerror = reject;
		const callback = type === 'text' ? reader.readAsText : reader.readAsDataURL;
        if (!file) {
            return reject(new Error('No file provided'));
        }
        callback.call(reader, file);
	});
}

export function createCsv(data: Record<string, unknown>[], exceptions: string[] = []) {
	const header = Object.keys(data[0]).filter(key => {
		return !exceptions.includes(key);
	}).join(',');

	const rows = data.map(item => {
		return Object.entries(item).filter(([key, _]) => {
			return !exceptions.includes(key);
		}).map(([_, value]) => value?.toString().replace(/,/g, ' ').replace(/\n/g, ' '));
	}).join('\n');

	return `${header}\n${rows}`;
}

export function readCsvContent(csv: string): CSVDatas {
	const lines = csv.split('\n').map(line => line.trim()).filter(line => line);
	const header = lines[0].split(',').map(col => col.trim());

	return {
		header: header,
		datas: lines.slice(1).map(line => {
			const values = line.split(',').map(value => value.trim());
			return header.reduce((obj, key, index) => {
				obj[key] = values[index] || '';
				return obj;
			}, {} as Record<string, string>);
		}
		),
	};
}

export const GeneralUtils = {
	slugify: slugify,
	generateRandomIdentifier: (length: number) =>
		Math.random()
			.toString(36)
			.substring(2, 2 + length),
	readFile: readFile,
	createCsv: createCsv,
};
export default GeneralUtils;
