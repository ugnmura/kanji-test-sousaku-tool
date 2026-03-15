<script lang="ts">
	import type { Vocab } from '$lib/types';

	export let vocabList: Vocab[];

	$: params = vocabList
		.filter(({ front, back }) => front && back)
		.map(({ front, back }) => `${encodeURIComponent(front)}=${encodeURIComponent(back)}`)
		.join('&');

	$: backToFront = `${window.location.origin}${window.location.pathname}back?${params}`;
	$: frontToBack = `${window.location.origin}${window.location.pathname}front?${params}`;
	$: backToFrontAnswer = `${window.location.origin}${window.location.pathname}back/answer?${params}`;
	$: frontToBackAnswer = `${window.location.origin}${window.location.pathname}front/answer?${params}`;
</script>

{#if params}
	<div class="grid grid-cols-2 gap-3">
		<a
			href={frontToBack}
			target="_blank"
			class="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
		>
			<div>
				<p class="text-sm font-medium text-gray-800">読みテスト</p>
				<p class="text-xs text-gray-400">かんじ → よみ</p>
			</div>
			<span class="text-indigo-500 text-xs font-medium group-hover:underline">開く →</span>
		</a>

		<a
			href={frontToBackAnswer}
			target="_blank"
			class="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
		>
			<div>
				<p class="text-sm font-medium text-gray-800">読み答え</p>
				<p class="text-xs text-gray-400">かんじ → よみ 答え</p>
			</div>
			<span class="text-indigo-500 text-xs font-medium group-hover:underline">開く →</span>
		</a>

		<a
			href={backToFront}
			target="_blank"
			class="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
		>
			<div>
				<p class="text-sm font-medium text-gray-800">書きテスト</p>
				<p class="text-xs text-gray-400">よみ → かんじ</p>
			</div>
			<span class="text-indigo-500 text-xs font-medium group-hover:underline">開く →</span>
		</a>

		<a
			href={backToFrontAnswer}
			target="_blank"
			class="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
		>
			<div>
				<p class="text-sm font-medium text-gray-800">書き答え</p>
				<p class="text-xs text-gray-400">よみ → かんじ 答え</p>
			</div>
			<span class="text-indigo-500 text-xs font-medium group-hover:underline">開く →</span>
		</a>
	</div>
{/if}
