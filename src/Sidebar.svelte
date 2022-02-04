<script>
    import Button from './Components/Button.svelte'
    import { fly } from 'svelte/transition';
    import {requests} from './stores'

    // VARIABLES

    let content;
    let type;


    $: planned = getProgressCount("planned")
    $: live = getProgressCount("live")
    $: inProgress = getProgressCount("in-progress")


    function getProgressCount(category){
        let filteredRequestsArray = [...$requests].filter(request=>{
            return request.status === category
        })

        return filteredRequestsArray.length
    }

</script>



<ul class="sidebar" transition:fly="{{ x: 2000, duration: 300 }}">
    <li class="sidebar__card sidebar__card--filter" >
        <Button content={"all"} type={"btn--filter"}></Button>
        <Button content={"UI"} type={"btn--filter"}></Button>
        <Button content={"UX"} type={"btn--filter"}></Button>
        <Button content={"enhancement"} type={"btn--filter"}></Button>
        <Button content={"bug"} type={"btn--filter"}></Button>
        <Button content={"feature"} type={"btn--filter"}></Button>
        </li>
    <li class="sidebar__card sidebar__card--roadmap">
        <p class="roadmap__title">roadmap</p>
        <Button content={"view"} type={"btn--link roadmap__btn"}/>
        <ul class="roadmap__list">
            <li class="roadmap__item roadmap__item--peach">planned <span>{planned}</span></li>
            <li class="roadmap__item roadmap__item--violet">in-Progress <span>{inProgress}</span></li>
            <li class="roadmap__item roadmap__item--lt-blue">live<span>{live}</span></li>
        </ul>
    </li>
</ul>


