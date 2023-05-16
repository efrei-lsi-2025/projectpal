<template>
  <div class="header">
    <div class="logo">
      <NuxtLink to="/"
        ><img
          src="../assets/branding/logo-inline.svg"
          alt="ProjectPal Inline Logo"
      /></NuxtLink>
    </div>
    <div class="buttons">
      <Button
        severity="secondary"
        class="user-button"
        text
        aria-haspopup="true"
        aria-controls="overlay_menu"
        size="large"
        @click="toggleMenu"
      >
        <Avatar
          :image="auth.data.value?.user?.image ?? undefined"
          size="normal"
          shape="circle"
        />
      </Button>
      <Menu
        id="overlay_menu"
        ref="menu"
        append-to="self"
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
    label: "Profil",
    icon: "pi pi-fw pi-user",
    command: () => $router.push(`/profile/${auth.data.value?.user?.id}`),
  },
  {
    label: "Paramètres",
    icon: "pi pi-fw pi-cog",
    command: () => $router.push("/settings"),
  },
  {
    label: "Se déconnecter",
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
