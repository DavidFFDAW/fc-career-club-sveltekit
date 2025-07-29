<script lang='ts'>
	export let title: string;
	export let description: string;
</script>

<header class="page-title">
	<h1 class="page-main-title">{title}</h1>
	<small class="page-main-title-description">{description}</small>
	<slot></slot>
</header>