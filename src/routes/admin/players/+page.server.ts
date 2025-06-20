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
		const repository = new PlayerRepository();

		try {
			const requiredFields = repository.getRequiredFields();
			// const repository = await playerRepository.create(formData);
			console.log(Object.fromEntries(formData.entries()));
			console.log({ requiredFields });

			const playerName = formData.get('name') as string;
			const number = formData.get('number') as string;

			await repository.create({
				name: playerName,
				slug: playerName.toLowerCase().replace(/\s+/g, '-'),
				number: Number(number),
				position: formData.get('position') as string,
				role: formData.get('role') as string,
				shirt_name: formData.get('name') as string,
				country: formData.get('country') as string
			});

			return Helpers.success('Player created successfully', 201);
		} catch (error) {
			console.error('Error creating player:', error);
			return Helpers.error('Failed to create player', 500);
		}
	}
};
