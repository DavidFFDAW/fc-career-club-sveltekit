import Helpers from '$lib/server/utils/server.helper.js';

export async function DELETE ({ params }) {
    const { slug } = params;
    console.log(`Attempting to delete player with slug: ${slug}`);
    try {
        return Helpers.api.message(`Player with slug ${slug} deleted successfully`, 200);
    } catch (error) {
        console.error('Error deleting player:', error);
        return Helpers.api.message('Failed to delete player', 500);
    }
}