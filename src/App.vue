<script setup>
import TheNav from './components/TheNav.vue'
import TheHeader from './components/TheHeader.vue'
import TheTimeLine from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import {normalizePageHash, generateTimelineItems, generateActivitySelectOptions, generateActivities} from './functions'
import {ref, computed} from 'vue';
import {PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS} from './constants';

const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const currentPage = ref(normalizePageHash())
const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))
const timeline = ref()

function goTo(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour()
  }
  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

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

function setTimelineItemActivity(timelineItem, activity) {
  timelineItem.activityId = activity.id
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}
</script>

<template>
  <TheHeader @navigate="currentPage = $event"/>
  <main class="flex flex-grow flex-col">
    <TheTimeLine v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems" :activities="activities"
                 :activity-select-options="activitySelectOptions" @set-timeline-item-activity="setTimelineItemActivity"
                 :current-page="currentPage" ref="timeline"
                 @update-timeline-item-activity-seconds="updateTimelineItemActivitySeconds"/>
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" @delete-activity="deleteActivity"
                   @create-activity="createActivity" @set-activity-seconds-to-complete="setActivitySecondsToComplete"
                   :timeline-items="timelineItems"/>
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>
  <TheNav :current-page="currentPage" @navigate="currentPage = $event"/>
</template>