<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{errors}" class="xtx-form" autocomplete="off">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field :class="{err:errors.account}" v-model="form.account" name="account" class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div v-if="errors.account" class="error">{{errors.account}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{err:errors.mobile}" v-model="form.mobile" name="mobile" class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div v-if="errors.mobile" class="error">{{errors.mobile}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{err:errors.code}" v-model="form.code" name="code" class="input" type="text" placeholder="请输入验证码" />
        <span @click="send" class="code">
          {{countTime===0?'发送验证码':`${countTime}秒后发送`}}
        </span>
      </div>
      <div v-if="errors.code" class="error">{{errors.code}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{err:errors.password}" v-model="form.password" name="password" class="input" type="password" placeholder="请输入密码" />
      </div>
      <div v-if="errors.password" class="error">{{errors.password}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{err:errors.rePassword}" v-model="form.rePassword" name="rePassword" class="input" type="password" placeholder="请确认密码" />
      </div>
      <div v-if="errors.rePassword" class="error">{{errors.rePassword}}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
import schema from '@/utils/vee-validate-schema'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { Message } from '@/components/Message/index.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCountDown } from '@/compositons'
export default {
  name: 'CallbackPatch',
  components: {
    Form, Field
  },
  props: {
    openId: {
      type: String
    }
  },
  setup (props) {
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null
    })
    const mySchema = {
      account: schema.account,
      mobile: schema.mobile,
      code: schema.code,
      password: schema.password,
      rePassword: schema.password
    }
    const formCom = ref(null)
    const { start, countTime } = useCountDown(60)
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        if (countTime === 0) {
          await userQQPatchCode(form.mobile)
          Message({ type: 'success', text: '验证码发送成功' })
          start()
        } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
          formCom.value.setFieldError('mobile', valid)
        }
      }
    }
    const store = useStore()
    const router = useRouter()
    const submit = async () => {
      const valid = form.value.validate()
      if (valid) {
        userQQPatchLogin({
          unionId: props.openId,
          ...form
        }).then(res => {
          store.commit('user/setUser', res.result)
          router.push('/')
          Message({ type: 'success', text: '完善信息成功' })
        }, () => {
          Message({ type: 'error', text: '完善信息失败' })
        })
      }
    }
    return {
      mySchema,
      form,
      formCom,
      send,
      countTime,
      submit
    }
  }

}
</script>

<style scoped lang='less'>
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
