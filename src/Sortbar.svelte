<script>
    import Button from "./Components/Button.svelte"
    import {requests} from "./stores"
    $: suggestions = [...$requests].filter(request => request.status === "suggestion")
</script>

<div class="sortbar">
    <img src="/assets/suggestions/icon-suggestions.svg" alt="bulb">
    <p>{suggestions.length} suggestions</p>
    <Button content={"add feedback"} type={"btn--violet sortbar__add"}>
        <img src="/assets/shared/icon-plus.svg" alt="quote" aria-hidden="true">
    </Button>
</div>