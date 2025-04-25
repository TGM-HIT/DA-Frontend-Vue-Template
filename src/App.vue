<script setup lang="ts">
import { type RouteRecord, useRouter } from "vue-router"
//import { useTheme } from "vuetify"
import { useAuthenticationStore } from "@/stores/AuthenticationStore.ts"
//import Snackbar from "@/components/SnackbarDisplayer.vue"
import { ref } from "vue"
import Menubar from "primevue/menubar"
import Button from "primevue/button"
import { Menus } from "@/router"
import type { MenuItem } from "primevue/menuitem"

const auth = useAuthenticationStore()
const router = useRouter()
//const theme = useTheme()

const drawer = ref<boolean>(false)

function toggleTheme() {
  //theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
}

function filterRoute(menu = Menus.Main): (route: RouteRecord) => boolean {
  return (route: RouteRecord) =>
    (route.meta?.menu ?? Menus.Main) == menu && auth.isRouteVisible(route)
}

function routeToMenuItem(route: RouteRecord): MenuItem {
  return <MenuItem>{
    label: route.name,
    route: route.path,
  }
}

const routes = router.getRoutes()
const items = routes.filter(filterRoute(Menus.Main)).map(routeToMenuItem)
const topRightMenuItems = routes.filter(filterRoute(Menus.TopRight)).map(routeToMenuItem)
</script>

<template>
  <Menubar :model="items" class="p-menubar-fixed" breakpoint="500px">
    <template #start>
      <img
        src="https://www.tgm.ac.at/wp-content/uploads/2022/03/cropped-tgm_logo_300dpi.jpg"
        height="36"
      />
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </router-link>
    </template>
    <template #end>
      <div style="display: flex; flex-direction: row">
        <router-link
          v-for="item in topRightMenuItems"
          :key="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" class="p-menubar-item-link" @click="navigate">
            <Button :label="item.label" icon="pi pi-user" variant="text" />
          </a>
        </router-link>
      </div>
    </template>
  </Menubar>
  <router-view></router-view>
  <!--<v-layout>
    <v-app-bar color="primary" density="compact">
      <template v-slot:image>
        <v-img
          src="https://www.tgm.ac.at/wp-content/uploads/2022/03/cropped-tgm_logo_300dpi.jpg"
          height="36"
          class="my-auto"
        />
      </template>
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/"></router-link>
        <router-link to="/logged-in" v-slot="{ href, route, navigate }">
          <v-btn :href="href" @click="navigate" v-if="auth.isRouteVisible(route)">
            {{ route.name }}
          </v-btn>
        </router-link>

        <router-link to="/just-teacher" v-slot="{ href, route, navigate }">
          <v-btn :href="href" @click="navigate" v-if="auth.isRouteVisible(route)">
            {{ route.name }}
          </v-btn>
        </router-link>
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
        <v-btn v-if="auth.loggedIn" @click="auth.logout">Logout</v-btn>
        <router-link v-else to="/login" v-slot="{ href, route, navigate }">
          <v-btn :href="href" @click="navigate">
            {{ route.name }}
          </v-btn>
        </router-link>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <router-link to="/" v-slot="{ href, route, navigate }">
          <v-list-item value="home" @click="() => navigate">
            <v-list-item-title :href="href">{{ route.name }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
          <template #fallback></template>
        </Suspense>
      </RouterView>
    </v-main>
  </v-layout>-->
  <!--<snackbar></snackbar>-->
</template>

<style scoped>
.v-navigation-drawer a {
  color: inherit;
  text-decoration-color: inherit;
  text-decoration: inherit;
}

.p-menubar {
  border-radius: 0;
  border: 0;
}
</style>
