<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import { mode as modeWatcher } from 'mode-watcher';

	const mode = writable<'dark' | 'light'>('light');

	modeWatcher.subscribe(($mode) => {
		if ($mode === 'dark' || $mode === 'light') {
			mode.set($mode); // Actualiza el store solo si el valor es 'dark' o 'light'
		}
	});

	type Props = {
		width?: number;
		height?: number;
	};
	let { width, height }: Props = $props();

	if (typeof window !== 'undefined') {
		const savedMode = localStorage.getItem('theme') as 'dark' | 'light' | null;
		mode.set(savedMode ?? 'light');
	}

	const themeImage = derived(mode, ($mode) => {
		return $mode === 'dark' ? '/dark-logo.png' : '/light-logo.png';
	});

	function toggleTheme() {
		mode.update(($mode) => {
			const newMode = $mode === 'dark' ? 'light' : 'dark';
			localStorage.setItem('theme', newMode);
			return newMode;
		});
	}
</script>

<main>
	<img src={$themeImage} alt="Logo" width={width ?? 176} height={height ?? 40} />
</main>
