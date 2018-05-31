<template>
    <div id="detailbox">
        <div class="banner">
            <input type="text" placeholder="搜索新品吧">
            <div class="searchlogo"></div>
        </div>
        <!--详情-->
        <div class="detail">
            <div class="title">
                <router-link to="" class="a1">系列产品</router-link >
                <router-link to="" class="a3">{{show.cname}}系列</router-link >
                <router-link to="" class="a2">产品详情</router-link >
            </div>
            <div class="content">
                <div class="left">
                    <ul class="big">
                        <li v-for="(item,n) in show.thumb" :key="n" :class="{active:index===n}">

                            <img :src="item.url" alt="">
                        </li>

                    </ul>
                    <ul class="small">
                        <li v-for="(item,n) in show.thumb" :key="n" @click="index=n">
                            <img :src="item.url" alt="">
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <h3>
                        <span>{{show.name}}</span>精油皂
                    </h3>
                    <p>{{show.des}}</p>
                    <div class="pbox">
                        <div class="price">
                            {{show.price}}<span>RMB</span>
                        </div>
                        <div class="oldprice">
                            原价
                            <span>
                            999
                            <em>RMB</em>
                        </span>
                        </div>
                    </div>
                    <div class="count">
                        请选择数量
                        <div class="con">
                            <span @click="reduce()">&lt</span>
                            <input type="text" v-model="nub">
                            <span @click="add()">&gt</span>
                         </div>
                    </div>
                    <div class="spec">
                        请选择规格
                        <label for="weight1">
                            <input type="radio" name="weight" id="weight1" value="100g" checked>{{show.weight1}}
                        </label>
                        <label for="weight2">
                            <input type="radio" name="weight" id="weight2" value="130g">{{show.weight2}}
                        </label>
                    </div>
                    <div class="button">
                        <p>立即购买</p>
                        <p @click="addcar()">加入购物车</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail2box">
            <div class="title">
                <div class="sopt">
                    <h3>
                        <span>商品</span>详情
                    </h3>
                    <p>Commodity details</p>
                </div>
                <div class="evat">
                    <h3>
                        <span>用户</span>评价
                    </h3>
                    <p>User evaluation</p>
                </div>
            </div>
            <div class="content">
                <img :src="item.url" alt="" v-for="(item,n) in show.content" :key="n">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "mydetail",
        data() {
            return {
                show:[],
                nub:1,
                index:0
            }
        },
        created(){
            let id = this.$route.query.id;
            this.$http.get('/api/index/show?id='+id).then(response => {
                response.body.forEach(val=>{
                    val.thumb = JSON.parse(val.thumb);
                    val.content = JSON.parse(val.content);
                });
                this.show=response.body[0];
            });
        },
        methods:{
            reduce(){
                if(this.nub>0){
                    this.nub--;
                }else{
                    this.nub=0;
                }
            },
            add(){
                this.nub++;
            },
            addcar(){
                if (localStorage.userid){
                    let obj = {};
                    obj.shopid = this.$route.query.id;
                    obj.userid = localStorage.userid;
                    obj.count = this.nub;
                    this.$http.post('/api/index/car',obj,{
                        headers:{
                            "content-type":"application/json"
                        }
                    }).then(response => {
                        if (response.body){
                            alert('成功加入购物车');
                        }else{
                            alert('添加失败！')
                        }
                    });
                }else{
                    alert('请先登录！');
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
    .banner{
        width: 100%;
        height: 160px;
        background: url("../../assets/img/nbanner.gif") 100%;
        position: relative;
        > input {
            width: 200px;
            height: 34px;
            position: absolute;
            right: 256px;
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
            right: 268px;
            top: 18px;
        }
    }
    .detail{
        width: 854px;
        height: auto;
        margin: 103px auto 74px;

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
                background: url("../../assets/img/nfontb1.gif");
            }
            > .a2{
                width: 111px;
                background: url("../../assets/img/nfont2.gif");
            }
            > .a3{
                width: 111px;
                background: url("../../assets/img/nfont3.jpg");
            }
        }
        > .content{
            width: 100%;
            height: 368px;
            margin-top: 81px;
            padding: 26px 29px 34px 47px;
            box-sizing: border-box;
            > .left{
                width: 284px;
                height: 299px;
                margin-top: 8px;
                float: left;
                > .big{
                    width: 199px;
                    height: 299px;
                    float: left;
                    position: relative;
                    > li{
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        cursor: pointer;
                        position: absolute;
                        left: 0;
                        top: 0;
                        opacity: 0;
                        transition: all 1s;

                        > img{
                            height: 100%;
                        }
                    }
                    > li.active{
                        opacity: 1;
                    }

                }
                > .small{
                    width: 64px;
                    height: 100%;
                    float: right;
                    > li{
                        width: 100%;
                        height: 64px;
                        margin-bottom: 14px;
                        overflow: hidden;
                        cursor: pointer;
                        > img{
                            width: 100%;
                        }
                    }
                    > li:last-of-type{
                        margin: 0;
                    }
                }
            }
            > .right{
                width: 402px;
                height: 303px;
                float: right;
                > h3{
                    margin-top: 21px;
                    font-size: 16px;
                    color: #000;
                    > span{
                        color: #F5325D;
                        font-size: 22px;
                        font-weight: 600;
                    }
                }
                > p{
                    margin-top: 7px;
                    color: #4D4D4D;
                    font-size: 14px;
                }
                > .pbox{
                    width: 100%;
                    height: 30px;
                    margin-top: 30px;
                    > .price{
                        width: 100px;
                        height: 30px;
                        background: url("../../assets/img/xiaoqiu1.jpg") 100%;

                        color: #F5325D;
                        font-size: 28px;
                        font-weight: 600;
                        float: left;
                        > span{
                            font-size: 12px;
                            font-weight: 100;
                            margin-left: 21px;
                        }
                    }
                    > .oldprice{
                        width: 92px;
                        height: 30px;
                        margin-left: 36px;
                        color: #737373;
                        font-size: 12px;
                        float: left;
                        line-height: 45px;
                        > span {
                            text-decoration: line-through;
                            color: #000;
                            font-weight: 600;
                            > em{
                                color: #ccc;
                                font-weight: 200;
                            }
                        }
                    }
                }
                > .count{
                    width: 181px;
                    height: 18px;
                    margin-top: 48px;
                    color: #000;
                    font-size: 14px;

                    line-height: 18px;
                    > .con{
                        width: 81px;
                        height: 100%;
                        float: right;
                        > span{
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            border: 1px solid #000;
                            border-radius: 50%;
                            text-align: center;
                            line-height: 12px;
                            box-sizing: border-box;
                            font-family: "宋体";
                            cursor: pointer;
                            user-select: none;
                        }
                        > input{
                            width: 28px;
                            height: 14px;
                            border: 1px solid #000;
                            padding: 1px 8px;
                            box-sizing: border-box;
                            margin: 0 5px;
                        }
                    }
                }
                > .spec{
                    width: 100%;
                    height: 18px;
                    margin-top: 21px;
                    color: #000;
                    font-size: 14px;
                    label{
                        margin-left: 10px;
                        > input{
                            outline: none;
                        }
                    }
                }
                > .button{
                    width: 100%;
                    height: 33px;
                    margin-top: 29px;
                    display: flex;
                        > p:first-child{
                            width: 129px;
                            height: 100%;
                            text-align: center;
                            border: none;
                            font-size: 14px;
                            font-weight: 600;
                            background: #F5325D;
                            line-height: 33px;
                            color: #ffffff;
                            cursor: pointer;
                        }
                        > p:last-child{
                            background: #ffffff;
                            border: 1px solid #000000;
                            box-sizing: border-box;
                            color: #000;
                            width: 129px;
                            height: 100%;
                            text-align: center;
                            font-size: 14px;
                            font-weight: 600;
                            line-height: 31px;
                            margin-left: 20px;
                            cursor: pointer;
                        }
                    }

                > a:last-of-type{
                        margin-left: 26px;
                        > button{
                            border: 1px solid #474747;
                            box-sizing: border-box;
                            color: #000;
                        }
                    }
                }
            }
        }

    .detail2box{
        width: 100%;
        height: auto;
        > .title {
            width: 100%;
            height: 141px;
            background: url("../../assets/img/detailbg.gif") 100%;
            position: relative;
            > .sopt {
                width: 199px;
                height: 70px;
                position: absolute;
                left: 242px;
                top: 70px;
                padding-top: 20px;
                padding-left: 28px;
                box-sizing: border-box;
                cursor: pointer;
                > h3{
                    font-size: 22px;
                    color: #FB4E69;
                    > span{
                        color: #000;
                    }
                }
                > p{
                    font-size: 7px;
                    color: #000;
                }
            }

            > .evat {
                width: 199px;
                height: 70px;
                position: absolute;
                left: 510px;
                top: 70px;
                padding-top: 20px;
                padding-left: 28px;
                box-sizing: border-box;
                cursor: pointer;

                > h3{
                    font-size: 22px;
                    color: #FB4E69;
                    > span{
                        color: #000;
                    }
                }
                > p{
                    font-size: 7px;
                    color: #000;
                }
            }



        }
        > .content{
            width: 100%;
            height: auto;
            img{
                width: 100%;
            }
        }
    }
</style>