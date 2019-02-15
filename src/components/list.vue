<template>
  <div class="list-wrap" ref="wrapper">
    <div class="wrap">
      <MaterielSearch></MaterielSearch>
      <div class="date-wrap">
        <div class="left">
          <span class="show">{{this.date?this.date:initDate()}}</span>
          <div class="data-plugin-wrap">
            <input type="date" @input="getDate($event)">
            <i class="date-icon"></i>
          </div>
        </div>
        <div class="right">
          <span class="show">{{this.date?this.date:initDate()}}</span>
          <div class="data-plugin-wrap">
            <input type="date" @input="getDate($event)">
            <i class="date-icon"></i>
          </div>
        </div>
      </div>
      <div class="thirdClassification-wrap">
        <div class="thirdClassification" v-for="item in listArray">
          <div class="head">
            <div class="title">
              <h4>一级焦炭</h4>
              <router-link :to="{name: 'detail', params: {id: item.id}}">质检结果</router-link>
            </div>
            <div class="supplier">
              <div class="name">天津市福龙有限公司供应商【中通-滨江】</div>
              <i :class="item.expand?'triangle-up':'triangle-down'" @click="toggle(item)"></i>
            </div>
          </div>
          <transition name="fade">
            <div class="items" v-if="item.expand">
              <div class="item">
                <span class="left">单据编号</span>
                <span class="right">TRGYYL2018-04-27-01</span>
              </div>
              <div class="item">
                <span class="left">库存组织</span>
                <span class="right">TRGYYL2018-04-27-01</span>
              </div>
              <div class="item">
                <span class="left">净重</span>
                <span class="right">TRGYYL2018-04-27-01</span>
              </div>
              <div class="item">
                <span class="left">扣杂</span>
                <span class="right">TRGYYL2018-04-27-01</span>
              </div>
              <div class="item">
                <span class="left">全干重</span>
                <span class="right">TRGYYL2018-04-27-01</span>
              </div>
              <div class="item">
                <span class="left">水分含量</span>
                <span class="right">TRGYYL2018-04-27-01</span>
              </div>
            </div>
          </transition>

        </div>
      </div>
    </div>
    <div class="details">
      <router-link :to="{name: 'details', params: {ids: ids}}">批量质检结果</router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MaterielSearch from './materielSearch'


  export default {
    name: "list",
    components:{
      MaterielSearch
    },
    data() {
      return {
        listArray: [],
        date: '',
        ids:[]
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        // vm.id = vm.$route.params.id
        //
        // axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getDetail', {
        //   params: {
        //     id: vm.id,
        //   }
        // })
        //   .then((response) => {
        //     vm.dataObj = response.data.data[0];
        //     // vm.dataObj = response.data.data;
        //     console.log(vm.dataObj.other.Vdaf)
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        vm.id = vm.$route.params.id
        console.log(vm.id)
        axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getList',{
          params: {
            id: vm.id,
          }
        }).then((response) => {
          if (response.data.data.length > 0) {
            vm.listArray = response.data.data

            console.log(vm.listArray)
            vm.listArray.forEach((item) => {
              vm.$set(item, 'expand', true);
              vm.ids.push(item.id)
            })
          }
        })
          .catch((error) => {
            console.log(error)
          })
      })
    },
    // created() {
    //   axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getList').then((response) => {
    //     if (response.data.data.length > 0) {
    //       this.listArray = response.data.data
    //
    //       console.log(this.listArray)
    //       this.listArray.forEach((item) => {
    //         this.$set(item, 'expand', true);
    //       })
    //     }
    //
    //   })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    methods: {
      getDate(e) {
        this.date = e.target.value
        // this.loadData(1, 10, this.chosenMaterielList, this.chosenOrganizationList, this.date, this.selectedResultId)
      },
      initDate() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        this.date = year + seperator1 + month + seperator1 + strDate;
      },
      toggle(item) {
        item.expand = !item.expand
      }
    }
  }
</script>

<style scoped>
  .list-wrap{
    position: relative;
  }
  .wrap {
    height: 100%;
  }

  .date-wrap {
    height: 0.42rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #F2F6F9;
  }

  .date-wrap > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F2F6F9;
    /*border-bottom: 1px solid #e9e9e9;*/
  }

  .date-wrap::after {
    content: "  ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e9e9e9;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  }

  .date-wrap .show {
    padding: 0.08rem 0 0.08rem 0.12rem;
    font-size: 0.12rem;
    color: #030303;
  }

  .date-wrap .data-plugin-wrap {
    margin-right: 0.12rem;
    margin-left: 0.12rem;
    position: relative;
    font-size: 0.12rem;
    color: #030303;
  }

  .date-wrap .data-plugin-wrap input {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .date-wrap .data-plugin-wrap .date-icon {
    display: inline-block;
    width: 0.11rem;
    height: 0.11rem;
    background: url("../assets/date.png") no-repeat;
    background-size: contain;
  }

  .thirdClassification-wrap {
    height: calc(100% - 1rem);
    background: #f2f6f9;
    -webkit-overflow-scrolling:touch;
    overflow: scroll;
  }

  .thirdClassification {
    padding-left: 0.1rem;
    margin-bottom: 0.1rem;
    background-color: #fff;
  }

  .thirdClassification .head {
    padding-right: 0.1rem;
    padding-bottom: 0.08rem;
    border-bottom: 1px solid #f3f3f3;
  }

  .thirdClassification .head .title {
    padding: 0.1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .thirdClassification .head .title h4 {
    font-size: 0.14rem;
    color: #030303;
  }

  .thirdClassification .head .title a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.06rem;
    width: 0.55rem;
    height: 0.18rem;
    font-size: 0.08rem;
    color: #ffffff;
    background: #007aff;
  }

  .thirdClassification .head .supplier {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #030303;
    line-height: 22px;
  }

  .thirdClassification .items{
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

  .details{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.5rem;
    height: 0.5rem;
    opacity:0.7;
    background:#007aff;
    box-shadow:2px 2px 6px 1px #e8ecef;
    position: absolute;
    bottom: 2rem;
    left: 0.18rem;
    border-radius: 50%;
  }
  .details a{
    display: block;
    /*width: 0.4rem;*/
    width: 3em;
    font-size:0.09rem;
    color:#fff;
  }

  .triangle-down {
    display: inline-block;
    width: 0.12rem;
    height: 0.07rem;
    background: url("../assets/triangle-down.png") no-repeat;
    background-size: contain;
  }

  .triangle-up {
    display: inline-block;
    width: 0.12rem;
    height: 0.07rem;
    background: url("../assets/triangle-up.png");
    background-size: contain;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
