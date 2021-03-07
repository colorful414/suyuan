import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roleName
 * @param route
 */
function hasPermission(roleName, route) {
  
  if (route.meta && route.meta.roleName) {
  //   if(route.meta.roleName.indexOf(roleName)>-1){
  //     return true
  //   }else{
  //     return false
  //   }
  
    return roleName.some(role => route.meta.roleName.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roleName
 */
export function filterAsyncRoutes(routes, roleName) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roleName, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roleName)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roleName) {
    
    return new Promise(resolve => {
      let accessedRoutes
      if (roleName.includes('企业负责人')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roleName)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
