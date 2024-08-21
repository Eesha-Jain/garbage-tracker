<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { handleError } from "$lib/handleError";
    import type { Project, User } from "$lib/types";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    let loading = true;
    const project_id = $page.params.project_id;
    const project_type = $page.params.type;
    let project: Project;
    let owner_name = "";

    async function fetchProject() {
        try {
            if (project_type === "private") {
                let { data: project_data } = await supabase
                    .from("private_projects")
                    .select("*")
                    .eq("project_id", project_id)
                    .single();

                project = project_data as Project;
            } else if (project_type === "public") {
                let { data: project_data } = await supabase
                    .from("public_projects")
                    .select("*")
                    .eq("project_id", project_id)
                    .single();

                project = project_data as Project;
            } else {
                throw new Error("NO PROJECT")
            }

            if (!project) throw new Error("NO PROJECT")
        } catch (error: any) {
            if (error.message == "NO PROJECT") {
                goto('/error');
            }
            handleError(error);
        }
    }

    async function fetchOwner() {
        try {
            let { data: user_info } = await supabase
                .from("users")
                .select("*")
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
    });
</script>

{#if loading}
    <p>Loading...</p>
{:else}
    <h1>{project.project_name}</h1>
    <h3>Project Owner: {owner_name}</h3>
    <div class="columns">
        {#each Object.entries(project.project_data) as [key, value]}
            <div class="box">
                🗑️ {key} <span class="thick_line">|</span>
                {value}
            </div>
        {/each}
    </div>
{/if}

<style>
    .thick_line {
        font-weight: 900;
        color: gray;
    }
</style>
