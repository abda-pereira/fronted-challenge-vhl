<template>
  <div id="app">
    <div id="side-nav" class="sidenav">
      <div id="div-head-side-nav">
        <img id="logo-side-nav" src="./assets/images/logo-vhl.png" />
        <a
          href="javascript:void(0)"
          class="btn-closenav"
          @click="closeSideNav()"
          v-show="!$globalStuff.showIconMenu"
        >
          <i class="fas fa-outdent"></i>
        </a>
      </div>
      <div id="div-body-side-nav">
        <label>List</label>
        <a href="#"><span><i class="fas fa-th"></i></span>Item 1</a>
        <a href="#"><span><i class="fas fa-th"></i></span>Item 2</a>
        <a href="#"><span><i class="fas fa-th"></i></span>Item 3</a>
        <a href="#"><span><i class="fas fa-th"></i></span>Item 4</a>
      </div>
      <div id="div-footer-side-nav"></div>
    </div>
    <div id="main-body">
      <main-navbar />
      <SegmentList />
    </div>
  </div>
</template>

<script>
import SegmentList from "./components/SegmentList.vue";
import MainNavbar from "./components/main-navbar/MainNavbar.vue";

export default {
  name: "app",
  components: {
    MainNavbar,
    SegmentList
  },
  methods: {
    closeSideNav() {
      this.$globalStuff.showIconMenu = true;
      document.getElementById("side-nav").style.width = "0";
      document.getElementById("main-body").style.marginLeft = "0";  
      document.getElementById("div-seg-footer").style.left = "0";  
    }
  }
};
</script>