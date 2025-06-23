export interface EntityWithId {
	id: number | string;
}

export interface Slide {
	title: string;
	description: string;
	image: string;
}

export interface PartialPlayer {
	name: string;
	shirt_name: string;
	number: number;
	position: string;
	role: string;
	overall: number;
	overall_increment: number | null | undefined;
	age: number;
	country: string;
	price: number;
	price_percentage: number | null | undefined;
	salary: number;
	termination_clause: number | null | undefined;
	status: string;
}

export interface SlugifiedPlayer extends PartialPlayer {
	slug: string;
}
