<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import { isTimelineItemValid, validateActivities, validateSelectOptions, isActivityValid } from '../validators';

defineProps({
    timelineItems: {
        required: true,
        type: Array,
        validator: isTimelineItemValid
    },
    activitySelectOptions: {
        required: true,
        type: Array,
        validator: validateSelectOptions
    },
    activities: {
        required: true,
        type: Array,
        validator: validateActivities
    }
})

const emit = defineEmits({
    setTimelineItemActivity(timelineItem, activity) {
        return [
            isTimelineItemValid(timelineItem),
            isActivityValid(activity)
        ].every(Boolean)
    }
})
</script>

<template>
    <div class="mt-7">
        <ul>
            <TimelineItem v-for="timelineItem in timelineItems" :key="timelineItem.hour" :timeline-item="timelineItem"
                :activities="activities" :activity-select-options="activitySelectOptions"
                @select-activity="emit('setTimelineItemActivity', { timelineItem, $event })" />
        </ul>
    </div>
</template>