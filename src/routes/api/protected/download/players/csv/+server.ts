import { PlayerRepository } from "$lib/server/db/repository/PlayerRepository";
import type { Players } from "@prisma/client";

export async function GET() {
	const headers = new Headers({
		'Content-Type': 'text/csv',
		'Content-Disposition': 'attachment; filename=players-template.csv',
	});

	const keys: Array<keyof Players> = [
		'id', 'name', 'shirt_name', 'slug', 'overall', 'overall_increment', 'number', 'age', 'position', 'country', 'status'
	];

	const playersRepository = new PlayerRepository();
	const players = await playersRepository.get();
	const csvContent = players.map((player: Players) => {
		return keys.map((key) => {
			const value = player[key];
			return `${value}`; // Wrap in quotes to handle commas in values
		}).join(',');
	}).join('\n');

	const csvHeader = keys.join(',') + '\n';
	const csvData = csvHeader + csvContent;

	return new Response(csvData, {
		headers: headers,
		status: 200,
	});
}