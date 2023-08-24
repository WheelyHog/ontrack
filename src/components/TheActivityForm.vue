<script setup>
import BaseButton from './BaseButton.vue';
import {PlusIcon} from '@heroicons/vue/24/outline';
import {inject, nextTick, ref} from 'vue';
import {id} from '@/functions';
import {createActivityKey} from '@/keys'

async function submit() {
  createActivity ({
    id: id(),
    name: name.value,
    secondsToComplete: 0
  })
  name.value = ''

  await nextTick().then(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
}

const name = ref('')

const createActivity = inject(createActivityKey)
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input type="text" v-model="name" class="w-full rounded border px-4 text-xl" placeholder="Activity name">
    <BaseButton :disabled="name.trim() === ''">
      <PlusIcon class="h-8"/>
    </BaseButton>
  </form>
</template>