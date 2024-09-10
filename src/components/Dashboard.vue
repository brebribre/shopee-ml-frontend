<script setup lang="ts">
import FileUpload from './FileUpload.vue';
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
    <h2>Laporan Penjualan Shopee</h2>
    <p>
      1. Pilih file Excel yang berisi data penjualan Shopee.
      <br />
      2. Klik tombol "Upload File" untuk mengirim file.
      <br />
      3. Tunggu hingga proses selesai (2-4 menit).
      <br />
      4. Klik tombol "Download" untuk mengunduh file hasil.
    </p>
    <button @click="handleGetSampleFile">
      <span v-if="downloadProgress === 0">Unduh sampel input data</span>
      <span v-else-if="downloadProgress < 100 && downloadProgress > 0"
        >Processing... {{ downloadProgress }}%</span
      >
    </button>
    <FileUpload />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  text-align: center;
  align-items: center;
  width: 100%;
}

h2 {
  font-size: 32px;
  color: #42b983;
}

p {
  font-size: 16px;
  color: #c7cbc6;
}
</style>
