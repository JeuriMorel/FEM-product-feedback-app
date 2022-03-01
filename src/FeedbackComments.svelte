<script>
    import { feedback } from "./stores"
    import Comment from "./Comment.svelte"
    import Reply from "./Reply.svelte"

    let hasReplies

    $: comments = $feedback.comments

    function updateReplies(event){
        let newReply = event.detail.reply
        let newComments = comments.map(comment=>{
            if(comment.id === event.detail.id){
                comment.replies = comment.replies ? [...comment.replies, newReply] : [newReply]
            }
            return comment
        })
        feedback.update(comment =>{
            return {...comment, comments: newComments}
        })
    }
</script>

{#each comments as { content, user, replies = [], id }(id)}
    <article class="feedback__comment">
        <Comment commentUser={user} {id} {content} on:add={updateReplies} hasReplies={replies.length > 0}/>
        <div class="feedback__replies-container">
            {#each replies as reply}
                <Reply {id} {reply} on:add={updateReplies}/>
            {/each}
        </div>
    </article>
{/each}
