<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Article } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import Editor from '@tinymce/tinymce-svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	const {
		article
	}: {
		article?: Article;
	} = $props();

	let conf = {
		height: '80svh',
		menubar: true,
		plugins: [
			'advlist',
			'autolink',
			'lists',
			'link',
			'image',
			'charmap',
			'anchor',
			'searchreplace',
			'visualblocks',
			'code',
			'fullscreen',
			'insertdatetime',
			'media',
			'table',
			'preview',
			'help',
			'wordcount'
		],
		toolbar:
			'undo redo | blocks | ' +
			'bold italic forecolor | alignleft aligncenter ' +
			'alignright alignjustify | bullist numlist outdent indent | ' +
			'removeformat | help'
	};

	let isUpdating = !!article;

	// Agregar el estado reactivo para los tags
	let title = $state(article?.title ?? '');
	let summary = $state(article?.summary ?? '');
	let author = $state(article?.author ?? '');
	let tags: string = $state(article?.tags ?? ''); // Manejo de tags como texto
	let content = $state(article?.content ?? '<p>This is the initial content of the editor.</p>');

	let isPending = $state(false);

	// Función para manejar el envío del artículo
	async function handleSubmitArticle() {
		try {
			if (!title || !summary) {
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
					content: content,
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

<form class="flex flex-col gap-3 lg:flex-row" onsubmit={handleSubmitArticle}>
	<section class="flex flex-col gap-3 lg:min-w-[500px]">
		<Button type="submit">{isPending ? 'Guardando...' : 'Guardar'}</Button>
		<div>
			<Label for="title">Titulo</Label>
			<Textarea id="title" bind:value={title} required />
		</div>
		<div>
			<Label for="summary">Resumen</Label>
			<Textarea id="summary" bind:value={summary} required />
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
	</section>
	<section class="flex w-full flex-col gap-3">
		<Label for="content">Contenido</Label>
		<Editor
			id="content"
			apiKey="rp4b9m2rr94wwfj47pai9w3qsw116rgs12zhbgvbgl5l5vyc"
			channel="7"
			{conf}
			bind:value={content}
		/>
	</section>
</form>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
