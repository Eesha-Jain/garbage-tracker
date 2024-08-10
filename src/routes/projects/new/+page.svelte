<script lang="ts">
    let projectName: string;
    let projectBot: string;
    let projectData: string;
</script>

<h1>Create Project</h1>
<div class="flex">
    <div>
        <input
            id="project_name"
            placeholder="project name"
            type="text"
            bind:value={projectName}
        /><br />
        <input
            id="project_bot"
            placeholder="project bot"
            type="text"
            bind:value={projectBot}
        /><br />
        <input
            id="project_data"
            placeholder="project data"
            type="text"
            bind:value={projectData}
        /><br />
        <div class="flex">
            <button class="styled">submit</button>
        </div>
    </div>
</div>
