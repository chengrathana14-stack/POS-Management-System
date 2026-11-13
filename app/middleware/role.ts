export default defineNuxtRouteMiddleware((to) => {
  const { userRole } = userAuth()
  const requiredRole = to.meta.requiredRole as string | undefined

  if (requiredRole && userRole.value !== requiredRole && userRole.value !== 'admin') {
    return navigateTo('/pos')
  }
})

