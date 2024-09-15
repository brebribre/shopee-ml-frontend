<script setup lang="ts">
import { ref } from 'vue';
import LoadingBar from './LoadingBar.vue';

defineProps<{
  isLoading: boolean;
  errorMessage: string | null;
}>();

const emit = defineEmits<{
  (e: 'handleSubmit', file: File): void;
}>();

const handleUpload = () => {
  if (selectedFile.value) {
    emit('handleSubmit', selectedFile.value);
  }
};

const selectedFile = ref<File | null>(null);
const fileUrl = ref<string | null>(null);
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
        @click="handleUpload"
        :disabled="!selectedFile || isLoading"
        class="upload"
      >
        <span>Upload File</span>
      </button>
    </div>
    <LoadingBar :isLoading="isLoading" class="loading" />
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

.loading {
  margin-top: 8px;
}
</style>
