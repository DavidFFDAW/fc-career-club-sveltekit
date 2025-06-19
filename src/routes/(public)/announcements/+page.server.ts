import { PostRepository } from '$lib/server/db/repository/PostRepository.js';

export const load = async ({ locals }) => {
	const announcementRepository = new PostRepository();
	const announcements = await announcementRepository.get({
		where: {
			type: 'announcement'
		},
		orderBy: {
			created_at: 'desc'
		}
	});

	return { announcements };
};