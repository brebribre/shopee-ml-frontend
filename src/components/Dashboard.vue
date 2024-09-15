<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';

import FileUpload from './reusables/FileUpload.vue';
import Title from './reusables/Title.vue';
import DataReport from './DataReport.vue';
import Instruction from './instructions/ShopeeInstruction.vue';

import { useGraphStore } from '../stores/useGraphStore';
import { useSendExcel } from '../hooks/useSendExcelApi';

import Select from 'primevue/select';

defineProps<{}>();

const errorMessage = ref('');
const isLoading = ref(false);

//File Upload
const graphStore = useGraphStore();
const { sendExcelForJson } = useSendExcel();

const jsonData = computed(() => graphStore.jsonData);
const products = computed(() => graphStore.getProducts());
const timeline = computed(() => graphStore.getTimeline());

const select = ref();
const list = ref<string[]>([])

const submitFileForJson = async (file: File) => {
  isLoading.value = true;
  const { json: resultJson, error } = await sendExcelForJson(file);

  if (error) {
    errorMessage.value = error;
  } else {
    graphStore.setJsonData(JSON.parse(resultJson));
  }

  isLoading.value = false;
  list.value = graphStore.getProducts();

};
</script>

<template>
  <div class="container">
    <div class="left">
      <Title>Laporan Penjualan Shopee</Title>
      <Instruction />
      <FileUpload
        :isLoading="isLoading"
        :errorMessage="errorMessage"
        @handleSubmit="submitFileForJson"
      />

      <Select
        v-model="select"
        :options="list"
        placeholder="Select a Product"
        class="dropdown"
        option="test"
      />
    </div>
    <div class="right">
      <DataReport />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  height: 95vh;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;

  border-right: 4px solid #312c2c;
  overflow: auto;
  scrollbar-width: thin;
}

.right {
  overflow: auto;
  padding: 24px;
}

.dropdown {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px;

  border: 1px solid #312c2c;
}

.p-select-option {
  padding: 20px;
  border: 1px solid #312c2c;
  background-color: #f9f9f9;
}

.p-select-option:hover {
  background-color: #e0e0e0;
}
</style>
