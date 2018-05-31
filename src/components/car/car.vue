<template>
    <div id="car">
        <div class="carbanner">
            <img src="../../assets/img/soap_banner.png" alt="">
        </div>
        <div class="content">
            <div class="content_box">
                <div class="content_box1">
                    <ul class="car_img">
                        <li><img src="../../assets/img/soap_car.png" alt="" style="height: 60px"></li>
                        <li>
                            <div v-for="(item,n) in arr" class="car_nav" :key="n">
                                <div class="car_navyuan"></div>
                                <span>{{item.name}}</span>
                            </div>
                        </li>
                    </ul>
                    <ul class="nav_tow">
                        <li class="nav_left">
                            <router-link :to="item.to" v-for="(item,n) in brr" v-bind:key="n">
                                <div class="left_wen">{{item.name}}</div>
                            </router-link>
                        </li>
                        <li class="nav_right">
                            <router-link :to="item.to" v-for="(item,n) in crr" :key="n">
                                <div class="right_wen">{{item.name}}</div>
                            </router-link>
                        </li>
                    </ul>
                    <template v-if="car.length>0">
                        <ul class="nav_three" v-for="(val,n) in car">
                            <li class="nav_three_left">
                                <input type="checkbox" @click="checkstatus(val)">
                                <router-link to="">
                                    <div class="nav_three_img">
                                        <img :src="val.thumb[1].url" alt="" style="width:90px;height: 90px">
                                    </div>
                                </router-link>
                                <div class="nav_three_wen">
                                    <h5><span>{{val.name}}</span>精油皂</h5>
                                    <p>{{val.des}}</p>
                                </div>
                            </li>
                            <li class="nav_three_right">
                                <div class="price">{{val.price}}</div>
                                <div class="nub">
                                    <button @click="val.count++">+</button>
                                    {{val.count}}
                                    <button @click="reduce(n)">-</button>
                                </div>
                                <div class="unit">{{val.count*val.price}}</div>
                                <router-link to="">
                                    <div class="del" @click="del(val.id,n)">删除</div>
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav_four">
                            <li class="nav_four1">
                                <div class="nav_four1left">
                                    <input type="checkbox">
                                    <h4>全选</h4>
                                    <div class="qingkong" @click="clearcar()">清空购物车</div>
                                </div>
                                <div class="nav_four1right">
                                    <div class="nav_four1righttow">
                                        邮费：免邮费
                                    </div>
                                </div>
                            </li>
                            <li class="nav_four2">
                                <div class="yfje1">应付金额</div>
                                <br>
                                <div class="yfje2">RMB</div>
                                <div class="yfje3">{{totalprice}}</div>
                                <router-link to="">
                                    <div class="jiesuan" @click="pay()">去结算</div>
                                </router-link>
                            </li>
                        </ul>
                    </template>
                    <template v-else-if="car.length===0 && userid">
                        <h3 class="message">您还没有添加购物车！</h3>
                    </template>
                    <template v-else>
                        <h3 class="message">请先登录！</h3>
                    </template>
                </div>
                <div class="like">
                    <img src="../../assets/img/soap_ban1.png" alt="" style="position: absolute">
                    <img src="../../assets/img/soap_ban2.png" alt="" style="margin-left: 35px">
                </div>
                <ul class="cont">
                    <li v-for="(val,index) in list" :key="val.id">
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
</template>

