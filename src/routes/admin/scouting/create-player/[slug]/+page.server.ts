import { ContractsRepository } from './../../../../../lib/server/db/repository/ContractsRepository';
import type { Prisma } from '@prisma/client';
import Helpers from '$lib/server/utils/server.helper.js';
import { ScoutingRepository } from '$lib/server/db/repository/ScoutingRepository';
import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository.js';

export const load = async ({ params }) => {
	if (!params.slug) return Helpers.redirect('/admin/scouting', 404);

	const slug = params.slug;
    const ScoutingRepo = new ScoutingRepository();
	const scoutingPlayers = await ScoutingRepo.getBySlugOrId(slug);
	if (!scoutingPlayers) return Helpers.redirect('/admin/scouting', 404);

    return {
		scoutingCreatePlayer: {
			scoutingPlayers,
		}
    };
};

export const actions = {
	default: async ({ request, params }) => {
		if (!params.slug) return Helpers.error('Slug is required', 400);
		const slug = params.slug;
        const formData = await request.formData();
        const playerRepo = new PlayerRepository();
		const contractRepo = new ContractsRepository();
		const scoutingRepo = new ScoutingRepository();

        try {
			const { error, message } = Helpers.checkRequiredFields(formData, [
				'name',
				'number',
				'age',
				'position',
				'overall',
				'country',
				'contract_salary',
				'contract_transfer_fee',
				'contract_role',
				'contract_duration',
            ]);
            if (error) return Helpers.error(message, 400);

			const playerData = playerRepo.getPlayerObject(formData);
			const player = await playerRepo.create(playerData as Prisma.PlayersCreateInput);
			if (!player) return Helpers.error('Error creating player', 500);

			const startDate = new Date();
			const endDate = new Date(startDate);
			const contractDuration = parseInt(formData.get('contract_duration') as string, 10) || 3;
			endDate.setFullYear(startDate.getFullYear() + contractDuration);

			const contractData: Prisma.ContractsCreateInput = {
				player: {
					connect: { id: player.id }
				},
				price: parseFloat(formData.get('contract_transfer_fee') as string),
				salary: parseFloat(formData.get('contract_salary') as string),
				role: formData.get('contract_role') as string,
				duration: contractDuration,
				start_date: startDate,
				end_date: endDate,
			};
			if (formData.has('contract_release_clause')) {
				contractData.termination_clause = parseFloat(formData.get('contract_release_clause') as string);
			}

			const contract = await contractRepo.create(contractData);
			if (!contract) return Helpers.error('Error creating contract', 500);

			const scoutingData = await scoutingRepo.deleteByIdOrSlug(slug);
			if (!scoutingData) return Helpers.error('Error deleting scouting data', 500);

            return Helpers.success('Se ha creado el nuevo jugador correctamente', 201);
        } catch (error) {
            console.error('Error fetching scouting player:', error);
            return Helpers.error('Error fetching scouting player', 500);
        }
	},
};
