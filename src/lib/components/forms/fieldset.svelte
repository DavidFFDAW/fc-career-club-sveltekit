<script lang='ts'>
  export let legend: string;
</script>

<div class="w1 app-fieldset">
	<span class="app-legend">{legend}</span>

	<div class="app-fieldset-content">
		<slot />
	</div>
</div>

<style>
	.app-fieldset {
		border: 1px solid #ccc; /* Borde similar al de un fieldset */
		padding: 10px 15px 15px 15px; /* Espaciado interno */
		position: relative; /* Para posicionar el legend */
		border-radius: 5px; /* Bordes ligeramente redondeados */
	}

	.app-legend {
		position: absolute; /* Posiciona el legend sobre el borde */
		top: -10px; /* Ajusta la posición vertical para que "rompa" el borde */
		left: 10px; /* Ajusta la posición horizontal */
		background-color: #fff; /* Fondo blanco para que se vea el texto */
		padding: 0 5px; /* Espacio alrededor del texto del legend */
		font-weight: bold; /* Texto en negrita */
		color: #333; /* Color de texto oscuro */
	}

	.app-fieldset-content {
		/* Puedes añadir estilos adicionales aquí para los elementos internos si es necesario */
		padding-top: 10px; /* Espacio para que el contenido no se solape con el legend */
	}
</style>
