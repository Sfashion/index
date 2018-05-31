<template>
    <div class="geren">
        <template v-if="userid">
            <div class="geren_box">
                <h3>个人资料</h3>
                <p>姓名：<span>{{info.nickname}}</span></p>
                <p>账号：<span>{{info.username}}</span></p>
                <p>性别：<span>{{info.sex}}</span></p>
                <p>年龄：<span>{{info.age}}</span></p>
                <p>邮箱：<span>{{info.email}}</span></p>
                <p>微信：<span>{{info.wechat}}</span></p>
                <p>入网时间：<span>{{info.time}}</span></p>
            </div>
        </template>
        <template v-else>
            <img src="../../assets/img/timsg.jpg" alt="">
        </template>
    </div>
</template>

<script>
    export default {
        name: "single",
        data() {
            return {
                info:'',
                userid:''
            }
        },
        created(){
            if (localStorage.userid){
                this.userid = localStorage.userid;
                this.$http.get(`/api/index/personal?id=${this.userid}`).then(res=>{
                    res.body[0].time = res.body[0].time.slice(0,10);
                    this.info = res.body[0];
                });
            }else{
                this.userid = '';
            }
        }
    }
</script>

<style scoped lang='scss'>
    .geren{
        width: 640px;
        height: auto;
        float: right;
        .geren_box{
            width: 640px;
            height: 356px;
            float: right;
            border: 1px solid #000000;
            h3{
                text-align: center;
                margin-top: 20px;
            }
            p{
                width: 100%;
                height: auto;
                margin-bottom: 20px;
                padding: 0 0 0 30px;
                box-sizing: border-box;
                span{
                    color: #FE9F9C;
                }
            }
            p:first-child{
                margin-top: 20px;
            }
        }
        >img{
            width: 100%;
        }
    }

</style>