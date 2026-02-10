<template>
  <div>
    <PortfolioApproval />
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

// Set layout to dashboard to ensure navbar is shown
definePageMeta({
  layout: 'dashboard'
});

// Set page title
useHead({
  title: 'Portfolio Approval - Admin/Teacher Dashboard'
});

// Check authentication and role
const { user, isAuthenticated } = useAuth();

// Redirect if not authenticated or not admin/teacher
if (!isAuthenticated.value || !user.value || (user.value.role !== 'admin' && user.value.role !== 'teacher')) {
  await navigateTo('/auth/login');
}
</script>
