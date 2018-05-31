<template>
<div>
    <div class="banner">
        <img src="../../assets/img/soap_banner.png" alt="">
    </div>
    <div class="content">
        <div class="content_box">
            <div class="content_box1">
                <div class="dingwei"></div>
                <ul class="car_img">
                    <li><img src="../../assets/img/wc.jpg" alt=""></li>
                    <li>
                        <div v-for="item in arr" class="car_nav" >
                            <div class="car_navyuan"></div>
                            <span class="gou">{{item.name}}</span>
                        </div>
                    </li>
                </ul>
                <div class="zf_box">
                    <p class="zhifu">支付成功</p>
                    <p class="pay">Payment success</p>
                </div>
                <div class="zf_xia">
                    <img src="../../assets/img/ym.jpg" alt="" class="zf_img">
                    <div class="zf_right">
                        <p class="ninde">您的订单已完成</p>
                        <p class="ddh">您的订单号：{{order.number}}</p>
                        <p class="jine">支付金额：<span>{{total}}</span>元</p>
                        <p class="wuliu">物流配送：顺丰速递</p>
                        <p class="dengdai">请您耐心等待，我会很快飞到您的怀里哦～  </p>
                    </div>
                </div>
                <div class="fanhui">
                    <router-link to="/index" class="more11">返回首页</router-link>
                    <router-link to="" class="more22">查看订单</router-link>
                </div>
            </div>
            <div class="like">
                <div class="xihuan">
                    <img src="../../assets/img/xh.jpg" alt="" class="wc1">
                    <img src="../../assets/img/wc2.jpg" alt="" class="wc2">
                </div>
                <ul class="cont">
                    <li v-for="(val,index) in data" :key="val.id">
                        <a href="">
                            <div class="con">
                                <h3>
                                    <span>{{val.name}}</span>系列
                                </h3>
                                <p>{{val.ename}}</p>
                            </div>
                            <div class="tu">
                                <img :src="val.coverimg[0].url" alt="">
                                <div>
                                    <p>MORE</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <p class="more3" @click="select()">换一批</p>
                </ul>

            </div>
        </div>
    </div>

</div>

</template>

<script>
    export default {
        name: "complete",
        data() {
            return {
                arr:[
                    {name:'购物车'},
                    {name:'确认订单'},
                    {name:'支付'},
                    {name:'完成'},
                ],
                data:[],
                flag:true,
                order:[],
                total:''
            }
        },
        created() {
            this.$http.get('/api/index/complete?len=0').then(response => {
                response.body.forEach(val=>{
                    val.coverimg = JSON.parse(val.coverimg);
                });
                this.data=response.body;
            });

            let id = this.$route.query.orderid;
            this.total = this.$route.query.totalprice;
            this.$http.get(`/api/index/complete/order?id=${id}`).then(response => {
                this.order=response.body[0];
            });
        },
        methods:{
            select(){
                if (this.flag){
                    this.$http.get('/api/index/complete?len=3').then(response => {
                        response.body.forEach(val=>{
                            val.coverimg = JSON.parse(val.coverimg);
                        });
                        this.data=response.body;
                        this.flag=false;
                    });
                }else{
                    this.$http.get('/api/index/complete?len=0').then(response => {
                        response.body.forEach(val=>{
                            val.coverimg = JSON.parse(val.coverimg);
                        });
                        this.data=response.body;
                        this.flag=true;
                    });
                }
            }
        }
    }
</script>

