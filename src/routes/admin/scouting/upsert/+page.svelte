<script>
	import PageTitle from "$lib/components/visuals/page-title.svelte";
	export let data;
</script>

<PageTitle
	title="Jugadores ojeados"
	description="Gestiona los jugadores ojeados por tu equipo."
/>

<p>{data.isEditing ? 'Editando jugador ojeado' : 'Creando nuevo jugador ojeado'}</p>