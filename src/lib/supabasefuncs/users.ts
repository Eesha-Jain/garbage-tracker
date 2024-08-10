import { supabase } from "$lib/supabase";

/**
 * Creates a account for the user
 *
 * @param email string
 * @param password string
 */
export async function createAccount(email: string, password: string) {
	const { user, session, error } = await supabase.auth.signUp({
		email: email,
		password: password,
	});
	if (error) throw error;
}

/**
 * Signs into an existing account for the user
 *
 * @param email string
 * @param password string
 */
export async function signIntoAccount(email: string, password: string) {
	const { error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});
	if (error) throw error;
}

/**
 * Returns current user's info
 *
 * @returns current user info
 */
export async function getThisUser() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}