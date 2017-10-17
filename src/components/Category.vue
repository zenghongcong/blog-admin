<template>
  <div class="category">
  	<h2>分类管理
  	  <el-button size="small" type="primary" style="vertical-align: middle;"
	      @click="showDialog(undefined, {}, 'add')">新增分类</el-button>
  	</h2>
  	<el-table 
  		:data="list"
  		border
  		style="width: 100%;">
	    <el-table-column
	      prop="id"
	      label="id">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="分类">
	    </el-table-column>
	    <el-table-column label="操作">
	      <template scope="scope">
	        <el-button
	          size="small"
	          @click="showDialog(scope.$index, scope.row, 'edit')">编辑</el-button>
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
  		:title="mod == 'add' ? '新增分类' : '编辑分类'"
  		size="small"
  		:visible.sync="editVisible">
			<el-form :model="category">
			  <el-form-item label="分类" required label-width="60px">
				  <el-input v-model="category.name" auto-complete="off"></el-input>
			  </el-form-item>
			</el-form>
			<div slot="footer" style="text-align: center;" class="dialog-footer">
			  <el-button @click="editVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitCategory">确 定</el-button>
		  </div>
		</el-dialog>
  	
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
   		list: [],
   		total: 0,
   		form: {
   			page: 1,
   			size: 20
   		},
   		mod: '',
   		editVisible: false,
   		category: {
   			id: '',
   			name: ''
   		}
    }
  },
  created(){
  	this.getCategoryList()
  },
  methods: {
  	getCategoryList(){
  		return this.$http.post('/api/category/list', this.form)
  		.then((res) => {
  			this.list = res.data.list || [];
  			this.total = res.data.total;
  		},(err) => {
  			console.log(err)
  		})
  	},
  	upsertCategory(data){
  		return this.$http.post('/api/category/upsert', data)
  		.then((res) => {
  			this.$message(res.data.msg)
  		},(err) => {
  			console.log(err)
  		})
  	},
  	handleCurrentChange(val){
  		this.form.page = val;
  		this.getCategoryList();
  	},
  	showDialog(index, data, mod){
  		this.editVisible = true;
  		this.mod = mod;
  		this.category = {
   			id: data.id || '',
   			name: data.name || ''
   	    };
  	},
  	async submitCategory(){
  		if(this.mod === 'add'){
  			delete this.category.id
  		}
  		await this.upsertCategory(this.category)
  		await this.getCategoryList()
  		this.editVisible = false
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.category
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
