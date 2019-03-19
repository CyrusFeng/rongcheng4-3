<template>
  <div class="list-wrap" ref="wrapper">
    <div class="wrap">
      <MaterielSearch @update:selected="getSupplierId"
                      url="http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getSupplier"></MaterielSearch>
      <div class="date-wrap">
        <div class="left">
          <span class="show">{{this.date1}}</span>
          <div class="data-plugin-wrap">
            <input type="date" @input="getstartDate($event)">
            <i class="date-icon"></i>
          </div>
        </div>
        <div class="right">
          <span class="show">{{this.date2}}</span>
          <div class="data-plugin-wrap">
            <input type="date" @input="getendDate($event)">
            <i class="date-icon"></i>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="select-wrap">
          <span>{{selectedKczz}}</span>
          <!--<span>xxx</span>-->
          <div class="select-block">
            <i class="triangle-down"></i>
            <select v-model="selectedKczz">
              <option value="请选择库存组织">无</option>
              <option :value="item.kczzName" v-for="item in kczzList">{{item.kczzName}}</option>
            </select>
          </div>
        </div>
        <div class="select-wrap">
          <span>{{selectedTransport}}</span>
          <!--<span>xxx</span>-->
          <div class="select-block">
            <i class="triangle-down"></i>
            <select v-model="selectedTransport">
              <option value="请选择运输方式">无</option>
              <option :value="item.transport" v-for="item in transportList">{{item.transport}}</option>
            </select>
          </div>
        </div>
        <div class="searchBtn-wrap" @click="search">
          <div class="btn">搜索</div>
        </div>
      </div>

      <div v-if="JSON.stringify(listObject) == '{}'"
           style="font-size: 0.18rem;text-align: center;margin-top: 0.2rem;">暂无数据</div>

      <div class="thirdClassification-wrap" ref="scroll" v-else>
        <div class="scroll-wrap">
          <div class="order-block" v-for="(listObj,key,index) in listObject">
            <div class="head">
              <div class="title">
                <h4>一级焦炭</h4>
                <router-link :to="{name: 'detail', params: {id: listObj.id}}">质检结果</router-link>
              </div>
              <div class="total-data">
                <div>
                  <span>总净重</span>
                  <span>{{listObj.list.reduce((prev,current)=>prev+Number(current.jingzhong),0)}}</span>
                </div>
                <div>
                  <span>总皮重</span>
                  <span>{{listObj.list.reduce((prev,current)=>prev+Number(current.pizhong),0)}}</span>
                </div>
                <div>
                  <span>总毛重</span>
                  <span>{{listObj.list.reduce((prev,current)=>prev+Number(current.maozhong),0)}}</span>
                </div>
              </div>
              <div class="subtitle">
                <div class="name">质检批号{{key}}</div>
                <div @click="toggle(listObj)">
                  <i :class="listObj.expand?'triangle-up':'triangle-down'"></i>
                </div>
                <!--<i class="triangle-down" @click="toggle(item)"></i>-->
              </div>
            </div>
            <div class="orderlist-wrap" v-if="listObj.expand">
              <div class="order" v-for="item in listObj.list">
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
            <!--<div class="thirdClassification" v-for="item in list">-->
            <!--<div class="head">-->
            <!--<div class="title">-->
            <!--<h4>一级焦炭</h4>-->
            <!--<router-link :to="{name: 'detail', params: {id: item.id}}">质检结果</router-link>-->
            <!--</div>-->
            <!--<div class="supplier">-->
            <!--<div class="name">天津市福龙有限公司供应商【中通-滨江】</div>-->
            <!--<i :class="item.expand?'triangle-up':'triangle-down'" @click="toggle(item)"></i>-->
            <!--</div>-->
            <!--</div>-->
            <!--<transition name="fade">-->
            <!--<div class="items" v-if="item.expand">-->
            <!--<div class="item">-->
            <!--<span class="left">单据编号</span>-->
            <!--<span class="right">TRGYYL2018-04-27-01</span>-->
            <!--</div>-->
            <!--<div class="item">-->
            <!--<span class="left">库存组织</span>-->
            <!--<span class="right">TRGYYL2018-04-27-01</span>-->
            <!--</div>-->
            <!--<div class="item">-->
            <!--<span class="left">净重</span>-->
            <!--<span class="right">TRGYYL2018-04-27-01</span>-->
            <!--</div>-->
            <!--<div class="item">-->
            <!--<span class="left">扣杂</span>-->
            <!--<span class="right">TRGYYL2018-04-27-01</span>-->
            <!--</div>-->
            <!--<div class="item">-->
            <!--<span class="left">全干重</span>-->
            <!--<span class="right">TRGYYL2018-04-27-01</span>-->
            <!--</div>-->
            <!--<div class="item">-->
            <!--<span class="left">水分含量</span>-->
            <!--<span class="right">TRGYYL2018-04-27-01</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</transition>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="details" v-if="ids.length>0">
      <router-link disabled="false" :to="{name: 'details', params: {ids: ids}}">批量质检结果</router-link>
    </div>
    <div class="details" v-else style="background-color: rgba(0,0,0,0.1)">
      <a>批量质检结果</a>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import MaterielSearch from './materielSearch'


  export default {
    name: "list",
    components: {
      MaterielSearch
    },
    data() {
      return {
        listObject: {},
        scroll: null,
        id: '',
        date1: '',
        date2: '',
        supplierId: '',
        selectedKczz: '',
        selectedTransport: '',
        kczzList: [],
        transportList: [],
        ids: [],
        len: 0,
      }
    },
    computed: {
      //当前数据量小于总数据量时禁用批量之间结果按钮
      disabled() {
        // return this.listArray.length < this.len
      }
    },
    created() {
      this.date1 = this.initDate(0)
      this.date2 = this.initDate(0)
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        vm.id = vm.$route.params.id
      })
    },
    mounted() {
      axios.get('http://www.doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getKczzMock')
        .then((response) => {
          this.len = response.data.len
          console.log(response.data.data);
          if (response.data.data.length > 0) {
            this.kczzList = response.data.data
            this.selectedKczz = '请选择库存组织'
          }
        })
      axios.get('http://www.doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getTransportMock')
        .then((response) => {
          this.len = response.data.len
          console.log(response.data.data);
          if (response.data.data.length > 0) {
            this.transportList = response.data.data
            this.selectedTransport = '请选择运输方式'
          }
        })

    },
    beforeRouteLeave(to, from, next) {
      if (to.path === '/details') {
        if (this.ids.length <= 0) {
          alert('请选择筛选条件并查询出有效单据')
        } else {
          next();
        }
      } else {
        next();
      }
    },
    methods: {
      getSupplierId(e) {
        this.supplierId = e
      },
      getstartDate(e) {
        this.date1 = e.target.value

        if (this.date1 && this.date2) {
          let flag = this.compareDate(this.date1, this.date2)
          if (flag) {
            this.loadData()
          } else {
            alert('开始时间不能大于结束时间！')
          }
        }
        // this.loadData(1, 10, this.chosenMaterielList, this.chosenOrganizationList, this.date, this.selectedResultId)
      },
      getendDate(e) {
        this.date2 = e.target.value
        if (this.date1 && this.date2) {
          console.log(this.date1, this.date2)
          let flag = this.compareDate(this.date1, this.date2)
          console.log(this.date1, this.date2, flag)
          if (flag) {
            this.loadData()
          } else {
            alert('开始时间不能大于结束时间！')
          }
        }
        // this.loadData(1, 10, this.chosenMaterielList, this.chosenOrganizationList, this.date, this.selectedResultId)
      },
      initDate(days) {
        console.log(days)
        let date = new Date();
        date = date.setDate(date.getDate() + days);
        date = new Date(date);

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
        return year + seperator1 + month + seperator1 + strDate;
      },
      compareDate(startDate, endDate) {
        // var beginDate='2015-06-17';
        // var endDate='2015-06-15';
        let d1 = new Date(startDate.replace(/\-/g, "\/"));
        let d2 = new Date(endDate.replace(/\-/g, "\/"));
        if (startDate != "" && endDate != "" && d1 > d2) {
          // alert("开始时间不能大于结束时间！");
          return false;
        } else {
          return true
        }
      },
      toggle(item) {
        item.expand = !item.expand
      },
      search() {
        this.selectedKczz === '请选择' ? '' : this.selectedKczz
        this.loadData(this.id, this.date1, this.date2, this.supplierId, this.selectedKczz)
      },
      loadData(materielId, startdate, enddate, supplierId, kczzId) {
        // this.showLoadingWrap = true;
        // this.showLoadingImg = true
        // axios.get('http://rap2api.taobao.org/app/mock/121282/getList', {
        axios.get('http://www.doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getListMock', {
          params: {
            id: materielId,
            startdate: startdate,
            enddate: enddate,
            supplierId: supplierId,
            kczzId: kczzId
          }
        })
          .then((response) => {
            // this.len = response.data.len
            // console.log(response.data.data);
            if (response.data.data.length > 0) {
              // this.showLoadingWrap = false;

              let arr = response.data.data
              // this.listObject = this.groupBy(arr, 'zjbgnum')
              let obj = this.groupBy(arr, 'zjbgnum')

              //给每组添加expand属性
              for (let i in obj) {
                this.ids.push(obj[i][0].id)
                let newobj = {}
                let arr = []
                arr = obj[i]
                obj[i] = newobj
                newobj.list = arr
                this.$set(newobj, 'expand', false);
              }

              console.log('xxx', obj);
              this.listObject = obj

              // arr.forEach((item) => {
              //   this.$set(item, 'expand', true);
              //   this.ids.push(item.id)
              // })

              this.$nextTick(() => {
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.scroll, {
                    click: true
                  })
                } else {
                  this.scroll.refresh()
                }
              })
            } else {
              // this.showLoadingImg = false
            }

          })
          .catch((error) => {
            // this.showLoadingImg = false
          })

      },
      groupBy(array, key) {
        const result = {}
        array.forEach(item => {
          if (!result[item[key]]) {
            result[item[key]] = []
          }
          result[item[key]].push(item)
        })
        return result
      }
    }
  }
