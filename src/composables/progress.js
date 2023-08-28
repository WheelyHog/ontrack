import {computed} from "vue";
import {calculateActivityCompletionPercentage} from "@/activities";
import {calculateTrackedActivitySeconds, timelineItems} from "@/timeline-items";
import {getProgressColorClass} from "@/functions";

export function useProgress(activity){
    const colorClass = computed(()=>getProgressColorClass(percentage.value))

    const percentage = computed(() => calculateActivityCompletionPercentage(
        activity,
        trackedActivitySeconds.value)
    )

    const trackedActivitySeconds = computed(() => calculateTrackedActivitySeconds(timelineItems.value, activity))
    return{
        colorClass,
        percentage,
        trackedActivitySeconds
    }
}