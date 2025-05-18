# 项目概述：经期助手应用（PeriodAssistant）

## 项目基本信息
- **项目名称**：经期助手（PeriodAssistant）
- **开发框架**：uni-app
- **目标平台**：
  - 微信小程序
  - 支付宝小程序
  - 百度小程序
  - 头条小程序
  - Android原生应用

## 项目目标
开发一款功能完善、界面友好的经期追踪管理应用，帮助用户：
- 追踪和记录月经周期
- 预测下次月经日期
- 提供个性化提醒服务
- 记录相关症状和生理状况
- 提供健康建议和知识

## 核心功能需求
1. **经期追踪**
   - 日历视图展示月经周期
   - 记录经期开始和结束日期
   - 智能预测下次经期时间

2. **个人资料管理**
   - 用户基本信息设置
   - 周期长度设置
   - 个性化提醒设置

3. **健康记录**
   - 记录症状和情绪
   - 记录体温、体重等健康数据
   - 记录药物使用情况

4. **智能提醒**
   - 经期前提醒
   - 经期开始提醒
   - 药物服用提醒

5. **数据分析**
   - 周期规律分析
   - 症状趋势分析
   - 健康建议生成

6. **知识库**
   - 女性健康知识
   - 常见问题解答

## 技术要求
- 使用uni-app跨平台开发框架
- 前端使用Vue 3开发+TypeScript+Script setup
- 支持多端适配（小程序和原生应用）
- 安全存储用户敏感数据
- 支持在线和离线模式

## 项目阶段
当前项目处于初始阶段，仅完成基础框架搭建，尚未实现任何具体功能。 

# 经期助手（PeriodAssistant）项目规则
## 回复规范
- 请用中文回复所有问题

## 项目命名规范

1. **文件命名**
   - 页面文件：使用小写命名，如 `index.vue`
   - 组件文件：使用PascalCase命名，如 `RecordSection.vue`
   - 工具/服务文件：使用小写命名，如 `periodData.ts`
   - 样式文件：单独放在styles目录下，如 `common.scss`

2. **变量/函数命名**
   - 变量和函数：使用camelCase，如 `getUserData()`
   - 常量：使用UPPER_SNAKE_CASE，如 `MAX_CYCLE_DAYS`
   - 组件属性：使用camelCase，如 `recordType`、`defaultStatus`
   - 类型/接口：使用PascalCase，如 `interface PeriodDay`、`interface RecordItemConfig`

## 代码风格

1. **代码格式**
   - 使用2空格缩进
   - 文件末尾留一空行
   - 使用单引号表示字符串

2. **组件结构**
   - 先template，再script，最后style
   - script标签指定语言，如 `<script lang="ts">`或`<script setup lang="ts">`
   - style标签使用lang="scss"

3. **注释风格**
   - 接口和复杂类型添加描述注释
   - 函数添加功能、参数、返回值注释
   - 复杂逻辑添加详细注释

## 架构原则

1. **组件设计**
   - 单一职责原则：一个组件只负责一个功能
   - 组件通过props传递数据，通过emit传递事件
   - UI组件库使用nutui-uniapp
   - 公共样式抽取为公共样式文件

2. **数据流**
   - 单向数据流：父组件向子组件传递数据
   - 事件向上：子组件向父组件通过事件通信
   - 使用Vue 3的Composition API

3. **性能考量**
   - 使用ref和computed管理响应式数据
   - 使用适当的生命周期钩子（如onMounted）

## 项目特定约定

1. **日期处理**
   - 日期存储使用时间戳（Number类型）
   - 日期处理和格式化统一使用dayjs库
   - 日历标记使用NutUI日历组件的marks属性

2. **状态管理**
   - 使用Vue的ref管理状态
   - 数据持久化使用uni.setStorageSync和uni.getStorageSync
   - 数据加载错误需捕获并记录

3. **UI/UX约定**
   - 使用rpx作为尺寸单位
   - 使用scss深度选择器(:deep())修改第三方组件样式
   - 使用flexbox进行布局

4. **错误处理**
   - 使用try-catch处理可能出现的错误
   - 记录错误日志

## 学习记录

本节会随着项目进展不断更新，记录在项目开发过程中发现的模式和学习内容。

1. **项目结构特点**
   - uni-app项目使用.vue文件作为页面和组件
   - 业务逻辑使用TypeScript编写
   - 使用Vue 3的Composition API
   - 样式使用SCSS

2. **平台特性**
   - 使用uni-app原生API（如uni.setStorageSync）进行存储操作
   - 使用NutUI组件库构建UI界面

3. **当前功能**
   - 经期日历显示和标记
   - 经期记录添加和修改
   - 爱爱记录添加和修改 