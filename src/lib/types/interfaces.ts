export interface SpecificMetas {
	base: {
		title: string;
		description: string;
		image: string;
	};
	openGraph: {
		title: string;
		description: string;
		image: string;
	};
	twitter: {
		title: string;
		description: string;
		image: string;
	};
}

export interface EntityWithId {
	id: number | string;
}

export interface Slide {
	title: string;
	description: string;
	image: string;
}

export interface ProductData {
	name: string;
	expiration_date: string;
	image: string;
	sku: string;
}
