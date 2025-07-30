import { GeneralUtils, slugify } from '$lib/utils/general.utils';
import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository';
import Helpers from '$lib/server/utils/server.helper.js';
import type { Prisma } from '@prisma/client';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const repository = new PlayerRepository();
		
		try {
			const appPlayers = await repository.get();
			const existingPlayers = appPlayers.map(player => player.slug);
			const headerKeys = formData.getAll('csv-header-item[]') as string[];
			const arrayDatas = GeneralUtils.getArrayFormDatas(formData,
				headerKeys.map((key) => `${key}[]`)
			);

			const playersObject = arrayDatas.map((data) => {
				const player = {
					name: data['name'] || '',
					slug: data['slug-name'] || slugify(data['name']),
					number: Number(data['number']) || 0,
					position: data['position'] || '',
					shirt_name: data['shirt_name'] || '',
					country: data['country'] || '',
					overall: Number(data['overall']) || 0,
					age: Number(data['age']) || 0,
					overall_increment: Number(data['overall_increment']) || null,
					status: (data['status'] as string) || 'active',
					type: existingPlayers.includes(data['slug-name'] || '') ? 'update' : 'create',
				};
				return player;
			});

			// const updatePlayers = playersObject.filter(player => player.type === 'update');
			const createPlayers = playersObject.filter(player => player.type === 'create');

			const createPlayersWithNoType = createPlayers.map(player => {
				const { type, ...rest } = player;
				return rest as Prisma.PlayersCreateInput;
			});

			if (createPlayers.length <= 0) return Helpers.error('No new players to create', 400);
			await repository.bulkCreate(createPlayersWithNoType);
			return Helpers.success('CSV data processed successfully', 200);



			// const players = formData.getAll('name[]') as string[];
			// if (!players || players.length === 0) return Helpers.error('No players provided', 400);

			// const keys = Array.from(formData.entries()).filter(([key]) => key.includes('[]'));
			// const uniqueKeys = new Set(keys.map(([key]) => key.replace('[]', '')));
			// if (uniqueKeys.size === 0) return Helpers.error('No valid player data provided', 400);

			// const playerFields = Array.from(uniqueKeys)
			// 	.map((key) => formData.getAll(`${key}[]`))
			// 	.filter((arr) => arr.length > 0);
			// const existingPlayers = await repository.get();
			// const nonExistingPlayers = players.filter(
			// 	(player) => !existingPlayers.some((existingPlayer) => existingPlayer.name === player)
			// );
			// const fields = nonExistingPlayers.map((_, index: number) => {
			// 	return playerFields.reduce((acc: Record<string, any>, field, fieldIndex) => {
			// 		const fieldName = Array.from(uniqueKeys)[fieldIndex];
			// 		acc[fieldName] = field[index] || '';
			// 		return acc;
			// 	}, {});
			// });

			// const parsedCreatingPlayers = fields.map((player) => {
			// 	return {
			// 		name: player.name,
			// 		slug: player['slug-name'] || '',
			// 		number: Number(player.number) || 0,
			// 		position: player.position || '',
			// 		shirt_name: player.shirt_name || '',
			// 		country: player.country || '',
			// 		overall: Number(player.overall) || 0,
			// 		age: Number(player.age) || 0,
			// 		overall_increment: Number(player.overall_increment) || null,
			// 		status: (player.status as string) || 'active',
			// 	} as Prisma.PlayersCreateInput;
			// }).filter((player) => player.name);
			
			// const createdPlayers = await repository.bulkCreate(parsedCreatingPlayers);
			// if (createdPlayers.length === 0) return Helpers.error('No players were created', 400);
			// return Helpers.success('Players imported successfully', 201);
		} catch (error) {
			console.error('Error importing players:', error);
			Helpers.error('Failed to import players', 500);
		}
	}
};
