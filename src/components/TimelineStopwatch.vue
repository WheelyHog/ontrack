<script setup>
import {BUTTON_TYPE_SUCCESS, BUTTON_TYPE_DANGER, BUTTON_TYPE_WARNING} from '@/constants'
import {isTimelineItemValid} from '@/validators';
import BaseButton from './BaseButton.vue';
import {currentHour, formatSeconds} from '@/functions'
import BaseIcon from "@/components/BaseIcon.vue";
import {ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY} from "@/icons";
import {useStopwatch} from "@/composables/stopwatch";
import {updateTimelineItem} from "@/timeline-items";
import {watch, watchEffect} from "vue";

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const {
  seconds,
  isRunning,
  start,
  stop,
  reset
} = useStopwatch(props.timelineItem.activitySeconds)

watchEffect(()=>
    updateTimelineItem(props.timelineItem, {activitySeconds: seconds.value})
)

</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" @click="reset" :disabled="!timelineItem.activitySeconds">
      <BaseIcon :name="ICON_ARROW_PATH"/>
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">{{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE"/>
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start" :disabled="timelineItem.hour !== currentHour()">
      <BaseIcon :name="ICON_PLAY"/>
    </BaseButton>
  </div>
</template>