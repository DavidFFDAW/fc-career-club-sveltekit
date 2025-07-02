import { PostRepository } from "$lib/server/db/repository/PostRepository";

export const load = async () => {
	const postsRepo = new PostRepository();
	const posts = await postsRepo.get();

	return {
		posts: posts.filter(post => post.type !== 'announcement'),
		announcements: posts.filter(post => post.type === 'announcement')
	};
};