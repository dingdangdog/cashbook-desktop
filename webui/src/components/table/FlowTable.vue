<template>
  <!-- 表格查询框与操作按钮 -->
  <el-row class="queryRow">
    <div class="table-header pc-button" v-if="edit == 'show'">
      <el-button type="primary" @click="dialogUpdateVisible = true">导入</el-button>
    </div>
    <div class="table-header pc-button" v-if="edit == 'show'">
      <el-button type="success" @click="exportFlows()">导出</el-button>
    </div>

    <div class="table-header queryParam">
      <el-date-picker
        :style="datePickerStyle"
        class="date-picker"
        v-model="flowQuery.startDay"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="开始时间"
      />
    </div>
    <div class="table-header queryParam">
      <el-date-picker
        :style="datePickerStyle"
        class="date-picker"
        v-model="flowQuery.endDay"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="结束时间"
      />
    </div>
    <div class="table-header queryParam">
      <el-select
        v-model="flowQuery.flowType"
        class="m-2"
        placeholder="流水类型"
        @change="changeTypes"
        clearable
      >
        <el-option
          v-for="item in flowTypeOptions"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="table-header queryParam">
      <el-select v-model="flowQuery.payType" class="m-2" :placeholder="payTypeLabel" clearable>
        <el-option
          v-for="item in paymentTypeOptions"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="table-header queryParam">
      <el-select v-model="flowQuery.type" class="m-2" :placeholder="typeLabel" clearable>
        <el-option
          v-for="item in expenseTypeOptions"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="table-header queryParam max-button">
      <el-input v-model="flowQuery.name" clearable placeholder="名称" />
    </div>

    <div class="table-header queryParam max-button">
      <el-input v-model="flowQuery.description" clearable placeholder="备注" />
    </div>

    <div class="table-header query-icon">
      <el-button :icon="Search" circle @click="doQuery()" />
    </div>

    <div class="table-header pc-button" v-if="edit == 'show'">
      <el-button type="primary" @click="openCreateDialog(formTitle[0])">新增</el-button>
    </div>
    <div class="table-header pc-button" v-if="edit == 'show'">
      <el-button type="danger" @click="deleteFlows">删除</el-button>
    </div>

    <div class="table-header pc-button" v-if="edit == 'show'">
      <el-button type="primary" @click="showExcelImportDialogFlag.visible = true"
        >Excel导入</el-button
      >
    </div>
  </el-row>
  <hr />
  <!-- 表格主体数据列表 -->
  <div class="el-table-div">
    <el-table
      v-loading="loading"
      :data="flowPageRef.pageData"
      :default-sort="{ prop: 'money', order: 'null' }"
      @sort-change="moneySortFunc"
      @selection-change="handleSelectionChange"
      row-key="row"
      max-height="calc(100vh - 18rem)"
    >
      <el-table-column type="selection" min-width="40" />
      <!-- <el-table-column type="index" label="序号" min-width="40" /> -->
      <el-table-column prop="id" label="ID" v-if="false" />
      <el-table-column prop="day" label="日期" :formatter="timeFormatter" min-width="80" />
      <el-table-column prop="flowType" label="流水类型" min-width="60" />
      <el-table-column prop="payType" :label="payTypeLabel" min-width="80" />
      <el-table-column prop="type" :label="typeLabel" min-width="80" />
      <el-table-column prop="money" label="金额（元）" min-width="80" sortable="custom" />
      <el-table-column prop="name" label="名称" min-width="100" show-overflow-tooltip />
      <el-table-column
        prop="description"
        label="备注"
        min-width="100"
        show-overflow-tooltip
        v-if="deviceAgent() === 'pc'"
      />
      <el-table-column label="操作" width="150" v-if="edit == 'show'">
        <template v-slot="scop">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="openUpdateDialog(formTitle[1], scop.row)"
          />
          <el-button type="danger" :icon="Delete" circle @click="deleteById(scop.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </div>

  <hr />
  <!-- 表格分页插件 -->
  <div class="pageDiv">
    <span class="pageSpan">
      <span style="float: left; color: rgb(76, 152, 112)">
        &nbsp;&nbsp;总收入：<b>{{ Number(flowPageRef.totalIn.toFixed(2)) }}</b>
      </span>
      <span style="float: left; color: rgb(217, 159, 8)">
        &nbsp;&nbsp;总支出：<b>{{ Number(flowPageRef.totalOut.toFixed(2)) }}</b>
      </span>
      <span style="float: left; color: rgb(66, 66, 66)">
        &nbsp;&nbsp;不计收支：<b>{{ Number(flowPageRef.notInOut.toFixed(2)) }}</b>
      </span>
      <!-- {{ flowQuery }},{{ flowPageRef }} -->
      <el-pagination
        :current-page="flowQuery.pageNum"
        :page-size="flowQuery.pageSize"
        :total="flowPageRef.totalCount"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="pageSizeChange"
        @current-change="pageNumChange"
        background
        layout="->, total, sizes, prev, pager, next"
      >
      </el-pagination>
    </span>
  </div>

  <!-- 弹出框表单：新增和修改通用 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogFormTitle"
    :fullscreen="miniScreen"
    width="40rem"
  >
    <div class="el-dialog-main">
      <el-form ref="dialogFormRef" :model="flowRef" :rules="rules">
        <el-form-item label="日期" :label-width="formLabelWidth" prop="day">
          <el-date-picker
            v-model="flowRef.day"
            type="date"
            format="YYYY/MM/DD"
            :default-value="new Date(flowRef.day || new Date())"
            value-format="YYYY-MM-DD"
            placeholder="选择"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="流水类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="flowRef.flowType" placeholder="选择" clearable @change="changeTypes">
            <el-option
              v-for="item in flowTypeDialogOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="payTypeLabel" :label-width="formLabelWidth" prop="payType">
          <el-select
            v-model="flowRef.payType"
            placeholder="选择或输入"
            clearable
            filterable
            allow-create
          >
            <el-option
              v-for="item in paymentTypeOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="typeLabel" :label-width="formLabelWidth" prop="type">
          <el-select
            v-model="flowRef.type"
            placeholder="选择或输入"
            clearable
            filterable
            allow-create
          >
            <el-option
              v-for="item in expenseTypeOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="金额" :label-width="formLabelWidth" prop="money">
          <el-input-number v-model="flowRef.money" :min="0" />
        </el-form-item>

        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="flowRef.name" style="width: 300px" />
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth" prop="description" textarea>
          <el-input v-model="flowRef.description" style="width: 400px" />
        </el-form-item>
      </el-form>
    </div>
    <!-- 表单确认按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(dialogFormRef, false)"> 取消 </el-button>
        <el-button type="primary" @click="confirmForm(dialogFormRef, false)"> 确定 </el-button>
        <el-button
          type="success"
          v-if="formTitle[0] === dialogFormTitle"
          @click="confirmForm(dialogFormRef, true)"
        >
          确定并继续
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 文件导入窗口 -->
  <el-dialog v-model="dialogUpdateVisible" title="文件上传" :fullscreen="miniScreen">
    <div class="el-dialog-main">
      <el-radio-group v-model="importFlag" class="ml-4">
        <el-radio label="overwrite" size="large"><b style="color: red">删除原有流水</b></el-radio>
        <el-radio label="add" size="large"><b>保留原有流水</b></el-radio>
      </el-radio-group>
      <hr />
      <el-upload :auto-upload="false" :on-change="readJsonInfo" v-model:file-list="fileList">
        <el-button type="primary">导入Json文件</el-button>
        <template #tip>
          <div class="el-upload__tip">仅支持上传Json文件</div>
        </template>
      </el-upload>
    </div>
  </el-dialog>

  <el-dialog
    v-model="showExcelImportDialogFlag.visible"
    title="Excel导入流水"
    :fullscreen="true"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <FlowExcelImport />
  </el-dialog>
