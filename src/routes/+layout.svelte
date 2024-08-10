<script lang="ts">
	import "../app.css";
	import NavBar from "$lib/components/NavBar.svelte";
	import { Toaster } from "svelte-french-toast";
	import { handleError } from "$lib/handleError";
	import {
		getThisUser,
		signIntoAccount,
		createAccount,
	} from "$lib/supabasefuncs";
	import toast from "svelte-french-toast";
	import { user } from "$lib/sessionStore";

	(async () => {
		user.set(await getThisUser());
	})();

	let email: string = "";
	let password: string = "";
	let hasAccount: boolean = true;

	async function onLogIn() {
		try {
			await signIntoAccount(email, password);
		} catch (e) {
			handleError(e);
		}
	}

	async function onSignUp() {
		try {
			await createAccount(email, password);
			toast.success(
				"Successfully created account. Check your email to confirm.",
			);
		} catch (e) {
			handleError(e);
		}
	}
</script>

<div class="app">
	<NavBar />
	<Toaster />
	<main>
		{#if $user}
			<slot />
		{:else}
			<div class="flex">
				<div>
					<h1>{hasAccount ? "Login" : "Sign Up"}</h1>

					<div style="width: 100%;">
						<input
							id="email"
							placeholder="email"
							type="text"
							bind:value={email}
						/><br />
						<input
							id="password"
							placeholder="password"
							type="password"
							bind:value={password}
						/><br />
						<div class="flex">
							<button
								class="styled"
								on:click={hasAccount ? onLogIn : onSignUp}
								>submit</button
							>
						</div>
						<button
							class="plain"
							on:click={() => {
								hasAccount = !hasAccount;
							}}>{hasAccount ? "Sign Up" : "Log In"} Instead</button
						>
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	:global(:root) {
		--primary: #3b8132;
		--primary-tint: #acd8a7;
		--primary-dark: #276211;
		--secondary: #087f8c;
		--secondary-tint: #aaefdf;
		--secondary-dark: #095256;
		--teritary: #808080;
		--off-white: #e9ffe7;
		--off-black: #344055;

		--large-space: 40px;
		--medium-space: 20px;
		--small-space: 10px;

		--regular-text: 16px;
		--small-text: 13px;
	}

	.app {
		background-color: var(--off-white);
		min-height: 100vh;
	}

	main {
		padding: 5px;
		padding-top: var(--large-space);
	}
</style>
