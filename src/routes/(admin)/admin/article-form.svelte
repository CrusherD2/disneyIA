<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
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

		new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
	});

	let title = $state('');
	let summary = $state('');
	let author = $state('');

  async function handleSubmitArticle() {
    await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        summary: summary,
        author: author,
        content: editor.children[0].innerHTML
      }),
    });
  }

</script>

<form
	class="flex flex-col gap-3"
	onsubmit={handleSubmitArticle}
>
	<Button type="submit">Submit</Button>
	<div>
		<Label for="title">Title</Label>
		<Input type="text" id="title" bind:value={title} />
	</div>
	<div>
		<Label for="summary">Summary</Label>
		<Input type="text" id="summary" bind:value={summary} />
	</div>

	<div>
		<Label for="author">Author</Label>
		<Input type="text" id="author" bind:value={author} />
	</div>

	<div>
		<Label for="content">Content</Label>
		<div class="editor-wrapper">
			<div bind:this={editor}></div>
		</div>
	</div>
</form>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
