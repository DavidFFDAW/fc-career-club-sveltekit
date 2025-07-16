import { ContractsRepository } from '$lib/server/db/repository/ContractsRepository.js';

export const load = async () => {
	const contractRepository = new ContractsRepository();
	const contracts = await contractRepository.getContractsWithPlayers();
	return { contracts }
};

export const actions = {};