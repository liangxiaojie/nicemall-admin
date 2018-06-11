<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <img class="headimg" :src="scope.row.headimgurl" />
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="用户昵称" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="province" label="省份" />
      <el-table-column prop="city" label="城市" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.created_at | parseTime }}
        </template>
      </el-table-column>
      <el-table-column prop="credit_score" label="芝麻信用分" />
    </el-table>
  </div>
</template>

<script>
import { getUsers } from '@/apollo/user';
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  filters: {
    parseTime
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getUsers(this.$apollo).then((data) => {
        this.list = data.users;
        this.listLoading = false;
      });
    },
  },
};
</script>
