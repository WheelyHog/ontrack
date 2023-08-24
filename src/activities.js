import {generateActivitySelectOptions, generateActivities} from './functions'
import {computed, ref} from "vue";
import {resetTimelineItemActivities} from "@/timeline-items";

export const activities = ref(generateActivities())

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function deleteActivity(activity) {
    resetTimelineItemActivities()
activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
    activities.value.push(activity)
}

export function setActivitySecondsToComplete(activity, secondsToComplete) {
    activity.secondsToComplete = secondsToComplete || 0
}