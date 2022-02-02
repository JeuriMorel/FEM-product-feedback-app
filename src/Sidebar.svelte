<script>
    import Button from './Components/Button.svelte'
    import { fly } from 'svelte/transition';
    let content;
    let type;
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
    <li class="sidebar__card sidebar__card--roadmap"></li>
</ul>