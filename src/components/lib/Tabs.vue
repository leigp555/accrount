<template>
  <div class="type-wrap">
    <div class="titles">
      <div class="inner">
        <div class="title" id="typeTitles" ref="wrap">
          <div v-for="(item,index) in titles" :key="index" @click="toggle(item)">{{ item }}</div>
        </div>
        <div class="indicator" ref="indicator"></div>
      </div>
    </div>
    <div class="content">
      <component :is="currentContent" :key="currentContent"/>
    </div>
  </div>

</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref, toRefs, watchEffect} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  setup(props, ctx) {
    const store = useStore()
    const selectedTitle = ref("支出")
    watchEffect(() => {
      if (store.state.countType === "income") {
       selectedTitle.value= "收入"
      } else if (store.state.countType === "expenditure") {
        selectedTitle.value= "支出"
      }
    })
    const currentTitleEl = ref<HTMLDivElement>()
    const children = ctx.slots.default!()
    const currentContent = ref<HTMLDivElement>()
    const indicator = ref<HTMLDivElement>()
    const wrap = ref<HTMLDivElement>()
    const titles = computed(() => {
      const arr = [] as string[]
      children.forEach((item) => {
        arr.push(item.props!.title)
      })
      return arr as string[]
    })
    const toggle = (title: string) => {
      if (title === "收入") {
        store.commit("modifyCountType", "income")
      } else if (title === "支出") {
        store.commit("modifyCountType", "expenditure")
      }
    }
    onMounted(() => {
      const els = document.getElementById("typeTitles")!.children
      const elements = Array.from(els)
      const {left: left1} = wrap.value!.getBoundingClientRect()
      watchEffect(() => {
        elements.forEach((item) => {
          if (item.innerHTML === selectedTitle.value) {
            //@ts-ignore
            currentTitleEl.value = item
            const {width, left: left2} = item.getBoundingClientRect()
            indicator.value!.style.width = width + "px"
            const distance = left2 - left1
            indicator.value!.style.transform = `translateX(${distance + 'px'})`
          }
        })
        children.forEach((item) => {
          if (item.props!.title === selectedTitle.value) {
            //@ts-ignore
            currentContent.value = item
          }
        })
      })
    })
    return {titles, toggle, currentContent, indicator, wrap}
  }
})
</script>

<style lang="scss" scoped>
.type-wrap {
  > .titles {
    padding: 10px;
    display: flex;
    justify-content: center;

    > .inner {
      position: relative;
      top: 0;
      left: 0;

      > .title {
        display: flex;
        gap: 50px;
        margin-bottom: 3px;
        font-size: 18px;
      }

      > .indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        border: 1px solid green;
        transition: all 250ms;
      }
    }
  }
}

</style>