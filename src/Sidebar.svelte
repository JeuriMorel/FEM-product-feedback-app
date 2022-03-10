<script>
    import { fly } from "svelte/transition"
    import { requests, filters, filterParam, currentPage } from "./stores"

    // VARIABLES

    let filterValue = $filterParam

    $: planned = getProgressCount("planned", [...$requests])
    $: live = getProgressCount("live", [...$requests])
    $: inProgress = getProgressCount("in-progress", [...$requests])

    $: roadmapProgressTotal = planned + live + inProgress
    $: filterParam.set(filterValue)

    function getProgressCount(category, array) {
        let filteredRequestsArray = array.filter(request => {
            return request.status === category
        })

        return filteredRequestsArray.length
    }
</script>

<aside>
    <ul class="sidebar" in:fly={{ x: 2000, duration: 350 }}>
        <li>
            <ul class="sidebar__card sidebar__card--filter">
                {#each $filters as filter}
                    <li class="sidebar__radio-wrapper">
                        <input
                            type="radio"
                            bind:group={filterValue}
                            name="filter"
                            value={filter}
                            checked={filter === filterValue}
                            id={filter}
                            class="sidebar__radio"
                        />
                        <label
                            class="btn btn--filter sidebar__label"
                            for={filter}>{filter}</label
                        >
                    </li>
                {/each}
            </ul>
        </li>
        <li class="sidebar__card sidebar__card--roadmap">
            <p class="roadmap__title">roadmap</p>
            <button
                class=" btn btn--link roadmap__btn"
                on:click={() => {
                    currentPage.set("roadmap")
                }}
                disabled={!roadmapProgressTotal}>view</button
            >
            <ul class="roadmap__list">
                <li class="roadmap__item roadmap__item--peach">
                    <p class="roadmap__list-category ">
                        <span> planned </span>
                        <span class="roadmap__quantity">{planned}</span>
                    </p>
                </li>
                <li class="roadmap__item roadmap__item--violet">
                    <p class="roadmap__list-category">
                        <span>
                            in-Progress 
                        </span> 

                        <span class="roadmap__quantity"
                            >{inProgress}</span
                        >
                    </p>
                </li>
                <li class="roadmap__item roadmap__item--lt-blue">
                    <p class="roadmap__list-category">
                        live<span class="roadmap__quantity">{live}</span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>
</aside>
