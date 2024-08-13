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
	.app {
		background-color: var(--off-white);
		min-height: 100vh;
	}

	main {
		padding: 5px;
		padding-top: var(--large-space);
	}
</style>
