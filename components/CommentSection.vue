<template>
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8">
    <!-- Section Header -->
    <div class="flex items-center gap-3 mb-6">
      <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <h3 class="text-2xl font-bold text-gray-900">Comments</h3>
      <span class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {{ comments.length }}
      </span>
    </div>

    <!-- Comment Form -->
    <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
      <textarea
        v-model="newComment"
        @input="updateCharCount"
        :disabled="isSubmitting"
        placeholder="Share your thoughts about this portfolio..."
        rows="3"
        maxlength="500"
        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
      ></textarea>
      
      <div class="flex items-center justify-between mt-3">
        <span class="text-sm text-gray-500">
          {{ charCount }}/500 characters
        </span>
        <button
          @click="handleSubmit"
          :disabled="!canSubmit || isSubmitting"
          class="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg v-if="isSubmitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isSubmitting ? 'Posting...' : 'Post Comment' }}</span>
        </button>
      </div>

    </div>

    <!-- Comments List -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent"></div>
      <p class="text-gray-500 mt-2">Loading comments...</p>
    </div>

    <div v-else-if="comments.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <p class="text-gray-500 text-lg">No comments yet</p>
      <p class="text-gray-400 text-sm mt-1">Be the first to share your thoughts!</p>
    </div>

    <div v-else class="space-y-4">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from '~/composables/useToast';

const props = defineProps({
  portfolioId: {
    type: [String, Number],
    required: true
  },
  portfolioOwner: {
    type: String,
    required: true
  }
});

const { getComments, createComment, deleteComment } = useComments();

const comments = ref([]);
const newComment = ref('');
const charCount = ref(0);
const loading = ref(true);
const isSubmitting = ref(false);
const { success: toastSuccess, error: toastError } = useToast();

const canSubmit = computed(() => {
  return newComment.value.trim().length > 0 && newComment.value.length <= 500;
});

// Update character count
const updateCharCount = () => {
  charCount.value = newComment.value.length;
};

// Load comments
const loadComments = async () => {
  loading.value = true;
  try {
    const data = await getComments(props.portfolioId);
    comments.value = data;

  } catch (error) {
    console.error('Failed to load comments:', error);
  } finally {
    loading.value = false;
  }
};

// Submit new comment
const handleSubmit = async () => {
  if (!canSubmit.value) return;

  isSubmitting.value = true;

  try {
    const comment = await createComment(props.portfolioId, newComment.value);
    
    if (comment) {
      // Add new comment to the list
      comments.value.unshift(comment);
      
      // Clear form
      newComment.value = '';
      charCount.value = 0;
      
      toastSuccess('Comment posted successfully!');
    }
  } catch (error) {
    console.error('Failed to post comment:', error);
    toastError(error.response?.data?.error || 'Failed to post comment. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

// Delete comment
const handleDelete = async (commentId) => {
  try {
    const success = await deleteComment(commentId);
    
    if (success) {
      // Remove comment from list
      comments.value = comments.value.filter(c => c.id !== commentId);

    }
  } catch (error) {
    console.error('Failed to delete comment:', error);
    toastError(error.response?.data?.error || 'Failed to delete comment. Please try again.');
  }
};

// Load comments on mount
onMounted(() => {
  loadComments();
});
</script>
