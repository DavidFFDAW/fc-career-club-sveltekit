import { PostRepository } from '$lib/server/db/repository/PostRepository.js';
import type { Posts } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { slug } = params;
	const announcementRepository = new PostRepository();
	const announcement = await announcementRepository.getBySlug(slug) as Posts;
	
	if (!announcement || announcement.type !== 'announcement') {
		return redirect(302, '/announcements');
	}

	return { announcement: announcement }
};