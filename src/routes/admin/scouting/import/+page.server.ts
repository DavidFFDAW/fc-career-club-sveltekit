import type { Prisma } from '@prisma/client';
import Helpers from '$lib/server/utils/server.helper.js';
import { ScoutingRepository } from '$lib/server/db/repository/ScoutingRepository';
import GeneralUtils from '$lib/utils/general.utils.js';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const scoutingRepo = new ScoutingRepository();
		const dataArray = GeneralUtils.getArrayFormDatas(
			formData,
			['player_name[]', 'player_supposed_price[]', 'player_interest_type[]', 'player_supposed_salary[]']
		);

		try {
			const creatingScoutingData = dataArray.map((data) => {
				return {
					player_name: data.player_name,
					player_supposed_price: Number(data.player_supposed_price) || 0,
					player_interest_type: data.player_interest_type,
					player_supposed_salary: Number(data.player_supposed_salary) || 0
				} as Prisma.ScoutingCreateInput;
			});

			await scoutingRepo.deleteAll();
			await scoutingRepo.bulkCreate(creatingScoutingData);
			return Helpers.success('Jugadores ojeados importados exitosamente');
		} catch (error) {
			console.error(error);
			return Helpers.error('Ocurrió un error al procesar la solicitud', 500);
		}
	}
};
