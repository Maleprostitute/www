<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
    </div>
    <hm-navitem @click="showNickname">
      <template>昵称</template>
      <template #content>{{ user.nickname }}</template>
    </hm-navitem>
    <hm-navitem @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click="showGender">
      <template>性别</template>
      <template #content>{{ user.gender === 1 ? '男' : '女' }}</template>
    </hm-navitem>
    <van-dialog
      v-model="isshow"
      title="昵称修改"
      show-cancel-button
      @confirm="updateNickname"
    >
      <van-field
        v-model="nickname"
        label="昵称"
        ref="nickname"
        placeholder="请输入用户名"
      />
    </van-dialog>
    <van-dialog
      v-model="isshowPassword"
      title="密码修改"
      show-cancel-button
      @confirm="updatePassword"
    >
      <van-field
        v-model="password"
        label="密码"
        ref="password"
        placeholder="请输入用户名"
      />
    </van-dialog>
    <van-dialog
      v-model="isshowGender"
      title="性别修改"
      show-cancel-button
      @confirm="updateGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      isshow: false,
      nickname: '',
      user: '',
      password: '',
      isshowPassword: false,
      isshowGender: false,
      gender: ''
    }
  },
  methods: {
    async showNickname() {
      this.isshow = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async showPassword() {
      this.isshowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    showGender() {
      this.isshowGender = true
      this.gender = this.user.gender
    },
    async getUserInfo() {
      const id = localStorage.getItem('id')
      const res = await this.$axios.get(`/user/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async updateUser(data) {
      const id = localStorage.getItem('id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    updateNickname() {
      this.updateUser({ nickname: this.nickname })
    },
    updatePassword() {
      this.updateUser({ password: this.password })
    },
    updateGender() {
      this.updateUser({ gender: this.gender })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  text-align: center;
  padding: 20px 0;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
}
/deep/.van-dialog__content {
  padding: 15px;
  .van-field {
    border: 1px solid red;
  }
}
</style>
