<template>
<!--  <div class="noRecord" v-if="Object.keys(sortedIncomeList)[0]">-->
<!--    <svg class="icon" aria-hidden="true">-->
<!--      <use xlink:href="#icon-noRecord"></use>-->
<!--    </svg>-->
<!--    <p>暂无记录，快去记一笔吧</p>-->
<!--  </div>-->
  <div class="detail-wrap">
    <div class="countType" >
      <Tabs>
        <Tab title="支出"></Tab>
        <Tab title="收入"></Tab>
      </Tabs>
    </div>
    <div class="content-wrap">
      <div class="expenditure" :class="{'exOpen':countType==='expenditure','exClose':countType!=='expenditure'}">
        <div v-for="(value,key) in sortedExpenditure" class="list"
             :key="key">
          <div class="nav">{{ key }}<span>支出￥{{ value[value.length - 1] }}</span></div>
          <div class="content" v-for="(item,index) in value.slice(0,value.length-1)"
               :key="index">
            <div class="left">
              <div class="svgWrap">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#icon-${item.iconNumber}`"></use>
                </svg>
              </div>
              <p>{{ item.node }}</p>
            </div>
            <div class="right">
              <p>￥{{ item.countMoney }}</p>
              <span>{{ dayjs(item.nodeTime).format("HH:mm") }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="income" :class="{'inOpen':countType==='income','inClose':countType!=='income' }">
        <div v-for="(value,key) in sortedIncomeList" class="list"
             :key="key">
          <div class="nav">{{ key }}<span>支出￥{{ value[value.length - 1] }}</span></div>
          <div class="content" v-for="(item,index) in value.slice(0,value.length-1)"
               :key="index">
            <div class="left">
              <div class="svgWrap">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#icon-${item.iconNumber}`"></use>
                </svg>
              </div>
              <p>{{ item.node }}</p>
            </div>
            <div class="right">
              <p>￥{{ item.countMoney }}</p>
              <span>{{ dayjs(item.nodeTime).format("HH:mm") }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import Tab from "./lib/Tab.vue";
import Tabs from "./lib/Tabs.vue";
import {useStore} from "vuex";
import {computed, onBeforeUnmount} from "vue";
import dayjs from "dayjs";
import {result} from "./lib/fetchData";
const store = useStore()
//获取分组切排好序的所有初次加载时的数据
const {sortedIncomeList, sortedExpenditure} = result()
//是否展示
const countType = computed(() => {
  return store.state.countType
})
onBeforeUnmount(() => {
  store.commit("initial")
})

</script>


<style lang="scss" scoped>
.detail-wrap {
  color: white;
  height: 100%;
  width: 100%;
  padding-bottom: 80px;
  background-color: #202020;
  position: relative;
  > .countType {
    position: fixed;
    top: 0;
    left: 50%;
    padding-top: 15px;
    transform: translateX(-50%);
    z-index: 10;

    width: 100%;
    background-color: #2a2a2a;
  }

  > .content-wrap {
    position: relative;
    top: 70px;
    left: 0;
    padding-bottom: 80px;

    > .expenditure {
      transition: all 250ms;
    }

    > .income {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: all 250ms;
    }

    .content {
      background-color: #202020;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: inline-flex;
        align-items: center;
        gap: 10px;

        > .svgWrap {
          display: inline-block;
          padding: 10px;
          background-color: #342f2c;
          border-radius: 35%;
        }
      }

      .right {
        display: inline-flex;
        flex-wrap: wrap;
        flex-direction: column;
        text-align: right;
        gap: 8px;

        p {
          font-size: 20px;
        }
      }

    }

    > .exOpen {
      transform: translateX(0);
    }

    > .exClose {
      transform: translateX(-100vw);
    }

    > .inOpen {
      transform: translateX(0);
    }

    > .inClose {
      transform: translateX(100vw);
    }
  }

  > .exOpen {
  }

  > .countType {
    background-color: #202020;
  }

  .nav {
    font-size: 10px;
    padding: 15px 20px;
    background-color: #2a2a2a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.icon {
  width: 40px;
  height: 40px;
  background-color: white;
  clip-path: circle(50%);
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.noRecord{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  left: 0;
  top: 30%;
  >.icon {
    width: 50px;
    height:50px;
    margin-bottom: 10px;
    clip-path: circle(100%);
    background-color:#202020 ;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>