import { PostRepository } from '$lib/server/db/repository/PostRepository.js';
import Helpers from '$lib/server/utils/server.helper.js';

export const load = async ({ params, url }) => {
	if (!url.searchParams.has('slug')) return {
		upsertPost: {
			post: null,
			param_slug: null,
		}
	};

    const slug = params.slug;
	const postsRepository = new PostRepository();
	const updatingPost = await postsRepository.getRow({
		where: {
			type: { not: 'announcement' },
            slug: { equals: slug }
		},
	});
    
    if (!updatingPost) return Helpers.redirect('/admin/posts', 302);

	return {
		post: updatingPost,
        param_slug: slug,
	};
};

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const postRepo = new PostRepository();

		try {
			const updateId = Helpers.getUpdatingId(formData);
            const updatedPost = await postRepo.updatePost(updateId, formData, 'post');
            if (!updatedPost.id) return Helpers.error('Error al actualizar el post', 500);
            return Helpers.success('Post creado correctamente', 201);
        } catch (error) {
			console.error('Error al actualizar el post:', error);
            return Helpers.error('Error al actualizar el post', 500);
        }
    },
};