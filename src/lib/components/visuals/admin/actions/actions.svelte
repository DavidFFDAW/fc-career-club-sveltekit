<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "../../icon.svelte";

	let actions: HTMLDivElement;
	let open = false;
	export let position: "left" | "right" = "right";
	const toggle = () => (open = !open);

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (actions && !actions.contains(event.target as Node)) {
				open = false;
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});
</script>

<div class="actions-popup-container {$$restProps.class}" bind:this={actions}>
	<div class="actions-popup" class:open>
		<button class="open-button" on:click={toggle}>
			<Icon icon="three-dots" />
		</button>
		
		{#if open}
			<div class="actions-popup-content position-{position}">
				<div class="actions-grouped-buttons-container-display">
					<slot></slot>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.actions-popup-container {
		position: relative;
		display: inline-block;
	}
	.actions-popup.open .actions-popup-content {
		position: absolute;
		top: 100%;
		z-index: 1000;
		background-color: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 1rem;
	}
	.actions-popup.open .actions-popup-content.position-left {
		left: 0;
	}
	.actions-popup.open .actions-popup-content.position-right {
		right: 0;
	}
	.actions-popup.open .actions-popup-content .actions-grouped-buttons-container-display {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
