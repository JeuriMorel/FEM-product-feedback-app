<script>
    import { suggestions, filterParam, currentPage } from "./stores"
    import { fly, fade } from "svelte/transition"
    import {getNumberOfComments} from "./getNumberOfComments"

    // import { createEventDispatcher } from "svelte"
    

    // const dispatch = createEventDispatcher()

    function addFeedback() {
        // dispatch("goToAddFeedback")
        currentPage.set('feedback--new')
    }


    //VARIABLES
    let sortOptions = [
        "most upvotes",
        "least upvotes",
        "most comments",
        "least comments",
    ]
    let optionsIndex = 0
    let menuIsOpen = false

    $: selectedOption = sortOptions[optionsIndex]
    $: sortSuggestions(selectedOption)


    // REMOVE LATER
    $: filteredSuggestions =
        $filterParam === "all"
            ? $suggestions
            : $suggestions.filter(
                  currentSuggestion =>
                      currentSuggestion.category === $filterParam
              )

    function sortSuggestions() {
        if (selectedOption === "most upvotes") {
            suggestions.set($suggestions.sort((a, b)=> (a.upvotes < b.upvotes) ? 1 : -1))
        }
        if (selectedOption === "most comments") {
            suggestions.set($suggestions.sort((a, b)=> (getNumberOfComments(a.comments) < getNumberOfComments(b.comments)) ? 1 : -1))
        }
        if (selectedOption === "least upvotes") {
            suggestions.set(
                $suggestions.sort((a, b) => (a.upvotes > b.upvotes ? 1 : -1))
            )
        }
        if (selectedOption === "least comments") {
            suggestions.set($suggestions.sort((a, b)=> (getNumberOfComments(a.comments) > getNumberOfComments(b.comments)) ? 1 : -1))
        }
    }
</script>

<div class="sortbar">
    <img
        src="/assets/suggestions/icon-suggestions.svg"
        alt="bulb"
        class="sortbar__icon"
    />
    <p class="sortbar__suggestions">{filteredSuggestions.length} suggestions</p>
    <button
        class="sortbar__menu-toggle btn"
        on:click={() => {
            menuIsOpen = !menuIsOpen
        }}
    >
        sort by : <span class="sortbar__option">{selectedOption}</span>
        <svg
            class="sortbar__menu-arrow"
            class:menuIsOpen
            width="10"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                d="M1 1l4 4 4-4"
                stroke="#4661E6"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
            /></svg
        >

        {#if menuIsOpen}
            <ul class="sortbar__list" in:fly={{ y: -50 }}>
                {#each sortOptions as option, index}
                    <li
                        class="sortbar__list-item"
                        class:selected={selectedOption === option}
                    >
                        <button
                            class="btn btn--clear sortbar__list-btn"
                            on:click|stopPropagation={() => {
                                optionsIndex = index
                                menuIsOpen = !menuIsOpen
                            }}
                            in:fade={{ duration: 350 * index }}
                            >{option}<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="11"
                                class="sortbar__check"
                                ><path
                                    fill="none"
                                    stroke="#AD1FEA"
                                    stroke-width="2"
                                    d="M1 5.233L4.522 9 12 1"
                                /></svg
                            ></button
                        >
                    </li>
                {/each}
            </ul>
        {/if}
    </button>
    <button class="btn btn--violet sortbar__add" on:click={()=>{
        currentPage.set('feedback--new')
    }}> + add feedback </button>
</div>
