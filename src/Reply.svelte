<script>
    import { user } from "./stores"
    import { createEventDispatcher } from "svelte"
    import {isFormValid} from "./isFormValid"

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

    export let reply
    export let id

    

    let { user: replyUser, content, replyingTo } = reply
    let replyString = ""
    let formIsVisible = false
</script>

<div class="feedback__reply">
    <div class="user">
        <img src={replyUser.image} alt={replyUser.name} class="user__image" />
        <div class="user__text">
            <p class="user__name">{replyUser.name}</p>
            <p class="user__username">@{replyUser.username}</p>
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
        <form
            class="feedback__form feedback__form--reply"
            
        >
            <textarea class="feedback__form-input" maxlength="250"
                bind:value={replyString} required></textarea>
                <p class="error-message">can't be empty</p>
            <button class="btn btn--violet btn--padded feedback__form-btn"
            on:click|preventDefault={() => {
                if(!isFormValid()) return
                let newReply = {
                    content: capitalize(replyString),
                    replyingTo: replyUser.username,
                    user: $user,
                }
                addReply(newReply, id)
                replyString = ""
                formIsVisible = !formIsVisible
            }}
                >post reply</button
            >
        </form>
    {/if}
</div>
