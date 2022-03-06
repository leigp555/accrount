<template>
  <div class="rank-wrap">
    <div class="content-wrap">
      <div v-for="(item,key,index) in data" class="list" :key="key">
        <div class="title"><span>{{ key }}</span><span>合计￥{{item[item.length-1]}}</span></div>
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
import {defineComponent, toRefs} from "vue";
import dayjs from "dayjs";

export default defineComponent({
  props: {
    data: Object
  },
  setup(props) {
    const {data} = toRefs(props)
    return {data, dayjs}
  }
})
</script>

<style lang="scss" scoped>
.rank-wrap {
  > .content-wrap {
    > .list {
      > .title {
        background-color: #2a2a2a;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
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