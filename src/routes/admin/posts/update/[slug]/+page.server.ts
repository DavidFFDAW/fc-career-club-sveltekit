import { PostRepository } from '$lib/server/db/repository/PostRepository.js';
import Helpers from '$lib/server/utils/server.helper.js';

export const load = async ({ params }) => {
    const slug = params.slug;
	const postsRepository = new PostRepository();
	const updatingPost = await postsRepository.getRow({
		where: {
			type: { not: 'announcement' },
            slug: { equals: slug }
		},
	});
    console.log('Updating post:', updatingPost);
    
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
            const created = await postRepo.createPost(formData, 'post');
            if (!created) return Helpers.error('Error al crear el post', 500);
            return Helpers.success('Post creado correctamente', 201);
        } catch (error) {
            console.error('Error al crear el post:', error);
            return Helpers.error('Error al crear el post', 500);
        }
    },
};