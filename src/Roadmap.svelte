<script>
    import { currentPage, feedback, requests } from "./stores"
    import SuggestionCard from "./SuggestionsCard.svelte"

    let statusTypes = ["planned", "in-progress", "live"]

    let radioStatus = statusTypes[1]

    $: leftGridValue =
        statusTypes.findIndex(status => status === radioStatus) * -100

    function getProgressCount(category, array) {
        let filteredRequestsArray = array.filter(request => {
            return request.status === category
        })

        return filteredRequestsArray.length
    }

    function getSubtitle(status) {
        let object = subtitles.find(item => {
            return item.status === status
        })
        return object.subtitle
    }

    function getStatusArray(status) {
        return $requests.filter(feedback => {
            return feedback.status === status
        })
    }

    let subtitles = [
        {
            status: "planned",
            subtitle: "Ideas prioritized for research",
        },
        {
            status: "in-progress",
            subtitle: "Currently being developed",
        },
        {
            status: "live",
            subtitle: "Released features",
        },
    ]
</script>

<header class="roadmap__header container container--roadmap">
    <div class="roadmap__header-text">
        <button
            class="btn btn--clear roadmap__back"
            on:click={() => {
                currentPage.set("suggestions")
            }}
            ><svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"
                ><path
                    d="M6 9L2 5l4-4"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    fill-rule="evenodd"
                /></svg
            >go back</button
        >
        <h1 class="roadmap__h1">roadmap</h1>
    </div>
    <button
        class="btn btn--violet sortbar__add btn--padded"
        on:click={() => {
            currentPage.set("feedback--new")
        }}
    >
        + add feedback
    </button>
</header>

<main class="roadmap container container--roadmap">
    <div class="roadmap__radios">
        {#each statusTypes as status}
            <div
                class="roadmap__radio-container roadmap__radio-container--{status}"
            >
                <input
                    type="radio"
                    name="status"
                    id={status}
                    value={status}
                    checked={status === radioStatus}
                    class="roadmap__radio roadmap__radio--{status}"
                    bind:group={radioStatus}
                />
                <label
                    for={status}
                    class="roadmap__label roadmap__label--{status}"
                    >{status} ({getProgressCount(status, [
                        ...$requests,
                    ])})</label
                >
            </div>
        {/each}
    </div>
    <section
        class="roadmap__grid"
        style="left: {leftGridValue}vw;"
    >
        {#each statusTypes as status}
            <article class="roadmap__article roadmap__article--{status}">
                <h2 class="roadmap__h2">
                    {status} ({getProgressCount(status, [...$requests])})
                </h2>
                <p class="roadmap__subtitle">{getSubtitle(status)}</p>
                <div class="roadmap__card-container">
                    {#each getStatusArray(status) as card}
                        <SuggestionCard info={card} isRoadmapCard="true" />
                    {/each}
                </div>
            </article>
        {/each}
    </section>
</main>
