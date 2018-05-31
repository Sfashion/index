<template>
    <div id="listbox">
        <div class="banner">
            <input type="text" placeholder="搜索新品吧">
            <div class="searchlogo"></div>
        </div>

        <!--类别-->
        <div class="category">
            <div class="title">
                <a href="" class="a1">系列产品</a>
                <a href="" class="a2">{{cname}}系列</a>
            </div>
            <ul class="content">
                <li v-for="(item,n) in list" :key="n">
                    <router-link :to="'/detail?id='+item.id">
                        <div class="con">
                            <h3>
                                <span>{{item.name}}</span>精油皂
                            </h3>
                            <p>{{item.des.slice(0,10)}}</p>
                            <dl>
                                <dt>RMB</dt>
                                <dd>{{item.price}}</dd>
                            </dl>
                        </div>
                        <div class="tu">
                            <img :src="item.thumb[0].url" alt="">
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: "mylist",
        data() {
            return {
                list:[],
                flag:true,
                cname:''
            }
        },
        created(){
            let id = this.$route.query.id;
            this.$http.get(`/api/index/list/listofid?id=${id}`).then(response => {
                response.body.forEach(val=>{
                    val.thumb = JSON.parse(val.thumb);
                });
                this.list=response.body;
                this.cname = this.list[0].cname;
            });
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
    .category{
        width: 854px;
        height: auto;
        margin: 103px auto 94px;

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
        }
        > .content{
            width: 100%;
            height: auto;
            margin-top: 45px;
            padding: 0 13px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            > li{
                width: 186px;
                height: 321px;
                margin-top: 63px;
                margin-left: 28px;
                position: relative;

                > a{
                    display: block;

                    overflow: hidden;
                    > .con{
                        width: 100%;
                        height: 285px;
                        margin-top: 36px;
                        border: 1px solid #5A5A5A;
                        padding: 0 21px;
                        box-sizing: border-box;
                        transition: all 0.4s;
                        > h3 {
                            width: 100%;
                            height: 17px;
                            padding-top: 188px;
                            margin: 4px 0;
                            color: #000;
                            font-size: 14px;
                            line-height: 17px;
                            > span {
                                color: #F63E66;
                                font-size: 17px;
                            }
                        }
                        > p{
                            color: #383838;
                            font-size: 11px;
                        }
                        > dl{
                            width: 86px;
                            height: 19px;
                            background: url("../../assets/img/xiaoqiu.gif" ) 100%;
                            margin-top: 14px;

                            > dt{
                                display: inline-block;
                                color: #F97996;
                                font-size: 8px;
                            }
                            > dd{
                                display: inline-block;
                                color: #F5325D;
                                font-size: 18px;
                                font-weight: 600;
                            }
                        }
                    }
                    > .tu {
                        width: 142px;
                        height: 213px;
                        position: absolute;
                        top: 0;
                        left:22px;
                        overflow: hidden;
                        > img{
                            width: 100%;
                        }
                    }
                }
                > a:hover >.con{
                    border-color: #F9839E;
                }
            }
            > li:nth-of-type(4n+1){
                margin-left: 0;
            }
        }
        > .page{
            width: 97px;
            height: 17px;
            margin: 83px auto 94px;
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
    }
    .love{
        width: 854px;
        height: auto;
        margin: 0 auto;
        > .title{
            width: 100%;
            height: 71px;
            position: relative;
            .left{
                width: 112px;
                height: 100%;
                background: url("../../assets/img/nlike.gif") 100%;
                float: left;
            }
            .right{
                width: 836px;
                height: 100%;
                background: url("../../assets/img/nlikeb.gif") 100%;

                position: absolute;
                right: -180px;
                top: 0;
            }
        }
        > .content{
            width: 100%;
            height: auto;
            margin-top: 59px;
            padding: 0 13px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            > li{
                width: 241px;
                height: 279px;
                margin-top: 50px;
                position: relative;

                > a{
                    display: block;

                    overflow: hidden;
                    > .con{
                        width: 100%;
                        height: 250px;
                        margin-top: 29px;
                        border: 1px solid #5A5A5A;
                        padding: 0 14px;
                        box-sizing: border-box;
                        transition: all 0.4s;
                        > h3 {
                            width: 100%;
                            height: 17px;
                            padding-top: 179px;
                            margin: 7px 0;
                            color: #000;
                            font-size: 14px;
                            line-height: 17px;
                            > span {
                                color: #F63E66;
                                font-size: 17px;
                            }
                        }
                        > p{
                            color: #383838;
                            font-size: 11px;
                        }

                    }
                    > .tu {
                        width: 213px;
                        height: 189px;
                        position: absolute;
                        top: 0;
                        left:14px;
                        overflow: hidden;
                        > img{
                            width: 100%;
                        }
                        > div{
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,0);
                            position: absolute;
                            left: 0;
                            top: 0;
                            transition: background-color 1s;
                            > p{
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
                                transition: all 1s;
                            }
                        }
                    }
                }
                > a:hover > .tu > div{
                    background: rgba(238,163,151,.8);
                }
                > a:hover > .tu > div > p{
                    border-color: #fff;
                    color: #fff;
                }
                > a:hover > .con{
                    border-color: #F9839E;
                }
            }

        }
        > .button{
            display: block;
            width: 129px;
            height: 33px;
            margin: 63px auto 100px;
            > p{
                width: 100%;
                height: 100%;
                background: #FF9BB6;
                color: #fff;
                font-size: 14px;
                font-weight: 600;
                border: none;
                line-height: 33px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
</style>





