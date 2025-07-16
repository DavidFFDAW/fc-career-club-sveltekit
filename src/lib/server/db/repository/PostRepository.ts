import type { Posts } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../BaseRepository';
import Helpers from '$lib/server/utils/server.helper';

export class PostRepository extends BaseRepository<
	Posts,
	Prisma.PostsCreateInput,
	Prisma.PostsUpdateInput,
	Prisma.PostsWhereUniqueInput,
	Prisma.PostsFindManyArgs
> {
    protected requiredFields: string[] = ['title', 'slug-title', 'content', 'excerpt', 'author'];
	
    constructor() {
		super('posts');
	}

	async getPostsAndAnnouncements(): Promise<{ posts: Posts[]; announcements: Posts[] }> {
		const posts = await this.get();
		return {
			posts: posts.filter(post => post.type !== 'announcement'),
			announcements: posts.filter(post => post.type === 'announcement')
		};
	}

	createPost(formData: FormData, type: 'post' | 'announcement'): Promise<Posts> {
        const { error, message } = Helpers.checkRequiredFields(formData, this.requiredFields);
        if (error) throw new Error(message);
        const thumbnail = formData.has('thumbnail') ? formData.get('thumbnail') as string : '/images/mandarinos-announcement.jpg';
        
        const timestamp = Date.now();
        const object: Prisma.PostsCreateInput = {
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
    ): Promise<Posts> {
        const { error, message } = Helpers.checkRequiredFields(formData, this.requiredFields);
        if (error) throw new Error(message);
        const thumbnail = formData.has('thumbnail') ? formData.get('thumbnail') as string : '/images/mandarinos-announcement.jpg';

		const object: Prisma.PostsUpdateInput = {
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
