export const useComments = () => {
    const { $api } = useNuxtApp();

    // Get comments for a portfolio
    const getComments = async (portfolioId: string | number) => {
        try {
            const response = await $api.get(`/comments?portfolioId=${portfolioId}`);

            if (response.data?.success && response.data.data) {
                return response.data.data;
            }

            return [];
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    };

    // Create a new comment
    const createComment = async (portfolioId: string | number, content: string) => {
        try {
            const response = await $api.post('/comments', {
                portfolioId: parseInt(portfolioId.toString()),
                content: content.trim()
            });

          
            if (response.data?.success && response.data.data) {
                return response.data.data;
            }

            return null;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    };

    // Delete a comment
    const deleteComment = async (commentId: string | number) => {
        try {
            const response = await $api.delete(`/comments/${commentId}`);

           
            return response.data?.success || false;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    };

    return {
        getComments,
        createComment,
        deleteComment
    };
};
