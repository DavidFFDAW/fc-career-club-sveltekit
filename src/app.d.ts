// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ClassicEditor: any;
	}
	interface Number {
		toPriceFormat(): string;
	}
	namespace App {
		interface Locals {
			user?: {
				id: string;
				email: string;
				name: string;
				avatar: string;
			};
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
