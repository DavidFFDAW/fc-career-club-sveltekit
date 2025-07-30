import type { Scouting } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';
import Helpers from '$lib/server/utils/server.helper';

export class ScoutingRepository extends BaseRepository<
	Scouting,
	Prisma.ScoutingCreateInput,
	Prisma.ScoutingUpdateInput,
	Prisma.ScoutingWhereUniqueInput,
	Prisma.ScoutingFindManyArgs
> {
	constructor() {
		super('scouting');
	}

	private readonly requiredFields: string[] = ['player_name'];

	getObjectFromFormData(formData: FormData): Prisma.ScoutingCreateInput {
		const { error, message } = Helpers.checkRequiredFields(formData, this.requiredFields);
		if (error) throw new Error(message);

		return {
			player_name: formData.get('player_name') as string,
			player_supposed_price: Number(formData.get('player_supposed_price')) || 0,
			player_interest_type: formData.get('player_interest_type') as string,
			player_supposed_salary: Number(formData.get('player_supposed_salary')) || 0
		} as Prisma.ScoutingCreateInput;
	}
}
