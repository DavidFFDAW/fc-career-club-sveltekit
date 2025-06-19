<script lang="ts">
	export let afterClick: () => void = () => {};
	const year = new Date().getFullYear();
</script>

<ul class="app-navigation botaniq-navigation flex column astart gap-smaller">
	<li class="botaniq-navigation-item">
		<p class="w1 banner-separator-title">Público</p>
		<ul class="botaniq-navigation-admin-menu flex column astart gap-smaller">
			<li class="botaniq-navigation-item">
				<a href="/" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-house"></i>
					Botaniq
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/about" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-info-circle"></i>
					Sobre la app
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/plants" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-bandaid"></i>
					Plantas
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/contact" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-chat"></i>
					Contacto
				</a>
			</li>
		</ul>
	</li>

	<li class="botaniq-navigation-item admin">
		<p class="w1 banner-separator-title">Plantas</p>
		<ul class="botaniq-navigation-admin-menu flex column astart gap-smaller">
			<li class="botaniq-navigation-item">
				<a href="/admin" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-speedometer2"></i>
					Panel de administración
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/admin/plants" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-list-check"></i>
					Administrar plantas
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/admin/searchs" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-search"></i>
					Ver busquedas
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/admin/plants/qr-codes" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-qr-code-scan"></i>
					Gestionar códigos QR
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/admin/plants/analytics" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-graph-up-arrow"></i>
					Ver analíticas
				</a>
			</li>
		</ul>
	</li>

	<li class="botaniq-navigation-item admin">
		<p class="w1 banner-separator-title">Inventario</p>
		<ul class="botaniq-navigation-admin-menu flex column astart gap-smaller">
			<li class="botaniq-navigation-item">
				<a href="/admin/inventory" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-speedometer2"></i>
					Panel de administración
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/admin/inventory/products" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-list-check"></i>
					Administrar productos
				</a>
			</li>
			<li class="botaniq-navigation-item">
				<a href="/admin/inventory/analytics" class="botaniq-navigation-link nav-link" on:click={afterClick}>
					<i class="icon bi bi-graph-up-arrow"></i>
					Ver analíticas
				</a>
			</li>
		</ul>
	</li>

	<li class="botaniq-menu-footer onmobile">
		<p class="botaniq-menu-footer-text">
			&copy;Botaniq {year}
		</p>
	</li>
</ul>

<style>
	.botaniq-menu-footer {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1rem 15px;
		font-size: 0.8rem;
		text-align: end;
		font-weight: 600;
		color: var(--green);
	}
	.botaniq-navigation-item.admin {
		margin-top: 1rem;
	}

	.botaniq-navigation-item ul {
		padding-left: 20px;
	}

	.botaniq-navigation-item .banner-separator-title {
		position: relative;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--green);
	}
	.botaniq-navigation-item .banner-separator-title::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0px;
		width: 15%;
		height: 3px;
		border-radius: 25px;
		background-color: var(--green-light);
	}
	.botaniq-navigation-admin-menu {
		margin-top: 10px;
	}
	.botaniq-navigation-item .botaniq-navigation-link.nav-link {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.botaniq-navigation-item .botaniq-navigation-link.nav-link:hover {
		color: var(--green);
		filter: brightness(0.9);
	}
</style>
