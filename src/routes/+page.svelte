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
		if (vocabList.length <= 20) {
			shuffledVocabList = shuffleArray(vocabList);
		} else {
			shuffledVocabList = shuffleArray(vocabList).slice(0, 20);
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
			window.history.pushState({}, '', saved);
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

<svelte:head>
	<title>漢字テスト創作ツール</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<header class="bg-indigo-700 text-white shadow-md">
		<div class="max-w-2xl mx-auto px-6 py-5">
			<h1 class="text-3xl font-bold tracking-tight">漢字テスト創作ツール</h1>
			<p class="text-indigo-200 text-sm mt-1">Kanji test sheet generator</p>
		</div>
	</header>

	<main class="max-w-2xl mx-auto px-6 py-8 space-y-6">
		<!-- Vocab input -->
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<h2 class="text-base font-semibold text-gray-800 mb-4">単語リスト</h2>
			<div class="space-y-2 mb-4">
				<div class="flex gap-3 text-xs font-medium text-gray-400 uppercase tracking-wide px-1">
					<span class="w-36">書き (kanji)</span>
					<span class="w-36">読み (reading)</span>
				</div>
				{#each vocabList as { front, back }}
					<div class="flex gap-3">
						<input
							type="text"
							placeholder="書き"
							class="w-36 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
							bind:value={front}
						/>
						<input
							type="text"
							placeholder="読み"
							class="w-36 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
							bind:value={back}
						/>
					</div>
				{/each}
			</div>
			<div class="flex gap-2">
				<button
					class="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
					on:click={addVocabField}
				>
					＋ 追加
				</button>
				<button
					class="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
					on:click={removeVocabField}
				>
					− 削除
				</button>
			</div>
		</section>

		<!-- All vocab links -->
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<h2 class="text-base font-semibold text-gray-800 mb-3">すべての単語</h2>
			<DownloadSection {vocabList} />
		</section>

		<!-- Random selection -->
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<h2 class="text-base font-semibold text-gray-800 mb-1">テスト作成</h2>
			<p class="text-xs text-gray-400 mb-3">ランダムで最大20問を選択</p>
			<DownloadSection vocabList={shuffledVocabList} />
			<button
				class="mt-4 px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
				on:click={selectRandomVocabs}
			>
				ランダム選択
			</button>
		</section>

		<!-- CSV import -->
		<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
			<h2 class="text-base font-semibold text-gray-800 mb-1">.csv インポート</h2>
			<p class="text-xs text-gray-400 mb-3">
				形式: <code class="bg-gray-100 px-1 rounded font-mono">書き;読み</code> (1行1単語)
			</p>
			<input
				type="file"
				accept=".csv"
				class="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer"
				on:change={handleFileChange}
			/>
		</section>

		<!-- Reset -->
		<div class="flex justify-end">
			<button
				class="px-4 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
				on:click={clearAll}
			>
				リセット
			</button>
		</div>
	</main>
</div>
