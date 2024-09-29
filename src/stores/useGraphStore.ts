import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useGraphStore = defineStore('graph', () => {
  const jsonData = reactive<Record<string, any>>({});
  const excelUrl = ref<string>('');

  const setJsonData = (data: Record<string, any>) => {
    Object.assign(jsonData, data);
  };

  const setUrl = (url: string) => {
    excelUrl.value = url;
  };

  const getTimeline = (): string[] => {
    return Object.keys(jsonData);
  };

  const getProducts = (): string[] => {
    const products = jsonData[getTimeline()[0]];
    const productNames: any[] = [];

    if (!products) return [];
    products.forEach((product: any) => {
      productNames.push(product['Nama Produk']);
    });

    return productNames;
  };

  return { jsonData, excelUrl, setJsonData, setUrl, getTimeline, getProducts };
});
