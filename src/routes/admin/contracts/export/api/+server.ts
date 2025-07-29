import { ContractsRepository } from '$lib/server/db/repository/ContractsRepository';
import Helpers from '$lib/server/utils/server.helper';
import GeneralUtils from '$lib/utils/general.utils.js';

export async function GET({ url }) {
	const exportType = url.searchParams.get('type') as 'csv' | 'json';
	const contractRepository = new ContractsRepository();

	if (!exportType || !['csv', 'json'].includes(exportType))
		return Helpers.api.error('Tipo de exportación no soportado', 400);

	try {
		const contracts = await contractRepository.getContractsWithPlayers();
		const formattedContracts = contracts.map(contract => ({
			...contract,
			player_name: contract.player ? contract.player.name : 'Desconocido',
			player_id: contract.player ? contract.player.id : null,
		}));

		if (exportType === 'csv') {
			const csvContent = GeneralUtils.createCsv(formattedContracts, ['id', 'start_date', 'end_date', 'created_at', 'updated_at', 'player']);
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
