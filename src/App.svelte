<script>
    import { onMount } from "svelte"
    import { user, requests, suggestions, onMainPage, feedback } from "./stores"
    import Header from "./Header.svelte"
    import Sidebar from "./Sidebar.svelte"
    import Sortbar from "./Sortbar.svelte"
    import Suggestions from "./Suggestions.svelte"
    import SuggestionCard from "./SuggestionsCard.svelte"
    import FeedbackComments from "./FeedbackComments.svelte"
    import { getNumberOfComments } from "./getNumberOfComments"

    //VARIABLES

    let navIsOpen = false
    let replyString = ""

    $: isOnMainPage = $onMainPage

    $: isOnMainPage ? document.body.classList.add('onMainPage') : document.body.classList.remove('onMainPage')

    // FUNCTIONS
    async function fetchData(prop) {
        let res = await fetch("./data.json")
        let data = await res.json()
        return data[prop]
    }

    function toggleNav() {
        navIsOpen = !navIsOpen
    }

    function addCommentToArray() {
        if (!replyString) return

        let comment = {
            content: replyString,
            user: $user,
        }
        $feedback.comments = $feedback.comments
            ? [...$feedback.comments, comment]
            : [comment]

        replyString = ""
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
        suggestions.set(
            setRequests.filter(request => request.status === "suggestion")
        )
    })
</script>

{#if isOnMainPage}
    <Header on:toggleNav={toggleNav} {navIsOpen} />
    <main class:navIsOpen>
        <div class="container container--main">
            <Sortbar />
            {#if navIsOpen}
                <Sidebar />
            {/if}
            <Suggestions />
        </div>
    </main>
{:else}
    <nav class="feedback__nav container container--narrow-sm">
        <button
            class="btn btn--clear feedback__return"
            on:click={() => {
                onMainPage.set(true)
            }}
            ><svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"
                ><path
                    d="M6 9L2 5l4-4"
                    stroke="#4661E6"
                    stroke-width="2"
                    fill="none"
                    fill-rule="evenodd"
                /></svg
            >go back</button
        >
        <button class="btn btn--blue btn--padded">edit feedback</button>
    </nav>
    <main class="feedback__main container container--narrow-sm">
        <SuggestionCard info={$feedback} />
        <section class="feedback__comments">
            <h2>{getNumberOfComments($feedback.comments)} Comments</h2>
            {#if $feedback.comments}
                <FeedbackComments />
            {/if}
        </section>
        <form
            class="feedback__form"
            on:submit|preventDefault={addCommentToArray}
        >
            <h2 class="feedback__form-header">add comment</h2>
            <input
                type="text"
                class="feedback__form-input"
                maxlength="250"
                placeholder="Type your comment here"
                bind:value={replyString}
            />
            <div class="feedback__form-a">
                <p class="feedback__form-characters">
                    {250 - replyString.length} Characters left
                </p>
                <button class="btn btn--violet btn--padded feedback__form-btn"
                    >post comment</button
                >
            </div>
        </form>
    </main>
{/if}

<!-- name[0]?.toUpperCase() + name.slice(1) -->
