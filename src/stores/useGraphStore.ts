import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGraphStore = defineStore('graph', () => {
  const jsonData = reactive<Record<string, any>>({});

  const setJsonData = (data: Record<string, any>) => {
    Object.assign(jsonData, data);
  };

  const getTimeline = (): string[] => {
    return Object.keys(jsonData);
  };

  const getProducts = (): string[] => {
    const products = jsonData[getTimeline()[0]];
    const productNames: any[] = [];

    if (!products) return [];
    products.forEach((product: any) => {
      productNames.push(product['Nomor Referensi SKU']);
    });

    return productNames;
  };

  return { jsonData, setJsonData, getTimeline, getProducts };
});
