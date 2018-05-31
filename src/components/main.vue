<template>
    <div>
        <header>
            <div class="top">
                <div class="header_container top_t">
                    <div>
                        <template v-if="username">
                            <p>HELLO，DEAR：<span style="color: #FF849C;">{{username}}</span></p>
                            <p style="margin-left: 15px;cursor: pointer;" @click="clearlogin()">退出</p>
                        </template>
                        <template v-else>
                            <p>HELLO，DEAR</p>
                            <div class="header_btn login" @click="login=true">登陆</div>
                            <div class="header_btn res" @click="register=true">注册</div>
                        </template>
                    </div>
                    <div>
                        <ul>
                            <li v-for="(item,n) in top" :key="n">
                                <router-link :to="item.to">{{item.name}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="btm">
                <div class="header_container top_b">
                    <div>
                        <div class="logo">
                            <img src="../assets/img/logo_07.png" alt="">
                        </div>
                        <ul>
                            <li v-for="(item,n) in nav" v-bind:key="n" :class="{active:index==n}" @click="index=n">
                                <router-link :to="item.to">{{item.name}}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search">

                    </div>
                </div>
            </div>
        </header>
        <div>
            <router-view></router-view>
        </div>
        <footer>
            <div class="footer_container">
                <div>
                    <div class="one">
                        <div class="contact">
                            <p>联系我们</p>
                            <p>CONTACT US</p>
                        </div>
                        <div>
                            <img src="../assets/img/email.png" alt="">
                            <p>1234567789@qq.com</p>
                        </div>
                        <div>
                            <img src="../assets/img/tel.png" alt="">
                            <p>400-6666</p>
                        </div>
                        <div>
                            <img src="../assets/img/add.png" alt="">
                            <p>山西省太原市小店区学府街235</p>
                        </div>
                    </div>
                    <div class="two">
                        <div class="contact">
                            <p>访问我们</p>
                            <p>VISIT US</p>
                        </div>
                        <div>
                            <img src="../assets/img/wechat.png" alt="">
                            <img src="../assets/img/aa.png" alt="">
                            <img src="../assets/img/weibo.png" alt="">
                        </div>
                        <p>官方网址：www.EVAVICKY.com</p>
                    </div>
                    <div class="three">
                        <div class="contact">
                            <p>关注我们</p>
                            <p>FOLLOW US</p>
                        </div>
                        <div>
                            <img src="../assets/img/ewm.png" alt="">
                            <img src="../assets/img/ewm.png" alt="">
                        </div>
                    </div>
                </div>
                <p>Copyright@2014-2018 太原市智能优坊科技有限公司 版权所有 </p>
            </div>
        </footer>
        <div class="hidden1" v-show="login">
            <div class="login_box">
                <div><span>登/陆</span>SIGN IN</div>
                <div><img src="../assets/img/slogin.png" alt=""></div>
                <div>
                    <form action="" id="form1">
                        <div>
                            <img src="../assets/img/sper.png" alt="">
                            <input type="text" placeholder="请输入您的用户名" v-model="loginarr.username">
                        </div>
                        <div>
                            <img src="../assets/img/slock.png" alt="">
                            <input type="password" placeholder="请输入您的密码" v-model="loginarr.password">
                        </div>
                        <div>
                            <label for="check1">
                                <input type="checkbox" id="check1">记住密码
                            </label>
                        </div>
                        <div>
                            <p @click="loginshop()">立即登陆</p>
                            <p>马上注册</p>
                        </div>
                    </form>
                </div>
                <div @click="login=false"><img src="../assets/img/sclose.png" alt=""></div>
            </div>
        </div>
        <div class="hidden2" v-show="register">
            <div class="login_box">
                <div><span>注/册</span>REGISTER</div>
                <div><img src="../assets/img/slogin.png" alt=""></div>
                <div>
                    <form action="" method="post" id="form2">
                        <div>
                            <img src="../assets/img/sper.png" alt="">
                            <input type="text" placeholder="请输入您的用户名" v-model="registerarr.username">
                        </div>
                        <div>
                            <img src="../assets/img/slock.png" alt="">
                            <input type="password" placeholder="请输入您的密码" v-model="registerarr.password">
                        </div>
                        <div>
                            <img src="../assets/img/slock.png" alt="">
                            <input type="password" placeholder="请确认您的密码">
                        </div>
                        <div>
                            <p @click="registershop()">立即注册</p>
                            <p>马上登陆</p>
                        </div>
                    </form>
                </div>
                <div @click="register=false"><img src="../assets/img/sclose.png" alt=""></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mymain",
        data() {
            return {
                index:0,
                top:[
                    {name:'购物车',to:"/car"},
                    {name:'我的订单',to:"/personal/singleorder"},
                    {name:'个人中心',to:"/personal/geren"},
                ],
                nav:[
                    {name:"首页",to:"/index"},
                    {name:"新品上市",to:"/list"},
                    {name:"系列产品",to:"/list"},
                    {name:"品牌文化",to:""},
                ],
                login:false,
                register:false,
                loginarr:{
                    username:'',
                    password:''
                },
                registerarr:{
                    username:'',
                    password:''
                },
                username:'',
                id:''
            }
        },
        created(){
            if (localStorage.username){
                this.username = localStorage.username;
            }else{
                this.username = '';
            }
        },
        methods:{
            loginshop(){
                this.$http.post('/api/index/login',this.loginarr,{
                    headers:{
                        "content-type":"application/json"
                    }
                }).then(response => {
                    if (response.body==0){
                        alert('用户不存在');
                    }else if (response.body==1){
                        alert('密码错误');
                    }else if (response.body.status==2){
                        alert('登陆成功');
                        this.login=false;
                        localStorage.username = this.loginarr.username;
                        this.username = localStorage.username;
                        localStorage.userid = response.body.id;
                        location.reload();
                    }
                });
            },
            clearlogin(){
                localStorage.clear();
                location.reload();
            },
            registershop(){
                this.$http.post('/api/index/login/register',this.registerarr,{
                    headers:{
                        "content-type":"application/json"
                    }
                }).then(response => {
                    if (response.body){
                        alert('注册成功');
                        this.register=false;
                    }else{
                        alert('注册失败');
                    }
                });
            }
        }

    }
