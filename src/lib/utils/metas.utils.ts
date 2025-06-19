import type { posts } from "@prisma/client"

export const specificGeneralMetas = {
	base: {
		title: 'Mandarinos - Panel de gestión',
		description: 'Panel de gestión para el club de fútbol Mandarinos',
		image: '/images/mandarinos-announcement.png'
	},
	twitter: {
		title: 'Mandarinos - Panel de gestión',
		description: 'Panel de gestión para el club de fútbol Mandarinos',
		image: '/images/mandarinos-announcement.png'
	},
	openGraph: {
		title: 'Mandarinos - Panel de gestión',
		description: 'Panel de gestión para el club de fútbol Mandarinos',
		image: '/images/mandarinos-announcement.png'
	}
}

export const getSpecificMetasFromPost = (post: posts) => {
	const postTitle = post.type === 'announcement'
		? `Comunicado oficial: ${post.title}`
		: post.title;
	const postImage = post.type === 'announcement'
		? '/images/mandarinos-announcement.jpg'
		: post.thumbnail || '/images/mandarinos-announcement.jpg';

	return {
		base: {
			title: postTitle,
			description: post.excerpt || '',
			image: postImage
		},
		twitter: {
			title: postTitle,
			description: post.excerpt || '',
			image: postImage
		},
		openGraph: {
			title: postTitle,
			description: post.excerpt || '',
			image: postImage
		}
	}
}