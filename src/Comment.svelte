<script>
    import { user } from "./stores"
    import { createEventDispatcher } from "svelte"
    import { isFormValid } from "./isFormValid"

    const dispatch = createEventDispatcher()

    function addReply(reply, id) {
        dispatch("add", {
            reply,
            id,
        })
    }

    function capitalize(string) {
        return string[0]?.toUpperCase() + string.slice(1)
    }

    export let commentUser
    export let content = ""
    export let hasReplies = false
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

<p class="feedback__content feedback__content--main" class:hasReplies>
    {content}
</p>
{#if formIsVisible}
    <form class="feedback__form feedback__form--reply" class:hasReplies>
        <textarea
            class="feedback__form-input"
            maxlength="250"
            bind:value={replyString}
            required
        />
        <p class="error-message">can't be empty</p>
        <button
            class="btn btn--violet btn--padded feedback__form-btn"
            on:click|preventDefault={() => {
                if (!isFormValid()) return

                let newReply = {
                    content: capitalize(replyString),
                    replyingTo: username,
                    user: $user,
                }
                addReply(newReply, id)
                replyString = ""
                formIsVisible = !formIsVisible
            }}>post reply</button
        >
    </form>
{/if}
