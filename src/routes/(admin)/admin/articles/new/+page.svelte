<script lang="ts">
	import ArticleForm from '../../article-form.svelte';
	import type { PageData } from './$types';

	let props: PageData = $props();
</script>

<div class="container pb-12">
	<h1 class="mb-3 text-3xl">Create a new article</h1>
	<ArticleForm article={null} />
</div>
