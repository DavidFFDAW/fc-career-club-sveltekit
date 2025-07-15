import type { posts } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';
import Helpers from '$lib/server/utils/server.helper';

export class PostRepository extends BaseRepository<
	posts,
	Prisma.postsCreateInput,
	Prisma.postsUpdateInput,
	Prisma.postsWhereUniqueInput,
	Prisma.postsFindManyArgs
> {
    protected requiredFields: string[] = ['title', 'slug-title', 'content', 'excerpt', 'author'];
	
    constructor() {
		super('posts');
	}

	createPost(formData: FormData, type: 'post' | 'announcement'): Promise<posts> {
        const { error, message } = Helpers.checkRequiredFields(formData, this.requiredFields);
        if (error) throw new Error(message);
        const thumbnail = formData.has('thumbnail') ? formData.get('thumbnail') as string : '/images/mandarinos-announcement.jpg';
        
        const timestamp = Date.now();
        const object: Prisma.postsCreateInput = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            thumbnail: thumbnail,
            excerpt: formData.get('excerpt') as string,
            slug: formData.get('slug-title') as string,
            author: formData.get('author') as string,
            published: formData.get('published') === 'true',
            published_at: new Date(timestamp),
            type: type,
        };
        
		return this.create({
			...object,
		});
	}

    updatePost(
        id: number,
        formData: FormData,
        type: 'post' | 'announcement'
    ): Promise<posts> {
        const { error, message } = Helpers.checkRequiredFields(formData, this.requiredFields);
        if (error) throw new Error(message);
        const thumbnail = formData.has('thumbnail') ? formData.get('thumbnail') as string : '/images/mandarinos-announcement.jpg';

		const object: Prisma.postsUpdateInput = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            thumbnail: thumbnail,
            excerpt: formData.get('excerpt') as string,
            slug: formData.get('slug-title') as string,
            author: formData.get('author') as string,
            published: formData.get('published') === 'true',
			published_at: new Date(),
            type: type,
		};
		
		if (formData.has('category')) object.category = formData.get('category') as string;

        return this.update({
            id: id,
        }, object);
    }
}
