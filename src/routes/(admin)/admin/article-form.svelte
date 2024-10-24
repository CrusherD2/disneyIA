<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	let title = $state('title');
	let summary = $state('summary');
	let author = $state('author');
	let content = $state('content');
</script>

<form>
	<Label for="title">Title</Label>
	<Input type="text" id="title" bind:value={title} />

	<Label for="summary">Summary</Label>
	<Input type="text" id="summary" bind:value={summary} />

	<Label for="author">Author</Label>
	<Input type="text" id="author" bind:value={author} />

	<Label for="content">Content</Label>
	<Textarea id="content" bind:value={content} />

	<button type="submit">Submit</button>
</form>
