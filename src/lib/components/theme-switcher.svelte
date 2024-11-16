<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { setMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';

	let isDark = false;

	if (typeof window !== 'undefined') {
		isDark = document.documentElement.classList.contains('dark');
	}

	function toggleTheme() {
		requestAnimationFrame(() => {
			isDark = !isDark;
			setMode(isDark ? 'dark' : 'light');
		});
	}
</script>

<Button
	variant="outline"
	size="icon"
	on:click={toggleTheme}
	class="group relative h-8 w-16 overflow-hidden rounded-full p-0.5 transition-all duration-500
	{isDark ? 'bg-slate-700' : 'bg-slate-200'}"
>
	<div class="absolute inset-0 flex items-center justify-between px-2">
		<Sun
			class="h-4 w-4 transition-all duration-500 
			{isDark ? 'rotate-90 opacity-50' : 'rotate-0 opacity-100'} text-yellow-500"
		/>
		<Moon
			class="h-4 w-4 transition-all duration-500 
			{isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-50'} text-slate-400"
		/>
	</div>
	<div
		class="absolute left-1 h-6 w-6 rounded-full bg-white shadow-sm transition-all duration-500
		{isDark ? 'translate-x-7 bg-slate-800' : 'translate-x-0 bg-white'}"
	></div>
	<span class="sr-only">Toggle theme</span>
</Button>

<style>
	:global(.transitioning *) {
		transition: all 700ms ease-in-out !important;
	}

	:global(.transitioning .bg-gradient-to-br),
	:global(.transitioning .bg-gradient-to-tr),
	:global(.transitioning [class*='from-']),
	:global(.transitioning [class*='via-']),
	:global(.transitioning [class*='to-']) {
		transition:
			background-color 700ms ease-in-out,
			background-image 700ms ease-in-out !important;
	}

	:global(.transitioning .fixed.inset-0) {
		transition:
			background-color 700ms ease-in-out,
			background-image 700ms ease-in-out !important;
	}

	:global(.transitioning .bg-gradient-to-br),
	:global(.transitioning .bg-gradient-to-tr),
	:global(.transitioning [class*='radial-gradient']) {
		transition:
			opacity 700ms ease-in-out,
			background-image 700ms ease-in-out !important;
	}
</style>
