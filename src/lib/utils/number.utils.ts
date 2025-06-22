export const NumberUtils = {
	formatPrice: (value: number): string => {
		if (isNaN(value)) return '0';
		return value.toLocaleString('es-ES', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 2
		});
	}
};

export default NumberUtils;
