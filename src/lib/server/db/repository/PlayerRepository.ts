import type { Players } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';
import { slugify } from '$lib/utils/general.utils';

export class PlayerRepository extends BaseRepository<
	Players,
	Prisma.PlayersCreateInput,
	Prisma.PlayersUpdateInput,
	Prisma.PlayersWhereInput,
	Prisma.PlayersOrderByWithRelationInput
> {
	protected requiredFields: string[] = [
		'name',
		'shirt_name',
		'overall',
		'number',
		'age',
		'position',
		'role',
		'salary',
		'price',
		'country'
	];

	constructor() {
		super('players');
	}

	getPlayerObject(data: FormData): Prisma.PlayersCreateInput {
		const playerName = data.get('name') as string;

		return {
			name: playerName,
			slug: slugify(playerName),
			number: Number(data.get('number')),
			position: data.get('position') as string,
			role: data.get('role') as string,
			shirt_name: data.get('name') as string,
			country: data.get('country') as string,
			overall: Number(data.get('overall')),
			age: Number(data.get('age')),
			salary: Number(data.get('salary')),
			price: Number(data.get('price')),
			price_percentage: Number(data.get('price_percentage')) || null,
			overall_increment: Number(data.get('overall_increment')) || null,
			status: (data.get('status') as string) || 'active',
			termination_clause: Number(data.get('termination_clause')) || null
		} as Prisma.PlayersCreateInput;
	}
}
