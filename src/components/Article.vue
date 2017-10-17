<template>
  <div class="article">
  	<h2>文章管理
  	  <el-button size="small" type="primary" style="vertical-align: middle;"
	      @click="showDialog(undefined, {}, 'add')">新增文章</el-button>
  	</h2>
  	<el-table 
  		:data="list"
  		border
  		style="width: 100%;">
	    <el-table-column
	      prop="title"
	      label="标题">
	    </el-table-column>
	    <el-table-column
	      prop="intro"
	      label="简介">
	    </el-table-column>
	    <el-table-column
	      prop="category.name"
	      label="分类">
	    </el-table-column>
	    <el-table-column
	      prop="create_time"
	      :formatter="toDate"
	      label="创建时间">
	    </el-table-column>
	    <el-table-column label="操作">
	      <template scope="scope">
	        <el-button
	          size="small"
	          @click="showDialog(scope.$index, scope.row, 'edit')">编辑</el-button>
	        <el-button
	          size="small"
	          type="danger"
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
  		:title="mod == 'add' ? '新增文章' : '编辑文章'"
  		size="full"
  		:close-on-click-modal="false"
  		:close-on-press-escape="false"
  		:visible.sync="editVisible">
			<el-form :model="article">
			  <el-form-item label="标题" required label-width="60px">
				  <el-input v-model="article.title" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="简介" required label-width="60px">
			    <el-input type="textarea" v-model="article.intro"></el-input>
			  </el-form-item>
			  <el-form-item label="分类" required label-width="60px">
			    <el-select v-model="article.cat_id" placeholder="请选择分类">
			    	<el-option label="JavaScript" value="1"></el-option>
      			<el-option label="HTML" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="内容" required label-width="60px">
				  <quill-editor
				  	v-model="article.content"
				  	ref="quillEditor"
				  	:options="editorOption">
	        </quill-editor>
	      </el-form-item>
			</el-form>
			<div slot="footer" style="text-align: center;" class="dialog-footer">
			  <el-button @click="editVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitArtile">确 定</el-button>
		  </div>
		</el-dialog>
  	
  </div>
</template>

<script>
export default {
  name: 'Article',
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
   		article: {
   			id: '',
   			cat_id: '',
   			title: '',
   			intro: '',
   			create_time: '',
   			content: '',
   		},
   		editorOption: {
   			
   		}
    }
  },
  created(){
  	this.getArticleList()
  },
  methods: {
  	getArticleList(){
  		return this.$http.post('/api/article/list', this.form)
  		.then((res) => {
  			this.list = res.data.list || [];
  			this.total = res.data.total;
  		},(err) => {
  			console.log(err)
  		})
  	},
  	delArticle(id){
  		return this.$http.post('/api/article/del', {id: id})
  		.then(async (res) => {
  			await this.$message(res.data.msg)
  			await this.getArticleList()
  		},(err) => {
  			console.log(err)
  		})
  	},
  	upsertArticle(data){
  		return this.$http.post('/api/article/upsert', data)
  		.then((res) => {
  			this.$message(res.data.msg)
  		},(err) => {
  			console.log(err)
  		})
  	},
  	handleCurrentChange(val){
  		this.form.page = val;
  		this.getArticleList();
  	},
  	toDate(row, column){
		let time = new Date(row.create_time),
			y = time.getFullYear(),
			m = time.getMonth() + 1,
			d = time.getDate(),
			h = time.getHours(),
			mm = time.getMinutes(),
			s = time.getSeconds();
		
			return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
  	},
  	showDialog(index, data, mod){
  		this.editVisible = true;
  		this.mod = mod;
  		this.article = {
   			id: data.id || '',
   			cat_id: data.cat_id == undefined ? '' : data.cat_id + '',
   			title: data.title || '',
   			intro: data.intro || '',
   			create_time: data.create_time || '',
   			content: data.content || ''
   	  };
  	},
  	async submitArtile(){
  		if(this.mod === 'add'){
  			delete this.article.id
  			delete this.article.create_time
  		}
  		await this.upsertArticle(this.article)
  		await this.getArticleList()
  		this.editVisible = false;
  	},
  	showDelConfirm(index, data){
  		this.$confirm('确认删除？', '提示', {
  			confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
  		})
  		.then(() => {
  		 	this.delArticle(data.id);
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
.article
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
