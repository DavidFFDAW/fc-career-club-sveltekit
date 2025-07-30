import type { Players } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';
import { slugify } from '$lib/utils/general.utils';
import prisma from '../prisma';

export class PlayerRepository extends BaseRepository<
	Players,
	Prisma.PlayersCreateInput,
	Prisma.PlayersUpdateInput,
	Prisma.PlayersWhereInput,
	Prisma.PlayersFindManyArgs
> {
	protected requiredFields: string[] = [
		'name',
		'shirt_name',
		'overall',
		'number',
		'age',
		'position',
		'country'
	];

	constructor() {
		super('players');
	}

	getPlayerObject(data: FormData): Prisma.PlayersCreateInput {
		const playerName = data.get('name') as string;
		const shirtName = data.get('shirt_name') as string || playerName;

		const playerData: Prisma.PlayersCreateInput = {
			name: playerName,
			slug: slugify(playerName),
			number: Number(data.get('number')),
			position: data.get('position') as string,
			shirt_name: shirtName,
			country: data.get('country') as string,
			overall: Number(data.get('overall')),
			age: Number(data.get('age')),
			overall_increment: Number(data.get('overall_increment')) || null,
			status: (data.get('status') as string) || 'active',
		} as Prisma.PlayersCreateInput;
		
		if (data.has('thumbnail')) {
			playerData.image = data.get('thumbnail') as string;
		}

		return playerData;
	}
}
