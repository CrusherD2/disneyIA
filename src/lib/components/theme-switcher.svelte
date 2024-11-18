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
			const root = document.documentElement;

			// Forzar reflow
			root.style.setProperty('--transitioning', 'true');
			root.offsetHeight;

			// Aplicar transiciones
			root.classList.add('transitioning');
			isDark = !isDark;
			setMode(isDark ? 'dark' : 'light');

			// Remover clase después de la transición
			setTimeout(() => {
				root.classList.remove('transitioning');
				root.style.removeProperty('--transitioning');
			}, 500);
		});
	}
</script>

<Button
	variant="outline"
	size="icon"
	on:click={toggleTheme}
	class="group relative h-8 w-16 overflow-hidden rounded-full p-0.5 transition-all duration-500
	{isDark
		? 'bg-slate-700 transition-colors duration-500'
		: 'bg-slate-200 transition-colors duration-500'}"
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
	/* Definir variables CSS para colores de texto */
	:global(:root) {
		--text-primary: rgb(17, 24, 39);
		--text-secondary: rgb(75, 85, 99);
		--text-tertiary: rgb(107, 114, 128);
	}

	:global(:root.dark) {
		--text-primary: rgb(255, 255, 255);
		--text-secondary: rgb(209, 213, 219);
		--text-tertiary: rgb(156, 163, 175);
	}

	/* Base styles */
	:global(*) {
		transition: none !important;
	}

	:global(.transitioning) {
		isolation: isolate;
	}

	:global(.transitioning *) {
		transition: all 500ms ease-in-out !important;
	}

	/* Clases de texto personalizadas */
	:global(.text-theme-primary) {
		color: var(--text-primary);
	}

	:global(.text-theme-secondary) {
		color: var(--text-secondary);
	}

	:global(.text-theme-tertiary) {
		color: var(--text-tertiary);
	}
</style>
