<template>
<div class="rank-wrap">
  <div class="content-wrap">
    <div v-for="(item,key) in data" class="list" :key="key">
      <div class="content">
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
</template>

<script lang="ts" >
import {defineComponent, ref} from "vue";
import {stateObj} from "../../vueX/vueX";
import dayjs from "dayjs";

export default defineComponent({
  props:{
    data:Object
  },
  setup(props){
    const data=ref<stateObj[]>(props.data)

    return {data,dayjs}
  }
})
</script>

<style lang="scss" scoped>
.rank-wrap{
  >.content-wrap {
    >.list{
      border-bottom: 1px solid white;
      >.content {
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