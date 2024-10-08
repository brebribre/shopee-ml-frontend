import axios from 'axios';

export const useSendExcel = () => {
  const sendExcel = async (
    data: File,
    onUploadProgress?: (progress: number) => void,
    onDownloadProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append('file', data);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/process-excel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
          onUploadProgress: (progressEvent) => {
            if (onUploadProgress && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onUploadProgress(percentCompleted);
            }
          },
          onDownloadProgress: (progressEvent) => {
            if (onDownloadProgress && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onDownloadProgress(percentCompleted);
            }
          },
        }
      );

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      return { fileUrl: URL.createObjectURL(blob), error: null };
    } catch (error) {
      console.error(error);
      return {
        fileUrl: null,
        error: 'Error processing the file. Please try again.',
      };
    }
  };

  const sendExcelForJson = async (
    data: File,
    onUploadProgress?: (progress: number) => void,
    onDownloadProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append('file', data);

    try {
      const response = await axios.post(
        'https://oyster-app-s5mct.ondigitalocean.app/api/process-excel/json',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (onUploadProgress && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onUploadProgress(percentCompleted);
            }
          },
          onDownloadProgress: (progressEvent) => {
            if (onDownloadProgress && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onDownloadProgress(percentCompleted);
            }
          },
        }
      );
      return { json: response.data, error: null };
    } catch (error) {
      console.error(error);
      return {
        json: null,
        error: 'Error processing the file. Please try again.',
      };
    }
  };

  return { sendExcel, sendExcelForJson };
};
