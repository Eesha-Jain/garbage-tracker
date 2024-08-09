<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { handleError } from '$lib/handleError';
    import type { Project, User } from '$lib/types';
    import { onMount } from 'svelte';

    let loading = true;
    let projects: Project[] = [];
    let users: any = {};

    async function getUsers() {
        let { data: user_data, error } = await supabase
            .from('users')
            .select('*');
        if (error) {
            handleError(error);
        } else {
            for (const user of user_data as User[]) {
                if (!Object.keys(users).includes(user.user_id)) {
                    users[user.user_id] = user.username;
                }
            }
        }
    }

    async function getProjects() {
        let { data: public_projects, error: error_1 } = await supabase
            .from('public_projects')
            .select('*')
        if (error_1) {
            handleError(error_1);
        } else {
            projects = public_projects as Project[];
        }

        let { data: private_projects, error: error_2 } = await supabase
            .from('private_projects')
            .select('*')
        if (error_2) {
            handleError(error_2);
        } else {
            projects.push(...private_projects as Project[]);
        }
    }

    onMount(async () => {
        await getUsers();
        await getProjects();
        loading = false;
    })
</script>

<h1>Projects</h1>
{#if loading}
    <p>Loading...</p>
{:else}
    {#each projects as project}
        <a href="/projects/{project.project_id}">
            <div>
                <h2>{project.project_name}</h2>
                <p>Project owner: {users[project.project_owner]}</p>
            </div>
        </a>
    {/each}
{/if}