import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository';
import Helpers from '$lib/server/utils/server.helper.js';

export const load = async ({ locals }) => {
	const playerRepository = new PlayerRepository();
	const players = await playerRepository.get();

	return { players: players };
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const playerRepository = new PlayerRepository();
		
		Helpers.tryCatch('Error al crear el jugador', async () => {
			const requiredFields = playerRepository.getRequiredFields();
			// const player = await playerRepository.create(formData);
			console.log(Object.fromEntries(formData.entries()));
			console.log({ requiredFields });

			return Helpers.error('Not implemented yet', 501);
			// return { player };
		});
	}
};
