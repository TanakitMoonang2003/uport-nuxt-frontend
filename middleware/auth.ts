export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')?.value;

    // If no token, redirect to login
    if (!token) {
        return navigateTo('/auth/login');
    }
});
