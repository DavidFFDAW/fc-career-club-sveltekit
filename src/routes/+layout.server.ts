// import { redirect } from '@sveltejs/kit';

const getPageTitle = (pathname: string): string => {
	if (pathname === '/') return 'Club';
	
	const parts = pathname.split('/').filter(part => part);
	const lastPart = parts[parts.length - 1];
	
	if (lastPart === 'admin') return 'Gestor de Club';
	return lastPart.replace(/-/g, ' ').charAt(0).toUpperCase() + lastPart.slice(1);
}

const getBreadcrumbs = (pathname: string): { name: string, href: string }[] => {
	const pathSegments = pathname
		.split("/")
		.filter(Boolean)
		.map((segment, index, array) => {
			const href = "/" + array.slice(0, index + 1).join("/");
			const name = segment.replace(/-/g, " ");
			return { name, href };
		});
	
	return [
		{ name: 'home', href: '/' },
		...pathSegments
	];
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
            currentPath: `${url.origin}${url.pathname}`,
		},
		page: {
			breadcrumbs: getBreadcrumbs(url.pathname),
			isBlogPost,
			isPageAdmin,
		},
		title: title,
		user: locals.user || null,
		isUserAdmin: Boolean(locals.user),
		robots: isPageAdmin ? 'noindex, nofollow' : 'index, follow',
	};
};