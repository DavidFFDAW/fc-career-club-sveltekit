<script lang="ts">
	export let items: number;
	export let header: boolean = false;
</script>

<div class="grid list-item" class:header-list-item={header} data-items={items} style="--items: {items}">
	<slot></slot>
</div>

<style>
	.grid.list-item {
		display: grid;
		background-color: var(--white);
		grid-template-columns: repeat(var(--items), 1fr);
		place-items: center;
		align-items: center;
		border-radius: 12px;
		padding: 1rem;
		gap: 1rem;
	}

	.grid.list-item.header-list-item {
		background-color: var(--accent);
		color: var(--white);
		border-radius: 0;
		font-weight: 600;
		font-weight: 800;
		text-transform: uppercase;
	}
</style>
