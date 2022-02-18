import { writable, readable } from "svelte/store"


export const user = writable({})
export const requests = writable([])
export const suggestions = writable([])
export const filterParam = writable("all")
export const filters = readable(["all", "UI", "UX", "enhancement", "bug", "feature"])
export const onMainPage = writable(true)
export const onAddFeedbackPage = writable(false)
export const onFeedbackDetailPage = writable(false)
export const feedback = writable({})
export const currentPage = writable('suggestions')