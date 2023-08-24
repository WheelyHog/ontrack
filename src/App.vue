<script setup>
import TheNav from './components/TheNav.vue'
import TheHeader from './components/TheHeader.vue'
import TheTimeLine from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import {
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  generatePeriodSelectOptions
} from './functions'
import {ref, computed, provide, readonly} from 'vue';
import {PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS} from './constants';
import {currentPage, timelineRef} from "@/router";

import * as keys from './keys'

const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null,
          timelineItem.activitySeconds = 0
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, deleteActivity)
provide(keys.timelineItemsKey, readonly(timelineItems.value))
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value))
provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
</script>

<template>
  <TheHeader/>
  <main class="flex flex-grow flex-col">
    <TheTimeLine v-show="currentPage === PAGE_TIMELINE"
                 :timeline-items="timelineItems"
                 ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities"/>
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>
  <TheNav/>
</template>