</template>

<script setup lang="ts">
// 第三方库引入
import { ref, onMounted, reactive, watch, provide } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import type { FormInstance, FormRules, UploadFile, UploadUserFile } from 'element-plus'

// 私有引入
import {
  getFlowPage,
  deleteFlow,
  createFlow,
  update,
  getAll,
  importFlows,
  deleteFlowsApi
} from '@/api/api.flow'
import { getFlowType, getExpenseType, getPaymentType } from '@/api/api.typer'
import { dateFormater, deviceAgent, timeFormatter } from '@/utils/common'
import { exportJson } from '@/utils/fileUtils'
import { flowQuery } from '@/utils/store'
import type { Page } from '@/types/page'
import type { Flow } from '@/types/model/flow'
import type { Typer } from '@/types/model/typer'

import { defineAsyncComponent } from 'vue'
import router from '@/router'
import { showExcelImportDialogFlag } from '@/stores/flag'
import type { FlowExport } from '@/types/view'

// 异步组件引用
const FlowExcelImport = defineAsyncComponent(
  () => import('@/components/dialog/FlowExcelImport.vue')
)

// 使用 props 来接收外部传入的参数
const { edit } = defineProps(['edit'])

// 初始化后自动执行
onMounted(() => {
  doQuery()
  getTypes()
})

