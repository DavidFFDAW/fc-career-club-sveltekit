export function dropImages(
	element: HTMLInputElement,
	callbackFunction: (files: File[]) => void
) {
	function onDrop(event: DragEvent) {
		event.preventDefault();
		callbackFunction(Array.from(event.dataTransfer?.files || []));
	}

	function onChange(event: Event) {
		event.preventDefault();
		const input = event.target as HTMLInputElement;
		callbackFunction(Array.from(input.files || []));
	}

	element.addEventListener('dragover', (event) => event.preventDefault());
	element.addEventListener('dragstart', (event) => event.preventDefault());
	element.addEventListener('drop', onDrop);
	element.addEventListener('change', onChange);

	return {
		destroy() {
			element.removeEventListener('dragover', (event) => event.preventDefault());
			element.removeEventListener('dragstart', (event) => event.preventDefault());
			element.removeEventListener('drop', onDrop);
			element.removeEventListener('change', onChange);
		}
	};
}