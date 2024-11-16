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
		isDark = !isDark;
		setMode(isDark ? 'dark' : 'light');
	}
</script>

<Button
	variant="outline"
	size="icon"
	on:click={toggleTheme}
	class="relative h-8 w-16 rounded-full p-0.5 transition-colors duration-300
	{isDark ? 'bg-slate-700' : 'bg-slate-200'}"
>
	<div class="absolute inset-0 flex items-center justify-between px-2">
		<Sun class="h-4 w-4 text-yellow-500 {isDark ? 'opacity-50' : 'opacity-100'}" />
		<Moon class="h-4 w-4 text-slate-400 {isDark ? 'opacity-100' : 'opacity-50'}" />
	</div>
	<div
		class="absolute left-1 h-6 w-6 rounded-full bg-white transition-transform duration-300
		{isDark ? 'translate-x-7' : 'translate-x-0'}"
	></div>
	<span class="sr-only">Toggle theme</span>
</Button>
