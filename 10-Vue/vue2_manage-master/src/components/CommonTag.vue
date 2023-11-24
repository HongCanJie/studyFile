<template>
  <div class="tab">
    <!-- <span class="tag-group__title">Dark</span> -->
    <!-- 判断当前路由的name是否等于点击的item的name一致，一致的话就显示高亮 -->
    <!-- 如果那么是home则不设置关闭 -->
    <!-- el-tag有两个事件，click是点击 Tag 时触发的事件，close是关闭 Tag 时触发的事件 -->
    <el-tag v-for="(item, index) in isTablist"
            :key="item.path"
            @click="changeMenu(item)"
            @close="handleClose(item, index)"
            :closable="item.name !== 'home'"
            size=" small "
            :effect="$route.name === item.name ? 'dark':'plain'"
            style="margin-right: 10px;text-align: center;">
      {{ item.label }}
    </el-tag>

  </div>
</template>

<script>


// Tag来源于store的tabList
// 需要设置Tag的点击跳转、删除功能
export default {
  name: 'CommonTag',
  data () {
    return {

    }
  },
  computed: {
    // 获得tabsList
    isTablist () {
      console.log(this.$store.state.tab.tabsList, 'isTablist22');
      return this.$store.state.tab.tabsList
    },



  },
  methods: {
    // tag的跳转
    changeMenu (item) {
      console.log(this.$route.path); // 表示当前路由，比如从A跳到B页面，那么当前路由是A
      console.log('item', item); // 点击菜单获取当前路由的信息

      // 实现路由的跳转
      this.$router.push(item.name)


    },

    // 点击tag的删除  item：当前的数据， index:当前tag的索引，这里的索引和tabList长度对应
    handleClose (item, index) {
      // 调用store中的mutation，通过commit
      this.$store.commit('closeTag', item)
      //   删除后的长度
      const length = this.isTablist.length
      console.log(index, 'fhsdjkfhjk');
      // 删除之后的跳转逻辑
      // 1.删除的非激活状态的tag，即点击删除的页面和当前显示的不同，则不用跳转
      if (item.name !== this.$route.name) {
        return
      }
      // 2. 删除的是最后一项，则tag会向前一个移动
      if (index === length) {
        this.$router.push(this.isTablist[index - 1].name)
      }
      // 3.删除的是中间的一项，则tag会向后一个跳转
      else {
        this.$router.push(this.isTablist[index].name)
      }
    }

  }
}
</script>

<style lang="less" scoped>
</style>