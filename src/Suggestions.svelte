<script>

    import {requests} from "./stores"
    import SuggestionCard from './SuggestionsCard.svelte'
    import Sortbar from "./Sortbar.svelte"

    $: suggestions = [...$requests].filter(request => request.status === "suggestion")
</script>


<section class="suggestions">
    <Sortbar />

    {#each suggestions as suggestion}
        <SuggestionCard info={suggestion}/>
    {/each}
</section>