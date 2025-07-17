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

export const actions = {
	default: async ({ request }) => {		
		const formData = await request.formData();
		const action = Helpers.getFormAction(formData);
		if (!action) return Helpers.error('Acción no válida', 400);
		
		try {
			const contractRepository = new ContractsRepository();
			if (action !== 'create_contract' && action !== 'update_contract')
				return Helpers.error('Acción no válida', 400);

			if (action === 'create_contract') {
				await contractRepository.createContract(formData);
				return Helpers.success('Contrato creado exitosamente', 201);
			}

			if (action === 'update_contract') {
				const updateId = Helpers.getUpdatingId(formData);
				await contractRepository.updateContract(updateId, formData);
				return Helpers.success('Contrato actualizado exitosamente', 200);
			}

			return Helpers.error('Acción no válida', 400);
		} catch (error) {
			console.error('Error processing form data:', error);
			return Helpers.error('Error processing form data', 500);
		}
	}
};