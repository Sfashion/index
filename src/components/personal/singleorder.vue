<template>
    <div class="single_right">
        <template v-if="userid">
        <ul class="cat_nav_right">
            <li class="nav_right_top2">
                <div class="nrtleft">
                    <p>商品信息</p>
                </div>
                <div class="nrtright">
                    <p>单价</p>
                    <p>数量</p>
                    <p>小计</p>
                    <p>订单状态</p>
                    <p>操作</p>
                </div>
            </li>
            <ul class="nav_three" v-for="(item,n) in orderlist" v-bind:key="n">
                <li class="nav_three_left">
                    <router-link to="">
                        <div class="nav_three_img">
                            <img :src="item.thumb[0].url" alt="" style="width:80px;height: 80px">
                        </div>
                    </router-link>
                    <div class="nav_three_wen">
                        <h5><span>{{item.name}}</span>精油皂</h5>
                        <p>{{item.des}}</p>
                    </div>
                </li>
                <li class="nav_three_right">
                    <div class="price">{{item.price}}</div>
                    <div class="nub">
                        {{item.count}}
                    </div>
                    <div class="unit">{{item.count*item.price}}</div>
                    <div class="del" @click="delorder(item.oid,n)">删除</div>
                </li>
            </ul>
        </ul>
        </template>
        <template v-else>
            <div style="float:right;">
                <img src="../../assets/img/timsg.jpg" alt="">
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "singleorder",
        data() {
            return {
                drr:[
                    {price:'699',del:'删除'}
                ],
                number:'2',
                userid:'',
                orderlist:[]
            }
        },
        created(){
            if (localStorage.userid){
                this.userid = localStorage.userid;
                this.$http.get(`/api/index/personal/order?id=${this.userid}`).then(res=>{
                    res.body.forEach(val=>{
                        val.thumb = JSON.parse(val.thumb);
                    });
                    this.orderlist = res.body;
                });
            }else{
                this.userid = '';
            }
        },
        methods:{
            delorder(oid,n){
                this.$http.get(`/api/index/personal/delorder?id=${oid}`).then(res=>{
                    if (res.body){
                        this.orderlist.splice(n,1);
                    }else{
                        alert('删除失败!');
                    }
                });
            }
        }
    }
</script>

<style scoped lang='scss'>
    .single_right:after{
        content: '';
        display: block;
        width: 0;
        height: 0;
        clear: both;
    }
    .cat_nav_right{
        width: 640px;
        padding-bottom: 50px;
        float: right;
        .nav_right_top1{
            width:460px;
            height: 55px;
            display: flex;
            justify-content: space-around;
            div{
                width:143px;
                border: 1px solid#000;
                text-align: center;
                line-height: 25px;
                font-size: 16px;
                span{
                    color: #F5325D;
                }
                p{
                    font-size: 12px;
                }
            }
        }
        .nav_right_top1 div:hover{
            border: 1px solid#FE9F9C;
        }
        .nav_right_top2{
            width:100%;
            height: 43px;
            background: #FE9F9C;
            .nrtleft{
                width: 80px;
                height: 100%;
                float: left;
                p{
                    width:80px;
                    height: 100%;
                    float: left;
                    text-align: center;
                    line-height: 43px;
                    font-size: 12px;
                    color: #fff;
                }
            }
            .nrtright{
                width: 400px;
                height: 100%;
                float: right;
                p{
                    width:80px;
                    height: 100%;
                    float: left;
                    text-align: center;
                    line-height: 43px;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
        .nav_three{
            width:100%;
            height: 128px;
            box-sizing: border-box;
            border: 1px solid #000;
            margin: 0 auto;
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            .nav_three_left{
                width: 300px;
                height: 100%;
                .nav_three_img{
                    width:70px;
                    height: 70px;
                    float: left;
                    margin-top:22px;
                    margin-left: 10px;
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
                    cursor: pointer;
                }
            }
        }
    }
</style>