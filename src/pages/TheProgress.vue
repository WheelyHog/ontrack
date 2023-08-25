<script setup>
import ProgressItem from "@/components/ProgressItem.vue";
import {trackedActivities} from "@/activities";
import {isActivityValid} from "@/validators";
import TheProgressEmptyState from "@/components/TheProgressEmptyState.vue";

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})
</script>

<template>
  <ul v-if="trackedActivities.length" class="divide-y">
    <ProgressItem v-for="(activity) in trackedActivities" :key="activity.id" :activity="activity"/>
  </ul>
  <TheProgressEmptyState v-else/>
</template>
