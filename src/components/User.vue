<template>
  <div class="user">
    <h2>用户管理
      <el-button size="small" type="primary"
        style="vertical-align: middle;"
        @click="showDialog(undefined, {}, 'add')">新增用户</el-button>
    </h2>
    <el-table :data="list" border style="width: 100%;">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small"
            @click="showDialog(scope.$index, scope.row, 'edit')">编辑</el-button>
          <el-button size="small" type="danger"
            @click="showDelConfirm(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-if="total > 20"
        layout="prev, pager, next"
        :page-size="20"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="mod == 'add' ? '新增用户' : '编辑用户'"
      size="small"
      :visible.sync="editVisible">
      <el-form :model="user">
        <el-form-item label="用户名" required label-width="80px">
          <el-input v-model="user.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" required label-width="80px">
          <el-input v-model="user.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center;" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      list: [],
      total: 0,
      form: {
        page: 1,
        size: 20
      },
      mod: '',
      editVisible: false,
      user: {
        id: '',
        name: '',
        password: ''
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      return this.$http.post('/auth/user/list', this.form)
      .then((res) => {
        this.list = res.data.list || [];
        this.total = res.data.total;
      }, (err) => {
        console.log(err)
      })
    },
    upsertUser(data) {
      return this.$http.post('/auth/user/upsert', data)
      .then((res) => {
        this.$message(res.data.msg)
      }, (err) => {
        console.log(err)
      })
    },
    delUser(id) {
      return this.$http.post('/auth/user/del', {
        id: id
      })
      .then(async(res) => {
        await this.$message(res.data.msg)
        await this.getUserList()
      }, (err) => {
        console.log(err)
      })
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getUserList();
    },
    showDialog(index, data, mod) {
      this.editVisible = true;
      this.mod = mod;
      this.user = {
        id: data.id || '',
        name: data.name || '',
        password: data.password || ''
      }
    },
    async submitUser() {
      if(this.mod === 'add') {
        delete this.user.id
      }
      await this.upsertUser(this.user)
      await this.getUserList()
      this.editVisible = false
    },
    showDelConfirm(index, data) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.delUser(data.id);
      })
      .catch(() => {
        console.log('取消删除')
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.user
  width: 100%
  padding: 0 12px
  h2
    padding: 7px 0
    font-size: 22px
    font-weight: normal
    color: #585858
  .pagination
    text-align: center
    padding: 10px 0
</style>