const typeLabel = ref('支出/收入类型')
const payTypeLabel = ref('支付/收款方式')
/*
 * 集中定义常量
 */
// 流水类型
const flowTypeOptions = ref<Typer[]>([{ value: '支出' }, { value: '收入' }, { value: '不计收支' }])
const flowTypeDialogOptions = ref<Typer[]>([
  { value: '支出' },
  { value: '收入' },
  { value: '不计收支' }
])

const typeDefault: Typer[] = [{ value: '请先选择流水类型' }]
// 消费类型/收入类型
const expenseTypeOptions = ref<Typer[]>(typeDefault)
// 支付类型
const paymentTypeOptions = ref<Typer[]>(typeDefault)

const getTypes = () => {
  getFlowType().then((data) => {
    // 初始化时，流水类型不做控制
    changeTypes(undefined)
  })
}

// 修改FlowType后联动
const changeTypes = (flowType: string | undefined) => {
  if (flowType === '支出') {
    typeLabel.value = '支出类型'
    payTypeLabel.value = '支付方式'
  } else if (flowType === '收入') {
    typeLabel.value = '收入类型'
    payTypeLabel.value = '收款方式'
  } else {
    typeLabel.value = '支出/收入类型'
    payTypeLabel.value = '支付/收款方式'
  }
  if (!flowType) {
    expenseTypeOptions.value = typeDefault
    paymentTypeOptions.value = typeDefault
    return
  }
  getExpenseType(flowType).then((data) => {
    expenseTypeOptions.value = data
  })
  getPaymentType(flowType).then((data) => {
    paymentTypeOptions.value = data
  })
}

// 小屏幕
const miniScreen = ref(false)
if (document.body.clientWidth <= 480) {
  miniScreen.value = true
}

// 时间选择器
const datePickerStyle = ref('')
if (document.body.clientWidth <= 480) {
  datePickerStyle.value = 'width: auto'
}

// 分页数据结果
const flowPage: Page<Flow> = {
  pageNum: 1,
  pageSize: 0,
  totalPage: 1,
  totalCount: 0,
  totalOut: 0,
  totalIn: 0,
  notInOut: 0,
  pageData: []
}

// 初始化空对象，用于新增、修改的弹出框数据绑定
const flow: Flow = {
  id: undefined,
  day: undefined,
  flowType: undefined,
  type: undefined,
  payType: undefined,
  money: undefined,
  name: undefined,
  description: undefined
}

