<script setup>
import {isActivityValid} from "@/validators";
import {formatSecondsWithSign} from "@/functions";
import {computed} from "vue";
import {calculateTrackedActivitySeconds, timelineItems} from "@/timeline-items";

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  },
})

const classes = computed(() => [
  `flex items-center rounded px-2 font-mono text-xl`,
  remainingSeconds.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
])

const remainingSeconds = computed(() => calculateTrackedActivitySeconds(timelineItems.value, props.activity) - props.activity.secondsToComplete)


</script>

<template>
  <div :class="classes">{{ formatSecondsWithSign(remainingSeconds) }}
  </div>
</template>
