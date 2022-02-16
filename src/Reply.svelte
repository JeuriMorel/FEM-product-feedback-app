<script>
    // import Comment from "./Comment.svelte"

    export let reply

    let { user, content, replyingTo } = reply

    let replyString = ""

    let formIsVisible = false
</script>

<div class="feedback__reply">
    <div class="user">
    <img src={user.image} alt={user.name} class="user__image" />
    <div class="user__text">
        <p class="user__name">{user.name}</p>
        <p class="user__username">@{user.username}</p>
    </div>
    <button
        class="btn btn--clear user__reply"
        on:click={() => {
            formIsVisible = !formIsVisible
        }}>reply</button
    >
</div>
    <p class="feedback__content">
        <span class="feedback__replying">@{replyingTo}</span>
        {content}
    </p>
    {#if formIsVisible}
        <!-- content here -->
        <form
            class="feedback__form feedback__form--reply"
            on:submit|preventDefault={() => {
                console.log(reply)
            }}
        >
            <input
                type="text"
                class="feedback__form-input"
                maxlength="250"
                bind:value={replyString}
            />
            <button class="btn btn--violet btn--padded feedback__form-btn"
                >post reply</button
            >
        </form>
    {/if}
</div>