</script>

<style scoped>
  .list-wrap {
    position: relative;
  }

  .wrap {
    height: 100%;
  }

  .date-wrap {
    height: 0.42rem;
    display: flex;
    justify-content: flex-start;
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

  .date-wrap > .right {
    margin-left: 0.05rem;
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

  .container {
    height: 0.42rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .select-wrap {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #F2F6F9;
    flex: 1;
  }

  .select-wrap span {
    padding-left: 0.12rem;
    display: inline-block;
    width: 10em;
    font-size: 0.12rem;
  }

  .select-wrap .select-block {
    position: relative;
  }

  .select-wrap .select-block select {
    height: 0.2rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    opacity: 0;
  }

  .searchBtn-wrap {
    height: 100%;
  }

  .searchBtn-wrap .btn {
    padding: 0 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 0.16rem;
    background-color: #2593FB;
    color: #fff;
  }

  .thirdClassification-wrap {
    height: calc(100% - 1.42rem);
    background: #f2f6f9;
    /*-webkit-overflow-scrolling:touch;*/
    /*overflow: scroll;*/
    overflow: hidden;
  }

  .thirdClassification-wrap .order-block {
    padding-left: 0.12rem;
    /*margin-right: 0.12rem;*/
    background-color: #fff;
    /*font-size: 0.14rem;*/
  }

  .thirdClassification-wrap .order-block .orderlist-wrap {
    font-size: 0.12rem;
  }

  .thirdClassification-wrap .order-block .head {
    padding-right: 0.1rem;
    padding-bottom: 0.08rem;
    border-bottom: 1px solid #f3f3f3;
  }

  .thirdClassification-wrap .order-block .head .title {
    padding: 0.2rem 0 0.06rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.15rem;
  }

  .thirdClassification-wrap .order-block .head .title h4 {
    font-size: 0.14rem;
    color: #030303;
  }

  .thirdClassification-wrap .order-block .head .title a {
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

  .thirdClassification-wrap .order-block .head .subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.12rem;
    color: #3f3f3f;
    line-height: 0.22rem;
  }
  .thirdClassification-wrap .order-block .head .subtitle i{
    margin: 0.06rem;
  }

  .total-data {
    padding-bottom: 0.08rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.12rem;
  }

  .total-data > div {
    padding-right: 0.1rem;
  }

  .thirdClassification-wrap .order-block .order .item-head {
    margin-bottom: 0.1rem;
    padding-left: 0.1rem;
    margin-right: 0.12rem;
    line-height: 0.22rem;
    position: relative;
    color: #3f3f3f;
  }

  .thirdClassification-wrap .order-block .order .item-head::before {
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

  .thirdClassification-wrap .order-block .order .items-wrap {
    padding-right: 0.1rem;
  }

  .thirdClassification-wrap .order-block .order .items-wrap .item {
    padding-bottom: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .thirdClassification-wrap .order-block .order .items-wrap .item .left {
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

  .details {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.5rem;
    height: 0.5rem;
    opacity: 0.7;
    background: #007aff;
    box-shadow: 2px 2px 6px 1px #e8ecef;
    position: absolute;
    bottom: 2rem;
    left: 0.18rem;
    border-radius: 50%;
  }

  .details a {
    display: flex;
    justify-content: center;
    align-items: center;
    /*width: 0.4rem;*/
    width: 3.1em;
    font-size: 0.09rem;
    color: #fff;
  }

  .disabled {
    background-color: #ccc;
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
