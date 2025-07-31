import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository';
import Helpers from '$lib/server/utils/server.helper.js';

export const load = async () => {
	const playerRepository = new PlayerRepository();
	const players = await playerRepository.get();

	return {
		bulkPlayers: {
			players: players
		}
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		try {
			const repository = new PlayerRepository();
			const formDataArray = Helpers.general.getArrayFormDatas(formData, [
				'id[]',
				'image[]',
				'name[]',
				'number[]',
				'position[]'
			]);

			const parsedPlayers = formDataArray
				.map((data) => {
					return {
						id: data.id ? parseInt(data.id.trim(), 10) : null,
						name: data.name ? data.name.trim() : '',
						image: data.image ? data.image.trim() : null,
						number: data.number ? Number(data.number) : 0,
						position: data.position ? data.position.trim() : ''
					};
				})
				.filter((player) => player.name);

			if (parsedPlayers.length === 0) return Helpers.error('No hay jugadores para actualizar', 400);

			await Promise.all(
				parsedPlayers.map(async (player) => {
					const { id, ...playerData } = player;
					if (id) {
						return repository.update(
							{
								id: id
							},
							playerData
						);
					}
				})
			);
			return Helpers.success('Se han actualizado los jugadores', 200);
		} catch (error) {
			console.error('Error creating player:', error);
			return Helpers.error('Failed to create player', 500);
		}
	}
};
