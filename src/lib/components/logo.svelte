<script lang="ts">
	export let size = 40;
	const scale = size / 40; // for scaling all dimensions
	let className: string = '';
	export { className as class };
</script>

<div class="flex items-center gap-3">
	<svg
		width={size}
		height={size}
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={className}
	>
		<!-- Magic Castle Silhouette -->
		<path d="M20 5L23 8L20 11L17 8L20 5Z" fill="currentColor" class="animate-pulse" />
		<path
			d="M8 18L32 18C33.1046 18 34 18.8954 34 20V30C34 31.1046 33.1046 32 32 32H8C6.89543 32 6 31.1046 6 30V20C6 18.8954 6.89543 18 8 18Z"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
		/>
		<!-- Circuit Pattern -->
		<path
			d="M12 25H28M16 22V28M24 22V28"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			class="animate-draw"
		/>
		<!-- Magical Sparkles -->
		<circle cx="10" cy="15" r="1" fill="currentColor" class="animate-twinkle">
			<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
		</circle>
		<circle cx="30" cy="15" r="1" fill="currentColor" class="animate-twinkle">
			<animate
				attributeName="opacity"
				values="0;1;0"
				dur="2s"
				repeatCount="indefinite"
				begin="0.5s"
			/>
		</circle>
		<circle cx="20" cy="13" r="1" fill="currentColor" class="animate-twinkle">
			<animate
				attributeName="opacity"
				values="0;1;0"
				dur="2s"
				repeatCount="indefinite"
				begin="1s"
			/>
		</circle>
	</svg>
	<span
		class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400"
	>
		DisneyAI
	</span>
</div>

<style>
	@keyframes draw {
		from {
			stroke-dashoffset: 100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	.animate-draw {
		stroke-dasharray: 100;
		animation: draw 3s infinite;
	}
</style>
