import { PostRepository } from "$lib/server/db/repository/PostRepository";

export const load = async () => {
	const postsRepo = new PostRepository();
	const posts = await postsRepo.getPostsAndAnnouncements();

	return {
		posts: posts.posts,
		announcements: posts.announcements
	};
};