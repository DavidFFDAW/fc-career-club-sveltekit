<script lang="ts">
	import PostMiniature from '$lib/components/post/post-miniature.svelte';
	import AnnouncementsSlider from './announcements-slider.svelte';

	const backgroundImage =
		'https://d1tm14lrsghf7q.cloudfront.net/public/media/3134/conversions/283792-cover.jpg';
	export let data;
	const firstAnnouncement = data.announcements[0];
</script>

<section class="w1 home-container home-page">
	<!-- <Slider slides={slides} /> -->
	<header class="home-big-image-stadium" style="background-image: url({backgroundImage});">
		<div class="home-big-image-stadium-text">
			<h1 class="nunito">Mandarinos S.A.D</h1>
			<p class="nunito">Tu club de fútbol de confianza y cada día el de más gente.</p>
		</div>
	</header>

	<div class="w1 flex column gap">
		{#if data.announcements.length > 0}
			<section class="announcements">
				<h2>Anuncios oficiales</h2>

				<div class="post-layout-container">
					<PostMiniature post={firstAnnouncement} />

					<div class="blog-post-second-column">
						{#each data.announcements.slice(1) as announcement}
							<PostMiniature post={announcement} showExcerpt={false} />
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<section class="trophies">
			<h2>Trofeos</h2>
		</section>

		<section class="blog">
			<h2>Blog posts</h2>

			<div class="post-layout-container">
				<div class="blog-post-second-column">
					{#each data.announcements as announcement}
						<PostMiniature post={announcement} showExcerpt={false} />
					{/each}
				</div>
				<PostMiniature post={firstAnnouncement} showExcerpt={true} />
			</div>
		</section>
	</div>
</section>

<style>
	.home-page section {
		width: 100%;
		padding: 85px 0;
	}
	.home-page section h2 {
		font-size: 2.6rem;
		margin-bottom: 1rem;
	}
	.post-layout-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1rem;
	}
	.home-page header.home-big-image-stadium {
		position: relative;
		margin: 0 -1rem;
		margin-top: -2rem;
		background-size: cover;
		background-position: center;
		height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.home-page header.home-big-image-stadium .home-big-image-stadium-text {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		transform: translate(-50%, -50%);
		text-align: center;
		color: white;
	}
	.home-page header.home-big-image-stadium .home-big-image-stadium-text h1 {
		margin: 0;
		font-size: 3rem;
		text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
	}
	.home-page header.home-big-image-stadium .home-big-image-stadium-text p {
		width: 100%;
		font-size: 1.2rem;
		margin-top: 0.5rem;
		text-align: center;
		text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
	}

	.single-blog-post {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		background-color: #fff;
		border-radius: 10px;
		padding: 1rem;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		margin-bottom: 1rem;
	}

	.post-layout-container .blog-post-second-column {
		width: 40%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 450px;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
