<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<main>
	<h1>{data.title}</h1>
	<p>{data.body}</p>
</main>