// 表单输入框校验规则
const rules = ref<FormRules>({
  day: [{ required: true, type: 'date', message: '请选择日期！', trigger: 'blur' }],
  flowType: [{ required: true, message: '请选择流水类型！', trigger: 'blur' }],
  type: [{ required: true, message: '请选择消费类型！', trigger: 'blur' }],
  money: [{ required: true, message: '请输入金额！', trigger: 'blur' }],
  payType: [{ required: true, message: '请选择支付方式！', trigger: 'blur' }]
})

// 表单弹窗标题选项
const formTitle = ['新增流水', '修改流水']
/**
 * 组件属性绑定
 */
// 加载蒙版显示控制器
const loading = ref(true)
// 表单弹窗显示控制器
const dialogFormVisible = ref(false)
// 导入弹窗显示控制器
const dialogUpdateVisible = ref(false)
// 表单弹窗标题
const dialogFormTitle = ref(formTitle[0])
// 表单输入框宽度
const formLabelWidth = ref('200px')
if (document.body.clientWidth <= 480) {
  formLabelWidth.value = '100px'
}
// 表单实例
const dialogFormRef = ref<FormInstance>()
// 分页数据绑定
const flowPageRef = ref(flowPage)
// 表单弹窗数据绑定
const flowRef = reactive(flow)

// 切换页码
const pageNumChange = (pageNum: number) => {
  flowQuery.pageNum = pageNum
  doQuery()
}

// 切换分页容量
const pageSizeChange = (pageSize: number) => {
  flowQuery.pageSize = pageSize
  doQuery()
}

// 执行分页数据查询
const doQuery = () => {
  getFlowPage(flowQuery).then((res) => {
    flowPageRef.value = res
    loading.value = false
  })
}

// 金额排序
const moneySortFunc = (obj: any) => {
  console.log(obj)
  if (obj.order === 'ascending') {
    flowQuery.moneySort = 'ASC'
  } else if (obj.order === 'descending') {
    flowQuery.moneySort = 'DESC'
  } else {
    flowQuery.moneySort = ''
  }
  doQuery()
}

// 提交表单（新增或修改）
const confirmForm = async (dialogForm: FormInstance | undefined, closeDialog: boolean) => {
  if (!dialogForm) return
  if (
    !(await dialogForm.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
        return false
      }
    }))
  ) {
    return
  }
  if (formTitle[0] === dialogFormTitle.value) {
    // 新增
    createOne()
  } else {
    // 修改
    updateOne()
  }
  resetForm(dialogForm, closeDialog)
}

// 重置表单数据
const resetForm = (formEl: FormInstance | undefined, showDialog: boolean) => {
  if (!formEl) return
  if (showDialog) {
    flowRef.money = undefined
    // flowRef.day = ''
    flowRef.name = ''
  } else {
    formEl.resetFields()
  }
  dialogFormVisible.value = showDialog
}

