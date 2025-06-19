import type { posts } from '@prisma/client';
import { Prisma} from '@prisma/client';
import { BaseRepository } from '../BaseRepository';

export class PostRepository extends BaseRepository<
  posts,
  Prisma.postsCreateInput,
  Prisma.postsUpdateInput,
  Prisma.postsWhereUniqueInput,
  Prisma.postsFindManyArgs
> {
  constructor() {
    super('posts');
  }
}