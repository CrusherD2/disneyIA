<script lang="ts">
	import type { PageData } from './$types';
	const { articles }: PageData = $props();

  console.log(articles);
</script>

<section class="container">
	<h1>Admin Page</h1>
	<p>This is an admin page.</p>
	<!-- {#each articles as article}
    <pre>{JSON.stringify(article, null, 2)}</pre>
  {/each} -->
</section>
