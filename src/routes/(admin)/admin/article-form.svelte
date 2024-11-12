<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Article } from '$lib/types';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	const {
		article
	}: {
		article?: Article;
	} = $props();

	let editor: HTMLElement;

	let isUpdating = !!article;

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

		if (isUpdating && article) {
			editor.children[0].innerHTML = article.content;
		}
	});

	// Agregar el estado reactivo para los tags
	let title = $state(article?.title ?? '');
	let summary = $state(article?.summary ?? '');
	let author = $state(article?.author ?? '');
	let tags: string = $state(article?.tags ?? ''); // Manejo de tags como texto

	let isPending = $state(false);

	// Función para manejar el envío del artículo
	async function handleSubmitArticle() {
		try {
			if (
				!title ||
				!summary ||
				!editor.children[0].innerHTML ||
				editor.children[0].innerHTML === '<p><br></p>'
			) {
				toast.error('Please fill in all fields');
				return;
			}

			// Convierte los tags a un array
			const tagsArray = tags.split(',').map((tag) => tag.trim());

			const url = isUpdating && article ? `/api/articles/${article.id}` : '/api/articles';

			isPending = true;
			const res = await fetch(url, {
				method: isUpdating ? 'PATCH' : 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title,
					summary: summary,
					author: author,
					content: editor.children[0].innerHTML,
					tags: tagsArray // Incluye los tags en el cuerpo de la solicitud
				})
			});

			if (!res.ok) {
				toast.error('Error al crear articulo');
				return;
			}
			toast.success(`Articulo creado correctamente`);

			setTimeout(() => {
				location.href = '/admin';
			}, 1000);
		} catch (error) {
			console.error(error);
			toast.error('Failed to submit article');
		} finally {
			isPending = false;
		}
	}
</script>

<form class="flex flex-col gap-3" onsubmit={handleSubmitArticle}>
	<Button type="submit">{isPending ? 'Guardando...' : 'Guardar'}</Button>
	<div>
		<Label for="title">Titulo</Label>
		<Input type="text" id="title" bind:value={title} required />
	</div>
	<div>
		<Label for="summary">Resumen</Label>
		<Input type="text" id="summary" bind:value={summary} required />
	</div>
	<div>
		<Label for="author">Autor</Label>
		<Input type="text" id="author" bind:value={author} required />
	</div>
	<div>
		<Label for="tags">Tags</Label>
		<!-- Campo para los tags, separados por comas -->
		<Input type="text" id="tags" bind:value={tags} placeholder="Tag1, Tag2, Tag3" />
	</div>

	<div>
		<Label for="content">Contenido</Label>
		<div class="editor-wrapper">
			<div bind:this={editor}></div>
		</div>
	</div>
</form>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
