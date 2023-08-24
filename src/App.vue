<script setup>
import TheNav from './components/TheNav.vue'
import TheHeader from './components/TheHeader.vue'
import TheTimeLine from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import {generatePeriodSelectOptions} from './functions'
import {provide, readonly} from 'vue';
import {PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS} from './constants';
import {currentPage, timelineRef} from "@/router";

import * as keys from './keys'
import {
  activities,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToComplete
} from "@/activities";
import {
  resetTimelineItemActivities,
  setTimelineItemActivity,
  timelineItems,
  updateTimelineItemActivitySeconds
} from "@/timeline-items";

provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
})
provide(keys.timelineItemsKey, readonly(timelineItems))
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
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