<script setup>
import {currentPage, navigate} from "@/router";
import {isNavItemValid} from "@/validators";
import {computed} from "vue";
import BaseIcon from "@/components/BaseIcon.vue";

const props = defineProps({
  navItem:{
    required: true,
    type: Object,
    validator: isNavItemValid
  }
})

const classes = computed(() => [
  "flex flex-col items-center p-2 text-xs capitalize",
  {'bg-gray-200 pointer-events-none': props.navItem.page === currentPage.value}
])
</script>

<template>
  <li class="flex-1">
    <a
        :href="`#${navItem.page}`"
        @click="navigate(navItem.page)"
        :class="classes">
      <BaseIcon :name="navItem.icon" class="h-6 w-6"/>
      {{ navItem.page }}
    </a>
  </li>
</template>