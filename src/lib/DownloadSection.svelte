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
