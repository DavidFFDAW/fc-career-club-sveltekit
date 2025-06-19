<script lang='ts'>
	import Icon from "./icon.svelte";

  export let href: string;
  export let icon: string | null = null;
  export let text: string;
</script>

<a href="{href}" class="{$$restProps.class} app-link-container" class:iconed={icon} {...$$restProps}>
  {#if icon}
	<Icon icon={icon} />
  {/if}

  {text}  
</a>

<style>
	.app-link-container.iconed {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>