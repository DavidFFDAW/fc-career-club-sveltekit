import { ContractsRepository } from '$lib/server/db/repository/ContractsRepository.js';
import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository.js';
import Helpers from '$lib/server/utils/server.helper.js';
import type { Contracts } from '@prisma/client';

export const load = async ({ params }) => {
	if (!params.slug) return Helpers.redirect('/admin/players');

	const playersRepository = new PlayerRepository();
	const currentPlayer = await playersRepository.getBySlugOrId(params.slug);
	if (!currentPlayer) return Helpers.redirect('/admin/players');

	const contractsRepository = new ContractsRepository();
	const contractDatas = await contractsRepository.getContractByPlayerId(currentPlayer.id);
	const isEditing = Boolean(contractDatas);

	return {
		playerContract: {
			player: currentPlayer,
			contract: contractDatas || ({} as Contracts),
			isEditing: isEditing
		}
	};
};

export const actions = {};