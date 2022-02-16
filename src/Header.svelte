<script>
    import { createEventDispatcher } from "svelte"
    import Sidebar from "./Sidebar.svelte"
    export let navIsOpen

    const dispatch = createEventDispatcher()

    function toggleNav() {
        dispatch("toggleNav")
    }

</script>


    <header class="header header--mobile">
        <h1 class="h1">
            frontend mentor <span class="h1__span">feedback board</span>
        </h1>
        <button
            on:click={toggleNav}
            class="header__button"
            aria-label="toggle navbar"
            class:navIsOpen
            ><span class="header__span header__span--1" /><span
                class="header__span header__span--2"
            /><span class="header__span header__span--3" /></button
        >
    </header>

    <header class="header header--large container container--header">
        <div class="header__card">
            <h1 class="h1">
                frontend mentor <span class="h1__span">feedback board</span>
            </h1>
        </div>
        <Sidebar/>
    </header>

