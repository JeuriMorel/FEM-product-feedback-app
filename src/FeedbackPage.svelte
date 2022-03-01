<script>
    import { fly, fade } from "svelte/transition"
    import {
        requests,
        suggestions,
        feedback,
        filters,
        currentPage,
    } from "./stores"
    import { v4 as uuidv4 } from "uuid"

    let categoryMenuIsOpen = false
    let statusMenuIsOpen = false
    let statusOptions = ["suggestion", "planned", "in-progress", "live"]

    $: currentCategory =
        $currentPage === "feedback--new"
            ? categories[currentIndex]
            : $feedback.category
    $: currentStatus = $feedback.status
    $: categories = $filters.filter(filter => filter !== "all")
    let currentIndex = 0
    $: checkedOption = currentCategory
    $: checkedStatus = currentStatus

    let title = $currentPage === "feedback--new" ? "" : $feedback.title
    let detail = $currentPage === "feedback--new" ? "" : $feedback.description

    function capitalize(string) {
        return string[0]?.toUpperCase() + string.slice(1)
    }
    function resetForm() {
        title = ""
        detail = ""
    }
    function resetSuggestions() {
        suggestions.set(
            $requests.filter(request => request.status === "suggestion")
        )
    }
    function isFormValid() {
        const form = document.querySelector("form")
        let inputs = [...form.elements].filter(item => item.required)

        let inputsAreValid = inputs.map(input => {
            input.classList.toggle("error", !input.checkValidity())
            return input.checkValidity()
        })
        return inputsAreValid.every(item => item === true)
    }
</script>

