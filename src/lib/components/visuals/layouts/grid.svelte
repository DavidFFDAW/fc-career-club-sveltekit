<script lang='ts'>
	export let minSize = 150;
	export let align = 'start';
	export let justify = 'start';
	export let gap: number = 10;
	export let items = 0;
</script>

<div class="grid botaniq-custom-grid" style="--min-size: {minSize}px; --align: {align}; --justify: {justify}; --gap: {gap}px; --items: {items}" class:botaniq-items-grid={Boolean(items)}>
  <slot />
</div>

<style>
	.grid.botaniq-custom-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--min-size), 1fr));
		align-items: var(--align);
		justify-items: var(--justify);
		gap: var(--gap);
	}
	.grid.grid.botaniq-custom-grid.botaniq-items-grid {
		grid-template-columns: repeat(var(--items), minmax(var(--min-size), 1fr));
	}
	
	@media only screen and (max-width: 768px) {
		.grid.botaniq-custom-grid,
		.grid.grid.botaniq-custom-grid.botaniq-items-grid {
			grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
		}
	}
</style>