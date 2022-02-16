<script>
    import { current_component } from "svelte/internal"
    import { getNumberOfComments } from "./getNumberOfComments"
    import { suggestions, onMainPage, feedback } from "./stores"

    export let info

    $: ({
        title,
        description,
        category,
        upvotes,
        comments = [],
        upvoted = false,
    } = info ? info : $feedback)

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

    function goToFeedbackDetail() {
        onMainPage.set(false)
        feedback.set(info)
    }
</script>

<article class="suggestions__card" on:click={goToFeedbackDetail}>
    <div class="suggestions__text">
        <h2 class="suggestions__title">{title}</h2>
        <p class="suggestions__description">{description}</p>
    </div>
    <button class="btn btn--filter suggestions__category">{category}</button>
    <button
        class="btn btn--filter suggestions__upvotes"
        on:click|stopPropagation={() => {
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
                stroke="hsla(230, 76%, 59%, 1)"
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
