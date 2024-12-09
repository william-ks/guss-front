<template>
  <div ref="element" class="content" :class="{ full: active || model.id }">
    <div class="customSelect select-none">
      <div @click="toggleBox" class="default cursor-pointer">
        <p v-if="model.name">{{ model.name }}</p>
        <p v-else>{{ placeholder }}</p>
        <Icon name="material-symbols:arrow-drop-down-rounded" />
      </div>
      <Card
        shadow
        border
        v-if="active"
        class="dropdown"
        :style="{ width: `${defaultWidth + 15}px` }"
      >
        <div class="w-[100%] px-1">
          <div class="content">
            <input
              @click="(e) => e.stopPropagation()"
              @keyup="handleDigit"
              v-model="searchText"
              type="text"
              placeholder="Buscar"
            />
            <Icon
              @click="clear"
              class="icon"
              name="material-symbols-light:close-small-outline-rounded"
            />
          </div>
        </div>
        <ul class="list">
          <li
            @click="selectOpt(option)"
            v-for="option of options"
            :key="option.id"
            class="options"
            :class="`${!option.visible ? 'ocult' : ''} ${showBottomBorder ? 'border' : ''}`"
          >
            {{ option.name }}
          </li>
          <p
            @click="(e) => e.stopPropagation()"
            v-show="allOcult"
            class="special"
          >
            Resultado não encontrado
          </p>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Card from "~/components/ui/Card/Card";
import { useElementSize } from "@vueuse/core";

const element = ref(null);
const { width } = useElementSize(element);
const defaultWidth = ref();
const active = ref(false);
const searchText = ref("");
const allOcult = ref(false);
const showBottomBorder = ref(true);

const { model, placeholder, list } = defineProps({
  model: Object,
  placeholder: String,
  list: Array,
});

const options = ref([]);

const toggleBox = (e) => {
  e.stopPropagation();
  active.value = !active.value;

  if (active.value) {
    document.body.addEventListener("click", handleBodyClick);
  } else {
    document.body.removeEventListener("click", handleBodyClick);
  }
};

const handleBodyClick = (e) => {
  toggleBox(e);
};

const handleDigit = () => {
  const query = searchText.value.toLowerCase();

  options.value = options.value.map((el) => {
    const name = el.name.toLowerCase();
    el.visible = !query || name.includes(query);
    return el;
  });

  const isAllOcult = options.value.filter((el) => el.visible === true);
  allOcult.value = isAllOcult.length <= 0 ? true : false;
  showBottomBorder.value = isAllOcult.length > 1 ? true : false;
};

const clear = (e) => {
  e.stopPropagation();
  searchText.value = "";
};

const selectOpt = (opt) => {
  model.id = opt.id;
  model.name = opt.name;

  searchText.value = "";
  options.value = options.value.map((el) => {
    el.visible = true;
    return el;
  });

};

onMounted(() => {
  defaultWidth.value = width.value;
  options.value = list.map((el) => {
    return {
      ...el,
      visible: true,
    };
  });
});
</script>

<style scoped>
@import url("./config/style.css");

.content {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative; */
  
}

.customSelect {
  
  font-size: 0.9rem;
  font-weight: 300;
}

.default {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

.dropdown {
  z-index: 7;
  position: absolute;
  top: 45px;
  overflow: hidden;
  padding: 0;
  padding-top: 5px;
}

.dropdown input {
  width: 100%;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 200;
  padding: 5px;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.list li.options {
  width: 100%;
  padding: 5px 4%;
  font-size: 0.87rem;
  font-weight: 200;
  cursor: pointer;
  color: hsl(var(--foreground));
}

.list li.options.border {
  border-bottom: 1px solid hsl(var(--primary));
}

.list li.options.ocult {
  display: none;
}

.list li.options:hover {
  text-shadow: 0 0 5px hsl(var(--foreground) / 60%);
  background: hsl(var(--background));
  border-color: hsl(var(--secondary));
}

.list li.options:last-of-type {
  border: none;
}

.list .special {
  width: 100%;
  padding: 5px 4%;
  font-size: 0.87rem;
  font-weight: 200;
  text-align: center;
  color: hsl(var(--foreground) / 50%);
}

.icon {
  position: absolute;
  cursor: pointer;
  font-size: 1.5rem;
  right: 5px;
}
</style>
