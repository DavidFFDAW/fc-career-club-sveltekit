<script lang='ts'>
	import { alerts } from "$lib/stores/toast";
</script>

<ul class="toast-list-container">
	{#each $alerts as alert}
		<li class="toast-list-item alert {alert.type}">
			<div class="toast-list-item-text">
				{alert.message}
			</div>
		</li>
	{/each}
</ul>

<style>
	.toast-list-container {
		position: fixed;
		top: 5px;
		right: 5px;
		z-index: 1000;
		width: 300px;
		max-height: 100vh;
		overflow-y: auto;
	}

	.toast-list-item {
		background-color: #fff;
		padding: 10px;
		margin: 5px;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.toast-list-item.alert.error {
		background-color: #f8d7da;
		color: #721c24;
	}
	.toast-list-item.alert.success {
		background-color: #d4edda;
		color: #155724;
	}

	.toast-list-item-text {
		font-size: 16px;
	}
</style>
