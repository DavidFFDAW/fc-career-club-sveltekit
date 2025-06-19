<script lang='ts'>
	import { page } from "$app/stores";
	$: errorCode = $page.error?.message === 'Not Found' ? 404 : 500;
</script>

<div class="error-page-container">
	<h1>{$page.error?.message}</h1>
	<h3>{errorCode === 404 
		? 'Vaya! Parece que no hemos podido encontrar la página que buscas'
		: 'Oops! Algo salió mal'}
	</h3>

	<div class="navigation-container">
		<p>Te recomendamos volver a alguna de estas páginas</p>

		<nav class="navigation-menu">
			<ul>
				<li><a href="/">Inicio</a></li>
				<li><a href="/about">Sobre la app</a></li>
				<li><a href="/players">Jugadores</a></li>
				<li><a href="/contact">Contacto</a></li>
			</ul>
		</nav>
	</div>
</div>

<style scoped>
	.error-page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 35px;
	}

	.error-page-container h1 {
		font-size: 3rem;
	}

	.error-page-container h3 {
		font-size: 1.5rem;
	}

	.error-page-container .navigation-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.error-page-container .navigation-menu {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.error-page-container .navigation-menu ul {
		width: 100%;
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.error-page-container .navigation-menu ul li a {
		display: block;
		margin: 0.5rem 0;
		padding: 0.5rem 1rem;
		background-color: var(--white);
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

</style>