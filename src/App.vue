// 报表首页
<template>
    <!-- 路由出口 -->
    <div class="app-view">
      <router-view></router-view>
      <loading v-show="getIsLoading" :isFixed="true"></loading>
      <!-- <login></login> -->
    </div>
</template>

<script>
import { mapMutations,mapGetters } from "vuex";
export default {
  name: "App",
  props: ["appUrl", "userName", "userImg","companyName","companyEnglish","companyLogo"],
  mounted() {
    // debugger;
    localStorage.setItem("pocPort", this.appUrl);
    this.setUserImg(this.userImg);
    this.setUserName(this.userName);
    this.setCompanyName(this.companyName);
    this.setCompanyEnglish(this.companyEnglish);
    this.setCompanyLogo(this.companyLogo);
    this.$router.push({ path:'/index'})
  },
  computed: {
    ...mapGetters(['getIsLoading'])
  },
  methods: {
    ...mapMutations(["setUserImg", "setUserName",'setCompanyName','setCompanyEnglish','setCompanyLogo'])
  }
};
</script>

<style lang="less">
//基础样式
@import "./assets/style/reset.less";
</style>
