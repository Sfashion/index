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
                    <li><img src="../../assets/img/qr1.jpg" alt=""></li>
                    <li>
                        <div v-for="item in arr" class="car_nav" >
                            <div class="car_navyuan"></div>
                            <span class="gou">{{item.name}}</span>
                        </div>
                    </li>
                </ul>
                <template v-if="userid && orderid">
                    <div class="orderbox">
                        <div class="zf_box">
                            <p class="zhifu">选择收货地址</p>
                            <p class="pay">Select the receiving address</p>
                        </div>
                        <div class="dizhi">
                            <div class="dizhi_list" v-for="(item,n) in address" :key="n">
                                <div class="dd_nk">
                                    <div class="dd_xm"><span>&nbsp;&nbsp;{{item.nickname}}</span>&nbsp;&nbsp;{{item.username.toUpperCase()}}</div>
                                    <p class="shanxi">{{item.pro}} {{item.city}} {{item.town}}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.post}}</p>
                                    <p class="xuefu">{{item.detail}}</p>
                                    <p class="shuzi">{{item.tel}}</p>
                                    <div class="dd_xia">
                                        <p class="moren" @click="del(item.id,n)">删除地址</p>
                                        <div class="dd_xia_right"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="dizhi_list">
                                <p class="jia" @click="addhidden=true">+</p>
                                <p class="xinzeng">新增收货地址</p>
                            </div>
                        </div>
                        <div class="zf_box">
                            <p class="zhifu">确认商品信息</p>
                            <p class="pay">Confirmation of commodity information</p>
                        </div>
                        <div class="sp">
                            <div class="sp_1">商品信息</div>
                            <div class="sp_2">单价</div>
                            <div class="sp_3">数量</div>
                            <div class="sp_4">小计</div>
                        </div>
                        <div class="sp2" v-for="(item,n) in order">
                            <div class="sp_1">
                                <div class="sp2_tu">
                                    <img :src="item.thumb[0].url" alt="">
                                </div>
                                <p class="huimu"><span>{{item.name}}</span>精油皂</p>
                                <p class="tianran">{{item.des}}</p>
                            </div>
                            <div class="sp_2">￥{{item.price}}</div>
                            <div class="sp_3">{{item.count}}</div>
                            <div class="sp_4_4">￥{{item.price*item.count}}</div>
                        </div>

                        <div class="xinxi_xia">
                            <div class="xinxi_left">已选商品<span>{{order.length}}</span>件  &nbsp;邮费：免邮费</div>
                            <ul class="xinxi_right">
                                <li class="nav_four2">
                                    <div class="yfje1">应付金额</div>
                                    <br>
                                    <div class="yfje2">RMB</div>
                                    <div class="yfje3">{{totalprice}}</div>
                                    <template v-if="flag===0">
                                        <div class="jiesuan" @click="pay()">去支付</div>
                                    </template>
                                    <template v-else-if="flag===1"><p class="complete">已支付，待发货</p></template>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
                <template v-else-if="userid && !orderid">
                    <h3 class="loginmess">您没有未完成订单，先去购买吧！</h3>
                </template>
                <template v-else>
                    <h3 class="loginmess">对不起您还没有登陆，请先登录！</h3>
                </template>
            </div>
        </div>
    </div>
    <div class="addhidden" v-show="addhidden">
        <div class="box">
            <h3>为了提高配送时效，请您准确填写信息</h3>
            <p>
                收货人
                <input type="text" class="per" v-model="postadd.name">
            </p>
            <p>
                所在地区
                <select name=""  v-model="postadd.pro">
                    <option value="" disabled>请选择省</option>
                    <option v-for="(item,n) in pro" :key="n">{{item}}</option>
                </select>
                <select name=""  v-model="postadd.city">
                    <option value="" disabled>请选择市</option>
                    <option v-for="(item,n) in city" :key="n">{{item}}</option>
                </select>
                <select name=""  v-model="postadd.town">
                    <option value="" disabled>请选择区</option>
                    <option v-for="(item,n) in town" :key="n">{{item}}</option>
                </select>
            </p>
            <p>
                详细地址
                <input type="text"  v-model="postadd.detail">
            </p>
            <p>
                邮政编码
                <input type="text"  v-model="postadd.post">
            </p>
            <p>
                手机号码
                <input type="text"  v-model="postadd.tel">
            </p>
            <button class="b1" @click="postaddress()">保存</button>
            <button class="b2" @click="addhidden=false">取消</button>
            <div class="head"></div>
            <div class="exit" @click="addhidden=false"></div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "confirm",
        data() {
            return {
                arr:[
                    {name:'购物车'},
                    {name:'确认订单'},
                    {name:'支付'},
                    {name:'完成'},
                ],
                address:[],
                order:[],
                userid:'',
                flag:0,
                orderid:'',
                totalp:'',
                addhidden:false,
                pro:["山西省","山东省","河南省","河北省","北京","天津","江苏","上海"],
                city:["太原市","吕梁市","长治市","晋城市","运城市","阳泉市","晋中市","朔州市","忻州市"],
                town:["小店区","尖草坪","晋源区","娄烦县","古交"],
                postadd:{
                    name:'',
                    userid:'',
                    pro:'',
                    city:'',
                    town:'',
                    detail:'',
                    post:'',
                    tel:''
                }
            }
        },
        created(){
            if (localStorage.userid){
                //查询地址
                let userid = localStorage.userid;
                this.userid = localStorage.userid;
                this.$http.get(`/api/index/order/address?userid=${userid}`).then(res=>{
                    this.address = res.body;
                });

                //查询订单
                this.$http.get(`/api/index/order?userid=${userid}`).then(res=>{
                    let orderarr = [];
                    res.body.forEach(val=>{
                        val.thumb = JSON.parse(val.thumb);
                        if(val.status===0){
                            orderarr.push(val);
                        }
                    });
                    this.order=orderarr;
                    if(this.order.length>0){
                        this.orderid = this.order[0].id;
                    }
                });
            }else{
                return;
            }
        },
        methods:{
            del(id,index){
                this.$http.get(`/api/index/order/del?id=${id}`).then(res=>{
                    if (res.body){
                        this.address.splice(index,1);
                        alert("删除成功")
                    }else{
                        alert("删除失败")
                    }
                });
            },
            pay(){
                if (this.address.length===0){
                    alert('请先添加地址！');
                    return;
                }
                this.$http.get(`/api/index/order/upt?id=${this.order[0].id}`).then(res=>{
                    if (res.body){
                        this.order[0].status = 1;
                        this.flag = this.order[0].status;
                        this.$router.push(`/complete?orderid=${this.orderid}&totalprice=${this.totalp}`);
                    }else{
                        this.order[0].status = 0;
                        this.flag = this.order[0].status;
                    }
                });
            },
            postaddress(){
                this.postadd.userid = localStorage.userid;
                this.$http.post('/api/index/order/local',this.postadd,{
                    headers:{
                        "content-type":"application/json"
                    }
                }).then(response => {
                    if (response.body){
                        alert('添加成功！');
                        location.reload();
                    }else{
                        alert('添加失败');
                    }
                });
            }
        },
        computed:{
            totalprice(){
                this.totalp = 0;
                this.order.forEach(val=>{
                    this.totalp+=val.count*val.price;
                });
                return this.totalp;
            }
        }
    }
