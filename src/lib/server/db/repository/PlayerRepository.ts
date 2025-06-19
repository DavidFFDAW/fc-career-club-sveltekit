import type { players } from '@prisma/client';
import { Prisma} from '@prisma/client';
import { BaseRepository } from '../BaseRepository';

export class PlayerRepository extends BaseRepository<
  players,
  Prisma.postsCreateInput,
  Prisma.postsUpdateInput,
  Prisma.postsWhereUniqueInput,
  Prisma.postsFindManyArgs
> {
  constructor() {
    super('players');
  }
}