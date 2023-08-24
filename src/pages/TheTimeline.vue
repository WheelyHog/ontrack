<script setup>
import TimelineItem from '../components/TimelineItem.vue'
import {
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions,
  isActivityValid,
  isPageValid, validateTimelineItems, isNumber
} from '@/validators';
import {nextTick, ref, watchPostEffect} from 'vue';
import {MIDNIGHT_HOUR, PAGE_TIMELINE} from '@/constants';

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
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
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid
  }
})

defineExpose({scrollToHour})

const timelineItemRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
  }

})

function scrollToHour(hour = null, isSmooth = true) {
 hour ?? new Date().getHours()
  const options = {behavior: isSmooth ? 'smooth' : 'instant'}
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}

const emit = defineEmits({
  updateTimelineItemActivitySeconds(timelineItem, activitySeconds){
return [isTimelineItemValid(timelineItem), isNumber(activitySeconds)].every(Boolean)
  },
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
                    @select-activity="emit('setTimelineItemActivity', { timelineItem, $event })"
                    ref="timelineItemRefs" @scroll-to-hour="scrollToHour" @update-activity-seconds="emit('updateTimelineItemActivitySeconds', timelineItem, $event)"/>
    </ul>
  </div>
</template>