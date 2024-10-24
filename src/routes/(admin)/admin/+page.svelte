<script lang="ts">
	import type { PageData } from './$types';
	import ArticleTable from './article-table.svelte';
	let {
		data
	}: {
		data: PageData;
	} = $props();

	const articles = data.articles;
</script>

<section class="container">
	<h1>Admin Page</h1>
	<p>This is an admin page.</p>
	<ArticleTable articles={articles} />
</section>
