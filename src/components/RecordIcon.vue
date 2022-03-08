<template>
  <div class="icon-wrap">
    <div class="inner">
      <div class="svgList" :class="{expenditureRight:countType==='expenditure'}">
        <div class="svgWrap" v-for="(item,index) in incomeList" :key="index" @click="toggle($event,item)">
          <svg class="icon">
            <use :xlink:href="`#icon-${item}`"></use>
          </svg>
          <span>{{incomeNode[item]}}</span>
        </div>
        <div class="replace"></div>
        <div class="replace"></div>
        <div class="replace"></div>
        <div class="replace"></div>
        <div class="replace"></div>
      </div>
      <div class="svgList nextList"
           :class="{expenditureLeft:countType==='expenditure',expenditure:countType!=='expenditure'}">
        <div class="svgWrap" v-for="(item,index) in expenditureList" :key="index" @click="toggle($event,item)">
          <svg class="icon">
            <use :xlink:href="`#icon-${item}`"></use>
          </svg>
          <span>{{expenditureNode[item]}}</span>
        </div>
        <div class="replace"></div>
        <div class="replace"></div>
        <div class="replace"></div>
        <div class="replace"></div>
        <div class="replace"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {expenditureNode, incomeNode} from "./lib/iconNode";

export default defineComponent({
  name: "RecordIcon",
  setup() {
    const store = useStore()
    const selectedIcon = ref<HTMLDivElement>()
    const countType = computed(() => {
      return store.state.countType
    })
    type list = { [key: number]: string }
    const incomeList: list = {}
    const expenditureList: list = {}
    const incomeListContent = () => {
      for (let i = 1; i < 12; i++) {
        incomeList[i] = `income${i}`
      }
    }
    const expenditureListContent = () => {
      for (let i = 1; i < 17; i++) {
        expenditureList[i] = `icon${i}`
      }
    }
    incomeListContent()
    expenditureListContent()
    watchEffect(() => {
      if (!store.state.iconNumber && selectedIcon.value) selectedIcon.value!.classList.remove("selectedIcon")
    })
    const toggle = (e: Event, iconNumber: string) => {
      store.commit("modifyIconNumber", iconNumber)
      if (selectedIcon.value) selectedIcon.value!.classList.remove("selectedIcon")
      selectedIcon.value = e.currentTarget as HTMLDivElement
      selectedIcon.value.classList.add("selectedIcon")
    }
    return {incomeList, expenditureList, countType, toggle,expenditureNode,incomeNode}
  }
})
</script>

<style lang="scss" scoped>
.icon-wrap {
  width: 100%;
  height: 200px;
  padding-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #202020;
  > .inner {
    display: flex;
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    > .svgList {
      transition: all 250ms;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      gap: 10px;
      display: flex;
      .replace{
        width: 60px;
      }
      &.expenditureLeft {
        transform: translateX(0);
      }

      &.expenditureRight {

        transform: translateX(-100vw);
      }

      &.expenditure {
        transform: translateX(100vw);
      }

      &.nextList {
        position: absolute;
        top: 0;
        left: 0;
      }

      > .svgWrap {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        background-color: rgba(255, 205, 67, .5);
        width: 70px;
        height: 70px;
        background-color: #202020;
        >span{
          color: white;
          font-size: 12px;
          white-space: nowrap;
        }
        border-radius: 35%;
      }
      > .selectedIcon {
        background-color:  #2a2a2a;
      }
    }

  }
}

.icon {
  width: 30px;
  height: 30px;
  clip-path: circle(50%);
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>