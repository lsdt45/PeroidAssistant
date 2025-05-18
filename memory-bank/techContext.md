# 经期助手（PeriodAssistant）技术上下文

## 技术栈概览

1. **框架与语言**
   - 使用uni-app作为跨平台框架
   - 使用Vue 3的Composition API
   - 使用TypeScript进行类型安全开发
   - 使用SCSS进行样式编写

2. **UI组件**
   - 使用NutUI-uniapp组件库（如nut-calendar、nut-radio-group、nut-radio等）
   - 自定义组件封装（如RecordSection、RecordItem）
   - 使用scss深度选择器(:deep())自定义第三方组件样式

3. **状态管理**
   - 使用Vue 3的响应式API (ref, computed)管理组件状态
   - 使用uni.setStorageSync和uni.getStorageSync进行数据持久化
   - 采用props和emit进行组件间通信

4. **工具库**
   - 使用dayjs处理日期时间
   - 使用uni-app原生API

## 技术实现细节

1. **页面结构**
   - `src/pages/index/index.vue`: 主页面，包含日历和记录区域
   - `src/components/RecordSection.vue`: 记录区域组件，管理多个记录项
   - `src/components/RecordItem.vue`: 单个记录项组件，管理单个记录的显示和状态切换

2. **数据管理**
   - `src/utils/periodData.ts`: 数据操作工具函数
   - 使用接口`PeriodDay`定义数据结构，包含日期、经期状态和爱爱状态
   - 数据通过本地存储持久化，使用JSON格式

3. **样式管理**
   - `src/styles/common.scss`: 公共样式定义
   - 组件内部使用scoped样式
   - 使用深度选择器修改第三方组件样式

## 关键代码结构

1. **数据接口**
   ```typescript
   interface PeriodDay {
     date: number; // timestamp
     hasPeriod: boolean;
     hasLove?: boolean;
   }
   ```

2. **数据操作函数**
   ```typescript
   // 添加或更新经期数据
   export const updatePeriodData = (date: number, hasPeriod: boolean) => {...}
   
   // 添加或更新爱爱数据
   export const updateLoveData = (date: number, hasLove: boolean) => {...}
   
   // 从存储加载数据
   export const loadPeriodData = () => {...}
   
   // 检查日期是否有经期
   export const hasPeriod = (date: number): boolean => {...}
   
   // 检查日期是否有爱爱记录
   export const hasLove = (date: number): boolean => {...}
   
   // 获取日历标记
   export const getCalendarMarks = () => {...}
   ```

3. **组件通信**
   ```typescript
   // 子组件定义props和emits
   props: {
     recordType: { type: String, required: true },
     date: { type: Number, required: true },
     // 其他props...
   },
   emits: ['statusChange'],
   
   // 子组件触发事件
   emit('statusChange', {
     type: props.recordType,
     status: recordStatus.value === '1'
   });
   
   // 父组件监听事件
   <RecordSection
     @periodStatusChange="onPeriodStatusChange"
     @loveStatusChange="onLoveStatusChange"
   />
   ```

4. **日期处理**
   ```typescript
   // 获取当天时间戳
   const date = ref(dayjs().valueOf());
   
   // 格式化日期
   const dateString = computed(() => dayjs(date.value).format("YYYY-MM-DD"));
   
   // 格式化为简单日期显示
   const formatDateSimple = (timestamp: number) => {
     return dayjs(timestamp).format('M月D日');
   };
   ```

## 核心技术挑战

1. **数据持久化**
   - 处理本地存储数据的读写和错误处理
   - 确保数据格式一致性

2. **日期处理**
   - 正确计算和比较日期
   - 在多种格式间转换（时间戳、字符串）
   - 生成符合NutUI日历组件要求的标记数据

3. **组件通信**
   - 维护清晰的组件层次和数据流
   - 确保状态同步和一致性

4. **样式封装**
   - 自定义NutUI组件样式以符合应用设计
   - 确保样式模块化和可维护性

## 未来技术规划

1. **性能优化**
   - 大量数据下的渲染性能优化
   - 数据处理效率优化

2. **功能扩展**
   - 周期预测算法实现
   - 数据可视化统计
   - 提醒系统开发

3. **架构改进**
   - 数据层重构，可能引入Pinia进行全局状态管理
   - API层抽象，为未来云同步做准备
   - 组件复用性提升 