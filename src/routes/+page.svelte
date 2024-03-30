<script lang="ts">
	import { onMount } from 'svelte';
	import type { Vocab } from '$lib/types';

	let vocabList: Vocab[] = [];

	$: params = vocabList
		.filter(({ front, back }) => front && back)
		.map(({ front, back }) => `${encodeURIComponent(front)}=${encodeURIComponent(back)}`)
		.join('&');

	const addVocabField = () => {
		vocabList = [...vocabList, { front: '', back: '' }];
	};

	const removeVocabField = () => {
		vocabList.pop();
		vocabList = vocabList;
	};

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		vocabList = Array.from(searchParams.entries()).map(([front, back]) => ({
			front,
			back
		}));

		if (vocabList.length == 0) {
			addVocabField();
		}
	});

	$: {
		if (vocabList.length > 0) {
			window.history.pushState({ path: saved }, '', saved);
		}
	}

	const handleFileChange = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];
		if (file) {
			const text = await file.text();
			parseCSV(text);
		}
	};

	const parseCSV = (text: string) => {
		const lines = text.split('\n');

		let params = lines
			.map((line) => {
				const [front, back] = line.split(';');
				if (front && back) {
					return { front: front.trim(), back: back.trim() };
				}

				return { front: '', back: '' };
			})
			.filter(({ front, back }) => front && back)
			.map(({ front, back }) => `${encodeURIComponent(front)}=${encodeURIComponent(back)}`)
			.join('&');

		window.location.replace(`${window.location.origin}${window.location.pathname}?${params}`);
	};

	$: saved = `${window.location.origin}${window.location.pathname}?${params}`;
	$: backToFront = `${window.location.origin}${window.location.pathname}back?${params}`;
	$: frontToBack = `${window.location.origin}${window.location.pathname}front?${params}`;
	$: backToFrontAnswer = `${window.location.origin}${window.location.pathname}back/answer?${params}`;
	$: frontToBackAnswer = `${window.location.origin}${window.location.pathname}front/answer?${params}`;
</script>

<title>漢字テスト創作ツール</title>

<div class="m-4">
	<h1 class="text-lg font-bold">漢字テスト創作ツール</h1>
	<div>
		{#each vocabList as { front, back }}
			<div class="flex gap-2 mb-2">
				<input type="text" placeholder="書き" class="border p-1" bind:value={front} />
				<input type="text" placeholder="読み" class="border p-1" bind:value={back} />
			</div>
		{/each}
		<button class="border p-1" on:click={addVocabField}>Add</button>
		<button class="border p-1" on:click={removeVocabField}>Remove</button>
	</div>
	{#if params}
		<div class="mt-4 space-y-4">
			<div>
				<h3 class="text-lg font-bold">読み</h3>
				<a class="text-blue-500" href={frontToBack} target="_blank">リンク</a>
			</div>

			<div>
				<h3 class="text-lg font-bold">読み 答え</h3>
				<a class="text-blue-500" href={frontToBackAnswer} target="_blank">リンク</a>
			</div>

			<div>
				<h3 class="text-lg font-bold">書き</h3>
				<a class="text-blue-500" href={backToFront} target="_blank">リンク</a>
			</div>

			<div>
				<h3 class="text-lg font-bold">書き 答え</h3>
				<a class="text-blue-500" href={backToFrontAnswer} target="_blank">リンク</a>
			</div>
		</div>
	{/if}

	<input type="file" accept=".csv" on:change={handleFileChange} />
</div>
