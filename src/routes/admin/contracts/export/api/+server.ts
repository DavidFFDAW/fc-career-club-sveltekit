import { ContractsRepository } from '$lib/server/db/repository/ContractsRepository';
import Helpers from '$lib/server/utils/server.helper';
import GeneralUtils from '$lib/utils/general.utils.js';

export async function GET({ url }) {
	const exportType = url.searchParams.get('type') as 'csv' | 'json';
	const contractRepository = new ContractsRepository();

	if (!exportType || !['csv', 'json'].includes(exportType))
		return Helpers.api.error('Tipo de exportación no soportado', 400);

	try {
		const contracts = await contractRepository.get();
		if (exportType === 'csv') {
			const csvContent = GeneralUtils.createCsv(contracts, ['id', 'start_date', 'end_date', 'created_at', 'updated_at']);
			return new Response(csvContent, {
				headers: {
					'Content-Type': 'text/csv',
					'Content-Disposition': 'attachment; filename="contracts.csv"'
				}
			});
		}
		if (exportType === 'json') {
			return new Response(JSON.stringify(contracts), {
				headers: {
					'Content-Type': 'application/json',
					'Content-Disposition': 'attachment; filename="contracts.json"'
				}
			});
		} else {
			return Helpers.api.error('Tipo de exportación no soportado', 400);
		}
	} catch (error) {
		console.error('Error exporting contracts:', error);
		return Helpers.api.error('Failed to export contracts', 500);
	}
}
