<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { handleError } from "$lib/handleError";
    import type { Project, User } from "$lib/types";
    import { onMount } from "svelte";

    let loading = true;
    let public_projects: Project[] = [];
    let private_projects: Project[] = [];
    let users: any = {};

    async function getUsers() {
        let { data: user_data, error } = await supabase
            .from("users")
            .select("*");
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
        try {
            let { data: public_projects_info } = await supabase
                .from("public_projects")
                .select("*");

            public_projects = public_projects_info as Project[];

            let { data: private_projects_info } = await supabase
                .from("private_projects")
                .select("*");

            private_projects = private_projects_info as Project[];
        } catch (error) {
            handleError(error);
        }
    }

    onMount(async () => {
        await getUsers();
        await getProjects();
        loading = false;
    });
</script>

<h1>Projects</h1>
<div class="flex">
    <a href="/projects/new"><button class="styled">Create Project</button></a>
</div>

{#if loading}
    <p>Loading...</p>
{:else}
    <div class="columns">
        {#each public_projects as project}
            <a href="/projects/public/{project.project_id}">
                <div class="box">
                    <div class="circle" style="background-color: var(--primary);"></div>
                    <h2>{project.project_name}</h2>
                    <p>Owner: {users[project.project_owner]}</p>
                </div>
            </a>
        {/each}
        {#each private_projects as project}
            <a href="/projects/private/{project.project_id}">
                <div class="box">
                    <div class="circle" style="background-color: var(--primary);"></div>
                    <h2>{project.project_name}</h2>
                    <p>Owner: {users[project.project_owner]}</p>
                </div>
            </a>
        {/each}
    </div>
{/if}

<style>
    a {
        text-decoration: none;
        color: var(--primary);
    }

    p {
        text-align: center;
    }
</style>