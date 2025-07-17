import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository.js';
import Helpers from '$lib/server/utils/server.helper.js';

export const load = async ({ params }) => {
	if (!params.slug) return Helpers.redirect('/admin/players');

	const playersRepository = new PlayerRepository();
	const currentPlayer = await playersRepository.getBySlugOrId(params.slug);
	if (!currentPlayer) return Helpers.redirect('/admin/players');

	return {
		playerUpdate: {
			player: currentPlayer,
		}
	};
};

export const actions = {
	
};