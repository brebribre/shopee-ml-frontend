<script setup lang="ts">
import FileUpload from './FileUpload.vue';
import DataReport from './DataReport.vue';
import { useSampleApi } from '../hooks/useSampleApi';
import { defineProps, ref } from 'vue';

defineProps<{}>();

const downloadProgress = ref<number>(0);

const { getSampleData } = useSampleApi();
const handleGetSampleFile = async () => {
  try {
    const { fileUrl: resultUrl, error } = await getSampleData(
      (progress: number) => {
        downloadProgress.value = progress;
      }
    );

    if (error) {
      throw new Error(error);
    } else {
      const link = document.createElement('a');
      link.href = resultUrl ?? '';
      link.download = 'sample-data.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      downloadProgress.value = 0;
    }
  } catch (err) {
    console.error('Failed to download the file:', err);
  }
};
</script>

<template>
  <div class="container">
    <div class="left">
      <h2>Laporan Penjualan Shopee</h2>
      <p>
        1. Pilih file Excel yang berisi data penjualan Shopee. (<a
          @click="handleGetSampleFile"
        >
          <span v-if="downloadProgress === 0">Unduh sampel input data</span>
          <span v-else-if="downloadProgress < 100 && downloadProgress > 0"
            >Downloading... {{ downloadProgress }}%</span
          > </a
        >)
        <br />
        2. Klik tombol "Upload File" untuk mengirim file.
        <br />
        3. Tunggu hingga proses selesai (2-4 menit).
        <br />
        4. Klik tombol "Download" untuk mengunduh file hasil.
      </p>
      <FileUpload />
    </div>
    <div class="right">
      <DataReport />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px; /* Optional: Adjust the gap between the grid items */
  width: 100%;
}

.left {
  padding: 24px;
  border-right: 4px solid #312c2c;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

a {
  cursor: pointer;
}
</style>
