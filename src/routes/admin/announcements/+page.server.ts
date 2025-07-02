import { PostRepository } from '$lib/server/db/repository/PostRepository.js';
import Helpers from '$lib/server/utils/server.helper';
import type { Prisma } from '@prisma/client';

export const load = async () => {
	const announcementsRepo = new PostRepository();
	const announcements = await announcementsRepo.get({
		where: {
			type: 'announcement',
		},
	});

	return { announcements: announcements };
};

export const actions = {
	create: async ({ request }) => { 
		const formData = await request.formData();
		const announcementRepo = new PostRepository();
		
		try {
			const requiredFields = ['title', 'slug-title', 'content', 'thumbnail', 'excerpt', 'author'];
			const { error, message } = Helpers.checkRequiredFields(formData, requiredFields);
			if (error) return Helpers.error(message, 400);

			const timestamp = Date.now();
			const object: Prisma.postsCreateInput = {
				title: formData.get('title') as string,
				content: formData.get('content') as string,
				type: 'announcement',
				thumbnail: formData.get('thumbnail') as string,
				excerpt: formData.get('excerpt') as string,
				slug: formData.get('slug-title') as string,
				author: formData.get('author') as string,
				published: formData.get('published') === 'true',
				published_at: new Date(timestamp),
			};

			const created = await announcementRepo.create(object);
			if (!created) return Helpers.error('Error al crear el anuncio', 500);
			return Helpers.success('Anuncio creado correctamente', 201);

		} catch (error) {
			console.error('Error al crear el anuncio:', error);
			return Helpers.error('Error al crear el anuncio', 500);
		}
	},
	copy: async ({ request }) => {
		const formData = await request.formData();
		const announcementRepo = new PostRepository();

		try {
			const copyId = Helpers.getUpdatingId(formData);
			const announcement = await announcementRepo.unique({ id: copyId });
			if (!announcement) return Helpers.error('Anuncio no encontrado', 404);

			const { id, ...baseAnnouncement } = announcement;
			baseAnnouncement.slug = `${baseAnnouncement.slug}-copy-${Date.now()}`;
			const copied = await announcementRepo.create(baseAnnouncement);
			if (!copied) return Helpers.error('Error al duplicar el anuncio', 500);
			return Helpers.success('Anuncio duplicado correctamente', 201);
		} catch (error) {
			console.error('Error al duplicar el anuncio:', error);
			return Helpers.error('Error al duplicar el anuncio', 500);
		}
	}
}