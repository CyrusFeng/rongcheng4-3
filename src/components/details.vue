<template>
  <div class="detail-wrap">
    <div class="date-wrap">
      <span>{{dataObj.startdate}}至{{dataObj.enddate}}</span>
    </div>
    <div class="statistics">
      <div class="left">总净重{{totalWeight}}</div>
      <div class="line"></div>
      <div class="">总车辆{{totalCar}}</div>
    </div>
    <div class="panel-wrap">
      <div class="panel" v-for="item in dataObj">
        <div class="name">{{item.name}}</div>
        <div class="items">
          <div class="item">
            <span class="left">净重</span>
            <span class="right">{{item.jingzhong}}</span>
          </div>
          <div class="item">
            <span class="left">车辆</span>
            <span class="right">{{item.jjd !== undefined && item.jjd !== null ? item.jjd.length : ''}}</span>
          </div>
          <div class="item">
            <span class="left">供应商</span>
            <span class="right">{{item.supplierName}}</span>
          </div>
          <div class="item">
            <span class="left">运输方式</span>
            <span class="right">{{item.jjd[0].transport}}</span>
          </div>
        </div>
        <div class="other" v-if="item.other">
          <div class="block" v-for="(item1,key,index) in item.other">
            <span>{{key}}</span>
            <span>{{item1}}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "details",
    data() {
      return {
        dataObj: {},
        totalWeight:0,
        totalCar:0,
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getDetailsMock', {
          params: {
            ids: vm.$route.params.ids,
          }
        })
          .then((response) => {
            // vm.dataObj = response.data.data[0];
            vm.dataObj = response.data.data;
            vm.dataObj.forEach((item)=>{
              console.log(item)
              vm.totalWeight+=parseInt(item.jingzhong)
              vm.totalCar+=item.jjd.length
            })
            console.log(vm.dataObj)
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    },
  }
</script>

<style scoped>
  .detail-wrap {
    background-color: #F2F6F9;
  }

  .date-wrap {
    padding-left: 0.12rem;
    height: 0.42rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #F2F6F9;
    font-size: 0.12rem;
    color: #030303;
  }
  .statistics{
    padding: 0 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.5rem;
    background-image:linear-gradient(-150deg, #2990ff 0%, #007aff 100%);
    box-shadow:2px 2px 6px 1px #e6ebee;
  }
  .statistics > div{
    font-size:0.15rem;
    color:#ffffff;
  }
  .statistics .line{
    height: 0.12rem;
    width: 1px;
    background-color: #fff;
  }
  .panel-wrap{
    height: calc(100% - 0.92rem);
    -webkit-overflow-scrolling:touch
  }
  .panel {
    margin-bottom: 0.1rem;
    padding: 0 0 0 0.12rem;
    background-color: #fff;
  }

  .panel > .name {
    padding-top: 0.12rem;
    font-size: 0.14rem;
    color: #030303;
  }

  .panel .items {
    padding-right: 0.12rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #efefef;
  }

  .panel .items .item {
    padding-top: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel .items .item .left {
    font-size: 0.12rem;
    color: #929292;
  }

  .panel .items .item .right {
    font-size: 0.12rem;
    color: #030303;
  }

  .panel .other {
    padding-bottom: 0.2rem;
    padding-right: 0.12rem;
    padding-top: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel .other .block {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .panel .other .block span:first-child {
    font-size: 0.12rem;
    color: #007aff;
  }

  .panel .other .block span:last-child {
    padding-top: 0.12rem;
    font-size: 0.12rem;
    color: #030303;
    text-align: center;
  }
</style>
