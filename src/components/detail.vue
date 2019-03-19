<template>
  <div class="detail-wrap">
    <div class="date-wrap">
      <span>{{dataObj.startdate}}至{{dataObj.enddate}}</span>
    </div>

    <div class="panel">
      <div class="name">{{dataObj.name}}</div>
      <div class="items">
        <div class="item">
          <span class="left">净重</span>
          <span class="right">{{dataObj.jingzhong}}</span>
        </div>
        <div class="item">
          <span class="left">车辆</span>
          <!--<span class="right">{{dataObj.jjd.length}}</span>-->
          <span class="right">{{dataObj.jjd !== undefined && dataObj.jjd !== null ? dataObj.jjd.length : ''}}</span>
        </div>
        <div class="item">
          <span class="left">供应商</span>
          <span class="right">{{dataObj.supplierName}}</span>
        </div>
      </div>
      <div class="other" v-if="dataObj.other">
        <div class="block" v-for="(item,key,index) in dataObj.other">
          <span>{{key}}</span>
          <span>{{item}}</span>
        </div>
      </div>
    </div>
    <div class="orderlist-wrap">
      <div class="order" v-for="item in dataObj.jjd">
        <div class="item-head">{{item.supplierName}}</div>
        <div class="items-wrap">
          <div class="item">
            <span class="left">单据编号</span>
            <span class="right">{{item.num}}</span>
          </div>
          <div class="item">
            <span class="left">库存组织</span>
            <span class="right">{{item.kczzl}}</span>
          </div>
          <div class="item">
            <span class="left">净重</span>
            <span class="right">{{item.jingzhong}}</span>
          </div>
          <div class="item">
            <span class="left">毛重</span>
            <span class="right">{{item.maozhong}}</span>
          </div>
          <div class="item">
            <span class="left">皮重</span>
            <span class="right">{{item.pizhong}}</span>
          </div>
          <div class="item">
            <span class="left">扣杂</span>
            <span class="right">{{item.kouza}}</span>
          </div>
          <div class="item">
            <span class="left">全干重</span>
            <span class="right">{{item.quanganzhong}}</span>
          </div>
          <div class="item">
            <span class="left">水分含量</span>
            <span class="right">{{item.water}}</span>
          </div>
          <div class="item">
            <span class="left">运输方式</span>
            <span class="right">{{item.transport}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: "detail",
    data() {
      return {
        dataObj: {}
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        vm.id = vm.$route.params.id

        axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getDetailsMock', {
          params: {
            id: vm.id,
          }
        })
          .then((response) => {
            vm.dataObj = response.data.data[0];
            // vm.dataObj = response.data.data;
            console.log(vm.dataObj.other.Vdaf)
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

  .panel .other {

  }

  .orderlist-wrap {
    font-size: 0.12rem;
    padding-left: 0.12rem;
    background-color: #fff;
  }

  .order .item-head {
    margin-bottom: 0.1rem;
    padding-left: 0.1rem;
    margin-right: 0.12rem;
    line-height: 0.22rem;
    position: relative;
    color: #3f3f3f;
  }

  .order .item-head::before {
    content: '';
    display: block;
    background: #007aff;
    width: 0.04rem;
    height: 0.13rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  .order .items-wrap {
    padding-right: 0.1rem;
  }

  .order .items-wrap .item {
    padding-bottom: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order .items-wrap .item .left {
    color: #929292;
  }

  .thirdClassification .items {
    transition: all 0.3s;
  }

  .thirdClassification .item {
    padding: 0.05rem 0.1rem 0.05rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .thirdClassification .items .item .left {
    font-size: 0.12rem;
    color: #929292;
  }

  .thirdClassification .items .item .right {
    font-size: 0.12rem;
    color: #030303;
  }
</style>
