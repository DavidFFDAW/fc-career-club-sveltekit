import type { Contracts, Players } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';

export class ContractsRepository extends BaseRepository<
    Contracts,
    Prisma.ContractsCreateInput,
    Prisma.ContractsUpdateInput,
    Prisma.ContractsWhereUniqueInput,
    Prisma.ContractsFindManyArgs
> {
    constructor() {
        super('contracts');
	}
	
	getContractsWithPlayers(): Promise<(Contracts & { player: Players })[]> {
		return this.prisma.contracts.findMany({
			include: {
				player: true	
			}
		});
	}
}
