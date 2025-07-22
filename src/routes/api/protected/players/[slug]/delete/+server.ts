import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository.js';
import Helpers from '$lib/server/utils/server.helper.js';

export async function DELETE ({ params }) {
	const { slug } = params;
	const playerRepository = new PlayerRepository();

	try {
		const player = await playerRepository.getBySlugOrId(slug);
		if (!player) return Helpers.api.message(`No se encontró el jugador con slug ${slug}`, 404);

		const deletedPlayer = await playerRepository.deleteByIdOrSlug(slug);
		if (!deletedPlayer) return Helpers.api.message(`No se ha podido el jugador con slug ${slug}`, 404);
        return Helpers.api.message(`Jugador con slug ${slug} eliminado con éxito`, 200);
    } catch (error) {
        console.error('Error deleting player:', error);
        return Helpers.api.message('Failed to delete player', 500);
    }
}