export const DateUtils = {
	formatDate: (date: Date | null, includeTime: boolean = false) => {
		if (!date) return null;
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		};
		
		if (includeTime) {
			options.hour = '2-digit';
			options.minute = '2-digit';
			options.second = '2-digit';
		}

		return date.toLocaleDateString('es-ES', options);
	},
}
export default DateUtils;