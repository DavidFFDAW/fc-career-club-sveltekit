<script lang='ts'>
	export let icon: string | undefined = undefined;
	let formaction: string | undefined = $$restProps.formaction ? `?/${$$restProps.formaction}` : '';
</script>

<button {...$$restProps} class="btn {$$restProps.class || ''}" formaction={formaction}>
	{#if icon}
		<i class="bi bi-{icon} app-bootstrap-icon default-icons"></i>
	{/if}
	<span class="text">
		<slot/>
	</span>
</button>