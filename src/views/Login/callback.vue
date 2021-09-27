<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        href="javascript:;"
        @click="hasAccount = true"
        :class="{active : hasAccount}"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        href="javascript:;"
        @click="hasAccount = false"
        :class="{active : !hasAccount}"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <!-- 有账号 -->
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :open-id="openId"/>
    </div>
    <!-- 没有账号 -->
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter :open-id="openId"/>
</template>

<script>

import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { userQQLogin } from '@/api/user'
import QC from 'qc'

export default {
  name: 'PageCallback',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackBind,
    CallbackPatch
  },
  setup () {
    const hasAccount = ref(true)
    const router = useRouter()
    const store = useStore()
    const openId = ref(null)
    if (QC.Login.check()) {
      QC.Login.getMe((openId) => {
        openId.value = openId
        userQQLogin(openId).then(data => {
          // 有账号，已绑定
          store.commit('user/setUser', data.result)
          router.push('/')
        })
      }, e => {
        // 未绑定账号
        console.log('该qq未绑定账号')
      })
    }
    return {
      hasAccount,
      openId
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
