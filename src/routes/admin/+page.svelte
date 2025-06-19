<script lang="ts">
	export let value: string;
</script>

<div class="page-dashboard-container">
	<h1>Admin Dashboard</h1>
	<p>Welcome to the admin dashboard. Here you can manage your application.</p>

	<ul>
		<li><a href="/admin/users">Manage Users</a></li>
		<li>
			<a href="/admin/players">
				<i class="bi bi-people-fill"></i>
				Jugadores
			</a>
		</li>
		<li>
			<a href="/admin/posts">
				<i class="bi bi-file-text-fill"></i>
				Posts
			</a>
		</li>
		<li>
			<a href="/admin/posts/official">
				<i class="bi bi-megaphone-fill"></i>
				Comunicados
			</a>
		</li>
		
		<li><a href="/admin/settings">Settings</a></li>
		<li><a href="/admin/reports">View Reports</a></li>
		<li><a href="/admin/logs">System Logs</a></li>
		<li><a href="/admin/help">Help & Support</a></li>
	</ul>
	{value}
</div>

<style>
</style>
