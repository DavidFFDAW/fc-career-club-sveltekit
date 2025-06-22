<script lang="ts">
	import Input from '$lib/components/forms/input.svelte';

	interface ImportingPlayer {
		name: string;
		shirt_name: string;
		number: number;
		position: string;
		role: string;
		overall: number;
		overall_increment: number;
		age: number;
		country: string;
		price: number;
		price_percentage: number;
		salary: number;
		termination_clause: number;
		status: string;
	}

	let csv: File | null = null;
	let csvData: ImportingPlayer[] = [];

	const readCsvDatas = async (file: File): Promise<any[]> => {
		const text = (await file.text()).replace(/(\r\n|\n|\r)/g, '\n'); // Normalizar saltos de línea
		const rows = text.split('\n').map((row) => row.split(','));
		const realRows = rows.slice(1); // Ignorar la primera fila si es el encabezado
		csvData = realRows.map((row) => {
			const [
				name,
				shirt_name,
				number,
				position,
				role,
				overall,
				overall_increment,
				age,
				country,
				price,
				price_percentage,
				salary,
				termination_clause,
				status
			] = row;
			return {
				name,
				shirt_name,
				number: parseInt(number, 10),
				position,
				role,
				overall: parseInt(overall, 10),
				overall_increment: parseInt(overall_increment, 10),
				age: parseInt(age, 10),
				country,
				price: parseFloat(price),
				price_percentage: parseFloat(price_percentage),
				salary: parseFloat(salary),
				termination_clause: parseFloat(termination_clause),
				status
			};
		});

		return csvData;
	};

	const changeFiles = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		csv = input.files ? input.files[0] : null;
		if (csv) {
			const data = await readCsvDatas(csv);
			console.log(data); // Aquí puedes manejar los datos leídos del CSV
		}
	};

	const dropCsv = (event: DragEvent) => {
		event.preventDefault();
		const files = event.dataTransfer?.files;
		csv = files ? files[0] : null;
	};
</script>

<div class="container">
	<h1>Importar jugadores</h1>
	<div class="dropzone down">
		<p>
			{csv
				? `Archivo seleccionado: ${csv.name}`
				: 'Arrastra y suelta un archivo CSV aquí o selecciona uno'}
		</p>
		<input
			type="file"
			accept=".csv"
			on:change|preventDefault={changeFiles}
			on:dragover|preventDefault
			on:dragenter|preventDefault
			on:dragstart|preventDefault
			on:drop|preventDefault={dropCsv}
		/>
	</div>
</div>

{#if csvData.length > 0}
	<ul class="importing-players-datas w1 flex column start astart gap-medium">
		{#each csvData as player}
			<li class="w1 box player-box-item">
				<div class="w1 flex start acenter player-name">
					<Input label="Nombre" type="text" bind:value={player.name} name="name[]" required />
					<Input
						type="text"
						label="Nombre en camiseta"
						bind:value={player.shirt_name}
						name="shirt_name[]"
						required
					/>
					<Input label="Dorsal" type="number" bind:value={player.number} required name="number[]" />
				</div>

				<div class="player-details">
					<Input
						type="text"
						bind:value={player.position}
						label="Posición"
						required
						name="position[]"
					/>
					<Input type="text" bind:value={player.role} label="Rol" required name="role[]" />
					<Input
						type="number"
						bind:value={player.overall}
						label="Overall"
						required
						name="overall[]"
					/>
					<Input
						type="number"
						bind:value={player.overall_increment}
						label="Incremento Overall"
						required
						name="overall_increment[]"
					/>
					<Input type="number" bind:value={player.age} label="Edad" required name="age[]" />
					<Input type="text" bind:value={player.country} label="País" required name="country[]" />
					<Input type="number" bind:value={player.price} label="Precio" required name="price[]" />
					<Input
						type="number"
						bind:value={player.price_percentage}
						label="Porcentaje Precio"
						required
						name="price_percentage[]"
					/>
					<Input
						type="number"
						bind:value={player.salary}
						label="Salario"
						required
						name="salary[]"
					/>
					<Input
						type="number"
						bind:value={player.termination_clause}
						label="Cláusula de Rescisión"
						required
						name="termination_clause[]"
					/>
					<Input type="text" bind:value={player.status} label="Estado" required name="status[]" />
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.dropzone {
		width: 100%;
		min-width: 300px;
		min-height: 200px;
		position: relative;
		border: 2px dashed #ccc;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		background-color: #f9f9f9;
		cursor: pointer;
	}

	.dropzone input[type='file'] {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>
