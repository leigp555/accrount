<template>
  <div class="rank-wrap">
    <div class="content-wrap">
      <div v-for="(item,key) in dataX" class="list" :key="key">
        <div class="title" v-if="dataType==='week'"><p><span>{{ key }}</span><span>{{weekCount(key)}}</span></p><span>合计￥{{ item[item.length - 1] }}</span></div>
        <div class="title" v-else-if="dataType==='month'"><p><span>{{ dayjs(key).format("YYYY-MM") }}</span><span>月份</span></p><span>合计￥{{ item[item.length - 1] }}</span></div>
        <div class="title" v-else><p><span>{{ dayjs(key).format("YYYY") }}</span><span>年</span></p><span>合计￥{{ item[item.length - 1] }}</span></div>
        <div class="item" v-for="(x,index) in item.slice(0,item.length-1)" :key="index">
          <div class="content">
            <div class="left">
              <div class="svgWrap">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#icon-${x.iconNumber}`"></use>
                </svg>
              </div>
              <p>{{ x.node }}</p>
            </div>
            <div class="right">
              <p>￥{{ x.countMoney }}</p>
              <span>{{ dayjs(x.nodeTime).format("HH:mm") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRefs} from "vue";
import dayjs from "dayjs";
import {hashType} from "./type";

export default defineComponent({
  props: {
    data: Object,
    dataType:String
  },
  setup(props) {
    const {data,dataType} = toRefs(props)
    //把对象数据倒序一下
    const reserveData = (obj: hashType) => {
      const sorted = {}
      const arr = Object.keys(data.value!).sort((a,b)=>{
        if(dayjs(a).isBefore(b)){
          return 1
        }else {
          return -1
        }
      })
      for(let i=0;i<arr.length;i++){
        //@ts-ignore
        sorted[arr[i]]=obj[arr[i]]
      }
      return sorted as hashType
    }
    const dataX=computed(()=>{
      return reserveData(data.value!)
    })

    const weekCount=(time:string|number)=>{
      const hash:{[key:string]:string}={
        "0":"星期日",
        "1":"星期一",
        "2":"星期二",
        "3":"星期三",
        "4":"星期四",
        "5":"星期五",
        "6":"星期六",
      }
      const string=dayjs(time).day().toString()
      return hash[string]
    }
    return {dataX, dayjs,dataType,weekCount}
  }
})
</script>

<style lang="scss" scoped>
.rank-wrap {
  padding-bottom: 150px;
  > .content-wrap {
    > .list {
      > .title {
        background-color: #2a2a2a;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        >p>span{
          margin-right: 10px;
          font-size: 14px;
        }
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
    }

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
</style>