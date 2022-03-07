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

      </div>
      <div class="svgList nextList"
           :class="{expenditureLeft:countType==='expenditure',expenditure:countType!=='expenditure'}">

        <div class="svgWrap" v-for="(item,index) in expenditureList" :key="index" @click="toggle($event,item)">
          <svg class="icon">
            <use :xlink:href="`#icon-${item}`"></use>
          </svg>
          <span>{{expenditureNode[item]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue";
import {useStore} from "vuex";

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
    const expenditureNode = {
      "icon1": "旅游",
      "icon2": "礼物",
      "icon3": "运动",
      "icon4": "购物",
      "icon5": "水果",
      "icon6": "相机",
      "icon7": "零食",
      "icon8": "蔬菜",
      "icon9": "餐饮",
      "icon10": "通讯费",
      "icon11": "服饰",
      "icon12": "服饰",
      "icon13": "居家",
      "icon14":"娱乐",
      "icon15":"美容",
      "icon16":"日用",
      "icon17": "加油",
      "icon18":"自定义",
    };
    const incomeNode={
      "income1":"工资",
      "income2":"工作",
      "income3":"房租",
      "income4":"投资",
      "income5":"理财",
      "income6":"红包",
      "income7":"中奖",
      "income8":"兼职",
      "income9":"副业",
      "income10":"礼金",
      "income11":"奖金",
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
  padding-top: 20px;
  min-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #202020;

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

      > .svgWrap {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 3vw;
        margin-bottom: 25px;
        background-color: rgba(255, 205, 67, .5);
        width: 15vw;
        height: 15vw;
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