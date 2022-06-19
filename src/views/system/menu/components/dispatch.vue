<template>
  <div class="pt-20">
    <DispatchRole :menu-id="menuId" />
  </div>
</template>

<script lang="ts" setup>
import DispatchRole from './DispatchRole.vue';

defineProps({
  menuId: {
    type: Number,
    required: true
  }
});
</script>