</script>

<style scoped lang='scss'>
    header{
        width: 100%;
        height: 93px;
        .top{
            width: 100%;
            height: 43px;
            background: #636363;
            .header_container{
                width: 1000px;
                height: 100%;
                margin: 0 auto;
            }
            .top_t{
                display: flex;
                justify-content: space-between;
                >div:first-child{
                    width: auto;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    p{
                        font-size: 14px;
                        color: #ffffff;
                        line-height: 43px;
                    }
                    .header_btn{
                        width: 62px;
                        height: 26px;
                        line-height: 22px;
                        text-align: center;
                        box-sizing: border-box;
                        border: 2px solid #000000;
                        font-size: 13px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .login{
                        color: #ffffff;
                        margin-left: 25px;
                        background: #000;
                    }
                    .res{
                        color: #000;
                        margin-left: 6px;
                    }
                }
                >div:last-child{
                    width: auto;
                    height: 100%;
                    ul{
                        display: flex;
                        height: 100%;
                        width: auto;
                        li{
                            margin-left: 40px;
                            position: relative;
                            a{
                                color: #ffffff;
                                display: block;
                                width: 100%;
                                height: 100%;
                                line-height: 43px;
                                font-size: 14px;
                                transition: all 0.4s;
                                &:before{
                                    content: '';
                                    display: block;
                                    width: 8px;
                                    height: 8px;
                                    background: #ffffff;
                                    border-radius: 50%;
                                    position: absolute;
                                    left: -15px;
                                    top: 50%;
                                    margin-top: -4px;
                                    transition: all 0.4s;
                                }
                            }
                        }
                        li:hover a{
                            color: #FF849C;
                        }
                        li:hover a:before{
                            background: #FF849C;
                        }
                    }
                }
            }
        }
        .btm{
            width: 100%;
            height: 50px;
            background: rgba(0,0,0,0.4);
            .header_container{
                width: 1000px;
                height: 100%;
                margin: 0 auto;
            }
            .top_b{
                display: flex;
                justify-content: space-between;
                div:first-child{
                    display: flex;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                    .logo{
                        width: 60px;
                        height: 100%;
                        img{
                            width: 100%;
                        }
                    }
                    ul{
                        display: flex;
                        height: 100%;
                        li{
                            height: 100%;
                            line-height: 50px;
                            margin-left: 34px;
                            a{
                                color: #ffffff;
                                display: block;
                                width: 100%;
                                height: 100%;
                                font-size: 14px;
                                transition: all 0.4s;
                            }
                        }
                        li:hover a{
                            color: #FF849C;
                        }
                        li.active a{
                            color: #FF849C;
                        }
                    }
                }
            }
        }
    }
    footer{
        width: 100%;
        height: 420px;
        background: #000;
        .footer_container{
            width: 1000px;
            height: 100%;
            margin: 0 auto;
            padding-top: 80px;
            box-sizing: border-box;
            >div{
                display: flex;
                .one{
                    width: calc(100% / 3);
                    .contact{
                        height: 42px;
                        border-left: 3px solid #f5305d;
                        color: #ffffff;
                        padding-left: 6px;
                        margin-bottom: 40px;
                        p:first-child{
                            font-size: 18px;
                        }
                        p:last-child{
                            font-size: 10px;
                        }
                    }
                    div:not(.contact){
                        color: #ffffff;
                        margin-top: 26px;
                        display: flex;
                        img{
                            width: 20px;
                            margin-right: 10px;
                        }
                    }
                }
                .two{
                    width: calc(100% / 3);
                    color: #ffffff;
                    overflow: hidden;
                    .contact{
                        height: 42px;
                        border-left: 3px solid #f5305d;
                        color: #ffffff;
                        padding-left: 6px;
                        margin-bottom: 40px;
                        margin-left: 70px;
                        p:first-child{
                            font-size: 18px;
                        }
                        p:last-child{
                            font-size: 10px;
                        }
                    }
                    >div:nth-child(2){
                        display: flex;
                        justify-content: space-around;
                        margin-top: 53px;
                    }
                    >p{
                        text-align: center;
                        margin-top: 50px;
                    }
                }
                .three{
                    width: calc(100% / 3);
                    color: #ffffff;
                    overflow: hidden;
                    .contact{
                        height: 42px;
                        border-left: 3px solid #f5305d;
                        color: #ffffff;
                        padding-left: 6px;
                        margin-bottom: 40px;
                        margin-left: 70px;
                        p:first-child{
                            font-size: 18px;
                        }
                        p:last-child{
                            font-size: 10px;
                        }
                    }
                    div:last-child{
                        padding-left: 70px;
                        box-sizing: border-box;
                        img{
                            margin-right: 10px;
                        }
                    }
                }
            }
            >p{
                color: #ffffff;
                text-align: center;
                margin-top: 70px;
                font-size: 12px;
            }
        }
    }
    .hidden1{
        width: 100%;
        height: 100%;
        background: #000;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.8);
        z-index: 9999;
        .login_box{
            width: 710px;
            height: 300px;
            position: fixed;
            background: #ffffff;
            left: 50%;
            top: 50%;
            margin-left: -355px;
            margin-top: -150px;
            display: flex;
            >div:first-child{
                width: 100%;
                text-align: center;
                color: #f5305d;
                position: absolute;
                top: -35px;
                font-size: 20px;
                span{
                    color: #ffffff;
                    margin-right: 10px;
                }
            }
            >div:nth-child(2){
                width: 245px;
                height: 100%;
                position: relative;
                img{
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                }
            }
            >div:nth-child(3){
                height: 100%;
                padding-top: 55px;
                box-sizing: border-box;
                margin-left: 100px;
                div{
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    >input{
                        width: 213px;
                        height: 24px;
                        outline: none;
                        border: none;
                        margin-left: 15px;
                        border-bottom: 1px solid #000000;
                    }
                    p{
                        width: 114px;
                        height: 34px;
                        line-height: 34px;
                        text-align: center;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        /*margin-top: 40px;*/
                    }
                    p:first-child{
                        background: #f5305d;
                        color: #ffffff;
                    }
                    p:last-child{
                        border: 1px solid #000000;
                        box-sizing: border-box;
                        color: #000000;
                        background: #ffffff;
                        margin-left: 19px;
                    }
                }
                div:nth-child(3){
                    text-align: right;
                    label{
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        color: #b2b2b2;
                        margin-left: 175px;
                        input{
                            margin-right: 10px;
                        }
                    }
                }
            }
            >div:last-child{
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
            }
        }
    }
    .hidden2{
        width: 100%;
        height: 100%;
        background: #000;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.8);
        z-index: 9999;
        .login_box{
            width: 710px;
            height: 300px;
            position: fixed;
            background: #ffffff;
            left: 50%;
            top: 50%;
            margin-left: -355px;
            margin-top: -150px;
            display: flex;
            >div:first-child{
                width: 100%;
                text-align: center;
                color: #f5305d;
                position: absolute;
                top: -35px;
                font-size: 20px;
                span{
                    color: #ffffff;
                    margin-right: 10px;
                }
            }
            >div:nth-child(2){
                width: 245px;
                height: 100%;
                position: relative;
                img{
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                }
            }
            >div:nth-child(3){
                height: 100%;
                padding-top: 55px;
                box-sizing: border-box;
                margin-left: 100px;
                div{
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    >input{
                        width: 213px;
                        height: 24px;
                        outline: none;
                        border: none;
                        margin-left: 15px;
                        border-bottom: 1px solid #000000;
                    }
                    p{
                        width: 114px;
                        height: 34px;
                        line-height: 34px;
                        text-align: center;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        /*margin-top: 40px;*/
                    }
                    p:first-child{
                        background: #f5305d;
                        color: #ffffff;
                    }
                    p:last-child{
                        border: 1px solid #000000;
                        box-sizing: border-box;
                        color: #000000;
                        background: #ffffff;
                        margin-left: 19px;
                    }
                }
            }
            >div:last-child{
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
            }
        }
    }
</style>