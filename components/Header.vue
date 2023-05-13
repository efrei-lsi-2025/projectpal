<template>
  <div class="header">
    <div class="logo">
      <img
        src="../assets/branding/logo-inline.svg"
        alt="ProjectPal Inline Logo"
      />
    </div>
    <div class="buttons">
      <Button
        severity="secondary"
        class="user-button"
        text
        @click="toggleMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        size="large"
        ><Avatar
          :image="auth.data.value?.user?.image"
          class="mr-5"
          size="normal"
          shape="circle"
        />
      </Button>
      <Menu
        ref="menu"
        append-to="self"
        id="overlay_menu"
        :model="userItems"
        :popup="true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth();
const { $router } = useNuxtApp();

const menu = ref();

const toggleMenu = (event: any) => {
  menu.value.toggle(event);
};

const userItems = ref([
  {
    label: "Profile",
    icon: "pi pi-fw pi-user",
    command: () => $router.push("profile"),
  },
  {
    label: "Settings",
    icon: "pi pi-fw pi-cog",
    command: () => $router.push("settings"),
  },
  {
    label: "Logout",
    icon: "pi pi-fw pi-power-off",
    command: () => auth.signOut(),
  },
]);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 35px 15px 35px;

  .logo {
    img {
      height: 50px;
    }
  }
}
</style>
