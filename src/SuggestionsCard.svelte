<script>
    import { current_component } from "svelte/internal"
    import { fly, fade } from "svelte/transition"
    import { getNumberOfComments } from "./getNumberOfComments"
    import { suggestions } from "./stores"

    export let info
    let {
        title,
        description,
        category,
        upvotes,
        comments = [],
        upvoted = false,
    } = info
    // let suggestion = $suggestions.filter(item => item === info)
    function updateSuggestions() {
        suggestions.update(suggestionsArray => {
            return suggestionsArray.map(currentSuggestion => {
                if (currentSuggestion.title === info.title) {
                    return info
                }
                return currentSuggestion
            })
        })
    }
</script>

<article class="suggestions__card">
    <div class="suggestions__text">
        <h2 class="suggestions__title">{title}</h2>
        <p class="suggestions__description">{description}</p>
    </div>
    <button class="btn btn--filter suggestions__category">{category}</button>
    <button
        class="btn btn--filter suggestions__upvotes"
        on:click={() => {
            upvoted = !upvoted
            if (upvoted) {
                ++upvotes
            } else {
                --upvotes
            }
            info = { ...info, upvotes, upvoted }
            updateSuggestions()
        }}
        class:upvoted
    >
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"
            ><path
                d="M1 6l4-4 4 4"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
            /></svg
        >
        {upvotes}
    </button>
    <p class="suggestions__comments">
        <img
            src="/assets/shared/icon-comments.svg"
            alt="quote"
            aria-hidden="true"
        />{getNumberOfComments(comments)}
    </p>
</article>
