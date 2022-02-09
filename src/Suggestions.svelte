<script>
    import { suggestions, filterParam } from "./stores"
    import SuggestionCard from "./SuggestionsCard.svelte"

$: filteredSuggestions = $filterParam === "all" ? $suggestions : $suggestions.filter(currentSuggestion => currentSuggestion.category === $filterParam
)

</script>

<section class="suggestions">
    
        {#each filteredSuggestions as suggestion (suggestion.id)}
            <SuggestionCard info={suggestion} />
        {/each}

</section>
