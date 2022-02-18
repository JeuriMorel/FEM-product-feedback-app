<script>
    import {currentPage} from "./stores"

</script>

<nav class="feedback__nav container container--narrow-xs" class:container--narrow-sm={$currentPage === 'feedback--detail'}>
        <button
            class="btn btn--clear feedback__return"
            on:click={() => {
                currentPage.set('suggestions')
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
        {#if $currentPage === 'feedback--detail'}
            <button class="btn btn--blue btn--padded" on:click|preventDefault={
                ()=>{
                    currentPage.set('feedback--edit')
                }
            }>edit feedback</button>
        {/if}
    </nav>