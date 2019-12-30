<template>
  <nav class="nav" v-show="$globalStuff.showIconMenu">
    <a
      id="bars-menu"
      @click="openSideNav()"
      class="icon-center-bar nav-link nav-link-icon toggle-sidebar text-center"
    >
      <i class="fas fa-bars"></i>
    </a>
  </nav>
</template>

<script>
export default {
  name: "navbar-toggle",
  methods: {
    openSideNav() {
      this.$globalStuff.showIconMenu = false;
      document.getElementById("side-nav").style.width = "250px";
      if (window.innerWidth >= 775) {
        document.getElementById("main-body").style.marginLeft = "250px";
        document.getElementById("div-seg-footer").style.left = "250px";
      }
    }
  }
};
</script>
