<template>
  <div :class="['main-navbar', 'sticky-top']">
    <d-navbar type="light" class="w-100 align-items-stretch flex-md-nowrap p-0">
      <navbar-toggle />
      <navbar-search />
      <navbar-nav />
      
    </d-navbar>
  </div>
</template>

<script>
import NavbarToggle from './NavbarToggle.vue';
import NavbarSearch from "./NavbarSearch.vue";
import NavbarNav from './NavbarNav.vue';

export default {
  components: {
    NavbarToggle,
    NavbarSearch,
    NavbarNav,
  },
  props: {
    stickyTop: {
      type: Boolean,
      default: true
    }
  }
};
</script>