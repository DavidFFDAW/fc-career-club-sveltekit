import { PostRepository } from '$lib/server/db/repository/PostRepository.js';

export const load = async ({ locals, parent }) => {
	const t = await parent();
	const postsRepository = new PostRepository();
	const posts = await postsRepository.get({
		where: {
			type: { not: 'announcement' }
		},
		orderBy: {
			created_at: 'desc'
		}
	});

	return {
		posts: posts,
	};
};