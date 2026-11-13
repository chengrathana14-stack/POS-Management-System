export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = userAuth()
  if (!isAuthenticated.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})

