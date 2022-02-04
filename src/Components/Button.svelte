<script>
    export let content
    export let type
</script>

<button class="btn {type}">
    <slot><!-- optional fallback --></slot>
    {content}
</button>

