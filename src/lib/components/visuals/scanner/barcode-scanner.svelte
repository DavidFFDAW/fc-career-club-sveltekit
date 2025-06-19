<script lang="ts">
	import Quagga from '@ericblade/quagga2';
	import type { OpenFoodProduct } from './openfoodfacts/openfood.models';
	import openfoodfacts from './openfoodfacts/openfoodfacts';
	import type { ProductData } from '$lib/types/interfaces';

	let barcode: string = '';
	let epcData: OpenFoodProduct | null = null;
	let scannerElement: HTMLDivElement;
	export let product: ProductData;
	let loading = false;
	
	const stopScanner = () => {
		Quagga.stop();
		Quagga.offDetected();
	};

	const startScanner = () => {
		initScanner();
	};

	const obtainEpcDetails = async (epc: string) => {
		loading = true;
		try {
			const response = await openfoodfacts.get(epc);
			stopScanner(); // Stop the scanner after fetching data
			if (!response) {
				alert('No product found for the scanned barcode.');
				return;
			}

			const openFoodData = response.product;
			epcData = openFoodData;
			if (response.product) {
				product.name = openFoodData.product_name || 'Unknown Product';
				product.expiration_date = openFoodData.expiration_date || 'Unknown Expiration Date';
				product.image = openFoodData.image_url || 'No Image Available';
				product.sku = barcode; // Set the scanned barcode as SKU
				console.log('Product data updated:', product);
			}
		} catch (error: any) {
			console.error('Error fetching EPC details:', error);
			alert('Error fetching EPC details. Please try again later. Error: ' + error.message);
		} finally {
			loading = false;
			// Handle any cleanup or final actions here if needed
		}
	};

	function initScanner() {
		if (!scannerElement) {
			console.error('Scanner element is not defined.');
			return;
		}

		Quagga.init(
			{
				inputStream: {
					name: 'Live',
					type: 'LiveStream',
					target: scannerElement, // Or '#yourElement' (optional)
					constraints: {
						facingMode: 'environment',
						width: 512,
						height: 512,
					}
				},
				decoder: {
					readers: [
						'ean_reader',
						'ean_8_reader',
						'upc_reader',
						'upc_e_reader',
						'code_128_reader',
						'code_39_reader',
						'code_39_vin_reader',
						'i2of5_reader',
						'2of5_reader',
						'code_93_reader',
						'codabar_reader',
					]
				},
				locate: true,
				numOfWorkers: 2,
				locator: {
					patchSize: 'medium',
					halfSample: true
				},
				debug: true // Draw boxes and lines for debugging
			},
			(err) => {
				if (err) {
					alert(err);
					Quagga.stop();
					return;
				}
				Quagga.start();
			}
		);

		Quagga.onDetected((data: any) => {
			if (loading) return; // Prevent multiple scans while loading
			alert('Barcode detected: ' + data.codeResult.code);
			console.log(data.codeResult.code);
			barcode = data.codeResult.code as string;
			if (barcode) obtainEpcDetails(barcode);
		});

		return Quagga;
	};
	
</script>

<div class="bar-code-scanner-mobile-block">
	{#if loading}
		<div class="overlay">
			<div class="loading-spinner"></div>
		</div>
	{/if}
	<div class="barcode-scanner-real-scanner" bind:this={scannerElement}></div>
	<div class="barcode-scanner-real-scanner-controls">
		<button type="button" on:click={startScanner}>Start Scanner</button>
		<button type="button" on:click={stopScanner}>Stop Scanner</button>
	</div>

	{#if barcode}
		<div class="barcode-scanner-real-scanner-result">
			<p>Scanned Value: {barcode}</p>
		</div>
	{/if}

	{#if epcData}
		<pre class="debug">
			{JSON.stringify(epcData, null, 4)}
		</pre>
	{/if}
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.overlay .loading-spinner {
		width: 50px;
		height: 50px;
		border: 5px solid #f3f3f3; /* Light grey */
		border-top: 5px solid #3498db; /* Blue */
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
