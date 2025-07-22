import { PlayerRepository } from '$lib/server/db/repository/PlayerRepository';
import Helpers from '$lib/server/utils/server.helper.js';
import { slugify } from '$lib/utils/general.utils.js';

export const load = async () => {
	const playerRepository = new PlayerRepository();
	const players = await playerRepository.get();
	
    return { bulkPlayers: {
        players: players
        }
    };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
        const playerIds = formData.getAll('id[]') as string[];
        const images = formData.getAll('image[]') as string[];
        const names = formData.getAll('name[]') as string[];
        const numbers = formData.getAll('number[]') as string[];
        const positions = formData.getAll('position[]') as string[];

        const parsedPlayers = names.map((name, index) => {
            return {
                id: playerIds[index] ? parseInt(playerIds[index].trim(), 10) : null,
                name: name.trim(),
                image: images[index] ? images[index].trim() : null,
                number: numbers[index] ? Number(numbers[index]) : 0 as number,
                position: positions[index] ? positions[index].trim() : '',
            };
        }).filter(player => player.name);
        
		try {
            const repository = new PlayerRepository();
            await Promise.all(parsedPlayers.map(async (player) => {
                const { id, ...playerData } = player;
                if (id) {
                    return repository.update({
                        id: id,
                    }, playerData);
                }
            }));
            return Helpers.success('Se han actualizado los jugadores', 200);
		} catch (error) {
			console.error('Error creating player:', error);
			return Helpers.error('Failed to create player', 500);
		}
	}
};
