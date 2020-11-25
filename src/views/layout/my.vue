<template>
  <div :data = "userInfo">
  <div class="my-container" v-if="showNoToken">
    <div class="header">
      <img
        class="mobile-img"
        src="~@/assets/img/mobile.png"
        @click="$router.push('/login')"
      >
    </div>
  </div>
  <div class="userInfo header" v-else>
  <!-- 基本信息 -->
  <div class="base" >
    <div class="left">
      <van-image
                 fit="cover"
                 :src=userInfo.photo
                 class="avatar"
                 round
                 />
      <span class="name">{{userInfo.name}}</span>
    </div>
    <div class="right">
      <van-button type="default" size="mini" round>编辑资料</van-button>
    </div>
  </div>
  <!-- 粉丝、关注 -->
  <div class="data">
  <div class="data-item">
    <span>{{userInfo.follow_count}}</span>
    <span>关注</span>
  </div>
  <div class="data-item">
    <span>{{userInfo.fans_count}}</span>
    <span>粉丝</span>
  </div>
   <div class="data-item">
    <span>{{userInfo.art_count}}</span>
    <span>文章</span>
  </div>
  <div class="data-item">
    <span>{{userInfo.like_count}}</span>
    <span>获赞</span>
  </div>
</div>
</div>
<van-grid class="nav-grid" :column-num="3" clickable >
    <van-grid-item text="收藏">
      <i slot="icon" class="toutiao toutiao-shoucang"></i>
      <span class="text" slot="text">收藏</span>
    </van-grid-item>
    <van-grid-item text="文字">
      <i slot="icon" class="toutiao toutiao-lishi"></i>
      <span class="text" slot="text">历史</span>
    </van-grid-item>
     <van-grid-item text="文字">
      <i slot="icon" class="toutiao toutiao-zuopin"></i>
      <span class="text" slot="text">作品</span>
    </van-grid-item>
</van-grid>
<van-cell-group title=" ">    <van-cell title="消息通知" is-link url="" />
  <van-cell title="实名认证" is-link url="" />
</van-cell-group>
<van-cell-group title=" ">
  <van-cell title="用户反馈" is-link url="" />
  <van-cell title="小智同学" is-link url="" />
  <van-cell title="系统设置" is-link url="" />
</van-cell-group>
<van-cell-group title=" ">
  <van-cell v-if=" !showNoToken" class="logout-cell" title="退出登录" center @click="exitLogin()"/>
</van-cell-group>
</div>
</template>

<script>
import { getItem } from '@/utils/storage'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      showNoToken: true,
      userInfo: {}
    }
  },

  created () {
    this.loadUserInfo()
  },
  beforeMount () {
    const token = getItem('tokens')
    if (token) {
      this.showNoToken = false
    }
  },

  methods: {
    exitLogin () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        this.$store.commit('setToken', null)
        this.$router.push('/my')
      }).catch(() => {
        console.log('取消执行这里')
      })
    },
    async loadUserInfo () {
      if (!this.showNoToken) return false
      try {
        const { data: res } = await getUserInfo()
        console.log(res)
        this.userInfo = res.data
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.my-container {
  > .header {
    height: 361px;
    background: url("~@/assets/img/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
  }
}
.header {
    width: 750px;
    height: 401px;
    background: url('~@/assets/img/banner.png');
    background-size: cover;
  }
.userInfo {
    .base {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
        }
      }
    }
  }
  .data{
    display: flex;
    justify-content: space-around;
    .data-item{
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      flex-direction: column;
      span:nth-child(1) {
      font-size: 36px;
      margin-bottom: 15px;
      }
      span:nth-child(2) {
      font-size: 23px;
      }
    }
  }
  .nav-grid {
  background: #fff;
  .toutiao {
    font-size: 45px;
  }
  .toutiao-shoucang {
    color: #EB5253;
  }
  .toutiao-lishi {
    color: #FF9D1D;
  }
  .toutiao-zuopin{
    color:#50A5FA;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
}
.logout-cell{
 text-align: center;
}
</style>
