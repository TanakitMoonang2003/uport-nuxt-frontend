<template>
  <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
    <!-- Author Info -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-3">

        
        <!-- Name and Role -->
        <div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-900">{{ comment.authorName }}</span>
            <span 
              :class="getRoleBadgeClass(comment.authorRole)"
              class="px-2 py-0.5 rounded-full text-xs font-semibold uppercase"
            >
              {{ comment.authorRole }}
            </span>
          </div>
          <span class="text-xs text-gray-500">{{ formatTime(comment.createdAt) }}</span>
        </div>
      </div>

      <!-- Delete Button -->
      <button
        v-if="comment.canDelete"
        @click="handleDelete"
        :disabled="isDeleting"
        class="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 disabled:opacity-50"
        title="Delete comment"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>

    <!-- Comment Content -->
    <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ comment.content }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete']);

const isDeleting = ref(false);
const showAvatarImage = ref(true);


// Get role badge styling
const getRoleBadgeClass = (role) => {
  const classes = {
    admin: 'bg-red-100 text-red-700',
    teacher: 'bg-blue-100 text-blue-700',
    company: 'bg-green-100 text-green-700',
    user: 'bg-gray-100 text-gray-700'
  };
  return classes[role] || classes.user;
};

// Format timestamp to relative time
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

// Handle delete with confirmation
const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this comment?')) {
    return;
  }

  isDeleting.value = true;
  try {
    emit('delete', props.comment.id);
  } finally {
    isDeleting.value = false;
  }
};
</script>
