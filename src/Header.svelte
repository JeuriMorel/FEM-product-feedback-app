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
    <button on:click={toggleNav} class="header__button"  aria-label="toggle navbar"><span class="header__span header__span--1" class:navIsOpen></span><span class="header__span header__span--2" class:navIsOpen></span><span class="header__span header__span--3" class:navIsOpen></span></button>
</header>

