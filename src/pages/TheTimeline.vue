<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import { isTimelineItemValid, validateActivities, validateSelectOptions, isActivityValid, isNull } from '../validators';

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
    setTimelineItemActivity({ timelineItem, activity }) {
        return [
            isTimelineItemValid(timelineItem),
            isNull(activity) || isActivityValid(activity)
        ].every(Boolean)
    }
})
</script>

<template>
    <div class="mt-7">
        <ul>
            <TimelineItem v-for="timelineItem in timelineItems" :key="timelineItem.hour" :timeline-item="timelineItem"
                :activities="activities" :activity-select-options="activitySelectOptions"
                @select-activity="emit('setTimelineItemActivity', { timelineItem, activity: $event })" />
        </ul>
    </div>
</template>