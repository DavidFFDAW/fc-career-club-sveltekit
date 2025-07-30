import { ScoutingRepository } from '$lib/server/db/repository/ScoutingRepository';
import GeneralUtils from '$lib/utils/general.utils';

export async function GET({ locals }) {
	const scouting = new ScoutingRepository();
	const scoutingPlayers = await scouting.get();

	const csvContent = GeneralUtils.createCsv(
		scoutingPlayers,
		['id'],
	);

	const timestamp = Date.now();
	return new Response(csvContent, {
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': `attachment; filename=scouting-${timestamp}.csv`
		}
	});
}
