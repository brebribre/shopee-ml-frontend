import axios from 'axios';

export const useSampleApi = () => {
  const getSampleData = async (
    onDownloadProgress?: (progress: number) => void
  ) => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:5000/api/sample/sales',
        {
          responseType: 'blob',
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

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/json',
      });

      return { fileUrl: URL.createObjectURL(blob), error: null };
    } catch (error) {
      console.error(error);
      return {
        fileUrl: null,
        error: 'Error fetching the data. Please try again.',
      };
    }
  };

  return { getSampleData };
};
