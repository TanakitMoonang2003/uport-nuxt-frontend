<template>
  <div>
    <TeacherConfirmation />
  </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'Teacher Confirmations - Admin/Teacher Dashboard'
});

// Check authentication and role
const { user } = useAuth();

// Redirect if not authenticated or not admin/teacher
if (!user.value || (user.value.role !== 'admin' && user.value.role !== 'teacher' && user.value.role !== 'user')) {
  await navigateTo('/auth/login');
}
</script>
