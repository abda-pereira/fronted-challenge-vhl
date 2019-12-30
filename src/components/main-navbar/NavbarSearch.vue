<template>
  <d-form class="main-navbar__search w-100 d-md-flex d-lg-flex" style="width: calc(100% - 200px) !important;">
    <d-input-group seamless>
      <d-input-group-text class="color3" slot="prepend">
        <i class="fas fa-search"></i>
      </d-input-group-text>
      <d-input class="color3 navbar-search" placeholder="Search for something..." />
    </d-input-group>
  </d-form>
</template>