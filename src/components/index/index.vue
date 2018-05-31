<template>
<div>
    <div class="banner">
        <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="(item,n) in banner" :key="n">
                <div class="ban">
                    <div class="banner_left">
                        <div class="xian1"></div>
                        <div class="xian2"></div>
                    </div>
                    <div class="banner_zh">
                        <img :src="item.img[0].url" alt="">
                    </div>
                    <div class="banner_right">
                        <div class="kuang">
                            <div class="zuo_ku"></div>
                            <input type="text" class="ss" placeholder="搜索新品吧">
                            <router-link to="" class="sousuo"></router-link>
                        </div>
                        <div class="ban_xia">
                            <div v-html="item.ename"></div>
                            <div class="changxian"></div>
                            <div class="duanxian"></div>
                            <p class="nanfa">{{item.des}}</p>
                            <router-link to="/list" class="more">MORE</router-link>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>

    </div>
    <div class="man">
        <img src="../../assets/img/man.jpg" alt="">
    </div>
    <div class="xinpin">
        <div class="xinpin_tu1">
            <img src="../../assets/img/tu1.jpg" alt="">
        </div>
        <div class="xinpin_xia">
            <img src="../../assets/img/tuijian.png" alt="" style="width: 100%">
        </div>
    </div>
    <div class="rexiao">
        <div class="rexiao_tu">
            <img src="../../assets/img/rexiao.jpg" alt="">
        </div>
        <div class="rexiao_xia">
            <div class="rx_tu">
                <img src="../../assets/img/guo5.png" alt="">
            </div>
            <div class="rx_right">
                <p class="pae">PAEONIA <span>LACTIFLOAR</span></p>
                <p class="ess">E S S E N A I T L   O L I  S O A P</p>
                <div class="rx_xian"></div>
                <p class="jingyou"><span>苟药</span>精油皂</p>
                <p class="zhanxian">展现如芍药般美丽迷人的风采</p>
                <p class="yongyou">拥有160年历史的南法芍药庄园主人
                    的建议之下，以草本牡丹的根部萃取出芍药芳香与精萃，
                    推出以芍药为主调的身体保养系列，拥有160年历史。
                </p>
                <p class="all">All the resources of
                    this station are for study and reference only,do not use it is all the consequences will
                    be product .the speed downloader.
                </p>
                <div class="price">
                    <div class="rmb">RMB</div>
                    <div class="qian">699</div>
                </div>
                <router-link to="/list" class="more1">MORE</router-link>
            </div>
        </div>
        <div class="rexiao_xia">
            <div class="rx_right1">
                <p class="pae">PAEONIA <span>LACTIFLOAR</span></p>
                <p class="ess">E S S E N A I T L   O L I  S O A P</p>
                <div class="rx_xian"></div>
                <p class="jingyou"><span>乳木果</span>精油皂</p>
                <p class="zhanxian">展现如芍药般美丽迷人的风采</p>
                <p class="yongyou">拥有160年历史的南法芍药庄园主人
                    的建议之下，以草本牡丹的根部萃取出芍药芳香与精萃，
                    推出以芍药为主调的身体保养系列，拥有160年历史。
                </p>
                <p class="all">All the resources of
                    this station are for study and reference only,do not use it is all the consequences will
                    be product .the speed downloader.
                </p>
                <div class="price">
                    <div class="rmb">RMB</div>
                    <div class="qian">699</div>
                </div>
                <router-link to="/list" class="more2">MORE</router-link>
            </div>
            <div class="rx_tu1">
                <img src="../../assets/img/guo6.jpg" alt="">
            </div>
        </div>
    </div>
    <div class="dingzhi">
        <img src="../../assets/img/ding.png" alt="">
    </div>
    <div class="xilie">
        <div class="xl_tu">
            <img src="../../assets/img/xilie.jpg" alt="">
        </div>
        <ul class="xl_xia">
            <li class="xl_list" v-for="val in data" :key="val.id">
                <div class="xl_kuang">
                    <p class="xl"><span>{{val.name}}</span>系列</p>
                    <p class="the">{{val.ename}}</p>
                </div>
                    <router-link :to="'/listofid?id='+val.id" class="xl_tu1">
                        <img :src="val.coverimg[0].url" alt="">
                    </router-link>
                <div class="xl_xian1"></div>
                <div class="xl_xian2"></div>
            </li>
        </ul>
        <router-link to="" class="more3">MORE</router-link>
    </div>
</div>

</template>

