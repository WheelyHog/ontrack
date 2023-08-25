import {id} from './functions'
import {computed, ref} from "vue";
import {resetTimelineItemActivities} from "@/timeline-items";
import {HUNDRED_PERCENT, SECONDS_IN_HOUR} from "@/constants";

export const activities = ref(generateActivities())

export const trackedActivities = computed(() => {
    return activities.value.filter(({secondsToComplete}) => secondsToComplete)
})

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function deleteActivity(activity) {
    resetTimelineItemActivities()
    activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
    activities.value.push(activity)
}

export function calculateActivityCompletionPercentage({secondsToComplete}, trackedSeconds) {
    return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}


export function updateActivity(activity, fields) {
    return Object.assign(activity, fields)
}

function generateActivities() {
    return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
        id: id(),
        name,
        secondsToComplete: 15 * SECONDS_IN_HOUR//hours * SECONDS_IN_HOUR
    }))
}

function generateActivitySelectOptions(activities) {
    return activities.map((activity) => ({label: activity.name, value: activity.id}))
}
