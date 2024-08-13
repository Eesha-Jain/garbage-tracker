<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { handleError } from '$lib/handleError';
    import type { Project } from '$lib/types';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let loading = true;
    const project_id = $page.params.project_id;
    const project_name = "test";
</script>

<h1>{project_name}</h1>