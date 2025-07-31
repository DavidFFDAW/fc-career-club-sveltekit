import { GeneralUtils, slugify } from '$lib/utils/general.utils';
import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository';
import Helpers from '$lib/server/utils/server.helper.js';
import type { Prisma } from '@prisma/client';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const repository = new PlayerRepository();
		
		try {
			const appPlayers = await repository.select({ slug: true });
			const existingPlayers = appPlayers.map(player => player.slug);
			
			const headerKeys = formData.getAll('csv-header-item[]') as string[];
			const arrayDatas = GeneralUtils.getArrayFormDatas(formData,
				headerKeys.map((key) => `${key}[]`)
			);
			if (!arrayDatas || arrayDatas.length === 0) return Helpers.error('No data found in the CSV', 400);

			const playersObject = arrayDatas.map((data) => {
				const slug = data.slug || slugify(data.name);
				const player = {
					name: data['name'] || '',
					slug: slug,
					number: Number(data['number']) || 0,
					position: data['position'] || '',
					shirt_name: data['shirt_name'] || '',
					country: data['country'] || '',
					overall: Number(data['overall']) || 0,
					age: Number(data['age']) || 0,
					overall_increment: Number(data['overall_increment']) || null,
					status: (data['status'] as string) || 'active',
					type: existingPlayers.includes(slug) ? 'update' : 'create',
				};
				return player;
			});

			// const updatePlayers = playersObject.filter(player => player.type === 'update');
			const createPlayers = playersObject.filter(player => player.type === 'create');

			const createPlayersWithNoType = createPlayers.map(player => {
				const { type, ...rest } = player;
				return rest as Prisma.PlayersCreateInput;
			});

			if (createPlayers.length <= 0) return Helpers.error('No hay jugadores nuevos para importar', 400);
			await repository.bulkCreate(createPlayersWithNoType);
			return Helpers.success('Se han importado los jugadores correctamente', 200);
		} catch (error) {
			console.error('Error importing players:', error);
			Helpers.error('Failed to import players', 500);
		}
	}
};
