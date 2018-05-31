<template>
    <div id="listbox">
        <div class="perbanner">
            <input type="text" placeholder="搜索新品吧">
            <img src="../../assets/img/soap_geren_banner.png" alt="">
            <div class="searchlogo"></div>
        </div>
        <!--类别-->
        <div class="category">
            <div class="title">
                <a href="" class="a1">首页</a>
                <a href="" class="a2">个人中心</a>
            </div>
            <div class="cat_nav">
                <ul class="cat_nav_left">
                    <li class="nav_left_top">
                        <div>
                            <img src="../../assets/img/guo5.png" alt=""style="width:90px;margin:20px 48px 5px;border-radius: 50%">
                        </div>
                        <template v-if="nickname">
                            <h5 style="text-align: center;font-size: 18px">{{nickname}}的小屋</h5>
                        </template>
                        <template v-else>
                            <h5 style="text-align: center;font-size: 18px">未登录</h5>
                        </template>
                        <div class="nav_left_topimg">
                            <img src="../../assets/img/soap_navtop.png" alt=""style="width:50px;margin:10px 66px">
                        </div>
                    </li>
                    <div class="nav_left_bottom">
                        <div>管理</div>
                        <router-link :to="item.to" v-for="(item,n) in nav" :key="n">
                            <li @click="index=n" :class="{active:index===n}">{{item.name}}</li>
                        </router-link>
                    </div>
                </ul>
                <div class="personal_right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "personal",
        data() {
            return {
                userid:'',
                nickname:'',
                nav:[
                    {name:"我的订单",to:"/personal/singleorder"},
                    {name:"个人资料",to:"/personal/geren"}
                ],
                index:0
            }
        },
        created(){
            if(localStorage.userid){
                this.userid = localStorage.userid;
                this.$http.get(`/api/index/personal?id=${this.userid}`).then(res=>{
                    this.nickname = res.body[0].nickname;
                });
            }else{
                this.userid = '';
            }
        },
    }
</script>

<style scoped lang='scss'>
    .personal_right:after{
        content: '';
        display: block;
        width: 0;
        height: 0;
        clear: both;
    }
    #listbox{
        width:100%;
        height: auto;
    }
    .perbanner{
        width: 100%;
        position: relative;
        img{
            width:100%;
        }
        > input {
            width: 200px;
            height: 34px;
            position: absolute;
            right: 15%;
            top: 11px;
            padding: 10px;
            box-sizing: border-box;
            outline: none;
        }
        > .searchlogo{
            width: 19px;
            height: 19px;
            background: url("../../assets/img/nsearchlogo.gif") 100%;
            position: absolute;
            right: 16%;
            top: 18px;
        }
    }
    .category{
        width: 854px;
        height: auto;
        margin: 60px auto 94px;
        > .title{
            width: 100%;
            height: 33px;
            position: relative;
            > a{
                display: inline-block;
                width: 97px;
                height: 100%;
                text-align: center;
                line-height: 33px;
                color: #fff;
                font-weight: 500;
                font-size: 14px;
            }
            > .a1{
                width:80px;
                padding-right: 17px;
                background: url("../../assets/img/nfontb1.gif");
            }
            > .a2{
                width: 111px;
                background: url("../../assets/img/nfont2.gif");
            }
        }
        .cat_nav{
            width:100%;
            margin-top: 60px;
            .cat_nav_left{
                width: 185px;
                float: left;
                .nav_left_top{
                    width:100%;
                    height: 185px;
                    border: 1px solid#000;
                    box-sizing: border-box;
                }
                .nav_left_bottom{
                    width:100%;
                    border: 1px solid#000;
                    box-sizing: border-box;
                    margin-top: 30px;
                    padding-bottom: 5px;
                    div{
                        width: 94%;
                        height:43px;
                        margin: 0 auto;
                        text-align: center;
                        line-height: 43px;
                        background: #FE9F9C;
                        margin-top: 5px;
                    }
                    li{
                        width: 94%;
                        height:43px;
                        margin: 0 auto;
                        text-align: center;
                        line-height: 43px;
                        color: #000;
                        border-bottom: 2px solid#ccc;
                        transition: all 0.3s;
                    }
                    li:hover{
                        border-bottom: 2px solid#FE9F9C;
                        color: #FE9F9C;
                    }
                    li.active{
                        border-bottom: 2px solid#FE9F9C;
                        color: #FE9F9C;
                    }
                    >a:last-child li{
                        border-bottom: none;
                    }
                }
            }

            &:after{
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                clear: both;
            }
        }
        > .page{
            width: 97px;
            height: 17px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            > a{
                display: block;
                color: #262626;
                font-size: 10px;
                padding: 4px;
                font-weight: 500;
                border: 1px solid #fff;
                box-sizing: border-box;
                text-align: center;
                line-height: 6px;
                border-radius: 50%;
                transition: border .1s;
            }
            > a:hover{
                color: #F86586;
                border-color: #F86586;
            }
        }
        .like{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: space-between;
            margin-top: 200px;
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
                .xl_tu1{
                    width: 235px;
                    height: 189px;
                    position: absolute;
                    left: 25px;
                    background: #fff;
                    top: 0;
                    :hover{
                        opacity: 0.5;
                    }
                    >img{
                        width:100%;
                    }
                    div{
                        width: 120px;
                        height: 120px;
                        text-align: center;
                        position: absolute;
                        left:50px;
                        top:30px;
                        color: rgba(255, 255, 255, 0);
                        font-size: 18px;
                    }
                }
            }
            .xl_list:hover .xl_tu1 div{
                border: 3px solid #fff;
                color: #fff;
                border-radius: 50%;
                line-height: 120px;
                text-align: center;
            }
            .xl_list:hover .xl_kuang{
                border:2px solid #F5325D;
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
</style>