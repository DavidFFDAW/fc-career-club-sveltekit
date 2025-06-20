import type { players } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';

export class PlayerRepository extends BaseRepository<
	players,
	Prisma.playersCreateInput,
	Prisma.playersUpdateInput,
	Prisma.playersWhereInput,
	Prisma.playersOrderByWithRelationInput
> {
	protected requiredFields: string[] = ['name', 'number', 'position'];

	constructor() {
		super('players');
	}
}
