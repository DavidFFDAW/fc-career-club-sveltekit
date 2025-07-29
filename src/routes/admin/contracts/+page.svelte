<script lang="ts">
	import PlayerShirt from '$lib/components/players/player-shirt.svelte';
	import AdminNoList from '$lib/components/visuals/admin-no-list.svelte';

	export let data;
</script>

<section class="contracts">
	<header class="page-title">
		<h1>Contratos</h1>
		<small>Gestiona los contratos de los jugadores del equipo.</small>

		<nav class="w1 flex">
			<a href="/admin/contracts/export/api?type=csv" class="block btn small success icon">
				<i class="bi bi-file-earmark-arrow-down"></i>
				<span>Exportar</span>
			</a>
			<a href="/admin/contracts/import" class="block btn small warning icon">
				<i class="bi bi-file-earmark-arrow-up"></i>
				<span>Importar</span>
			</a>
		</nav>
	</header>

	<div class="down">
		<AdminNoList list={data.contracts} text="No hay contratos disponibles">
			<ul class="w1 contracts-list flex column gap-small start astart">
				{#each data.contracts as contract}
					{#if contract.player}
						<li class="w1 block contract-item card flex start astart gap-small relative">
							<PlayerShirt name={contract.player.shirt_name} number={contract.player.number} />
							<div class="player-contract-info">
								<h2>{contract.player.name}</h2>
								<p>Duracion: {contract.duration} años</p>
								<p>
									Salario: {contract.salary.toLocaleString('es-ES', {
										style: 'currency',
										currency: 'EUR'
									})}
								</p>
								<p>
									Precio: {contract.price.toLocaleString('es-ES', {
										style: 'currency',
										currency: 'EUR'
									})}
								</p>
								<p>Rol: {contract.role}</p>
								<p>Posición: {contract.player.position}</p>
							</div>

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
						</li>
					{/if}
				{/each}
			</ul>
		</AdminNoList>
	</div>
</section>
