<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import { mode } from 'mode-watcher'; // Import mode-watcher's reactive store

	// Define props for width and height
	type Props = {
		width?: number;
		height?: number;
	};
	let { width, height }: Props = $props();

	// Create a derived store for theme image based on mode
	const themeImage = derived(mode, ($mode) => {
		return $mode === 'dark' ? '/dark-logo.png' : '/light-logo.png';
	});
</script>

<!-- Conditionally render image based on the derived themeImage -->
<img src={$themeImage} alt="Logo" width={width ?? 176} height={height ?? 40} />
