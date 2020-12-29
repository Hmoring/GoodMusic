<template>
    <div class="container">
         <div class="boxs">
            <div class="boxLeft1"></div>
            <div class="boxLeft2"></div>
            <div class="boxRight1"></div>
            <div class="boxRight2"></div>
        </div>
        <div class="box">
            <div class="box-logo">
                <img src="../assets/images/logo-a.png"><br>
                <a>GoodMusic</a>
            </div>

            <el-form ref="form" :model="formData" :rules="formRules">
                <el-form-item prop="userName">
                    <el-input prefix-icon="el-icon-mobile-phone" class="el-input" v-model="formData.userName" placeholder="请输入网易云音乐账号/手机号" type="text"></el-input>
                </el-form-item>
                
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-view" class="el-input" v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item class="yanz" prop="yanzma">
                    <el-input prefix-icon="el-icon-view" id="input" class="inputs" v-model="formData.yanzma"  placeholder="请输入验证码" type="text"></el-input>
                    <button class="btns" id="btn" @click="getduanxin">获取验证码</button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登&nbsp;&nbsp;&nbsp;录</el-button>
                   
                </el-form-item>
            </el-form>
        </div>
       
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            formData:{
                userName:'',
                password:'',
                yanzma:''
            },
            user:[],
            formRules:{
                userName:[
                    {required: true, message: '请输入账号', trigger: 'change'}
                    
                ],
                password:[
                    
                    {required: true, message: '请输入密码', trigger: 'change'}
                ],
                yanzma:[
                    
                    {required: true, message: '请输入验证码', trigger: 'change'}
                ],
            }
        }
    },
    methods:{
        login(){
           this.$refs.form.validate(valid => {
				if (valid) {
                    if(this.formData){
                        let url='http://localhost:3000/login/cellphone?phone='+this.formData.userName+'&password='+this.formData.password
                        let url1='http://localhost:3000/captcha/verify?phone='+this.formData.userName+'&captcha='+this.formData.yanzma
                        let that=this
                        let list=[]
                        axios.get(url1).then(function(result){
                            axios.get(url).then(function(result){
                            that.user=result.data.profile
                            that.$store.dispatch('getChangeuserId',that.user.userId)
                            if(that.$store.state.userId){
                                that.$router.push({
                                    path: '/find-music'
                                })
                                that.$message({
                                    type:'success',
                                    message:'登录成功!'
                                })  
                            }
                        }).catch(function(error) {
                                // 处理前一个回调函数运行时发生的错误
                                that.$message({
                                    type:'error',
                                    message:'账号或密码错误，请检查后重新登录!'
                                })     
                                });
                        }).catch(function(error){
                            if(that.formData.yanzma){
                                that.$message({
                                      type:'error',
                                      message:'验证错误!请重新输入!'
                                  }) 
                            }else if(!that.formData.yanzma){
                                that.$message({
                                      type:'error',
                                      message:'请填写验证码!'
                                  }) 
                            }
                        })
                       
                    }
				} else {
					return false
				}
			})
        },
        getduanxin(){
         if (!/^1[34578]\d{9}$/.test(this.formData.userName)) {
                this.$message({
                  type:'error',
                  message:'请输入正确的手机号!'
                }) 
         }else{
            var input = document.querySelector('#input');
            var btn = document.querySelector('#btn');
            var timer = 60;
            btn.addEventListener('click', function() {
                btn.disabled = true;
               
                var tima = setInterval(function() {
                    if (timer == 0) {
                        clearInterval(tima);
                        btn.disabled = false;
                        btn.innerHTML = '获取验证码';
                        timer = 60;
                    } else {
                        btn.innerHTML =timer + '秒后可重发'
                        timer--;
                    }
                }, 1000)
                
          });
            let that=this
            let url='http://localhost:3000/captcha/sent?phone='+this.formData.userName
            axios.get(url).then(function(result){
                
                that.$message({
                    type:'success',
                    message:'验证码已发送，注意查收哦!'
                }) 
            })
         } 
        },

    }
}
</script>
<style  scoped>
.container{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgb(93, 240, 215);
    background-image: url('../assets/images/newbg1.png');
    background-image: no-repeat;
    background-size:100% 100%;
    display: flex;
}
.box{
   margin: auto;
    width: 350px;
    height: 450px;
    background: url('../assets/images/logbg.jpg');
    border-radius: 5px;
    box-shadow: 1px 2px  15px rgb(82, 81, 81);
    padding: 20px;
    box-sizing:border-box;
    
}
.inputs{
    width:60%;
}
.btns{
    width: 38%;
    height: 40px;
    background-color: rgb(93, 240, 215);
    outline-style: none;
    border-style: none;
    color: white;
    padding-left: 10px;
    padding-right: 10px;
}
.yanz{
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing:border-box;
}
.box-logo{
    margin-bottom: 50px;
    font-size: 18px;
    color: #666666;
    text-align: center;
}
.box-logo img{
    width: 50px;
    height: 50px;
    
}
el-input{
    outline-color: white;
}
.boxs{
    position: absolute;
     top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
.boxLeft1{
    margin-top:100px;
    margin-left: 40px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move 2.5s linear infinite;
    animation: move 2.5s linear infinite;
    animation-direction:alternate;
}
@keyframes move
{
	from {margin-top: 100px;}
	to {margin-top: 150px;}
}
.boxLeft2{
    margin-top:150px;
    margin-left: 40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move1 3s linear infinite;
    animation: move1 3s linear infinite;
    animation-direction:alternate;
}
@keyframes move1
{
	from {margin-top: 150px;}
	to {margin-top: 0px;}
}
.boxRight1{
    margin-top: -400px;
    margin-right: 40px;
    float: right;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move2 5s linear infinite;
    animation: move2 5s linear infinite;
    animation-direction:alternate;
}
@keyframes move2
{
	from {margin-top: 0;}
	to {margin-top: -100px;}
}
.boxRight2{
    margin-top: -300px;
    margin-right: 60px;
    float: right;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(to right, rgba(100,84,239,0.07) 0%, rgba(48,33,236,0.04) 100%);
    -webkit-animation: move3 5s linear infinite;
    animation: move3 5s linear infinite;
    animation-direction:alternate;
}
@keyframes move3
{
	from {margin-top: -100px;}
	to {margin-top: 0;}
}
.el-button{
    width: 100%;
    border-color: rgb(93, 240, 215) ;
    background-color:rgb(93, 240, 215) ;
    outline: none;
}

</style>