import type { Prisma } from '@prisma/client';
import Helpers from '$lib/server/utils/server.helper.js';
import { ScoutingRepository } from '$lib/server/db/repository/ScoutingRepository';

export const load = async () => {
    const ScoutingRepo = new ScoutingRepository();
    const scoutingPlayers = await ScoutingRepo.get();

    return {
        scoutingPlayers: scoutingPlayers.map(player => ({
            ...player,
            interest_type:
                player.player_interest_type === 'transfer'
                    ? 'Traspaso'
                    : player.player_interest_type === 'loan'
                      ? 'Cesión'
                      : 'Desconocido',
        })),
    };
};

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const scoutingRepo = new ScoutingRepository();

        try {
            const { error, message } = Helpers.checkRequiredFields(formData, [
                'player_name',
                'interest_type',
                'stimated_price',
                'stimated_salary',
            ]);
            if (error) return Helpers.error(message, 400);

            const scoutingPlayer = {
                player_name: formData.get('player_name') as string,
                player_interest_type: formData.get('interest_type') as string,
                player_supposed_price: parseFloat(formData.get('stimated_price') as string),
                player_supposed_salary: parseFloat(formData.get('stimated_salary') as string),
            } as Prisma.ScoutingCreateInput;

            const createdPlayer = await scoutingRepo.create(scoutingPlayer);
            if (!createdPlayer) return Helpers.error('Error creating scouting player', 500);
            return Helpers.success('Se ha creado el jugador ojeado correctamente', 201);
        } catch (error) {
            console.error('Error fetching scouting player:', error);
            return Helpers.error('Error fetching scouting player', 500);
        }
    },
};
