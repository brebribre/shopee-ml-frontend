<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSendExcel } from '../../hooks/useSendExcelApi';
import { useGraphStore } from '../../stores/useGraphStore';
import LoadingBar from './LoadingBar.vue';

const selectedFile = ref<File | null>(null);
const errorMessage = ref<string | null>(null);
const isLoading = ref<boolean>(false);


const fileUrl = ref<string | null>(null);

const { sendExcelForJson } = useSendExcel();
const graphStore = useGraphStore();
const timeline = computed(() => graphStore.getTimeline());
const productNames = computed(() => graphStore.getProducts());

/*
const submitFile = async () => {
  fileUrl.value = null;
  if (!selectedFile.value) return;

  isLoading.value = true;
  errorMessage.value = null;

  const { fileUrl: resultUrl, error } = await sendExcel(
    selectedFile.value,
    (progress: number) => {
      uploadProgress.value = progress;
    },
    (progress: number) => {
      downloadProgress.value = progress;
    }
  );

  if (error) {
    errorMessage.value = error;
  } else {
    fileUrl.value = resultUrl;
  }

  isLoading.value = false;
};
*/

const submitFileForJson = async () => {
  fileUrl.value = null;
  if (!selectedFile.value) return;

  isLoading.value = true;
  errorMessage.value = null;

  const { json: resultJson, error } = await sendExcelForJson(
    selectedFile.value,
  );

  if (error) {
    errorMessage.value = error;
  } else {
    graphStore.setJsonData(JSON.parse(resultJson));
  }

  isLoading.value = false;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};
</script>

<template>
  <div class="file-container">
    <div class="upload">
      <input type="file" @change="onFileChange" class="input" />
      <button
        @click="submitFileForJson"
        :disabled="!selectedFile || isLoading"
        class="upload"
      >
        <span>Upload File</span>
      </button>
    </div>
    <LoadingBar :isLoading="isLoading" />
    <div v-if="fileUrl" class="statusMessage">
      <button :href="fileUrl" download="processed_file.xlsx" class="download">
        Download Processed File
      </button>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.file-container {
  border: 2px solid #312c2c;
  border-radius: 0.5rem;
  padding: 16px;
}

.upload {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.input {
  font-size: 16px;
}

.error {
  color: red;
  text-align: center;
}

.statusMessage {
  text-align: center;
}

.download {
  width: 100%;
}

.upload {
  flex: 1;
  justify-content: center;
}
</style>
