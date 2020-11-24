<template>
  <div class="login-container">
    <van-nav-bar
        title="登录"
      />
       <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="rules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="rules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round  size="small" type="default" @click="sendCode" v-show="showCodeBtn" >发送验证码</van-button>
          <!-- <van-button class="send-sms-btn" round size="small" type="default" loading v-show="showCodeTime" loading-text="发送中..."></van-button> -->
           <van-count-down
             v-if="showCodeTime"
             slot="button"
             :time="1000 * 60"
             format="ss s"
             @finish="finishTime"
            />
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'

export default {
  name: 'login',
  data () {
    return {
      showCodeTime: false,
      showCodeBtn: true,
      user: {
        mobile: '18329009006',
        code: '466408'
      },
      rules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
    }
  },

  created () {

  },

  methods: {
    async onSubmit () {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      const user = this.user
      // const { data: result } = await login(user)
      // console.log(result)
      // this.$toast.success('登陆成功')
      try {
        const { data: res } = await login(user)
        console.log(res)
        this.$toast.success('登陆成功')
        this.$store.commit('setToken', res.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail(err)
        }
      }
    },
    async sendCode (e) {
      var mobile = this.user.mobile
      e.preventDefault()
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        this.$toast.fail(err)
        return false
      }
      this.showCodeTime = true
      this.showCodeBtn = false
      try {
        const res = await getSmsCode(mobile)
        console.log(res)
        this.$toast.success('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.fail('发送失败', err)
        }
      }
    },
    finishTime () {
      this.showCodeTime = false
      this.showCodeBtn = true
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    padding:0;
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