<style scoped lang='scss'>

    .banner{
        width: 100%;
        height: 262px;
    }
    .banner img{
        width: 100%;
    }
    .content{
        width:100%;
        height:auto;
    }
    .content_box {
        width: 854px;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }
    .content_box1 {
        width: 100%;
        height: 582px;
        background: #fff;
        position: relative;
        left: 0;
        top: -40px;
        border-top: 7px solid #F7597D;
        box-sizing: border-box;
        box-shadow: #dbdbdb 1px 1px 20px;
    }
    .car_img {
        width: 100%;
        height: 100px;
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
    }
    .car_img li {
        width: auto;
        height: 66px;
        margin: 0 20px;
        margin-top: 20px;
    }
    .car_img li img{
        width:100%;
        display: block;
    }
    .car_nav {
        width: 80px;
        height: 25px;
        border-top: 5px solid #F5325D;
        float: left;
        margin-top: 30px;
        text-align: center;
    }
    .car_navyuan{
        width: 13px;
        height: 13px;
        background: #F5325D;
        border-radius: 50%;
        margin: -9px 35px;
    }
    .gou{
        line-height: 40px;
        font-size: 12px;
        color: #F5325D;
    }
    .zf_box{
        width: 812px;
        height: 43px;
        background: #FE9F9C;
        margin: 0 auto;
        margin-top: 50px;
    }
    .zhifu{
        font-size: 15px;
        color: #fff;
        margin-left: 28px;
        line-height: 40px;
        float: left;
    }
    .pay{
        font-size: 10px;
        float: left;
        margin-left: 20px;
        color: #fff;
        line-height: 40px;
    }
    .zf_xia{
        width: 490px;
        height: 170px;
        margin: 0 auto;
        margin-top: 68px;
    }
    .zf_img{
        width: 190px;
        height: 170px;
        float: left;
    }
    .zf_right{
        width: 245px;
        height: 170px;
        float: right;
    }
    .ninde{
        font-size: 16px;
        color: #202020;
    }
    .ddh{
        font-size: 12px;
        color: #1A1A1A;
        margin-top: 30px;
    }
    .jine{
        font-size: 12px;
        color: #1A1A1A;
        margin-top: 10px;
    }
    .jine span{
        color: #F6476D;
    }
    .wuliu{
        font-size: 12px;
        color: #1A1A1A;
        margin-top: 10px;
    }
    .dengdai{
        font-size: 12px;
        color: #1A1A1A;
        margin-top: 10px;
    }
    .fanhui{
        width: 315px;
        height: 33px;
        margin: 0 auto;
        margin-top: 35px;
    }
    .more11 {
        display: block;
        width: 130px;
        height: 33px;
        background: #F5325D;
        text-align: center;
        line-height: 33px;
        color: #fff;
        font-size: 13px;
        float: left;
    }
    .more22{
        display: block;
        width: 130px;
        height: 33px;
        background: #000;
        text-align: center;
        line-height: 33px;
        color: #fff;
        font-size: 13px;
        float: right;
    }
    .like{
        width: 100%;
        height: 640px;
        background: #fff;
        margin-top: 70px;
    }
    .xihuan{
        width: 860px;
        height: 72px;
    }
    .wc1{
        float: left;
        height: 72px;
        margin-right: 30px;
    }
    .wc2{
        width: 720px;
        margin-top: 5px;
    }

    .cont {
        width: 100%;
        height: auto;
        margin-top: 59px;
        padding: 0 13px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .cont li {
        width: 241px;
        height: 279px;
        margin-top: 50px;
        position: relative;
    }

    .cont li a {
        display: block;
        overflow: hidden;
    }
    .con {
        width: 100%;
        height: 250px;
        margin-top: 29px;
        border: 1px solid #5A5A5A;
        padding: 0 14px;
        box-sizing: border-box;
        transition: all 0.4s;
    }
    .con h3 {
        width: 100%;
        height: 17px;
        padding-top: 179px;
        margin: 7px 0;
        color: #000;
        font-size: 14px;
        line-height: 17px;
    }
    .con h3 span {
        color: #F63E66;
        font-size: 17px;
    }
    .con p{
        color: #383838;
        font-size: 11px;
    }
    .tu {
        width: 213px;
        height: 189px;
        position: absolute;
        top: 0;
        left: 14px;
        overflow: hidden;
    }
    .tu img{
        display: block;
        width: 100%;
    }
    .tu div {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        position: absolute;
        left: 0;
        top: 0;
        transition: background-color 1s;
    }
    .tu div p{
        width: 92px;
        height: 92px;
        border: 1px solid rgba(0,0,0,0);
        border-radius: 50%;
        text-align: center;
        line-height: 92px;
        position: absolute;
        left: 50%;
        margin-left:-25%;
        top: 50%;
        margin-top: -25%;
        font-size: 16px;
        color: rgba(0,0,0,0);
        font-weight: 500;
        transition: all 0.3s;
    }
     a:hover .tu div{
        background: rgba(238,163,151,.8);
    }
     a:hover .tu div p{
        border-color: #fff;
        color: #fff;
    }
    a:hover .con{
        border-color: #F9839E;
    }
    .more3 {
        display: block;
        width: 130px;
        height: 33px;
        background: #F5325D;
        text-align: center;
        line-height: 33px;
        color: #fff;
        font-size: 13px;
        margin: 0 auto;
        margin-top: 70px;
        cursor: pointer;
        user-select: none;
    }

.dingwei{
    width: 450px;
    height: 7px;
    background: #FE9F9C;
    position: absolute;
    top: -7px;
    right: 0;
}



</style>