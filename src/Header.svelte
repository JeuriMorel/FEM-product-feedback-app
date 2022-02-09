<script>
    import { createEventDispatcher } from 'svelte';
    export let navIsOpen;

    const dispatch = createEventDispatcher();

    function toggleNav(){
        dispatch('toggleNav')
    }
</script>




<header class="header">
    <h1 class="h1">frontend mentor <span class="h1__span">feedback board</span></h1>
    <button on:click={toggleNav} class="header__button"  aria-label="toggle navbar" class:navIsOpen><span class="header__span header__span--1" ></span><span class="header__span header__span--2" ></span><span class="header__span header__span--3" ></span></button>
</header>

