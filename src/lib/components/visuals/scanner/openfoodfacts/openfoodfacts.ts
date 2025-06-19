import type { OpenFoodResponse } from './openfood.models';

export const openfoodfacts = {
	get: async (epc: string) => {
		const url = `https://world.openfoodfacts.org/api/v0/product/${epc}.json`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});
		if (!response.ok) return null;

		const openfoodfactsResponse: OpenFoodResponse = await response.json();
		return openfoodfactsResponse;
	}
};
export default openfoodfacts;
