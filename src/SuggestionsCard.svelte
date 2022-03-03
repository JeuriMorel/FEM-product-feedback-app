<script>
    import { getNumberOfComments } from "./getNumberOfComments"
    import { suggestions, feedback, currentPage } from "./stores"

    export let info
    export let isRoadmapCard = false

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
        feedback.set(info)
        currentPage.set("feedback--detail")
    }
</script>

<article
    class="suggestions__card"
    on:click={goToFeedbackDetail}
    class:roadmap__card={isRoadmapCard}
    class:roadmap__card--planned={info.status === "planned"}
    class:roadmap__card--in-progress={info.status === "in-progress"}
    class:roadmap__card--live={info.status === "live"}
>
    {#if isRoadmapCard}
        <p class="roadmap__status fs-13 lh-19">{info.status.replace('-', ' ')}</p>
    {/if}
    <div class="suggestions__text">
        <h2 class="suggestions__title fs-13-18 lh-19-26">{title}</h2>
        <p class="suggestions__description fs-13-16 lh-19-23">{description}</p>
    </div>
    <button class="btn btn--filter suggestions__category" disabled>{category}</button>
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
