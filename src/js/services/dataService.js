const API_URL = import.meta.env.VITE_MOCKAROO_URL;

export default class DataService {

  async getDashboardData() {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load distributor data");
    }

    const rawData = await response.json();

    // Fetch enrichment data
    const countryMap = await this.getCountries();
    const exchangeRates = await this.getExchangeRates();

    // Enrich without breaking structure
    const enriched = rawData.map(item => {
      const countryInfo = countryMap[item.country] || {};
      const currency = countryInfo.currency;

      let salesUSD = Number(item.sales);

      // Convert to USD if exchange rate exists
      if (currency && exchangeRates[currency]) {
        salesUSD = Number(item.sales) / exchangeRates[currency];
      }

      return {
        ...item,
        region: countryInfo.region || "Unknown",
        currency: currency || null,
        flag: countryInfo.flag || "",
        salesUSD
      };
    });

    return {
      raw: enriched,
      aggregated: this.aggregateByBrand(enriched)
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
          inTransit: 0,
          salesUSD: 0
        };
      }

      grouped[brand].sales += Number(item.sales);
      grouped[brand].stock += Number(item.stock);
      grouped[brand].empties += Number(item.empties);
      grouped[brand].inTransit += Number(item.inTransit || 0);
      grouped[brand].salesUSD += Number(item.salesUSD || 0);
    });

    return Object.values(grouped);
  }

  async getCountries() {
    const response = await fetch(
      "https://restcountries.com/v3.1/alpha?codes=UG,KE,RW,BI,CD,SS"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();

    const countryMap = {};

    data.forEach(country => {
      countryMap[country.name.common] = {
        region: country.region,
        currency: country.currencies
          ? Object.keys(country.currencies)[0]
          : null,
        flag: country.flag
      };
    });

    return countryMap;
  }

  async getExchangeRates() {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/USD"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    return data.rates;
  }
}