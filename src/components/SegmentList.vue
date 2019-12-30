<template>
  <div>
    <vue-context ref="menu" :style="positionMenu">
      <div slot-scope="child">
        <li class="seg-li-option" @click="publishDraft(child.data.id)">
          <span>
            <i class="fas fa-edit"></i>
          </span> Publish draft
        </li>
        <li class="seg-li-option" @click="onClick($event.target.innerText, child.data)">
          <span>
            <i class="far fa-copy"></i>
          </span> Duplicate Segment Plan
        </li>
        <li class="seg-li-option" @click="onClick($event.target.innerText, child.data)">
          <span>
            <i class="fas fa-pen"></i>
          </span> Edit Segment
        </li>
        <li class="seg-li-option" @click="deleteSegment(child.data.id)">
          <span>
            <i class="fas fa-trash-alt"></i>
          </span> Delete Segment
        </li>
      </div>
    </vue-context>
    <div class="main-seg-a">
      <div class="div-title-segment">
        <div class="div-title">
          <h4>Segment List</h4>
          <h6>Lorem ipsum dolor sit amet consectetur</h6>
        </div>

        <button class="btn-v1 btn-b">New segment</button>
      </div>

      <div id="segment-container" class="segment-container" v-on:scroll.passive="handleScroll">
        <div v-if="segments.length == 0"></div>
        <div id="segment-content" style="width: max-content;overflow: hidden;">
          <div
            class="segment"
            v-for="(segment) in segments"
            :key="segment.id"
            @click.prevent.stop="setSegment(segment)"
            :class="{ 'opacitySegment': segment.id != selectSegment.id }"
          >
            <h6>{{segment.title}}:</h6>
            <div
              class="icon-options"
              @click.prevent.stop="$refs.menu.open($event, segment);positionMenu();"
            >
              <i class="fas fa-ellipsis-v"></i>
            </div>
            <p>{{segment.description}}</p>
            <button class="btn-v1 btn-v2">
              <span>
                <i class="fas fa-user"></i>
              </span>
              {{segment.users}}
            </button>
            <button
              v-if="segment.draft"
              class="btn-v1 btn-v2"
              style="margin-right: 10px;background: #f5f5f5;border-color: #9E9E9E;color: #9E9E9E;"
            >
              <span>
                <i class="fas fa-edit"></i>
              </span>
              Draft
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="segment-plan" v-if="selectSegment != undefined">
      <div class="div-title-segment">
        <div class="div-title">
          <h4>Segment Plan of {{selectSegment.title}}</h4>
          <h6>Lorem ipsum dolor sit amet consectetur</h6>
        </div>
      </div>

      <tabs
        style="text-align: left;border-bottom: 1px solid #c3c7ca;"
        :tabs="tabs"
        :currentTab="currentTab"
        :wrapper-class="'default-tabs'"
        :tab-class="'default-tabs__item'"
        :tab-active-class="'default-tabs__item_active'"
        :line-class="'default-tabs__active-line'"
        @onClick="setNewTab"
      />
      <div class="content">
        <div v-if="currentTab === 'tab1'">
          <tree-objective
            v-if="selectSegment != undefined && selectSegment.objectives != undefined "
            :objectives="selectSegment.objectives"
          ></tree-objective>
        </div>
        <div v-if="currentTab === 'tab2'">
          <segment-accounts
            v-if="selectSegment != undefined && selectSegment.accounts != undefined "
            :accounts="selectSegment.accounts"
            :segment="selectSegment.title"
          ></segment-accounts>
        </div>
      </div>
    </div>
    <div
      id="div-seg-footer"
      class="div-seg-footer"
      v-if="selectSegment != undefined && selectSegment.draft"
    >
      <div class="icon-options">
        <i class="fas fa-crosshairs"></i>
      </div>
      <div class="text-left">
        <h4>Segment Plan of {{selectSegment.title}}</h4>
        <h5>Version: {{selectSegment.version}}</h5>
      </div>
      <div id="div-btn-footer">
        <button class="btn-v1 btn-del" @click.prevent.stop="deleteSegment(selectSegment.id)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button
          @click.prevent.stop="publishDraft(selectSegment.id)"
          class="btn-v1 btn-b"
          style="float: right;"
        >Publish this draft</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueContext from "vue-context";
import Tabs from "./Tabs.vue";
import TreeObjective from "./TreeObjective.vue";
import SegmentAccounts from "./SegmentAccounts.vue";

export default {
  name: `SegmentList`,
  components: {
    VueContext,
    Tabs,
    TreeObjective,
    SegmentAccounts
  },
  data() {
    return {
      segments: [],
      tabs: [
        {
          title: "Segment Plain",
          value: "tab1"
        },
        {
          title: "Segment Accounts",
          value: "tab2"
        }
      ],
      selectSegment: [],
      currentTab: "tab1",
      positionMenui: 0
    };
  },
  created() {
    this.getSegments();
  },
  computed: {},
  methods: {
    setNewTab(newTab) {
      this.currentTab = newTab;
    },
    setSegment(segment) {
      this.$refs.menu.close();
      this.selectSegment = segment;
      // eslint-disable-next-line
      console.log("segment", segment);
    },
    getSegments() {
      axios.get("/data.json").then(r => {
        this.segments = r.data;
        this.selectSegment = this.segments[0];
      });
    },
    deleteSegment: function(id) {
      this.segments.forEach((item, index) => {
        if (item.id == id) {
          this.segments.splice(index, 1);
          this.selectSegment = this.segments[0];
        }
      });
    },
    publishDraft: function(id) {
      this.segments.forEach((item, index) => {
        if (item.id == id) {
          this.segments[index].draft = false;
          this.selectSegment.draft = false;
        }
      });
    },
    positionMenu() {
      if (this.$refs.menu != undefined) {
        setTimeout(() => {
          let _width = document.getElementById("segment-content").offsetWidth;
          if (document.getElementById("segment-container").scrollLeft > 0) {
            _width =
              document.getElementById("segment-container").scrollWidth -
              document.getElementById("segment-container").scrollLeft;
          }
          if (
            this.$refs.menu.left + this.$refs.menu.$el.offsetWidth + 10 >
            _width
          ) {
            let _x =
              this.$refs.menu.left +
              this.$refs.menu.$el.offsetWidth +
              10 -
              _width +
              20;
            this.$refs.menu.$el.style.left = `${this.$refs.menu.left - _x}px `;
          } else {
            this.$refs.menu.$el.style.left = `${this.$refs.menu.left -
              (this.$refs.menu.$el.offsetWidth + 10)}px `;
          }
        }, 0);
      }
    },
    handleScroll() {
      this.$refs.menu.close();
    }
  }
};
</script>