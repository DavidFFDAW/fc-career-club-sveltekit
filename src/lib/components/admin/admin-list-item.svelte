<script lang="ts">
	export let columns: number = 3;
	export let admin: boolean = false;
</script>

<li class="w1 admin-list-item" style="--columns: {columns}" class:admin-list-header={admin}>
	<slot />
</li>

<style>
	.admin-list-item {
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		border: 1px solid #eee;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
		place-items: start;
		align-items: center;
		padding: 10px 15px;
	}
	.admin-list-item.admin-list-header {
		background: var(--color);
		font-weight: bold;
		color: #fff;
		border-bottom: 2px solid #ddd;
		box-shadow: none;
		padding: 15px 20px;
		font-size: 1.1em;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
