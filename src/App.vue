<template>
  <div class="account-app-wrap">
    <div class="main">
      <router-view/>
    </div>
    <nav class="account-app-nav">
      <ol class="nav-list">
        <li>
          <router-link to="/detail">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-detail"></use>
            </svg>
            <p>明细</p>
          </router-link>
        </li>
        <li>
          <router-link to="/home">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-record"></use>
            </svg>
            <p>记账</p>
          </router-link>
        </li>
        <li>
          <router-link to="/statistic">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-statistics"></use>
            </svg>
            <p>统计</p>
          </router-link>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.account-app-wrap {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  top: 0;
  left: 0;
  > .main {
    height: 100%;
    background-color: #202020;
    overflow: hidden;
  }
  > .account-app-nav {
    background-color: rgba(61, 60, 60, 1);
    color: white;
    position: absolute;
    border-top: 1px solid rgba(0,0,0,.5);
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 80px;
    padding: 5px 20px;
    > .nav-list {
      display: flex;
      justify-content: space-between;
      >li{
        display: flex;
        flex-direction: column;
        align-self: center;
        text-align: center;
      }
      & .icon {
        width: 40px;
        height: 40px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
}
</style>