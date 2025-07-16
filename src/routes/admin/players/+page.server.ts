import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository';
import Helpers from '$lib/server/utils/server.helper.js';
import { slugify } from '$lib/utils/general.utils.js';

export const load = async () => {
	const playerRepository = new PlayerRepository();
	const players = await playerRepository.get();

	const playerPositionCount = players.reduce((acc: Record<string, number>, player) => {
		const position = player.position || 'Desconocido';
		acc[position] = (acc[position] || 0) + 1;
		return acc;
	}, {});

	return { players: players, count: playerPositionCount };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const repository = new PlayerRepository();

		try {
			const requiredFields = repository.getRequiredFields();
			const { error, message } = Helpers.checkRequiredFields(formData, requiredFields);
			if (error) return Helpers.error(message, 400);

			const playerName = formData.get('name') as string;
			const existingPlayer = await repository.getBySlug(slugify(playerName));
			if (existingPlayer) return Helpers.error('Player with this name already exists', 400);

			const creatingPlayerObject = repository.getPlayerObject(formData);
			await repository.create(creatingPlayerObject);

			return Helpers.success('Player created successfully', 201);
		} catch (error) {
			console.error('Error creating player:', error);
			return Helpers.error('Failed to create player', 500);
		}
	}
};
