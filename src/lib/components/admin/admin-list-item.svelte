<script lang="ts">
	export let columns: number = 3;
	export let admin: boolean = false;
	export let responsiveColumns: number = 1;
</script>

<li class="w1 admin-list-item relative" style="--columns: {columns}; --responsive-columns: {responsiveColumns}" class:admin-list-header={admin}>
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
		font-size: 13px;
		letter-spacing: 0.05em;
		text-align: center;
	}
	
	@media only screen and (max-width: 768px) {
		.admin-list-item {
			grid-template-columns: repeat(var(--responsive-columns, 1), 1fr);
			padding: 10px;
		}
		.admin-list-item.admin-list-header {
			display: none;			
		}
	}
</style>
