<script lang="ts">
	export let data;
</script>

<section class="contracts">
	<header class="page-title">
		<h1>Contratos</h1>
		<small>Gestiona los contratos de los jugadores del equipo.</small>
	</header>

	<div class="down">
		<table class="w1 table custom-table">
			<thead>
				<tr>
					<th>Jugador</th>
					<th>Duración</th>
					<th>Salario</th>
					<th>Precio</th>
					<th>Rol</th>
					<th>Posición</th>
					<th>Acciones</th>
				</tr>
			</thead>

			<tbody>
				{#each data.contracts as contract}
					<tr class="contract-item">
						<td aria-readonly="true">
							{contract.player.name}
						</td>
						<td>{contract.duration} años</td>
						<td
							>{contract.salary.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td
						>
						<td>{contract.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td
						>
						<td>{contract.player.role}</td>
						<td>{contract.player.position}</td>
						<td class="relative">
							<div class="button-group">
								<a
									type="button"
									href="{data.url.path}/update/{contract.id}"
									class="btn small warn"
									aria-label="Editar"
								>
									<i class="bi bi-pencil"></i>
								</a>
								<button type="button" class="btn small danger" aria-label="Eliminar">
									<i class="bi bi-trash"></i>
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
