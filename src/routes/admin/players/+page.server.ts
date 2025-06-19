import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository.js';

export const load = async ({ locals }) => {
	const playerRepository = new PlayerRepository();
	const players = await playerRepository.get();
	
	return { players: players };
};