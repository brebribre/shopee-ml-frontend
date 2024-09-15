<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import FileUpload from './reusables/FileUpload.vue';
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
      <h1 class="title">Laporan Penjualan Shopee</h1>
      <Accordion>
        <AccordionPanel value="0">
          <AccordionHeader class="acc">
            <span>Instructions</span>
          </AccordionHeader>
          <AccordionContent class="acc-content">
            <p>
              1. Pilih file Excel yang berisi data penjualan Shopee. (<a
                @click="handleGetSampleFile"
              >
                <span v-if="downloadProgress === 0"
                  >Unduh sampel input data</span
                >
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
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
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
  grid-template-columns: 1fr 2.5fr;
  gap: 16px;
  height: 95vh;
}

p {
  font-size: 18px;
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

.card {
  margin-bottom: 16px;
}

.acc {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.acc-content {
  margin-top: 16px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
}
</style>
