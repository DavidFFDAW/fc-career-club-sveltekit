<section class="page-dashboard-container">
	<header class="page-title">
		<h1>Admin Dashboard</h1>
		<small>Welcome to the admin dashboard. Here you can manage your application.</small>
	</header>

	<nav class="page-navigation">
		<ul class="nav-list">
			<li class="nav-item">
				<a href="/admin/users">
					<i class="bi bi-person"></i>
					Gestionar usuarios
				</a>
			</li>

			<li class="nav-item">
				<a href="/admin/posts">
					<i class="bi bi-file-post"></i>
					Gestionar posts
				</a>
			</li>

			<li class="nav-item">
				<a href="/admin/announcements">
					<i class="bi bi-newspaper"></i>
					Gestionar anuncios oficiales
				</a>
			</li>

			<li class="nav-item">
				<a href="/admin/players">
					<i class="bi bi-people"></i>
					Gestionar jugadores
				</a>
			</li>

			<li class="nav-item">
				<a href="/admin/scouting">
					<i class="bi bi-eye"></i>
					Ojear jugadores
				</a>
			</li>

			<li class="nav-item">
				<a href="/admin/trophies">
					<i class="bi bi-trophy"></i>
					Gestionar trofeos
				</a>
			</li>
		</ul>
	</nav>
</section>

<style>
	.page-navigation {
		margin-top: 45px;
	}
	.page-navigation .nav-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.page-navigation .nav-list .nav-item {
		width: 100%;
		background: #fff;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		border: 2px solid #e0e0e0;
		padding: 14px;
	}
	.page-navigation .nav-list .nav-item:hover {
		border-color: var(--color);
	}
	.page-navigation .nav-list .nav-item a {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: #333;
		text-decoration: none;
		text-align: center;
		font-weight: 700;
		font-size: 1.15rem;
	}
	.page-navigation .nav-list .nav-item a i {
		font-size: 3rem;
		opacity: 0.5;
	}
	.page-navigation .nav-list .nav-item:hover a i {
		opacity: 1;
	}
	.page-navigation .nav-list .nav-item:hover a {
		color: var(--color);
		opacity: 1;
	}

	@media only screen and (max-width: 768px) {
		.page-navigation .nav-list {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
