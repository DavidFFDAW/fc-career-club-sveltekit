import type { Prisma } from '@prisma/client';
import Helpers from '$lib/server/utils/server.helper.js';
import { ScoutingRepository } from '$lib/server/db/repository/ScoutingRepository';

export const load = async ({ url }) => {
	if (!url.searchParams.has('id'))
		return { upsertScouting: { isEditing: false, scoutingPlayer: {} } };

	const uid = url.searchParams.get('id');
	const ScoutingRepo = new ScoutingRepository();
	const scoutingPlayer = await ScoutingRepo.unique({ id: Number(uid) });
	if (!scoutingPlayer) return Helpers.redirect('/admin/scouting', 404);

	return {
		upsertScouting: {
			isEditing: true,
			scoutingPlayer
		}
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const action = Helpers.getFormAction(formData);
		const scoutingRepo = new ScoutingRepository();

		try {
			const upsertObject = scoutingRepo.getObjectFromFormData(formData);

			if (action === 'create') { 
				const scoutingPlayer = await scoutingRepo.create(upsertObject as Prisma.ScoutingCreateInput);
				return Helpers.success(
					`Jugador ${scoutingPlayer.player_name} creado correctamente`,
					201
				);
			}
			if (action === 'update') {
				const updateId = Helpers.getUpdatingId(formData);
				const scoutingPlayer = await scoutingRepo.update(
					{ id: updateId },
					upsertObject as Prisma.ScoutingUpdateInput
				);

				return Helpers.success(
					`Jugador ${scoutingPlayer.player_name} actualizado correctamente`,
					200
				);
			}

		} catch (error) {
			console.error(error);
			return Helpers.error('Ocurrió un error al procesar la solicitud', 500);
		}
	}
};
