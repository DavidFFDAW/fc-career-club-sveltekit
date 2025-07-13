import { PostRepository } from '$lib/server/db/repository/PostRepository.js';
import Helpers from '$lib/server/utils/server.helper.js';

export const load = async () => {
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

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const postRepo = new PostRepository();

        try {
            const created = await postRepo.createPost(formData, 'post');
            if (!created) return Helpers.error('Error al crear el post', 500);
            return Helpers.success('Post creado correctamente', 201);
        } catch (error) {
            console.error('Error al crear el post:', error);
            return Helpers.error('Error al crear el post', 500);
        }
    },
};