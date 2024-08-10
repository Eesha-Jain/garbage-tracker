import toast from "svelte-french-toast";

export function handleError(error: any) {
	console.log(error.message);
	console.log(error);
	toast.error(error.message);
}