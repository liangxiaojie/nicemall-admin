<template>
  <div class="app-container">
    <div class="toolbar">
      <el-button class="filter-item" @click="handleCreate" type="primary" icon="el-icon-edit">创建</el-button>
    </div>
    <div class="filter-container">
      <el-radio-group v-model="listQuery.type" @change="fetchData">
        <el-radio-button :label="-1">全部</el-radio-button>
        <el-radio-button :label="0">普通商品</el-radio-button>
        <el-radio-button :label="1">租赁商品</el-radio-button>
        <el-radio-button :label="2">0元购</el-radio-button>
      </el-radio-group>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="图像" width="120">
        <template slot-scope="scope">
          <img class="gallery-image" :src="scope.row.imgSrc" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="discription" label="描述" />
      <el-table-column label="商品类型">
        <template slot-scope="scope">
          {{ scope.row.type == 0 ? '普通商品' : scope.row.type == 1 ? '租赁商品' : scope.row.type == 2 ? '0元购' : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="priceOld" label="原价" />
      <el-table-column prop="sales" label="销量" />
      <el-table-column prop="store_nums" label="库存数量" />
      <el-table-column prop="mark" label="评分" />
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" style="margin: 0 30px;">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-radio-group v-model="temp.type">
            <el-radio-button :label="0">普通商品</el-radio-button>
            <el-radio-button :label="1">租赁商品</el-radio-button>
            <el-radio-button :label="2">0元购</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="discription">
          <el-input v-model="temp.discription"></el-input>
        </el-form-item>
        <el-form-item label="商品展示图" prop="imgSrc">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="temp.imgSrc" :src="temp.imgSrc" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品轮播图" prop="images">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="temp.images"
            :on-success="handleImagesSuccess"
            :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="temp.price"></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="priceOld">
          <el-input v-model="temp.priceOld"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="store_nums">
          <el-input v-model="temp.store_nums"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodses, createGoods, updateGoods, deleteGoods } from '@/apollo/goods';
import { API_URL } from '@/config';

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        type: -1,
      },
      temp: {
        type: 0,
        name: '',
        discription: '',
        imgSrc: '',
        images: [],
        price: 0,
        priceOld: undefined,
        sales: 0,
        store_nums: 0,
        mark: 0,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '创建',
        update: '编辑',
      },
      rules: {
        imgSrc: [{ required: true, message: '图像不能为空', trigger: 'change' }],
      },
      uploadUrl: '',
    };
  },
  created() {
    this.uploadUrl = `${API_URL}/api/uploads`;
    this.fetchData();
  },
  methods: {
    resetTemp() {
      this.temp = {
        type: 0,
        name: '',
        discription: '',
        imgSrc: '',
        images: [],
        price: 0,
        priceOld: undefined,
        sales: 0,
        store_nums: 0,
        mark: 0,
      }
    },
    fetchData() {
      this.listLoading = true;
      getGoodses(this.$apollo, this.listQuery).then((data) => {
        this.list = data.goodses;
        this.listLoading = false;
      });
    },
    handleAvatarSuccess(res, file) {
      this.temp.imgSrc = res.url;
    },
    handleImagesSuccess(res, file, fileList) {
      this.temp.images = fileList.map(f => ({url: f.response && f.response.url || f.url}))
    },
    beforeAvatarUpload(file) {
      const isAllowFileType = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isAllowFileType) {
        this.$message.error('只能上传 jpg 或 png 格式图像');
      }
      if (!isLt2M) {
        this.$message.error('上传图像大小不能超过 2MB');
      }
      return isAllowFileType && isLt2M;
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createGoods(this.$apollo, this.temp).then((data) => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.fetchData()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, this.temp, row)
      this.temp.images = row.images.map(i => ({url: i}))
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.images = tempData.images.map(i => i.url)
          updateGoods(this.$apollo, tempData).then(data => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.fetchData()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGoods(this.$apollo, row._id).then(data => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.fetchData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.gallery-image {
  max-width: 100px;
}
.avatar-uploader {
  width: 100%;
  display: inline-block;
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &::hover {
      border-color: #409EFF;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.toolbar {
  padding: 10px 0;
}
</style>
