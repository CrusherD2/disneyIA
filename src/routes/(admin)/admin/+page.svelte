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

<div class="container mt-12">
	<ArticleTable {articles} />
</div>
