<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
</header>
{@render children?.()}
