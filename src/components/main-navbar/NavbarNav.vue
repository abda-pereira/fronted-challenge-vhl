<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item border-right">
      <a class="icon-center-bar nav-link nav-link-icon text-center">
        <div class="nav-link-icon__wrapper">
          <i class="far fa-clock"></i>
        </div>
      </a>
    </li>

    <li class="nav-item">
      <a
        @click.prevent="toggleMenuLang"
        class="icon-center-bar nav-link-large nav-link nav-link-icon text-center"
      >
        <div class="nav-link-icon__wrapper">
          <img id="img-language" :src="require(`./../../assets/images/`+langDefault+`.png`)" />
          <i class="fas fa-angle-down"></i>
        </div>
      </a>

      <ul class="sub-menu-lang" ref="sub-menu-lang" :class="{ 'is-open': showMenuLang }">
        <li @click.prevent="changeLang(lang.img_src)" v-for="lang in lst_lang" :key="lang.id">
          <a v-show="lang.img_src != langDefault">
            <img :src="require(`./../../assets/images/`+lang.img_src+`.png`)" />
          </a>
        </li>
      </ul>
    </li>
  </d-navbar-nav>
</template>

<script>
export default {
  name: `NavbarNav`,
  data() {
    return {
      showMenuLang: false,
      langDefault: "en",
      lst_lang: [
        {
          id: "1",
          description: `Inglês`,
          img_src: "en"
        },
        {
          id: "2",
          description: `Espanhol`,
          img_src: "es"
        },
        {
          id: "3",
          description: `Português`,
          img_src: "pt-br"
        }
      ]
    };
  },
  methods: {
    toggleMenuLang() {
      this.showMenuLang = !this.showMenuLang;
    },
    changeLang(lg) {
      this.langDefault = lg;
      this.toggleMenuLang();
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.showMenuLang = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  }
};
</script>