// 创建
const createOne = () => {
  createFlow({
    day: dateFormater('YYYY-MM-dd', flowRef.day || new Date()),
    bookId: bookId,
    flowType: flowRef.flowType,
    type: flowRef.type,
    money: flowRef.money,
    payType: flowRef.payType,
    name: flowRef.name,
    description: flowRef.description
  })
    .then((res) => {
      if (res.id) {
        doQuery()
        ElMessage({
          type: 'success',
          message: '新增成功!'
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '新增出现异常'
      })
    })
}

// 更新
const updateOne = () => {
  update(flowRef.id || -1, {
    day: dateFormater('YYYY-MM-dd', flowRef.day || new Date()),
    bookId: bookId,
    flowType: flowRef.flowType,
    type: flowRef.type,
    money: flowRef.money,
    payType: flowRef.payType,
    name: flowRef.name,
    description: flowRef.description
  })
    .then((res) => {
      // console.log(res);
      if (res.id) {
        doQuery()
        ElMessage({
          type: 'success',
          message: '更新成功!'
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '更新出现异常'
      })
    })
}

// 删除
const deleteById = (id: number) => {
  ElMessageBox.confirm('确定删除此流水？', '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteFlow(id)
        .then(() => {
          doQuery()
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: '删除失败'
          })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

// 批量删除
const deleteFlows = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error('请至少选择一条要删除的流水')
    return
  }
  ElMessageBox.confirm(`确定删除选中的【${multipleSelection.value.length}】条流水？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteFlowsApi(multipleSelection.value.map((flow) => flow.id))
        .then(() => {
          doQuery()
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: '删除失败'
          })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

// 打开新增弹窗
const openCreateDialog = (title: string) => {
  typeLabel.value = '支出/收入类型'
  payTypeLabel.value = '支付/收款方式'
  dialogFormTitle.value = title
  dialogFormVisible.value = true
}
// 打开修改弹窗
const openUpdateDialog = (title: string, updateFlow: Flow) => {
  dialogFormTitle.value = title
  dialogFormVisible.value = true

  flowRef.id = updateFlow.id
  flowRef.bookId = updateFlow.bookId
  flowRef.day = updateFlow.day
  flowRef.flowType = updateFlow.flowType
  flowRef.type = updateFlow.type
  flowRef.payType = updateFlow.payType
  flowRef.money = updateFlow.money
  flowRef.name = updateFlow.name
  flowRef.description = updateFlow.description
}

/**
 * 文件上传相关代码
 */
const importFlag = ref('overwrite')

const fileList = ref<UploadUserFile[]>([])

const importFlowList: any = []
// 读取json文件并导入
const readJsonInfo = (flie: UploadFile) => {
  flie.raw?.text().then((data) => {
    const jsonFlows: Flow[] = JSON.parse(data)
    jsonFlows.forEach((flow) => {
      // 数据转换
      importFlowList.push({
        id: flow.id,
        day: flow.day,
        flowType: flow.flowType,
        type: flow.type,
        bookId: bookId,
        payType: flow.payType,
        money: flow.money,
        name: flow.name,
        description: flow.description
      })
    })
    // 调用导入接口
    importFlows(importFlag.value, importFlowList)
      .then((res) => {
        console.log(res)
        if (res > 0) {
          ElMessageBox.alert('共导入' + res + '条流水', '导入成功', {
            confirmButtonText: '确定',
            callback: () => {
              dialogFormVisible.value = false
              dialogUpdateVisible.value = false
              doQuery()
              router.push({ path: '/index/flows' })
            }
          })
        } else {
          ElMessage.error('导入失败，请重试！')
        }
      })
      .catch(() => {
        ElMessage.error('导入失败，请重试！')
      })
    //console.log(importFlowList);
  })
}

const bookName = localStorage.getItem('bookName')
const bookId = localStorage.getItem('bookId')
// 导出方法(前台导出，后台负责要导出的查询数据)
const exportFlows = () => {
  getAll(flowQuery)
    .then((data) => {
      const fileName = bookName + '-' + new Date().getTime() + '.json'
      exportJson(fileName, JSON.stringify(data))
    })
    .catch(() => {
      ElMessage.error('数据获取出错，无法导出！')
    })
}

const multipleSelection = ref<Flow[]>([])

const handleSelectionChange = (val: Flow[]) => {
  multipleSelection.value = val
}

watch(flowQuery, () => {
  doQuery()
})

const flowMethods: FlowExport = {
  query: () => {
    doQuery()
  }
}

provide('flowMethods', flowMethods)
</script>

<style scoped>
.table-header {
  margin: 0.5rem 0.5rem;
  display: flex; /* 设置body为flex布局 */
  justify-content: center; /* 横向居中 */
  align-items: center; /* 纵向居中 */
}

.queryRow .queryParam {
  width: 10rem;
}

.pageDiv {
  margin: 10px 0;
  /* width: 85%; */
}

.el-table {
  overflow-x: auto;
  overflow-y: auto;
}

.max-button {
  display: block;
}
@media screen and (max-width: 1920px) {
  .max-button {
    display: none;
  }
}
</style>
