<script>
    import { onMount } from "svelte"
    import { user, requests, suggestions } from "./stores"
    import Header from "./Header.svelte"
    import Sidebar from "./Sidebar.svelte"
    import Sortbar from "./Sortbar.svelte"
    import Suggestions from "./Suggestions.svelte"

    //VARIABLES

    let navIsOpen = false

    // FUNCTIONS
    async function fetchData(prop) {
        let res = await fetch("./data.json")
        let data = await res.json()
        return data[prop]
    }

    function toggleNav() {
        navIsOpen = !navIsOpen
    }

    onMount(async () => {
        let setUser = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : await fetchData("currentUser")
        let setRequests = localStorage.getItem("requests")
            ? JSON.parse(localStorage.getItem("requests"))
            : await fetchData("productRequests")

        user.set(setUser)
        requests.set(setRequests)
        suggestions.set(setRequests.filter(request => request.status === "suggestion"))
    })
</script>

<Header on:toggleNav={toggleNav} {navIsOpen} />
<main class:navIsOpen>
    <Sortbar />
    {#if navIsOpen}
        <Sidebar />
    {/if}
    <Suggestions />
</main>
