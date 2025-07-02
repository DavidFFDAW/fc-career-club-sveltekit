<script lang="ts">
	import type { posts } from '@prisma/client';
	import Image from '../visuals/image.svelte';
	export let post: posts;
	export let showExcerpt: boolean = true;
</script>

<article class="single-blog-post">
	<a href="/announcements/{post.slug}" data-type={post.type}>
		<Image src={post.type === 'announcement' ? '/images/mandarinos-announcement.jpg' : post.thumbnail} alt={post.title} />
		<h3 class="title">{post.title}</h3>
		{#if showExcerpt}
			<p class="excerpt">{post.excerpt}</p>
		{/if}
	</a>
</article>
