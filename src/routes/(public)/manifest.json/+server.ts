import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const origin = url.origin;
	const pathname = url.pathname;

	if (pathname.startsWith('/inventory') || pathname.startsWith('/admin/inventory')) {
		return json({
			name: 'Scan & Stock',
			short_name: 'Scan & Stock',
			description: 'Aplicación para gestionar el inventario de tu casa',
			icons: [],
			start_url: `${origin}/admin/inventory`, // URL de inicio para homebar
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#000000'
		});
	}

	return json({
		name: 'Botaniq - Tu Jardín Digital',
		short_name: 'Botaniq',
		description:
			'Aplicación para gestionar las plantas de tu casa y convertirlo en tu jardín digital',
		icons: [],
		start_url: `${origin}/`,
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000'
	});
}
