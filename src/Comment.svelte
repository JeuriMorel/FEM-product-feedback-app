<script>
    import { user } from "./stores"
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    function addReply(reply, id) {
        dispatch("add", {
            reply,
            id,
        })
    }

    export let commentUser
    export let content = ""
    export let id
    let { image, name, username } = commentUser
    let replyString = ""
    let formIsVisible = false
</script>

<div class="user">
    <img src={image} alt={name} class="user__image" />
    <div class="user__text">
        <p class="user__name">{name}</p>
        <p class="user__username">@{username}</p>
    </div>
    <button
        class="btn btn--clear user__reply"
        on:click={() => {
            formIsVisible = !formIsVisible
        }}>reply</button
    >
</div>

<p class="feedback__content">{content}</p>
{#if formIsVisible}
    <form
        class="feedback__form feedback__form--reply"
        on:submit|preventDefault={() => {
            let newReply = {
                content: replyString,
                replyingTo: username,
                user: $user,
            }
            addReply(newReply, id)
            replyString = ""
            formIsVisible = !formIsVisible
        }}
    >
        <textarea
            class="feedback__form-input"
            maxlength="250"
            bind:value={replyString}
        />
        <button class="btn btn--violet btn--padded feedback__form-btn"
            >post reply</button
        >
    </form>
{/if}
