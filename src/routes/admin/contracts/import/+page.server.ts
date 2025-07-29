import { ContractsRepository } from '$lib/server/db/repository/ContractsRepository';
import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository.js';
import Helpers from '$lib/server/utils/server.helper.js';
import GeneralUtils from '$lib/utils/general.utils.js';
import type { Prisma } from '@prisma/client';

export const load = async () => {
	const playersRepository = new PlayerRepository();
	const players = await playersRepository.get({
		select: {
			id: true,
			name: true
		}
	});

	return {
		contractImport: {
			players: players
		}
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const arraydObject = GeneralUtils.getArrayFormDatas(formData, [
			'player_id[]',
			'player_name[]',
			'price[]',
			'salary[]',
			'role[]',
			'duration[]',
			'price_percentage[]',
			'termination_clause[]'
		]);

		try {
			const contractsRepository = new ContractsRepository();
			const creatingContractData = arraydObject.map((contractData) => {
				return {
					player_id: Number(contractData.player_id),
					price: Number(contractData.price),
					salary: Number(contractData.salary),
					role: contractData.role,
					duration: Number(contractData.duration),
					price_percentage: Number(contractData.price_percentage),
					termination_clause: Number(contractData.termination_clause)
				} as Prisma.ContractsCreateInput;
			});

			await contractsRepository.deleteAll();
			await contractsRepository.bulkCreate(creatingContractData);
			return Helpers.success('Contratos creados exitosamente');
		} catch (error) {
			console.error('Error creating contracts:', error);
			return Helpers.error('Error al crear los contratos', 500);
		}
	}
};
