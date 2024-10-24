<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { onMount } from 'svelte';

	let editor: HTMLElement;

	const toolbarOptions = [
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline'],
		['link', 'image'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ indent: '-1' }, { indent: '+1' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
	});

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
