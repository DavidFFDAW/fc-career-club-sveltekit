import players from '$lib/server/db/players.js';

export const load = async ({ locals }) => {
	const list = await players.get();
	return { players: list };
};