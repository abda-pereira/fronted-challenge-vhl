<template>
  <div id="div-segment-det">
    <div id="div-btn-nobj">
      <button id="btn-nobj" class="btn-v1 btn-v2">New Objective</button>
    </div>
    <div id="div-seg-plain" class="div-100-f">
      <div class="div-100-f">
        <span id="title-tab-splain1" class="title-tab-splain title-tab-splain1">Objective name</span>
        <span id="title-tab-splain2" class="title-tab-splain title-tab-splain2">Strategic focus</span>
      </div>
      <div class="div-100-f div-item-plain" v-for="objective in objectives" :key="objective.id">
        <div class="div-item-plain2">
          <div
            v-show="treeShow != objective.id"
            class="icons-splain"
            @click="handleClick(objective.id)"
          >
            <i class="fas fa-chevron-down"></i>
          </div>
          <div
            v-show="treeShow == objective.id"
            class="icons-splain"
            @click="handleClick(objective.id)"
          >
            <i class="fas fa-chevron-up"></i>
          </div>
          <div class="div-obj-name-splain">
            <div class="icons-splain i-cross">
              <i class="fas fa-crosshairs"></i>
            </div>
            {{objective.name}}
          </div>
          <div class="div-buttons-splain">
            <button class="btn-v1 btn-v3">Rejuvenate Life</button>
            <button class="btn-v1 btn-v3">Double Digit Grewth</button>
          </div>
          <div class="icon-options-splain">
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </div>
        <div class="sub-obj-splain" v-if="treeShow == objective.id">
          <div class="div-100-f" style="margin-bottom: 5px;">
            <span
              class="title-tab-splain title-tab-splain1"
              style="padding-left: 36px;"
            >Activity name</span>
            <span class="title-tab-splain title-tab-splain2 div-width-30">Product</span>
            <span class="title-tab-splain title-tab-splain2 div-width-30c">Impact level</span>
            <div class="div-act-arrows">
              <button>
                <i class="fas fa-chevron-left"></i>
              </button>
              <button>
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div class="div-act-splain" v-for="activity in objective.activity" :key="activity.id">
            <div class="div-act-splain1 text-left">
              <div class="icons-splain i-cross">
                <i class="fas fa-compress"></i>
              </div>
              <span>{{activity.name}}</span>
            </div>
            <div class="div-act-splain2 text-left">
              <span>{{activity.product}}</span>
            </div>
            <div class="div-act-splain3 text-left">
              <div class="icons-splain">
                <i class="far fa-caret-square-up"></i>
              </div>
              <span>{{activity.impact_level}}</span>
            </div>

            <div class="icon-options-splain">
              <i class="fas fa-ellipsis-v"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeObjective",
  props: {
    objectives: {
      type: Array,
      required: true
    }
  },
  data: () => ({treeShow: undefined
  }),
  methods: {
    handleClick(id) {
      this.treeShow = this.treeShow != id ? id : undefined;
    }
  }
};
</script>
