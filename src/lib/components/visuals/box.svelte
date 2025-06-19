<script lang="ts">
	import Icon from './icon.svelte';
	export let title: string;
	export let icon: string | null = null;
	export let description: string | null = null;
</script>

<div class="w1 box {$$restProps.class}">
	{#if title}
		<header class="box-header title-block flex start acenter gap-small pointer">
			{#if icon}
				<Icon {icon} />
			{/if}
			<div class="box-title-container">
				<h4 class="box-title">{title}</h4>
				{#if description}<small>{description}</small>{/if}
			</div>
		</header>
	{/if}

	<div class="w1 box-content flex column gap-medium" class:has-title={title}>
		<slot />
	</div>
</div>
