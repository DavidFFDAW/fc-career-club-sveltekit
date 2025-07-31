<script lang="ts">
	export let href: string;
	export let title: string;
	export let icon: string | null = null;
</script>

<a {href} aria-label={title} title={title} class="app-link-container link {$$restProps.class}" class:iconed={icon} {...$$restProps}>
	{#if icon} <i class="bi bi-{icon}"></i> {/if}
	<slot></slot>
</a>

<style>
	.app-link-container.iconed {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
