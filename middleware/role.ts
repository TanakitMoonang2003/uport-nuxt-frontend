export default defineNuxtRouteMiddleware((to) => {
  const user = useState<any>("user").value;

  // ใช้ type guard ตรวจสอบก่อนว่ามันเป็น array
  if (Array.isArray(to.meta.role) && !to.meta.role.includes(user?.role)) {
    return navigateTo("/");
  }
});
