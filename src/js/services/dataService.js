const API_URL = import.meta.env.VITE_MOCKAROO_URL;

export default class DataService {
  async getDashboardData() {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load distributor data");
    }

    const raw = await response.json();

    return {
      raw,
      aggregated: this.aggregateByBrand(raw)
    };
  }

  aggregateByBrand(data) {
    const grouped = {};

    data.forEach(item => {
      const brand = item.brand;

      if (!grouped[brand]) {
        grouped[brand] = {
          brand,
          sales: 0,
          stock: 0,
          empties: 0,
          inTransit: 0
        };
      }

      grouped[brand].sales += Number(item.sales);
      grouped[brand].stock += Number(item.stock);
      grouped[brand].empties += Number(item.empties);
      grouped[brand].inTransit += Number(item.inTransit || 0);
    });

    return Object.values(grouped);
  }
}