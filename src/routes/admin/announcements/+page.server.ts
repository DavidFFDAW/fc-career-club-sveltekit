import { PostRepository } from '$lib/server/db/repository/PostRepository.js';
import Helpers from '$lib/server/utils/server.helper';

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
	default: async ({ request }) => { 
		const formData = await request.formData();
		const announcementRepo = new PostRepository();
        const action = Helpers.getFormAction(formData);
        if (!action) return Helpers.error('Acción no especificada', 400);
		
		try {
            if (action === 'create') {
                const created = await announcementRepo.createPost(formData, 'announcement');
                if (!created) return Helpers.error('Error al crear el anuncio', 500);
                return Helpers.success('Anuncio creado correctamente', 201);
            }
            if (action === 'update') {
                const updateId = Helpers.getUpdatingId(formData);
                const updated = await announcementRepo.updatePost(updateId, formData, 'announcement');
                if (!updated) return Helpers.error('Error al actualizar el anuncio', 500);
                return Helpers.success('Anuncio actualizado correctamente', 200);
            }

		} catch (error) {
			console.error('Error al crear el anuncio:', error);
			return Helpers.error('Error al crear el anuncio', 500);
		}
	},
}