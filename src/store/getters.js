const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  Authorization: state => state.user.Authorization,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roleName: state => state.user.roleName,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
// function MyAutoRun(){
//   console.log(255+roleName)
// };
// window.onload=MyAutoRun();
export default getters
