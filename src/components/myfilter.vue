<template>
  <div style="height:100%;background: #F2F6F9;">
    <header class="top">
      <div class="top-filter-btn" @click="changeShowFilter">
        <span class="top-filter-btn-name">筛选</span>
        <i :class="showFilter?'triangle-up':'triangle-down'"></i>
      </div>
      <TopSearch></TopSearch>
    </header>
    <div class="filter-panel" v-show="showFilter" ref="filterPanel">
      <div class="filter-wrap" @click.stop ref="filterWrap" @click="changeShowFilter" v-if="filterData.length > 0">
        <div class="filter-tab" @click.stop>
          <div class="classification-wrap" v-for="(item,index) in filterData" :key="index">
            <div class="organization title">
              <div>
                <span class="item">{{item.name}}</span>
              </div>
              <div @click="toggleUpDown(item,index)">
                <i :class="item.expand?'up-icon':''"></i>
              </div>
            </div>
            <div class="organization-options options" ref="options">
              <span class="item"
                    v-for="(xxx,index) in item.classification"
                    :key="index"
                    ref="span"
                    @click="toggle(xxx)"
                    :class="{'active':xxx.active}"
              >{{xxx.name}}</span>
            </div>
          </div>

        </div>
        <div class="btns" @click.stop>
          <a class="reset" @click="resetChoose">重置</a>
          <a class="sure" @click="changeShowFilter">确定</a>
        </div>
      </div>
    </div>
    <div class="showSecondClassification">
      <ul>
        <li v-for="item in chosenSpan">
          <router-link :to="{name: 'list', params: {id: item.id}}">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import store from '../vuex'
  import TopSearch from './TopSearch'

  export default {
    name: "myfilter",
    components:{
      TopSearch
    },
    data() {
      return {
        showFilter: false,
        filterData: [],
        height:0,
        chosenSpan:[]
      }
    },
    methods: {
      changeShowFilter() {
        this.showFilter = !this.showFilter

        if(this.filterData.length>0){
          this.filterData.forEach((item,index) => {

            this.$nextTick(()=>{
              // console.log(this.$refs.options[index].getBoundingClientRect().height)

              //将每个一级分类中二级分类的实际高度作为属性添加到一级分类项的数据中
              this.$set(item, 'height', this.$refs.options[index].getBoundingClientRect().height);
            })

          })

          this.$nextTick(()=>{
            //获取每个二级分类项的高度并保存
            this.height = this.$refs.span[0].getBoundingClientRect().height
            //将每个一级分类的高度设置为二级分类项的高度值，并且隐藏超出部分
            if(this.$refs.options){
              this.$refs.options.forEach((item)=>{
                item.style.height = this.height + 'px'
                item.style.overflow = 'hidden';
              })
            }

            console.log(this.filterData)
          })

        }

      },
      toggleUpDown(currentItem,index) {

        currentItem.expand = !currentItem.expand

        let wrap = this.$refs.options[index]

        this.height = this.$refs.span[0].getBoundingClientRect().height

        let optionsHeight = currentItem.height
        // let optionsHeight = currentItem.num * this.height

        console.log(this.height)
        console.log(optionsHeight)

        let lineNum = wrap.getBoundingClientRect().height / this.height
        // console.log(lineNum)
        // currentItem.height = wrap.getBoundingClientRect().height
        // console.log(currentItem.height)
        if (lineNum > 2) {

          wrap.style.height = this.height + 'px';
          wrap.style.overflow = 'hidden';

        } else {
          wrap.style.height = optionsHeight + 'px';
        }

      },
      toggle(item) {
        console.log(item)
        if(item.active){
          item.active = false
          this.$remove(this.chosenSpan, item)
        }else{
          item.active = true
          this.chosenSpan.push(item)
        }


        // if (item.active) {
        //   Vue.set(item, 'active', false);//为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。
        //   if (item.materiel) {
        //   } else if (item.organization) {
        //     this.$remove(this.chosenOrganizationList, item.organizationId)
        //   }
        // } else {
        //   Vue.set(item, 'active', true);
        //   if (item.materiel) {
        //   } else if (item.organization) {
        //     this.chosenOrganizationList.push(item.organizationId)
        //   }
        // }
      },
      // submit(){
      //   store.commit("getChosenSpan", this.chosenSpan);
      //   this.showFilter = false
      // }
      resetChoose(){
        console.log('xxx')
        this.chosenSpan.forEach((item)=>{
          item.active = false
        })
        this.chosenSpan.length = 0
      }
    },
    created() {
      axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getScreen').then((response) => {
        if (response.data.data.length > 0) {
          this.filterData = response.data.data
          this.filterData.forEach((item) => {
            this.$set(item, 'expand', false);
            if(item.classification){
              item.classification.forEach((x) => {
                this.$set(x, 'active', false);
              })
            }

            if(item.name === '原燃辅料'){
              if(item.classification){
                item.classification.forEach((x) => {
                  x.active = true
                  this.chosenSpan.push(x)
                })
              }

            }
          })
        }

      })
        .catch((error) => {
          // this.showLoadingImg = false
        })
      // this.filterData = [{"id":"1","name":"原燃辅料","classification":[{"id":"101","name":"铁矿"},{"id":"102","name":"焦炭"},{"id":"103","name":"煤"},{"id":"104","name":"废钢"},{"id":"106","name":"合金"},{"id":"107","name":"耐材"},{"id":"108","name":"非金属矿"},{"id":"111","name":"辅料"},{"id":"112","name":"废旧物资"}]},{"id":"3","name":"备件","classification":[{"id":"301","name":"螺栓类"},{"id":"302","name":"胶管、软连接类"},{"id":"303","name":"传动备件类"},{"id":"304","name":"杂品类"},{"id":"305","name":"密封类"},{"id":"306","name":"工具类"},{"id":"307","name":"劳保类"},{"id":"308","name":"阀门类"},{"id":"309","name":"管件类"},{"id":"310","name":"轴承类"},{"id":"311","name":"空压机类"},{"id":"312","name":"风机类"},{"id":"313","name":"泵件类"},{"id":"314","name":"气体厂非标件类"},{"id":"315","name":"减速机类"},{"id":"316","name":"输送备件类"},{"id":"317","name":"成套设备"},{"id":"318","name":"液压、润滑类"},{"id":"319","name":"除尘备件类"},{"id":"320","name":"有色金属备件类"},{"id":"321","name":"轧钢厂非标件类"},{"id":"322","name":"炼钢厂非标件类"},{"id":"323","name":"炼铁厂非标件类"},{"id":"324","name":"化验器材、化验药品类"},{"id":"325","name":"火车及配件类"},{"id":"326","name":"钢材类"},{"id":"327","name":"油品、油漆类"},{"id":"328","name":"起重备件类"},{"id":"329","name":"锅炉类"},{"id":"330","name":"办公类"},{"id":"331","name":"电脑耗材类"},{"id":"351","name":"电气类"},{"id":"352","name":"线缆类"},{"id":"353","name":"电机及其配件"},{"id":"354","name":"工控自动化仪表类"},{"id":"355","name":"PLC/DCS"},{"id":"356","name":"二级库"},{"id":"399","name":" 其他"}]},{"id":"5","name":"钢铁废次材/副产品","classification":[{"id":"51","name":"副产品"}]},{"id":"8","name":"钢铁产成品/在制品","classification":[{"id":"81","name":"钢坯"},{"id":"82","name":"高线"},{"id":"83","name":"棒材"},{"id":"84","name":"带钢"},{"id":"85","name":"自制半成品"},{"id":"86","name":"铬合金方钢"}]},{"id":"9","name":"能源介质"},{"id":"A","name":"多元","classification":[{"id":"A001","name":"大米"},{"id":"A002","name":"杂粮"},{"id":"A003","name":"水稻"},{"id":"A004","name":"高粱"},{"id":"A005","name":"碎米"},{"id":"A006","name":"玉米糁"},{"id":"A007","name":"小麦"},{"id":"A008","name":"豌豆"},{"id":"A009","name":"白酒"},{"id":"A010","name":"酒精"},{"id":"A011","name":"包装物"},{"id":"A012","name":"酿酒主原料"},{"id":"A013","name":"燃料"},{"id":"A014","name":"放心购"},{"id":"A015","name":"原木"},{"id":"A016","name":"板材"},{"id":"A017","name":"板皮"},{"id":"A018","name":"指接板"},{"id":"A019","name":"低值易耗品"},{"id":"A020","name":"主原料"},{"id":"A021","name":"药品"},{"id":"A022","name":"大麦"},{"id":"A023","name":"内部供应"}]},{"id":"C","name":"藏品"},{"id":"C藏品","name":"藏"},{"id":"L","name":"礼品","classification":[{"id":"L01","name":"酒类"},{"id":"L02","name":"围巾"},{"id":"L03","name":"茶类"},{"id":"L04","name":"经书类"},{"id":"L05","name":"瓷器类"},{"id":"L06","name":"邮册类"},{"id":"L07","name":"食品类"},{"id":"L08","name":"其他"}]},{"id":"x001","name":"用品"}]
      // this.filterData.forEach((item) => {
      //     this.$set(item, 'expand', false);
      //     if(item.classification){
      //       item.classification.forEach((x) => {
      //         this.$set(x, 'active', false);
      //       })
      //     }
      //
      // })


    },

  }
