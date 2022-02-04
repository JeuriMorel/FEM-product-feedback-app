<script>
import { current_component } from "svelte/internal";

    import Button from "./Components/Button.svelte"
    export let info;
    let {title, description, category, upvotes, comments=[]} = info 



    function getCommentNumbers(){
        let numberOfComments = comments.reduce((acc, curr)=>{
            if(curr.replies){
                return ++acc + curr.replies.length
            }
            return ++acc
        }, 0)

        return numberOfComments
    }
</script>


<article class="suggestions__card">
    
    <div class="suggestions__text">
        <h2 class="suggestions__title">{title}</h2>
        <p class="suggestions__description">{description}</p>
    </div>
    <Button content={category} type={"btn--filter suggestions__category"}/>
    <Button content={upvotes} type={"suggestions__upvotes"}>
        <img src="/assets/shared/icon-arrow-up.svg" alt="quote" aria-hidden="true">
    </Button>
    <p class="suggestions__comments"><img src="/assets/shared/icon-comments.svg" alt="quote" aria-hidden="true">{getCommentNumbers()}</p>
</article>
