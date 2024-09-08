import axios from 'axios';

export const useSendExcel = () => {
  const sendExcel = async (data: File, onUploadProgress?: (progress: number) => void, onDownloadProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', data);

    try {
      const response = await axios.post("https://shopee-ml-d450b518bfd7.herokuapp.com/api/process-excel", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Explicitly set content type
        },
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(percentCompleted); // Call the provided progress function
          }
        }
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      return { fileUrl: URL.createObjectURL(blob), error: null };
    } catch (error) {
      console.error(error);
      return { fileUrl: null, error: 'Error processing the file. Please try again.' };
    }
  };

  return { sendExcel };
};