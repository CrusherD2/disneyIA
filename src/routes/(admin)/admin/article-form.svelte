<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Article, Tag } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import Editor from '@tinymce/tinymce-svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import MultiSelect from 'svelte-multiselect';
	import CreateTagDialog from './create-tag-dialog.svelte';
	import { onMount } from 'svelte';

	type Props = {
		article?: Article;
		articleTags: {
			value: number;
			label: string;
		}[];
		tags: Tag[];
	};

	const { article, articleTags, tags }: Props = $props();

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
	let articleTagsState: {
		value: number;
		label: string;
	}[] = $state(articleTags);
	
	// Manejo de tags como texto
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
					tags: articleTagsState.map((tag) => tag.value),
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

<form class="flex flex-col gap-6" onsubmit={handleSubmitArticle}>
	<div class="grid gap-8 lg:grid-cols-[400px,1fr]">
		<!-- Left Column: Meta Information -->
		<section class="space-y-6">
			<!-- Title -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="title">Título</Label>
				<Textarea
					id="title"
					bind:value={title}
					required
					class="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="Ingresa el título del artículo..."
				/>
			</div>

			<!-- Summary -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="summary">Resumen</Label>
				<Textarea
					id="summary"
					bind:value={summary}
					required
					class="min-h-[120px] w-full resize-none rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="Escribe un breve resumen del artículo..."
				/>
			</div>

			<!-- Author -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="author">Autor</Label>
				<Input
					type="text"
					id="author"
					bind:value={author}
					required
					class="w-full rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="Nombre del autor"
				/>
			</div>

			<!-- Tags -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="tags">Categorías</Label>
				<div class="flex flex-col gap-2">
					{#if tags && tags.length > 0}
						<MultiSelect
							bind:selected={articleTagsState}
							options={tags.map((tag) => ({
								value: tag.id,
								label: tag.name
							}))}
							placeholder="Selecciona las categorías..."
							outerDivClass="w-full rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
							liSelectedClass="bg-blue-500 text-white rounded-full px-2"
							liOptionClass="hover:bg-gray-50 dark:hover:bg-gray-700"
							liActiveOptionClass="bg-gray-50 dark:bg-gray-700"
							ulOptionsClass="max-h-[200px] overflow-y-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
						/>
					{/if}

					<CreateTagDialog {createTag} isOpen={isTagDialogOpen} isLoading={isTagDialogLoading} />
				</div>
			</div>

			<!-- Background Image URL -->
			<div class="space-y-2">
				<Label class="text-sm font-medium" for="backgroundImage">Background Image URL</Label>
				<Input
					type="text"
					id="backgroundImage"
					bind:value={backgroundImage}
					class="w-full rounded-lg border border-gray-200 bg-white/80 p-3 text-base backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/80"
					placeholder="https://example.com/image.jpg"
				/>
			</div>

			<!-- Save Button -->
			<button
				type="submit"
				class="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
			>
				{isPending ? 'Guardando...' : 'Guardar'}
			</button>
		</section>

		<!-- Right Column: Content Editor -->
		<section class="space-y-2">
			<Label class="text-sm font-medium" for="content">Contenido</Label>
			<div
				class="rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80"
			>
				<Editor
					id="content"
					apiKey="rp4b9m2rr94wwfj47pai9w3qsw116rgs12zhbgvbgl5l5vyc"
					channel="7"
					{conf}
					bind:value={content}
				/>
			</div>
		</section>
	</div>
</form>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
