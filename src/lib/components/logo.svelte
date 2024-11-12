<script lang="ts">
	type Props = {
		width?: number;
		height?: number;
	};
	let { width, height }: Props = $props();

	const DARK_LOGO = '/dark-logo.png';
	const LIGHT_LOGO = '/light-logo.png';
</script>

<img src={LIGHT_LOGO} class="dark:hidden" alt="Logo" width={width ?? 176} height={height ?? 40} />
<img
	src={DARK_LOGO}
	class="hidden dark:block"
	alt="Logo"
	width={width ?? 176}
	height={height ?? 40}
/>
