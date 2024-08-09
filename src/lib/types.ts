export interface Project {
    project_id: number,
    project_name: string,
    project_owner: string,
    project_bot: string,
    project_data: any // Change once we know the format of the project data
}

export interface User {
    user_id: string,
    username: string
}