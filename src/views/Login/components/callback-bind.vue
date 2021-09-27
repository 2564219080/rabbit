<template>
<div>
 <Form
    ref="target"
    :validation-schema="mySchema"
    v-slot:default="{errors}"
    autocomplete="off"
    class="xtx-form"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          :class="{ err: errors.mobile }"
          v-model="form.mobile"
          name="mobile"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
   <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          :class="{ err: errors.code }"
          v-model="form.code"
          name="code"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span  class="code" @click="send">
            {{countTime === 0 ? '发送验证码' : `${countTime}秒后发送`}}
        </span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" @click.prevent="bind" class="submit">立即绑定</a>
  </Form>
</div>

</template>

<script>
import QC from 'qc'
import { ref, reactive } from 'vue'
import { Field, Form } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { useCountDown } from '@/compositons'
import { Message } from '@/components/Message/index.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
  components: {
    Form, Field
  },
  props: {
    openId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const nickname = ref('')
    const avatar = ref('')
    const target = ref(null)
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      mobile: null,
      code: null
    })
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code
    }
    if (QC.Login.check()) {
      QC.api('get_user_info').success(res => {
        avatar.value = res.data.figureurl_qq_1
        nickname.value = res.data.nickname
      })
    }

    const { start, countTime } = useCountDown(60)
    const send = async () => {
      const valid = await mySchema.mobile(form.mobile)

      if (valid === true) {
        if (countTime.value === 0) {
          await userQQBindCode(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          start()
        }
      } else {
        target.value.setFieldError('mobile', valid)
      }
    }
    async function bind () {
      const res = await target.value.validate()
      if (res) {
        userQQBindLogin({
          unionId: props.openId,
          mobile: form.mobile,
          code: form.code
        }).then(res => {
          store.commit('user/setUser', res.result)
          router.push('/')
          Message({ type: 'success', text: '绑定成功' })
        })
      }
    }
    return {
      nickname,
      avatar,
      mySchema,
      form,
      target,
      send,
      bind,
      countTime
    }
  }
}
</script>

<style scoped lang='less'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    &:hover {
      cursor: pointer;
    }
  }
</style>
