import type { Scouting } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';

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
}
