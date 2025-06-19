import { redirect } from '@sveltejs/kit';

const getPageTitle = (pathname: string): string => {
	if (pathname === '/') return 'Club';
	
	const parts = pathname.split('/').filter(part => part);
	const lastPart = parts[parts.length - 1];
	
	if (lastPart === 'admin') return 'Gestor de Club';
	return lastPart.replace(/-/g, ' ').charAt(0).toUpperCase() + lastPart.slice(1);
}

export const load = async ({ url, locals, params }) => {
	const pathRoute = url.pathname === '/' ? 'home' : url.pathname.slice(1).replace(/\//g, '-');
	const isPageAdmin = url.pathname.startsWith('/admin');
	const canonical = url.href;
	const title = getPageTitle(url.pathname);
	const pathname = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
	const isBlogPost = (url.pathname.startsWith('/blog') && params.slug) || (url.pathname.startsWith('/announcements') && params.slug)
	
	if (isPageAdmin && !locals.user) {
		// return redirect(302, '/login');
	}
	
	return {
		url: {
			pathname,
			canonical,
			path: url.pathname,
			origin: url.origin,
			href: url.href,
			route: pathRoute,
		},
		page: {
			isBlogPost,
			isPageAdmin,
		},
		title: title,
		isUserAdmin: Boolean(locals.user),
		robots: isPageAdmin ? 'noindex, nofollow' : 'index, follow',
	};
};