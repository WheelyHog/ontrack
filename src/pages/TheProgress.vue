<script setup>
import ProgressItem from "@/components/ProgressItem.vue";
import {trackedActivities} from "@/activities";
import {isActivityValid} from "@/validators";

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})
</script>

<template>
  <ul class="divide-y">
    <ProgressItem v-for="(activity) in trackedActivities" :key="activity.id" :activity="activity"/>
  </ul>
</template>
