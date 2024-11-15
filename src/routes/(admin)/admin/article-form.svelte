<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Article, Tag } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import Editor from '@tinymce/tinymce-svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import CreateTagDialog from './create-tag-dialog.svelte';
	import { Check, SquarePen } from 'lucide-svelte/icons';
	import { cn } from '$lib/utils';

	const {
		article,
		tags
	}: {
		article?: Article;
		tags: Tag[];
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
	let articleTags: number[] = $state(article?.tags ?? []); // Manejo de tags como texto
	let content = $state(article?.content ?? '<p>This is the initial content of the editor.</p>');

	let isPending = $state(false);

	// Add backgroundImage to the state
	let backgroundImage = $state(article?.backgroundImage ?? '');

	// Codigo para crear tags
	let isTagDialogOpen = $state(false);
	let isTagDialogLoading = $state(false);

	async function createTag(name: string) {
		isTagDialogLoading = true;
		try {
			const res = await fetch('/api/tags', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name })
			});

			if (!res.ok) {
				toast.error('Error al crear tag');
				return;
			}

			const tag = await res.json();

			tags.push(tag);

			toast.success('Tag creado correctamente');
		} catch (error) {
			console.error(error);
			toast.error('Failed to create tag');
		} finally {
			isTagDialogLoading = false;
			isTagDialogOpen = false;
		}
	}

	// Función para manejar el envío del artículo
	async function handleSubmitArticle() {
		try {
			if (!title || !summary) {
				toast.error('Please fill in all fields');
				return;
			}

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
					backgroundImage // Add this to the request body
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
			<div class="flex flex-row gap-3">
				{#if tags.length > 0}
					<select class="w-full overflow-y-hidden rounded-md border-[1px] flex" multiple>
						{#each tags as tag}
							{#if articleTags.includes(tag.id)}
								<Check />
							{/if}
							<option
								value={tag.id}
								selected={articleTags.includes(tag.id)}
								class={cn('',)}
								onclick={() => {
									if (articleTags.includes(tag.id)) {
										articleTags = articleTags.filter((t) => t !== tag.id);
									} else {
										articleTags.push(tag.id);
									}
								}}
							>
								{tag.name}
							</option>
						{/each}
					</select>
				{/if}
				<CreateTagDialog {createTag} isOpen={isTagDialogOpen} isLoading={isTagDialogLoading} />
			</div>
		</div>
		<div>
			<Label for="backgroundImage">Background Image URL</Label>
			<Input
				type="text"
				id="backgroundImage"
				bind:value={backgroundImage}
				placeholder="https://example.com/image.jpg"
			/>
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
