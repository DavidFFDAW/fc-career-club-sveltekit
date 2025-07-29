import type { Prisma } from '@prisma/client';
import Helpers from '$lib/server/utils/server.helper.js';
import { ScoutingRepository } from '$lib/server/db/repository/ScoutingRepository';

export const load = async ({ url }) => {
	if (!url.searchParams.has('id'))
		return { isEditing: false, scoutingPlayer: {} };
	
	const uid = url.searchParams.get('id');
	const ScoutingRepo = new ScoutingRepository();
	const scoutingPlayer = await ScoutingRepo.unique({ id: Number(uid) });
	if (!scoutingPlayer) return Helpers.redirect('/admin/scouting', 404);

    return {
        isEditing: true,
        scoutingPlayer
    };
};

export const actions = {
    
};
