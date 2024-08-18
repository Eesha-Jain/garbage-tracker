<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { handleError } from '$lib/handleError';
    import type { Project, User } from '$lib/types';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let loading = true;
    const project_id = $page.params.project_id;
    const project_type = $page.params.type;
    let project: Project;
    let owner_name = "";

    async function fetchProject() {
        if (project_type === "private") {
            try {
                let { data: project_data } = await supabase
                    .from('private_projects')
                    .select('*')
                    .eq("project_id", project_id)
                    .single();
                
                project = project_data as Project;
            } catch (error: any) {
                handleError(error);
            }
        } else if (project_type === "public") {
            try {
                let { data: project_data } = await supabase
                    .from('public_projects')
                    .select('*')
                    .eq("project_id", project_id)
                    .single();
                
                project = project_data as Project;
            } catch (error: any) {
                handleError(error);
            }
        }
    }

    async function fetchOwner() {
        try {
            let { data: user_info } = await supabase
                .from('users')
                .select('*')
                .eq("user_id", project.project_owner)
                .single();
            
                let owner = user_info as User;
                owner_name = owner.username;
        } catch (error: any) {
            handleError(error);
        }
    }

    onMount(async () => {
        if (project_type === "private" || project_type === "public") {
            await fetchProject();
            await fetchOwner();
            loading = false;
        }
    })
</script>

{#if project_type === "private" || project_type === "public"}
    {#if loading}
        <p>Loading...</p>
    {:else}
        <h1>{project.project_name}</h1>
        <p>Project Owner: {owner_name}</p>
        <p>Project Data: {JSON.stringify(project.project_data)}</p>
    {/if}
{:else}
    <p>Incorrect URL</p>
{/if}