<script lang="ts">
	import { fade } from "svelte/transition";

	let showButtons = false;
	let scrollResizeThreshold = 300;
</script>

<svelte:document
	on:scroll={() => {
		showButtons = window.scrollY > scrollResizeThreshold;
	}}
	on:resize={() => {
		showButtons = window.scrollY > scrollResizeThreshold;
	}}
/>

{#if showButtons}
<div class="scroll-buttons-container" transition:fade>
	<button
		class="btn small scroll-button up"
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		aria-label="Scroll to top"
	>
		<i class="bi bi-chevron-up"></i>
	</button>

	<button
		class="btn small scroll-button down"
		on:click={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
		aria-label="Scroll to bottom"
	>
		<i class="bi bi-chevron-down"></i>
	</button>
</div>
{/if}

<style>
	.scroll-buttons-container {
		position: fixed;
		top: 50%;
		right: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transform: translateY(-50%);
	}
	.scroll-buttons-container button.btn {
		border-radius: 50%;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #007bff;
		color: white;
		font-size: 16px;
		font-weight: bold;
		border: none;
		outline: none;
		cursor: pointer;
	}
</style>
