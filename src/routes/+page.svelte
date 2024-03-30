<script lang="ts">
	import { onMount } from 'svelte';
	import type { Vocab } from '$lib/types';
	import DownloadSection from '$lib/DownloadSection.svelte';

	let vocabList: Vocab[] = [];
	$: params = vocabList
		.filter(({ front, back }) => front && back)
		.map(({ front, back }) => `${encodeURIComponent(front)}=${encodeURIComponent(back)}`)
		.join('&');

	let shuffledVocabList: Vocab[] = [];

	const addVocabField = () => {
		vocabList = [...vocabList, { front: '', back: '' }];
	};

	const removeVocabField = () => {
		vocabList.pop();
		vocabList = vocabList;
	};

	function shuffleArray<T>(array: T[]): T[] {
		const result = array.slice();
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	}

	const selectRandomVocabs = () => {
		// If there are 20 or fewer vocab entries, select all of them
		if (vocabList.length <= 20) {
			const shuffled = shuffleArray(vocabList);
			shuffledVocabList = shuffled;
		} else {
			// If there are more than 20, shuffle and then select the first 20
			const shuffled = shuffleArray(vocabList);
			shuffledVocabList = shuffled.slice(0, 20);
		}
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

	const clearAll = () => {
		window.location.replace(`${window.location.origin}${window.location.pathname}`);
	};

	$: saved = `${window.location.origin}${window.location.pathname}?${params}`;
</script>

<title>漢字テスト創作ツール</title>

<div class="m-4 space-y-4">
	<h1 class="text-3xl font-bold">漢字テスト創作ツール</h1>
	<div>
		{#each vocabList as { front, back }}
			<div class="flex gap-2 mb-2">
				<input type="text" placeholder="書き" class="border p-1" bind:value={front} />
				<input type="text" placeholder="読み" class="border p-1" bind:value={back} />
			</div>
		{/each}
		<button class="border p-1" on:click={addVocabField}>追加</button>
		<button class="border p-1" on:click={removeVocabField}>削除</button>
	</div>

	<hr />

	<div>
		<h2 class="text-xl font-bold">すべての単語</h2>
		<DownloadSection {vocabList} />
	</div>

	<hr />

	<div>
		<h2 class="text-xl font-bold">テスト作成</h2>
		<DownloadSection vocabList={shuffledVocabList} />
		<button class="border p-1" on:click={selectRandomVocabs}>作成</button>
	</div>

	<hr />

	<div>
		<h2 class="text-xl font-bold">.csvファイルをインポート</h2>
		<input type="file" accept=".csv" on:change={handleFileChange} />
	</div>

	<hr />

	<div>
		<button class="border p-1" on:click={clearAll}>リセット</button>
	</div>
</div>
