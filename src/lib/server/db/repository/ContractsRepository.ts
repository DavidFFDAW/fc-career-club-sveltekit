import type { Contracts, Players } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';
import Helpers from '$lib/server/utils/server.helper';

export class ContractsRepository extends BaseRepository<
    Contracts,
    Prisma.ContractsCreateInput,
    Prisma.ContractsUpdateInput,
    Prisma.ContractsWhereUniqueInput,
    Prisma.ContractsFindManyArgs
> {
	protected requiredFields: string[] = ['player_id', 'price', 'salary', 'role', 'duration'];
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

	getContractByPlayerId(playerId: number): Promise<Contracts | null> {
		return this.prisma.contracts.findFirst({
			where: {
				player_id: playerId
			}
		});
	}

	createContract(formData: FormData): Promise<Contracts> {
		const { error, message } = Helpers.checkRequiredFields(formData, this.requiredFields);
		if (error) throw new Error(message);
		const playerId = Number(formData.get('player_id'));
		if (!playerId || isNaN(playerId)) throw new Error('Invalid player ID');
			
		const timestamp = Date.now();
		const object: Prisma.ContractsCreateInput = {
			player: {
				connect: { id: playerId }
			},
			price: parseFloat(formData.get('price') as string),
			salary: parseFloat(formData.get('salary') as string),
			role: formData.get('role') as string,
			duration: parseInt(formData.get('duration') as string, 10),
			start_date: new Date(timestamp),
			end_date: new Date(timestamp + (parseInt(formData.get('duration') as string, 10) * 30 * 24 * 60 * 60 * 1000)) // Assuming duration is in months
		};
			
		return this.create({
			...object,
		});
	}
	
	updateContract(
		id: number,
		formData: FormData
	): Promise<Contracts> {
		const localRequiredFields = this.requiredFields.filter(field => field !== 'player_id');
		const { error, message } = Helpers.checkRequiredFields(formData, localRequiredFields);
		if (error) throw new Error(message);
		
		const object: Prisma.ContractsUpdateInput = {
			price: parseFloat(formData.get('price') as string),
			salary: parseFloat(formData.get('salary') as string),
			role: formData.get('role') as string,
			duration: parseInt(formData.get('duration') as string, 10),
			start_date: new Date(),
			end_date: new Date(Date.now() + (parseInt(formData.get('duration') as string, 10) * 30 * 24 * 60 * 60 * 1000)) // Assuming duration is in months
		};
		
		return this.update({
			id: id,
		}, object);
	}
}
