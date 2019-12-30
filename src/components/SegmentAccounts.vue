<template>
  <div class="card-scene">
    <div class="title-card-acc">Account selected for {{segment}}</div>
    <div>
      <div class="div-seg-acc">
      <div v-if="accounts.selected.length == 0"></div>


        <Container
          group-name="accounts"
          :get-child-payload="getChildPayload1"
          @drop="onDrop('selected', $event)"
        >
          <Draggable v-for="item in accounts.selected" :key="item">
            <div class="draggable-item">
              <div class="icon-options">
                <i class="fas fa-grip-vertical"></i>
              </div>
              {{item}}
              <div class="icon-options" style="float: right">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
    <d-form id="form-search-ns" class="main-navbar__search w-100 d-md-flex d-lg-flex">
      <d-input-group seamless>
        <d-input-group-text class="color3" slot="prepend">
          <i class="fas fa-search"></i>
        </d-input-group-text>
        <d-input
          class="color3 navbar-search"
          v-model="pesquisar"
          placeholder="Search for an Account"
        />
      </d-input-group>
    </d-form>

    <div class="title-card-acc">Non-segmented account</div>
    <div>
      <div class="div-seg-acc">
            <div v-if="isAccounts(accounts.non_selected, pesquisar).length == 0 && [undefined, '', ' '].indexOf(pesquisar) != -1">escreve algo aqui nada na lista </div>
            <div v-if="isAccounts(accounts.non_selected, pesquisar).length == 0 && [undefined, '', ' '].indexOf(pesquisar) == -1">escreve algo aqui nada na pesquisa </div>

        <Container
          group-name="accounts"
          :get-child-payload="getChildPayload2"
          @drop="onDrop('non_selected', $event)"
        >
          <Draggable v-for="item in isAccounts(accounts.non_selected, pesquisar)" :key="item">
            <div class="draggable-item">
              <div class="icon-options">
                <i class="fas fa-grip-vertical"></i>
              </div>
              {{item}}
              <div class="icon-options" style="float: right">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";

const removeAcento = text => {
  text = text.toLowerCase();
  text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
  text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
  text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
  text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
  text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
  text = text.replace(new RegExp("[Ç]", "gi"), "c");
  text = text.replace(" ", "_");
  return text;
};
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export default {
  name: "Cards",
  props: {
    accounts: {
      type: Object,
      required: true
    },
    segment: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pesquisar: undefined
    };
  },
  mounted() {
    // eslint-disable-next-line
    console.log("segment", this.accounts);
  },
  components: { Container, Draggable },

  methods: {
    onDrop(collection, dropResult) {
      this.accounts[collection] = applyDrag(
        this.accounts[collection],
        dropResult
      );
    },
    getChildPayload1(index) {
      return this.accounts.selected[index];
    },
    getChildPayload2(index) {
      return this.accounts.non_selected[index];
    },
    isAccounts(data, pesquisar) {
      // eslint-disable-next-line
      // console.log("segment", data, pesquisar);
      return data.filter(x => {
        if (["", undefined, null].indexOf(pesquisar) == -1) {
          return this.searchAccounts(x, pesquisar);
        } else {
          return true;
        }
      });
    },
    searchAccounts(data, pesquisa) {
      var count = 0;
      data.split(" ").forEach(part => {
        if (removeAcento(part).search(removeAcento(pesquisa)) == 0) {
          count++;
        }
      });
      return count > 0;
    }
  }
};
</script>