<div class="addFeedback">
    {#if $currentPage === "feedback--new"}
        <svg
            class="addFeedback__icon"
            width="56"
            height="56"
            xmlns="http://www.w3.org/2000/svg"
            ><defs
                ><radialGradient
                    cx="103.9%"
                    cy="-10.387%"
                    fx="103.9%"
                    fy="-10.387%"
                    r="166.816%"
                    id="a"
                    ><stop stop-color="#E84D70" offset="0%" /><stop
                        stop-color="#A337F6"
                        offset="53.089%"
                    /><stop
                        stop-color="#28A7ED"
                        offset="100%"
                    /></radialGradient
                ></defs
            ><g fill="none" fill-rule="evenodd"
                ><circle fill="url(#a)" cx="28" cy="28" r="28" /><path
                    fill="#FFF"
                    fill-rule="nonzero"
                    d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
                /></g
            ></svg
        >
    {:else}
        <svg
            class="addFeedback__icon"
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            ><defs
                ><radialGradient
                    cx="103.9%"
                    cy="-10.387%"
                    fx="103.9%"
                    fy="-10.387%"
                    r="166.816%"
                    id="a"
                    ><stop stop-color="#E84D70" offset="0%" /><stop
                        stop-color="#A337F6"
                        offset="53.089%"
                    /><stop
                        stop-color="#28A7ED"
                        offset="100%"
                    /></radialGradient
                ></defs
            ><g fill="none" fill-rule="evenodd"
                ><circle fill="url(#a)" cx="20" cy="20" r="20" /><path
                    d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                    fill="#FFF"
                    fill-rule="nonzero"
                /></g
            ></svg
        >
    {/if}

    {#if $currentPage === "feedback--new"}
        <h1 class="addFeedback__h1">create new feedback</h1>
    {:else if $currentPage === "feedback--edit"}
        <h1 class="addFeedback__h1">editing '{$feedback.title}'</h1>
    {/if}
    <form class="addFeedback__form">
        <h2 class="addFeedback__h2">feedback title</h2>
        <label for="feedback" class="addFeedback__label"
            >add a short, descriptive headline</label
        >
        <input
            type="text"
            class="addFeedback__input"
            name="feedback"
            required
            bind:value={title}
        />
        <p class="error-message">can't be empty</p>

        <div
            role="group"
            class="addFeedback__list-wrapper"
            aria-labelledby="category-radio-group"
        >
            <h2 class="addFeedback__h2" id="category-radio-group">category</h2>
            <p class="addFeedback__label" id="category-radio-group">
                choose a category for your feedback
            </p>

            <button
                type="button"
                class="btn addFeedback__list-btn addFeedback__input"
                on:click|preventDefault={() => {
                    categoryMenuIsOpen = !categoryMenuIsOpen
                }}
                >{checkedOption}

                <svg
                    class="addFeedback__arrow"
                    class:categoryMenuIsOpen
                    width="10"
                    height="7"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M1 1l4 4 4-4"
                        stroke="#4661E6"
                        stroke-width="2"
                        fill="none"
                        fill-rule="evenodd"
                    /></svg
                >
            </button>

            {#if categoryMenuIsOpen}
                <ul
                    class="addFeedback__list"
                    in:fly={{ y: -50 }}
                    on:change={() => {
                        categoryMenuIsOpen = !categoryMenuIsOpen
                    }}
                >
                    {#each categories as category, index}
                        <li class="addFeedback__list-item">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                id={category}
                                checked={category === currentCategory}
                                bind:group={checkedOption}
                                class="addFeedback__radio"
                            />
                            <label
                                class="btn btn--clear addFeedback__list-btn"
                                for={category}
                                in:fade={{ duration: 350 * index }}
                                >{category}

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="11"
                                    class="addFeedback__check"
                                    ><path
                                        fill="none"
                                        stroke="#AD1FEA"
                                        stroke-width="2"
                                        d="M1 5.233L4.522 9 12 1"
                                    /></svg
                                >
                            </label>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>

        {#if $currentPage === "feedback--edit"}
            <div
                role="group"
                class="addFeedback__list-wrapper"
                aria-labelledby="status-radio-group"
            >
                <h2 class="addFeedback__h2" id="status-radio-group">
                    update status
                </h2>
                <p class="addFeedback__label" id="status-radio-group">
                    change feedback state
                </p>

                <button
                    type="button"
                    class="btn addFeedback__list-btn addFeedback__input"
                    on:click|preventDefault={() => {
                        statusMenuIsOpen = !statusMenuIsOpen
                    }}
                    >{checkedStatus}

                    <svg
                        class="addFeedback__arrow"
                        class:menuIsOpen={statusMenuIsOpen}
                        width="10"
                        height="7"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            d="M1 1l4 4 4-4"
                            stroke="#4661E6"
                            stroke-width="2"
                            fill="none"
                            fill-rule="evenodd"
                        /></svg
                    >
                </button>

                {#if statusMenuIsOpen}
                    <ul
                        class="addFeedback__list"
                        in:fly={{ y: -50 }}
                        on:change={() => {
                            statusMenuIsOpen = !statusMenuIsOpen
                        }}
                    >
                        {#each statusOptions as status, index}
                            <li class="addFeedback__list-item">
                                <input
                                    type="radio"
                                    name="status"
                                    value={status}
                                    id={status}
                                    checked={status === currentStatus}
                                    bind:group={checkedStatus}
                                    class="addFeedback__radio"
                                />
                                <label
                                    class="btn btn--clear addFeedback__list-btn"
                                    for={status}
                                    in:fade={{ duration: 350 * index }}
                                    >{status}

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="11"
                                        class="addFeedback__check"
                                        ><path
                                            fill="none"
                                            stroke="#AD1FEA"
                                            stroke-width="2"
                                            d="M1 5.233L4.522 9 12 1"
                                        /></svg
                                    >
                                </label>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        {/if}

        <h2 class="addFeedback__h2">feedback detail</h2>
        <label for="detail" class="addFeedback__label"
            >include any specific comments on what should be improved, added,
            etc.</label
        >
        <textarea
            data-input-detail
            name="detail"
            id="detail"
            class="addFeedback__input addFeedback__input--textarea"
            bind:value={detail}
            required
        />
        <p class="error-message">can't be empty</p>

        <div class="addFeedback__form-btns">
            {#if $currentPage === "feedback--new"}
                <button
                    class="addFeedback__form-btn btn btn--violet btn--padded"
                    on:click|preventDefault={() => {
                        if (!isFormValid()) return

                        let newFeedback = {
                            id: uuidv4(),
                            title: capitalize(title),
                            category: checkedOption,
                            upvotes: 0,
                            status: "suggestion",
                            description: capitalize(detail),
                        }

                        requests.set([...$requests, newFeedback])
                        resetSuggestions()
                        resetForm()
                        currentPage.set("suggestions")
                    }}>add feedback</button
                >
            {:else}
                <button
                    class="addFeedback__form-btn btn btn--violet btn--padded"
                    on:click|preventDefault={() => {
                        if (!isFormValid()) return

                        let editedFeedback = {
                            id: $feedback.id,
                            title,
                            category: checkedOption,
                            upvotes: $feedback.upvotes,
                            status: checkedStatus,
                            description: detail,
                            comments: $feedback.comments,
                        }
                        feedback.set(editedFeedback)
                        requests.update(requestArray => {
                            return requestArray.map(request => {
                                if (request.id === editedFeedback.id) {
                                    return editedFeedback
                                }
                                return request
                            })
                        })
                        resetSuggestions()
                        resetForm()
                        currentPage.set("feedback--detail")
                    }}>save changes</button
                >
            {/if}

            <button
                class="addFeedback__form-btn btn btn--dk-gray btn--padded"
                on:click|preventDefault={() => {
                    if ($currentPage === "feedback--new") {
                        currentPage.set("suggestions")
                        return
                    }
                    currentPage.set("feedback--detail")
                }}>cancel</button
            >
            {#if $currentPage === "feedback--edit"}
                <button
                    class="addFeedback__form-btn addFeedback__form-btn--delete btn btn--red btn--padded"
                    on:click|preventDefault={() => {
                        requests.update(requestArray => {
                            return requestArray.filter(request => {
                                return request.id !== $feedback.id
                            })
                        })
                        resetSuggestions()
                        currentPage.set("suggestions")
                    }}>delete</button
                >
            {/if}
        </div>
    </form>
</div>