</script>

<style scoped lang='scss'>
    html,body{
        width: 100%;
        height: 100%;
    }
    .loginmess{
        text-align: center;
        padding-bottom: 20px;
    }
    .addhidden{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.8);
        >.box{
            background: #fff;
            width: 612px;
            height: 440px;
            border: 1px solid #000;
            padding-top: 54px;
            padding-left: 120px;
            padding-right: 121px;
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            margin-left: -306px;
            top: 50%;
            margin-top: -180px;
            > h3{
                font-size: 12px;
                padding-bottom: 5px;
                border-bottom: 1px solid #ccc;
            }
            > p{
                font-size: 12px;
                font-weight: 600;
                color: #000;
                margin-top: 21px;
                > input{
                    outline: none;
                    width: 142px;
                    height: 20px;
                    border: 1px solid #000;
                    font-size: 8px;
                    margin-left: 18px;
                    padding-left: 5px;
                    box-sizing: border-box;

                }
                > input.per{
                    margin-left: 29px;
                }
                > select{
                    width: 85px;
                    height: 20px;
                    border: 1px solid #000;
                    margin-left: 14px;
                    padding-left: 5px;
                    box-sizing: border-box;
                    outline: none;
                }
                > select:first-of-type{
                    margin-left: 18px;
                }

            }
            > p:first-of-type{
                margin-top: 36px;
            }
            > p:last-of-type{
                margin-bottom: 47px;
            }
            > button{
                width: 115px;
                height: 33px;
                font-weight: 500;
                font-size: 14px;
                margin-left: 53px;
                text-align: center;
            }
            > .b1{
                border: 0;
                color: #fff;
                background: #F5325D;
                outline: none;
                cursor: pointer;
            }
            > .b2{
                border: 1px solid #000;
                background: #fff;
                margin-left: 17px;
                outline: none;
                cursor: pointer;
            }
            > .head{
                width: 612px;
                height: 111px;
                position: absolute;
                left: -1px;
                top: -111px;
                background: url("../../assets/img/addbg.gif");
            }
            > .exit{
                width: 56px;
                height: 54px;
                background: url("../../assets/img/exits.gif");
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
            }
        }
    }
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
        height: 100%;
        background: #fff;
        position: relative;
        left: 0;
        top: -40px;
        border-top: 7px solid #F7597D;
        box-sizing: border-box;
        box-shadow: #dbdbdb 1px 1px 20px;
        margin-bottom: 120px;
    }
    .dingwei{
        width: 450px;
        height: 7px;
        background: #FE9F9C;
        position: absolute;
        top: -7px;
        right: 0;
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
        border-top: 5px solid #7B7B7B;
        float: left;
        margin-top: 30px;
        text-align: center;
    }
    .car_navyuan{
        width: 13px;
        height: 13px;
        background: #7B7B7B;
        border-radius: 50%;
        margin: -9px 35px;
    }
    .gou{
        line-height: 40px;
        font-size: 12px;
        color: #7B7B7B;
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
    .dizhi{
        width: 812px;
        height: auto;
        margin: 0 auto;
        margin-top: 25px;
        display: flex;
        flex-wrap: wrap;
    }
    .dizhi_list{
        width: 257px;
        height: 192px;
        border: 1px solid #FBFBFB;
        box-sizing: border-box;
        box-shadow: #dbdbdb 1px 1px 20px;
        margin: 15px 13px 0 0;
    }
    .dd_nk{
        width: 215px;
        height: 100%;
        margin: 0 auto;
    }
    .dd_xm{
        width: 205px;
        height: 40px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        font-size: 12px;
        color: #646464;
        line-height: 40px;
        margin-left: 10px;
    }
    .dd_xm span{
        font-size: 8px;
        color: #F7587C;
        line-height: 40px;
    }
    .shanxi{
        font-size: 10px;
        color: #777;
        margin-top: 20px;
        margin-left: 10px;
    }
    .xuefu{
        font-size: 10px;
        color: #777;
        margin-left: 10px;
        margin-top: 5px;
    }
    .shuzi{
        font-size: 11px;
        margin-top: 10px;
        color: #F7587C;
        margin-left: 10px;
    }
    .shuzi1{
        font-size: 11px;
        margin-top: 10px;
        color: #777;
        margin-left: 10px;
    }
    .dd_xia{
        width: 200px;
        height: 21px;
        margin:0 auto;
        margin-top: 25px;
    }
    .moren{
        float: left;
        width: 70px;
        height: 100%;
        background: #000;
        color: #fff;
        font-size: 10px;
        text-align: center;
        line-height: 21px;
        cursor: pointer;
    }
    .moren1{
        float: left;
        width: 70px;
        height: 100%;
        background: #fff;
        border:1px solid #000;
        box-sizing: border-box;
        color: #000;
        font-size: 10px;
        text-align: center;
        line-height: 21px;
    }
    .dd_xia_right{
        width: 70px;
        height: 100%;
        /*background: red;*/
        float: right;
    }
    .jia{
        display: block;
        width: 60px;
        height: 60px;
        border:1px solid #8E8E8E;
        box-sizing: border-box;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 40px;
        color: #666;
        cursor: pointer;
    }
    .xinzeng{
        display: block;
        width: 100%;
        height: 20px;
        font-size: 11px;
        color: #343434;
        margin-top: 22px;
        text-align: center;
        cursor: pointer;
    }
    .sp{
        width: 768px;
        height: 70px;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }
    .sp_1{
        width: 385px;
        height: 100%;
        float: left;
        font-size: 13px;
        color: #090909;
        line-height: 110px;
    }
    .sp_2{
        width: 170px;
        height: 100%;
        float: left;
        font-size: 13px;
        color: #090909;
        line-height: 110px;
    }
    .sp_3{
        width: 155px;
        height: 100%;
        float: left;
        font-size: 13px;
        color: #090909;
        line-height: 110px;
    }
    .sp_4{
        width: 50px;
        height: 100%;
        float: left;
        font-size: 13px;
        color: #090909;
        line-height: 110px;
    }
    .sp2{
        width: 760px;
        height: 130px;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }
    .sp_4_4{
        width: 50px;
        height: 100%;
        float: left;
        font-size: 13px;
        color: #F6496F;
        line-height: 110px;
    }
    .sp2_tu{
        width: 85px;
        height: 85px;
        margin-top: 20px;
        float: left;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .huimu{
        width: 250px;
        height: 30px;
        font-size: 15px;
        color: #3A3A3A;
        margin-left: 15px;
        float: left;
    }
    .huimu span{
        color: #F6476D;
        font-size: 18px;
    }
    .tianran{
        height: 40px;
        font-size: 10px;
        color: #3A3A3A;
        float: left;
        margin-left: 15px;
    }
    .xinxi_xia{
        width: 755px;
        height: 132px;
        margin: 0 auto;
        margin-bottom: 80px;
    }
    .xinxi_left{
        float: left;
        width: 200px;
        height: 100%;
        font-size: 12px;
        color: #424242;
        line-height: 110px;
    }
    .xinxi_right{
        width: 150px;
        height: 132px;
        float: right;
    }
    .nav_four2 {
        width: 150px;
        height: 50px;
        position: relative;
        margin-top: 25px;
    }
    .yfje1{
        width: 60px;
        font-size: 12px;
        /*float: left;*/
    }
    .yfje2{
        width: 60px;
        font-size: 20px;
        color: #F5325D;
        position: absolute;
        top:20px
        /*float: left;*/
    }
    .yfje3{
        width: 60px;
        float: right;
        line-height: 50px;
        position: absolute;
        left:90px;
        top: 0;
        font-size: 30px;
        color: #F5325D;
    }
    .jiesuan{
        display: block;
        width:132px;
        height: 35px;
        background: #F5325D;
        line-height: 35px;
        text-align: center;
        color: #fff;
        margin: 35px auto 0;
        cursor: pointer;
    }
    .complete{
        margin: 25px auto;
    }
</style>