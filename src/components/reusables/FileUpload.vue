<script setup lang="ts">
import { ref } from 'vue';
import { useSendExcel } from '../../hooks/useSendExcel';
import LoadingBar from './LoadingBar.vue';

const selectedFile = ref<File | null>(null);
const fileUrl = ref<string | null>(null);
const jsonData = ref<JSON>();

const errorMessage = ref<string | null>(null);

const isLoading = ref<boolean>(false);
const uploadProgress = ref<number>(0);
const downloadProgress = ref<number>(0);

const { sendExcelForJson } = useSendExcel();

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
    jsonData.value = resultJson;
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
      <button @click="submitFileForJson" :disabled="!selectedFile || isLoading">
        <span v-if="isLoading">
          <span v-if="uploadProgress < 100">{{ uploadProgress }}%</span>
          <span v-else-if="downloadProgress < 100 && downloadProgress > 0"
            >{{ downloadProgress }}%</span
          >
          <span v-else>Processing...</span>
        </span>
        <span v-else>Upload File</span>
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
  {{ jsonData }}
</template>

<style scoped>
.file-container {
  border: 2px solid #312c2c;
  border-radius: 0.5rem;
  padding: 16px;
}

.upload {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
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
</style>
