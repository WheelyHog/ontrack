<script setup>
import TheNav from './components/TheNav.vue'
import TheHeader from './components/TheHeader.vue'
import TheTimeLine from './pages/TheTimeline.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import { normalizePageHash, generateTimelineItems, generateActivitySelectOptions } from './functions'
import { ref } from 'vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';

const timelineItems = generateTimelineItems()

const activities = ref(['Coding', 'Reading', 'Training'])

const currentPage = ref(normalizePageHash())

const activitySelectOptions = generateActivitySelectOptions(activities.value)

function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
</script>

<template>
  <TheHeader @navigate="currentPage = $event" />
  <main class="flex flex-grow flex-col">
    <TheTimeLine v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" @delete-activity="deleteActivity" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :currennt-page="currentPage" @navigate="currentPage = $event" />
</template>