<script>

    export default {
        name: "myindex",
        data() {
            return {
                data:[],
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true,
                    },
                    // loop:true,
                    autoplay:true
                },
                banner:[]
            }
        },
        created() {
            this.$http.get('/api/index/index').then(response => {
                response.body.forEach(val=>{
                    val.coverimg = JSON.parse(val.coverimg);
                });
                this.data=response.body;
            });

            this.$http.get('/api/index/index/banner').then(response => {
                response.body.forEach(val=>{
                    val.img = JSON.parse(val.img);
                });
                this.banner=response.body;
            });
        },
    }
</script>

<style lang='scss'>

    .swiper-container-horizontal>.swiper-pagination-bullets {
        width: 110px;
        height: auto;
        position: absolute;
        left: 50%;
        margin-left: 220px;
        .swiper-pagination-bullet {
            width: 16px;
            height: 16px;
            background: #fff;
            border:1px solid #ccc;
            border-radius: 50%;
            margin-right: 13px;
            margin-top: 6px;
            opacity: 1;
            transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
            border:1px solid #000;
            transform: scale(1.3);
        }
    }
    .banner {
        width: 100%;
        height: 499px;
        position: relative;
        overflow: hidden;
    }
    .ban{
        width: 100%;
        height: 499px;
        position: relative;
        top:0;
        left: 0;
    }
    .banner{
        >div.active{
            z-index: 99;
        }
    }
    .banner_left {
        /*width: 315px;*/
        height: 100%;
        position: relative;
        float: left;
    }
    .xian1 {
        width: 315px;
        height: 4px;
        background: #FE9F9C;
        margin-top: 446px;
    }
    .xian2 {
        width: 411px;
        height: 43px;
        background: rgba(254, 135, 131, 0.8);
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 100;
    }
    .banner_zh {
        width: 356px;
        height: 100%;
        position: absolute;
        left: 315px;
        top: 0;
        z-index: 10;
    }
    .banner_zh img {
        display: block;
        width: 100%;
    }
    .banner_right {
        width: 650px;
        height: 100%;
        float: right;
    }
    .kuang {
        width: 215px;
        height: 36px;
        margin-left: 186px;
        margin-top: 88px;
    }
    .sousuo{
        width: 19px;
        height: 19px;
        background: url("../../assets/img/sousuo.jpg") 100%;
        position: absolute;
        right: 260px;
        top: 98px;
    }
    .zuo_ku {
        width: 14px;
        height: 4px;
        float: left;
        background: #000;
        margin-top: 16px;
    }
    .ss {
        width: 187px;
        height: 100%;
        float: right;
        outline: none;
        border: 1px solid #000;
        color: #C2C2C2;
        font-size: 12px;
        padding-left: 12px;
        line-height: 36px;
    }
    .ban_xia {
        width: 100%;
        height: 230px;
        margin-top: 69px;
        overflow: hidden;
        position: relative;
    }
    .south {
        font-size: 25px;
        color: #000;
        margin-top: 5px;
    }
    .south span {
        color: #FE8783;
    }
    .early {
        font-size: 25px;
        color: #000;
        margin-top: 5px;
    }
    .changxian {
        width: 285px;
        height: 1px;
        background: #ADADAD;
        margin-top: 20px;
    }
    .duanxian {
        width: 22px;
        height: 5px;
        position: absolute;
        left: 0;
        top: 94px;
        background: #000;
    }
    .nanfa {
        font-size: 13px;
        color: #191919;
        margin-top: 30px;
    }
    .more {
        display: block;
        width: 130px;
        height: 33px;
        margin-top: 50px;
        background: #F5325D;
        text-align: center;
        line-height: 33px;
        color: #fff;
        font-size: 15px;
    }
    .man{
        width: 100%;
        height: 285px;
    }
    .man img{
        display: block;
        width: 100%;
    }
    .xinpin{
        width: 100%;
        height: 607px;
        margin-top: 68px;
    }
    .xinpin_tu1{
        width: 366px;
        height: 126px;
        background: red;
        margin: 0 auto;
    }
    .xinpin_tu1 img{
        display: block;
        width: 100%;
    }
    .xinpin_xia{
        width: 100%;
        height: 427px;
        margin-top: 55px;
        overflow: hidden;
    }
    .xinpin_tu2{
        width: 540px;
        height: 180px;
        margin-top: 67px;
        float: left;
    }
    .xinpin_tu2 img{
        display: block;
        width: 100%;
    }
    .xinpin_tu3{
        width: 246px;
        height: 100%;
        float: left;
    }
    .xinpin_tu3 img{
        display: block;
        width: 100%;
    }
    .xinpin_right{
        width: 563px;
        height: 100%;
        float: right;
    }
    .xinpin_tu4{
        width: 100%;
        height: 218px;
    }
    .xinpin_tu4 img{
        display: block;
        width: 100%;
    }
    .jia{
        width: 145px;
        height: 145px;
    }
    .jia img{
        display: block;
        width: 100%;
    }
    .rexiao{
        width: 100%;
        height: auto;
        margin-top: 160px;
    }
    .rexiao_tu{
        width: 417px;
        height: 105px;
        margin: 0 auto;
    }
    .rexiao_tu img{
        display: block;
        width: 100%;
    }
    .rexiao_xia{
        width: 854px;
        height: 398px;
        margin: 0 auto;
        margin-top: 66px;
    }
    .rx_tu{
        width: 398px;
        height: 398px;
        float: left;
    }
    .rx_tu img{
        display: block;
        width: 100%;
    }
    .rx_right{
        width: 430px;
        height: 100%;
        float: right;
        overflow: hidden;
    }
    .pae{
        font-size: 15px;
        margin-top: 14px;
        color: #303030;
    }
    .pae span{
        color: #F5325D;
    }
    .ess{
        font-size: 5px;
        color: #A8A8A8;
    }
    .rx_xian{
        width: 15px;
        height: 4px;
        margin-top: 35px;
        background: #000;
    }
    .jingyou{
        font-size: 22px;
        color: #353535;
        margin-top: 17px;
    }
    .jingyou span{
        color: #F6436A;
    }
    .zhanxian {
        font-size: 13px;
        margin-top: 11px;
        color: #919191;
    }
    .yongyou{
        font-size: 10px;
        margin-top: 30px;
        color: #919191;
    }
    .all{
        width: 410px;
        font-size: 10px;
        margin-top: 20px;
        color: #919191;
    }
    .price{
        width: 90px;
        height: 45px;
        margin-top: 25px;
    }
    .rmb{
        color: #F86F8E;
        line-height: 50px;
        font-size: 13px;
        float: left;
    }
    .qian{
        float: right;
        color: #F5325D;
        font-size: 28px;
    }
    .more1 {
        display: block;
        width: 130px;
        height: 33px;
        margin-top: 10px;
        background: #000;
        text-align: center;
        line-height: 33px;
        color: #fff;
        font-size: 13px;
    }

    .rx_tu1{
        width: 398px;
        height: 398px;
        float: right;
    }
    .rx_tu1 img{
        display: block;
        width: 100%;
    }
    .rx_right1{
        width: 430px;
        height: 100%;
        float: left;
        overflow: hidden;
    }
    .more2 {
        display: block;
        width: 130px;
        height: 33px;
        margin-top: 10px;
        background: #F5325D;
        text-align: center;
        line-height: 33px;
        color: #fff;
        font-size: 13px;
    }

    .dingzhi{
        width: 100%;
        height: 640px;
        margin-top: 169px;
    }
    .dingzhi img{
        display: block;
        width: 100%;
    }

    .xilie{
        width: 100%;
        height: auto;
        margin-top: 169px;
    }
    .xl_tu{
        width: 541px;
        height: 101px;
        margin:0 auto;
    }
    .xl_tu img{
        display: block;
        width: 100%;
    }
    .xl_xia{
        width: 854px;
        height: 720px;
        margin: 0 auto;
        margin-top: 78px;
    }
    .xl_list{
        width: 263px;
        height: 279px;
        float: left;
        margin-right: 32px;
        margin-bottom: 65px;
        position: relative;
    }
    .xl_list:nth-child(3){
        margin-right: 0;
    }
    .xl_list:last-child{
        margin-right: 0;
    }
    .xl_kuang{
        width: 240px;
        height: 248px;
        border:4px solid #000;
        box-sizing: border-box;
        margin-top: 30px;
        margin-left: 11px;
        transition: all 0.4s;
    }
    .xl_tu1{
        width: 214px;
        height: 189px;
        position: absolute;
        left: 25px;
        top: 0;
    }
    .xl_xian1{
        width: 25px;
        height: 4px;
        background: #000;
        position: absolute;
        left: 0;
        top: 68px;
    }
    .xl_xian2{
        width: 58px;
        height: 3px;
        background: #000;
        position: absolute;
        right: 0;
        bottom: 50px;
    }
    .xl{
        font-size: 18px;
        color: #303030;
        margin-top: 170px;
        margin-left: 10px;
    }
    .xl span{
        font-size: 22px;
        color: #F5325D;
    }
    .the{
        font-size: 10px;
        color: #414141;
        margin-left: 10px;
        margin-top: 8px;
    }
    .xl_list:hover .xl_kuang{
        border:4px solid #F5325D;
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
        margin-bottom: 150px;
    }
























</style>