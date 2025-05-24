# 日历组件替换总结

## 替换概述

成功将项目中的 `nut-calendar` 组件替换为 `uni-calendar` 组件，以符合 uni-app 官方组件库的使用规范。

## 主要变更

### 1. 组件替换 (`src/pages/index/index.vue`)

**原来的 nut-calendar 配置：**
```vue
<nut-calendar
  :default-value="dateString"
  @select="onSelect"
  :is-auto-back-fill="true"
  type="tiled"
  :poppable="false"
  :start-date="currentMonthStart"
  :end-date="currentMonthEnd"
  :marks="calendarMarks"
/>
```

**替换后的 uni-calendar 配置：**
```vue
<uni-calendar
  :date="dateString"
  :insert="true"
  :start-date="currentMonthStart"
  :end-date="currentMonthEnd"
  :selected="calendarSelected"
  @change="onSelect"
/>
```

### 2. 属性映射对照

| nut-calendar 属性 | uni-calendar 属性 | 说明 |
|-------------------|-------------------|------|
| `:default-value` | `:date` | 当前选中日期 |
| `@select` | `@change` | 日期选择事件 |
| `:poppable="false"` | `:insert="true"` | 插入模式显示 |
| `:marks` | `:selected` | 日期标记数据 |
| `type="tiled"` | 无需设置 | uni-calendar 默认为平铺模式 |
| `:is-auto-back-fill` | 无需设置 | uni-calendar 默认行为 |

### 3. 事件处理更新

**原来的 nut-calendar 事件处理：**
```typescript
// NutUI 返回数组格式：[年, 月, 日, 完整日期字符串, 星期]
const onSelect = (param: any) => {
  if (Array.isArray(param) && param.length >= 4) {
    date.value = dayjs(param[3]).valueOf();
    updateStatusForSelectedDate();
  }
};
```

**替换后的 uni-calendar 事件处理：**
```typescript
// uni-calendar 返回对象格式：{year: 2024, month: 2, date: 24}
const onSelect = (param: any) => {
  if (param && param.year && param.month && param.date) {
    const selectedDateStr = `${param.year}-${param.month.toString().padStart(2, '0')}-${param.date.toString().padStart(2, '0')}`;
    date.value = dayjs(selectedDateStr).valueOf();
    dateString.value = selectedDateStr;
    updateStatusForSelectedDate();
  }
};
```

### 4. 数据格式适配 (`src/utils/periodData.ts`)

新增了 `getUniCalendarSelected` 函数来生成符合 uni-calendar 要求的标记数据：

```typescript
// uni-calendar 期待的 selected 格式
export const getUniCalendarSelected = () => {
  return periodData.value
    .filter(item => item.hasPeriod || item.hasLove)
    .map(item => {
      const dateStr = dayjs(item.date).format('YYYY-MM-DD');
      let info = '';
      const data: any = {};
      
      if (item.hasPeriod && item.hasLove) {
        info = '经期+爱爱';
        data.hasPeriod = true;
        data.hasLove = true;
      } else if (item.hasPeriod) {
        info = '经期';
        data.hasPeriod = true;
      } else if (item.hasLove) {
        info = '爱爱';
        data.hasLove = true;
      }
      
      return {
        date: dateStr,
        info: info,
        data: data
      };
    });
};
```

### 5. 类型定义更新 (`components.d.ts`)

添加了 uni-calendar 组件的类型定义：
```typescript
UniCalendar: typeof import('@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue')['default']
```

## 技术优势

1. **官方支持**：uni-calendar 是 uni-app 官方组件，具有更好的兼容性和长期支持
2. **跨平台一致性**：在不同平台上表现更加一致
3. **性能优化**：官方组件通常有更好的性能优化
4. **文档完善**：官方文档更加详细和准确

## 功能保持

替换后保持了所有原有功能：
- ✅ 日期选择
- ✅ 经期标记显示
- ✅ 爱爱记录标记显示
- ✅ 月份切换
- ✅ 回到今天功能
- ✅ 数据持久化

## 测试结果

- ✅ TypeScript 类型检查通过
- ✅ 项目构建成功
- ✅ 所有功能正常工作

## 注意事项

1. uni-calendar 的 `selected` 属性格式与 nut-calendar 的 `marks` 属性格式不同，需要适配数据格式
2. 事件回调参数格式不同，需要更新事件处理逻辑
3. 某些 nut-calendar 特有的属性在 uni-calendar 中不存在，但功能可以通过其他方式实现

## 后续建议

1. 可以考虑进一步自定义 uni-calendar 的样式以匹配应用设计
2. 可以利用 uni-calendar 的更多功能，如农历显示等
3. 建议在不同平台上进行充分测试，确保跨平台兼容性 