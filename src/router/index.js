import { createRouter, createWebHashHistory } from "vue-router";
import { getNavList } from "../api";
import { useHomeStore } from "../store/home";
import { useLoginStore } from "../store/login";
import { getToken } from "../utils/auth";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue")
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach(async (to, from, next) => {
  const homeStore = useHomeStore();
  if (to.path === "/login") {
    next();
  } else {
    if (!homeStore.navList.length) {
      //没有缓存导航数据
      const res = await getNavList(getToken());
      const navData = res.data;
      homeStore.setNav(navData);
      //导航数据转化为路由配置数据格式
      const homeRoute = formateNavData(navData);
      //动态添加导航路由
      router.addRoute(homeRoute);
      next({
        path: to.path
      });
    } else {
      next();
    }
  }
});
const formateNavData = (data) => {
  const homeRoute = routes.find((item) => item.path === "/home");
  homeRoute.children = [];
  data.forEach((item) => {
    homeRoute.children.push({
      path: item.path,
      name: item.name,
      component: () =>
        import(`@/views/home/content/${item.component}/index.vue`)
    });
  });
  return homeRoute;
};
export default router;
