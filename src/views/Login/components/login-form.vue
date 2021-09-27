<template>
  <div class="account-box">
    <Form
    class="form"
    :validation-schema="mySchema"
    v-slot:default="{errors}"
    autocomplete="off"
    ref="target">
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <Field type="text"
          v-model="form.account" name="account" :class="{error:errors.account}" placeholder="请输入用户名或手机号" />
        </div>
        <!-- 表单验证错误信息提示 -->
        <div class="error" v-if="errors.account">
          <i class="iconfont icon-warning" />
          {{ errors.account }}
        </div>
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-lock"></i>
          <Field
            :class="{ error: errors.password }"
            v-model="form.password"
            name="password"
            type="password"
            placeholder="请输入密码"
          />
          <!-- <input type="password" placeholder="请输入密码" /> -->
        </div>
        <div class="error" v-if="errors.password">
          <i class="iconfont icon-warning" />{{ errors.password }}
        </div>
      </div>
      <a href="javascript:;" @click="submit" class="btn">登录</a>
    </Form>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
    </a>
      <!-- <span id="qqLoginBtn"></span> -->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import schema from '@/utils/vee-validate-schema'
import { Field, Form } from 'vee-validate'
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Message } from '@/components/Message/index.js'
// import QC from 'qc'
export default {
  components: {
    Form,
    Field
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      account: null,
      password: null
    })
    const target = ref(null)
    const mySchema = {
      account: schema.account,
      password: schema.password
    }
    async function submit () {
      const valid = await target.value.validate()
      if (valid) {
        store.dispatch('user/asyncSetUser', form).then((res) => {
          if (res === '1') {
            Message({ type: 'success', text: '登录成功' })
            store.dispatch('cart/mergerCartList')
            router.push('/')
          }
        })
      }
    }
    onMounted(() => {
      // QC.Login({
      //   btnId: 'qqLoginBtn'
      // })
    })
    return {
      form,
      mySchema,
      target,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 20px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