<script>
    export default {
        name: "mycar",
        data() {
            return {
                arr:[
                    {name:'购物车'},
                    {name:'确认订单'},
                    {name:'支付'},
                    {name:'完成'},
                ],
                brr:[
                    {name:'全选',to:''},
                    {name:'商品信息',to:''}
                ],
                crr:[
                    {name:'单价',to:''},
                    {name:'数量',to:''},
                    {name:'小计',to:''},
                    {name:'操作',to:''}
                ],
                drr:[
                    {price:'699',del:'删除'}
                ],
                number:'2',
                car:[],
                userid:'',
                list:[],
                flag:true,
                order:{
                    number:'',
                    userid:'',
                    shopid:'',
                    count:''
                }
            }
        },
        created(){
            this.userid = localStorage.userid;
            if (this.userid){
                this.$http.get(`/api/index/car/select?id=${this.userid}`).then(response=>{
                    response.body.forEach(val=>{
                        val.thumb = JSON.parse(val.thumb);
                    });
                    this.car=response.body;
                })
            }else{
                this.userid = '';
            }

            this.$http.get('/api/index/complete?len=0').then(response => {
                response.body.forEach(val=>{
                    val.coverimg = JSON.parse(val.coverimg);
                });
                this.list=response.body;
            });
        },
        methods:{
            reduce(n){
                if (this.car[n].count>1){
                    this.car[n].count--;
                }else{
                    this.car[n].count=1;
                }
            },
            del(id,n){
                this.$http.get(`/api/index/car/del?id=${id}`).then(response=>{
                    if (response.body){
                        this.car.splice(n,1);
                    }else{
                        alert('删除失败!');
                    }
                })
            },
            clearcar(){
                this.$http.get(`/api/index/car/clearcar?userid=${this.userid}`).then(response=>{
                    if (response.body){
                        this.car.splice(0);
                    }else{
                        alert('删除失败!');
                    }
                })
            },
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
            },
            pay(){
                let shopidarr = [];
                let countarr = [];
                this.order.number = Math.ceil(Math.random()*1000);
                this.order.userid = this.userid;
                this.car.forEach(val=>{
                    if (val.status===1){
                        shopidarr.push(val.shopid);
                        countarr.push(val.count);
                    }
                });
                this.order.shopid = shopidarr.join(',');
                this.order.count = countarr.join(',');

                if (this.order.shopid){
                    this.$http.post("/api/index/car/addorder",this.order,{
                        headers:{
                            "content-type":"application/json"
                        }
                    }).then(res=>{
                        if (res.body.sta){
                            alert('提交成功');
                            this.$router.push(`/confirm`);
                        }else{
                            alert('提交失败');
                        }
                    });
                }else{
                    alert('请选择要提交的商品');
                }
            },
            checkstatus(val){
                if (val.status===0){
                    val.status=1;
                }else{
                    val.status=0;
                }
            }
        },
        computed:{
            totalprice(){
                let total = 0;
                this.car.forEach(val=>{
                    total+=val.count*val.price;
                });
                return total;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .message{
        text-align: center;
        margin-top: 20px;
    }
     #car .carbanner{
        width: 100%;
         >img{
             width:100%;
         }
    }
     #car .content{
         width:100%;
         .content_box{
             width:854px;
             height: 100%;
             margin: 0 auto;
             position: relative;
             .content_box1{
                 width:100%;
                 height: auto;
                 background: #fff;
                 position: relative;
                 left: 0;
                 top:-40px;
                 border-top: 7px solid #F7597D;
                 box-shadow: #dbdbdb 1px 1px 20px;
                 padding-bottom: 140px;
                 .car_img{
                     width:100%;
                     height: 100px;
                     margin-top: 40px;
                     display: flex;
                     justify-content: space-between;
                     >li{
                         width:auto;
                         height: 60px;
                         margin: 0 20px;
                         margin-top: 20px;
                         .car_nav{
                             width: 80px;
                             height: 25px;
                             border-top: 5px solid #b4b4b4;
                             float: left;
                             margin-top: 30px;
                             text-align: center;
                                .car_navyuan{
                                    width: 13px;
                                    height: 13px;
                                    background: #b4b4b4;
                                    border-radius: 50%;
                                    margin: -9px 35px;
                                }
                             span{
                                 line-height: 40px;
                                 font-size: 12px;
                             }
                         }
                     }
                 }
                 .nav_tow{
                     width:96%;
                     height: 44px;
                     margin: 0 auto;
                     margin-top: 35px;
                     background: #FE9F9C;
                     display: flex;
                     justify-content: space-between;
                     .nav_left{
                          width: 300px;
                          height: 100%;
                         .left_wen{
                             width:50%;
                             height: 100%;
                             float: left;
                             line-height: 44px;
                             text-align: center;
                         }
                         a{
                             color: #fff;
                         }
                      }
                     .nav_right{
                         width: 600px;
                         height: 100%;
                         .right_wen{
                             width:25%;
                             height: 100%;
                             float: left;
                             line-height: 44px;
                             text-align: center;
                         }
                         a{
                             color: #fff;
                         }
                     }
                 }
                 .nav_three{
                     width:96%;
                     height: 128px;
                     border: 1px solid #000;
                     margin: 0 auto;
                     margin-top: 25px;
                     display: flex;
                     justify-content: space-between;
                     .nav_three_left{
                         width: 300px;
                         height: 100%;
                         input[type="checkbox"]{
                             width: 20px;
                             height: 20px;
                             margin:0 20px;
                             margin-top: 50px;
                             float: left;
                             outline: none;
                         }
                         .nav_three_img{
                             width:80px;
                             height: 80px;
                             float: left;
                             margin-top:19px;
                         }
                         .nav_three_wen{
                             width:105px;
                             height: 100%;
                             float: left;
                             font-size: 16px;
                             margin-left: 20px;
                             h5{
                                 width:100%;
                                 height: 20px;
                                 margin-top: 40px;
                                 span{
                                     font-size: 18px;
                                     color: #f88089;
                                 }
                             }
                            p{
                                font-size: 12px;
                                color: #878787;
                                margin-top: 5px;
                            }
                         }
                     }
                     .nav_three_right{
                         width: 600px;
                         height: 100%;
                        .price{
                            width:25%;
                            height: 100%;
                            line-height: 128px;
                            text-align: center;
                            float: left;
                        }
                         .nub{
                             width:25%;
                             height: 100%;
                             float: left;
                             line-height: 128px;
                             text-align: center;
                             button{
                                 width:20px;
                                 height: 20px;
                                 border-radius: 50px;
                                 border: 1px solid #6e6e6e;
                                 outline: none;
                             }
                         }
                         .unit{
                             width:25%;
                             height: 100%;
                             float: left;
                             line-height: 128px;
                             text-align: center;
                         }
                         .del{
                             width:18%;
                             height: 30px;
                             float: left;
                             line-height: 30px;
                             text-align: center;
                             background: #000;
                             color: #fff;
                             margin-top: 50px;
                             margin-left: 20px;
                         }
                     }
                 }
                 .nav_four{
                     width:96%;
                     margin: 0 auto;
                     margin-top: 60px;
                     .nav_four1{
                         width:100%;
                         display: flex;
                         justify-content: space-between;
                         .nav_four1left{
                             width:600px;
                             height: 50px;
                             input[type="checkbox"]{
                                 width:20px;
                                 height: 20px;
                                 margin: 15px 0 0 20px;
                                 float: left;
                             }
                             h4{
                                 float: left;
                                 line-height: 50px;
                                 margin-left: 5px;
                             }
                             .shanchu{
                                 width: 80px;
                                 height: 24px;
                                 background: #000;
                                 color: #fff;
                                 margin-top: 14px;
                                 margin-left: 30px;
                                 float: left;
                                 font-size: 12px;
                                 line-height: 24px;
                                 text-align: center;
                             }
                             .qingkong{
                                 width: 80px;
                                 height: 24px;
                                 background: #fff;
                                 border: 1px solid #000;
                                 color: #000;
                                 margin-top: 14px;
                                 margin-left: 30px;
                                 float: left;
                                 font-size: 12px;
                                 line-height: 24px;
                                 text-align: center;
                                 cursor: pointer;
                                 transition: all 0.2s;
                             }
                             .qingkong:hover{
                                 color: #fff7f7;
                                 background: #000;
                             }
                         }
                         .nav_four1right{
                             height: 50px;
                             font-size: 12px;
                         }
                     }
                     .nav_four2{
                         width: 150px;
                         float: right;
                         height: 50px;
                         position: relative;
                         .yfje1{
                             width: 60px;
                             font-size: 12px;
                             /*float: left;*/
                         }
                         .yfje2{
                             width: 60px;
                             font-size: 22px;
                             color: #F5325D;
                             position: absolute;
                             top:20px
                             /*float: left;*/
                         }
                         .yfje3{
                             width: 60px;
                             line-height: 50px;
                             position: absolute;
                             right: 22px;
                             top: 0;
                             font-size: 35px;
                             color: #F5325D;
                         }
                         .jiesuan{
                             width:100px;
                             height: 35px;
                             background: #F5325D;
                             float: right;
                             margin-top: 35px;
                             line-height: 35px;
                             text-align: center;
                             color: #fff;
                             margin-right: 20px;
                         }
                     }
                 }
             }
            .like{
                width: 100%;
                height: 60px;
                display: flex;
                justify-content: space-between;
                margin-top: 50px;
            }
             .like_list{
                 width:100%;
                 margin-top: 80px;
                 display: flex;
                 justify-content: space-between;
                 .xl_list{
                     width: 263px;
                     height: 279px;
                     /*margin-right: 32px;*/
                     margin-bottom: 65px;
                     position: relative;
                     /*background: red;*/
                     .xl_kuang{
                         width: 100%;
                         height: 280px;
                         border:2px solid #000;
                         box-sizing: border-box;
                         margin-top: 30px;
                         margin-left: 11px;
                         transition: all 0.1s;
                         .xl{
                             float: left;
                             font-size: 18px;
                             color: #303030;
                             margin-top: 200px;
                             margin-left: 10px;
                         }
                         .xl span{
                             font-size: 22px;
                             color: #F5325D;
                         }
                         .the{
                             font-size: 10px;
                             color: #414141;
                             margin-top: 8px;
                         }
                         .jia{
                             float: left;
                             font-size:40px;
                             color: #F5325D;
                             margin-top: 210px;
                             margin-left: 50px;
                         }
                     }
                 }
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
                 margin-top: 50px;
             }
         }
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
</style>