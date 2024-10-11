<script lang="ts">
	import ArticleCard from './article-card.svelte';
</script>

<header>
	<nav class="flex items-center justify-center py-3">
		<ul class="flex flex-row gap-12">
			<li class="hover:underline">
				<a href="/">Home</a>
			</li>
			<li class="hover:underline">
				<a href="/articles">Articles</a>
			</li>
			<li class="hover:underline">
				<a href="/about">About</a>
			</li>
			<li class="hover:underline">
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>
</header>
<main class="container">
	<h1 class="mb-3 mt-12 text-center text-4xl font-bold">Disney AI Usage Archive</h1>
	<p class="text-center">billion dollar company btw</p>
	<h2 class="text-2xl font-bold mb-3">Latest Articles</h2>
	<section class="flex flex-col gap-3">
		<ArticleCard />
		<ArticleCard />
		<ArticleCard />
		<ArticleCard />
	</section>
</main>
