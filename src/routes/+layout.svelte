<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { navigating } from '$app/stores';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	let transitionElement: HTMLDivElement;
	let transitioning = $state(false);

	function handleThemeTransition() {
		transitioning = true;
		setTimeout(() => {
			transitioning = false;
		}, 700);
	}

	// Simplify theme change listener
	if (typeof window !== 'undefined') {
		window.addEventListener('themeChange', () => {
			handleThemeTransition();
		});
	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<ModeWatcher />
<Toaster />
<div class="relative min-h-screen">
	<!-- Background gradients -->
	<div class="fixed inset-0 -z-10" class:transitioning>
		<!-- Base gradient -->
		<div
			class="absolute inset-0 transition-opacity duration-700"
			class:opacity-0={transitioning}
			class:opacity-100={!transitioning}
		>
			<div
				class="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100
				dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
			></div>
		</div>

		<!-- Accent gradients -->
		<div
			class="absolute inset-0 transition-opacity duration-700"
			class:opacity-0={transitioning}
			class:opacity-100={!transitioning}
		>
			<div
				class="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-100/30 to-teal-100/40
				dark:via-pink-950/20 dark:to-teal-950/20"
			></div>
		</div>

		<!-- Radial highlights -->
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]
			from-yellow-100/50 via-transparent to-transparent
			transition-[background-image] duration-700 dark:from-yellow-900/20"
		></div>

		<!-- Bottom accent -->
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))]
			from-indigo-100/40 via-transparent to-transparent
			transition-[background-image] duration-700 dark:from-indigo-900/20"
		></div>

		<!-- Subtle noise texture -->
		<div
			class="absolute inset-0 opacity-[0.15] mix-blend-soft-light transition-opacity duration-700"
			style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')"
		></div>
	</div>

	<!-- Theme transition overlay -->
	<div
		bind:this={transitionElement}
		class="theme-transition pointer-events-none fixed inset-0 z-[60]"
	></div>

	{@render children()}
</div>

{#if $navigating}
	<div
		class="fixed bottom-4 right-4 z-50 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
	></div>
{/if}

<style lang="postcss">
	/* Remove unused theme transition styles */
	.transitioning {
		@apply bg-white dark:bg-gray-950;
		transition: background-color 700ms ease-in-out;
	}
</style>