</script>

<style scoped>
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*border-bottom: 1px solid #e9e9e9;*/
    margin-bottom: 0.2rem;
    background: #fff;
  }

  .top::after {
    content: "  ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e9e9e9;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .top::after {
      transform: scaleY(.5);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .top::after {
      transform: scaleY(.33333);
    }
  }

  .top-filter-btn {
    margin: 0.14rem 0 0.14rem 0.12rem;
    padding-right: 0.2rem;
    border-right: 1px solid #b5b5b5;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .top-filter-btn {
      border-right: 0.5px solid #b5b5b5;
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .top-filter-btn {
      border-right: 0.333333px solid #b5b5b5;
    }
  }

  .top-filter-btn > .top-filter-btn-name {
    padding-right: 0.08rem;
    display: inline-block;
    font-size: 0.12rem;
    color: #8e8e93;
  }

  .top-filter-btn > .top-filter-btn-name.btn-color {
    color: #007aff;
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

  .filter-panel {
    width: 100%;
    position: absolute;
    /*position: fixed;*/
    z-index: 2;
    top: 0.45rem;
    left: 0;
    height: calc(100% - 0.46rem);
    background-color: rgba(0, 0, 0, 0.3);
    /*overflow: scroll;*/
    -webkit-overflow-scrolling: touch;
    /*overflow-y: scroll*/
    /*overflow: hidden;*/
  }

  .filter-panel .filter-wrap {
    height: calc(100% + 1px);
  }

  .filter-panel .filter-wrap .filter-tab {
    background-color: #fff;
  }

  .filter-panel .filter-wrap .filter-tab .title {
    margin-left: 0.12rem;
    padding: 0.09rem 0.12rem 0.14rem 0;
    height: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*border-bottom: 1px solid #979797;*/
    position: relative;
  }

  .filter-panel .filter-wrap .filter-tab .title::after {
    content: "  ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #979797;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .filter-panel .filter-wrap .filter-tab .title::after {
      transform: scaleY(.5);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .filter-panel .filter-wrap .filter-tab .title::after {
      transform: scaleY(.33333);
    }
  }

  .filter-panel .filter-wrap .filter-tab .title .item {
    font-size: 0.12rem;
    color: #8e8e93;
  }

  .filter-panel .filter-wrap .filter-tab .title .title-right {
    padding-right: 0.03rem;
  }

  .filter-panel .filter-wrap .filter-tab .title i {
    margin: 0 0.02rem;
    display: inline-block;
    width: 0.12rem;
    height: 0.2rem;
    background: url("../assets/right.png") no-repeat;
    background-size: contain;
    transition: all 0.3s;
  }

  /*.filter-panel .filter-wrap .filter-tab .title i.right-icon {*/
  /*transform: rotate(90deg);*/
  /*transition: all 0.3s;*/
  /*}*/
  .filter-panel .filter-wrap .filter-tab .title i.up-icon {
    transform: rotate(-90deg);
    transition: all 0.3s;
  }

  .filter-panel .filter-wrap .filter-tab .options {
    margin-left: 0.12rem;
    padding: 0.09rem 0.12rem 0 0;
    transition: height 0.3s;
  }

  .filter-panel .filter-wrap .filter-tab .options .item {
    margin-right: 0.19rem;
    margin-bottom: 0.16rem;
    padding: 0.04rem 0.19rem;
    display: inline-block;
    font-size: 0.09rem;
    color: #8e8e93;
    background-color: #e7e7e7;
    border-radius: 0.04rem;
    border: 1px solid #fff;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .filter-panel .filter-wrap .filter-tab .options .item {
      border: 0.5px solid #fff;
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .filter-panel .filter-wrap .filter-tab .options .item {
      border: 0.333333px solid #fff;
    }
  }

  /*.filter-panel .filter-wrap .filter-tab .options .item::after{*/
  /*content: "  ";*/
  /*position: absolute;*/
  /*left: 0;*/
  /*bottom: 0;*/
  /*width: 100%;*/
  /*height: 1px;*/
  /*background-color: #fff;*/
  /*!* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; *!*/
  /*}*/
  /*@media screen and (-webkit-min-device-pixel-ratio: 2) {*/
  /*.filter-panel .filter-wrap .filter-tab .options .item::after{ transform:scaleY(.5); }*/
  /*}*/
  /*@media screen and (-webkit-min-device-pixel-ratio: 3) {*/
  /*.filter-panel .filter-wrap .filter-tab .options .item::after { transform:scaleY(.333333); }*/
  /*}*/

  .filter-panel .filter-wrap .filter-tab .options .item:last-child {
    margin-right: 0;
  }

  .filter-panel .filter-wrap .filter-tab .options .item.active {
    border: 1px solid #007aff;
    color: #007aff;
    background-color: #fff;
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .filter-panel .filter-wrap .filter-tab .options .item.active {
      border: 0.5px solid #007aff;
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .filter-panel .filter-wrap .filter-tab .options .item.active {
      border: 0.333333px solid #007aff;
    }
  }

  .filter-panel .filter-wrap .filter-tab .organization-options .item {
    padding: 0.04rem 0.35rem;
  }

  .filter-panel .filter-wrap .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .filter-panel .filter-wrap .btns a {
    padding: 0.15rem 0;
    font-size: 0.14rem;
    flex: 1;
    text-align: center;
  }

  .filter-panel .filter-wrap .btns a.reset {
    background: #d4e9ff;
    color: #007aff;
  }

  .filter-panel .filter-wrap .btns a.sure {
    background: #007aff;
    color: #fff;
  }
  .showSecondClassification{
    height: calc(100% - 0.6rem);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .showSecondClassification ul li{
    margin: 0 auto;
    margin-bottom: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 0.6rem;
    background-color: #fff;
    border-radius:0.12rem;
  }
  .showSecondClassification ul li a{
    /*padding: 0.2rem 1.6rem;*/
    /*display: inline-flex;*/
    font-size:0.16rem;
    color:#030303;
  }
</style>
