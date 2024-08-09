<script type="ts">
	import '../app.css';
	import Account from "$lib/components/Account.svelte";

	let user = null;
</script>

<div class="app">
	<main>
		{#if user}
			<slot />
		{:else}
			<div class="flex">
				<div>
					<Account />
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	:global(:root) {
		font-family: "Noto Sans", Arial, Helvetica, sans-serif;
		--primary: #678D58;
		--primary-tint: #A6C48A;
		--primary-dark: #358600;
		--secondary: #087F8C;
		--secondary-tint: #AAEFDF;
		--secondary-dark: #095256;
		--teritary: #808080;
		--off-white: #d9e8df;
		--off-black: #344055;

		--large-space: 60px;
		--medium-space: 20px;
		--small-space: 10px;
	}

	:global(h1) {
		font-size: 45px;
		margin: 0px;
		padding: 0px;
		text-align: center;
		margin-bottom: var(--small-space);
		color: var(--primary);
	}

	:global(.flex) {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.app {
		background-color: var(--off-white);
		min-height: 100vh;
		padding: 5px;
		padding-top: 20px;
	}
</style>
