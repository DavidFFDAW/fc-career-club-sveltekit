import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository.js';

export const load = async ({ locals }) => {
	const playersRepository = new PlayerRepository();
	return { players: await playersRepository.get() }
};