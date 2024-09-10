<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const props = defineProps<{
  value: {
    title: string;
    content: string;
  }[];
}>();
</script>

<template></template>
<style lang="css" scoped></style>
