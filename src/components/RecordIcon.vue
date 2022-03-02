<template>
  <div class="icon-wrap">
    <div class="inner">
      <div class="svgList" :class="{expenditureRight:countType==='expenditure'}">
        <svg class="icon" v-for="(item,index) in incomeList" :key="index" @click="toggle($event,item)">
          <use :xlink:href="`#icon-${item}`"></use>
        </svg>
      </div>
      <div class="svgList nextList"
           :class="{
            expenditureLeft:countType==='expenditure',
            expenditure:countType!=='expenditure'
      }">
        <svg class="icon" v-for="(item,index) in expenditureList" :key="index" @click="toggle($event,item)">
          <use :xlink:href="`#icon-${item}`"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "RecordIcon",
  setup() {
    const store = useStore()
    const selectedIcon=ref<HTMLDivElement>()
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
    const toggle=(e:Event,iconNumber:string)=>{
      store.commit("modifyIconNumber",iconNumber)
      if(selectedIcon.value)selectedIcon.value!.classList.remove("selectedIcon")
      selectedIcon.value =e.currentTarget as HTMLDivElement
      selectedIcon.value.classList.add("selectedIcon")
    }
    return {incomeList, expenditureList, countType,toggle}
  }
})
</script>

<style lang="scss" scoped>
.icon-wrap {
  width: 100%;
  margin-top: 20px;
  min-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: 1px solid black;

  > .inner {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    width: 87vw;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    top: 0;
    left: 0;

    > .svgList {
      >.selectedIcon{
        background-color: green;
      }
      margin-right: -3vw;
      transition: all 250ms;
      display: inline-block;

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

      > svg {
        margin-right: 3vw;
        margin-bottom: 25px;
        clip-path: circle(50%);
        background-color: rgba(255, 205, 67,.5);
      }
    }

  }
}

.icon {
  width: 12vw;
  height: 12vw;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>