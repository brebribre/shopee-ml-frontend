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
  fileUrl.value = undefined;
  if (selectedFile.value) {
    emit('handleSubmit', selectedFile.value);
  }
};

const selectedFile = ref<File | undefined>(undefined);
const fileUrl = ref<string | undefined>(undefined);

const onFileChange = (event: Event) => {
  fileUrl.value = undefined;
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};
</script>

<template>
  <div class="file-container">
    <div class="upload">
      <input
        type="file"
        id="fileInput"
        @change="onFileChange"
        class="input"
        accept=".xlsx, .xls"
      />
    </div>
  </div>
  <button
    @click="handleUpload"
    :disabled="!selectedFile || isLoading"
    :class="{ disabled: !selectedFile || isLoading, upload: true }"
  >
    <span>Generate Report</span>
  </button>
  <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  <LoadingBar :isLoading="isLoading" class="loading" />
</template>

<style scoped>
.upload {
  border: 2px solid #312c2c;
  border-radius: 0.5rem;
  padding: 16px;
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

.loading {
  margin-top: 8px;
}

.disabled{
  opacity:40%;
}

.disabled:hover{
  cursor: not-allowed;
}
</style>
