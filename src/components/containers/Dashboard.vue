<script setup lang="ts">
import { ref } from 'vue';

import FileUpload from '../reusables/FileUpload.vue';
import Title from '../reusables/Title.vue';
import Instruction from '../instructions/ShopeeInstruction.vue';

import { useGraphStore } from '../../stores/useGraphStore';
import { useSendExcel } from '../../hooks/useSendExcelApi';

const errorMessage = ref('');
const isLoading = ref(false);

const graphStore = useGraphStore();
const { sendExcel } = useSendExcel();

const submitFileForJson = async (file: File) => {
  isLoading.value = true;
  errorMessage.value = '';
  graphStore.setUrl('')
  const { fileUrl, error } = await sendExcel(file);

  if (error) {
    errorMessage.value = error;
  } else {
    graphStore.setUrl(fileUrl ?? '');
  }

  isLoading.value = false;
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
      <a
        class="download"
        v-if="graphStore.excelUrl"
        :href="graphStore.excelUrl"
        download="processed-data.xlsx"
        >Download .xlsx File</a
      >
    </div>
    <div class="right"></div>
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

.download {
  text-align: center;
}
</style>
