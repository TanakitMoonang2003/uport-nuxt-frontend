interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const usePortfolio = () => {
  // Get all portfolio items from API
  const getAllPortfolioItems = async () => {
    try {
      const { $api } = useNuxtApp();
      const response = await $api.get('/portfolio');

      // Handle response structure
      let portfolios = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        portfolios = response.data.data;
      } else if (Array.isArray(response.data)) {
        portfolios = response.data;
      }

      // Filter only approved portfolios
      portfolios = portfolios.filter((p: any) => p.status === 'approved');

      return portfolios;
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      return [];
    }
  };

  // Get portfolio item by ID from API
  const getPortfolioItemById = async (id: string | number) => {
    try {
      const { $api } = useNuxtApp();
      const response = await $api.get(`/portfolio/${id}`);

   

      // Axios: actual payload อยู่ที่ response.data
      if (response.data?.success && response.data.data) {
        const item = response.data.data as any;

        // ถ้าไม่ได้ approved ให้ return null เพื่อให้หน้าแสดง Not Found
        if (item.status !== 'approved') {
         
          return null;
        }

        return item;
      }

      return null;
    } catch (error) {
      console.error('Error fetching portfolio item:', error);
      return null;
    }
  };

  // Get portfolio items by category from API
  const getPortfolioItemsByCategory = async (category: string) => {
    try {
      const url = category === 'all'
        ? '/portfolio'
        : `/portfolio?category=${category}`;



      const { $api } = useNuxtApp();
      const response = await $api.get(url);

  

      // Handle different response structures
      // Axios wraps the response, so actual data is in response.data
      // API returns { success: true, data: [...] }
      let portfolios = [];
      if (response.data?.success && Array.isArray(response.data.data)) {
        portfolios = response.data.data;
      } else if (Array.isArray(response.data)) {
        portfolios = response.data;
      } else if (Array.isArray(response.data?.data)) {
        portfolios = response.data.data;
      }

      // Filter only approved portfolios (double check)
      portfolios = portfolios.filter((p: any) => p.status === 'approved');

      return portfolios;
    } catch (error) {
      console.error('Error fetching portfolio items by category:', error);
      return [];
    }
  };

  // Create new portfolio item
  const createPortfolioItem = async (portfolioData: any) => {
    try {
      const { $api } = useNuxtApp();
      const response = await $api.post('/portfolio', portfolioData);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      throw error;
    }
  };

  // Update existing portfolio item
  const updatePortfolioItem = async (id: string | number, portfolioData: any) => {
    try {
      const { $api } = useNuxtApp();
      const response = await $api.put(`/portfolio/${id}`, portfolioData);

   

      if (response.data?.success && response.data.data) {
        return response.data.data;
      }

      return null;
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      throw error;
    }
  };

  return {
    getAllPortfolioItems,
    getPortfolioItemById,
    getPortfolioItemsByCategory,
    createPortfolioItem,
    updatePortfolioItem
  };
};
