<script lang="ts">
	export let page: number;
	export let elements: number;
	export let itemsPerPage: number = 10;

	$: pages = Array.from({ length: Math.ceil(elements / itemsPerPage) }, (_, i) => i + 1);
</script>

<div class="pagination">
	<div class="pagination-container">
		{#if page > 1}
			<a href="?page={page - 1}" class="btn">
				Anterior
			</a>
		{/if}

		{#each pages as _, i}
			{#if page === (i + 1)}
				<span class="non-navigateable-link">
					<span class="btn active" aria-current="page">{i + 1}</span>
				</span>
			{:else}
				<a
					id="page-{i + 1}"
					href={`?page=${i + 1}`}
					class="btn {i + 1 === page ? 'active' : ''}"
					aria-current={i + 1 === page ? 'page' : undefined}
				>
					{i + 1}
				</a>
			{/if}
		{/each}

		{#if page < pages.length}
			<a href={`?page=${pages}`} class="btn">
				Siguiente
			</a>
		{/if}
	</div>
</div>

<style>
	.pagination {
		display: flex;
		justify-content: center;
		margin: 1rem 0;
		padding: 0 1rem;
	}

	.pagination-container {
		display: flex;
		gap: 0.5rem;
		padding: 5px 0;
		overflow: hidden;
		overflow-x: auto;
	}

	.pagination .pagination-container .btn {
		padding: 0.2rem 1rem;
		border: 2px solid var(--green-light);
		color: var(--green);
		background: transparent;
		text-decoration: none;
		border-radius: 4px;
	}
	.pagination .pagination-container .btn.active {
		background-color: var(--green-light);
		color: var(--white);
	}
</style>
