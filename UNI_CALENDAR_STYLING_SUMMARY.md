# uni-calendar 组件样式定制总结

## 定制概述

根据原始设计图片，对 uni-calendar 组件进行了全面的样式定制，包括头部箭头、回到今天按钮、日期标记等，使其与应用的整体设计风格保持一致。

## 主要定制内容

### 1. 回到今天按钮

**位置和样式：**
```scss
.calendar-header-overlay {
  position: absolute;
  top: 60rpx;
  right: 40rpx;
  z-index: 10;
  
  .back-today {
    font-size: 24rpx;
    color: #ff6b81;
    padding: 6rpx 20rpx;
    border-radius: 30rpx;
    border: 1px solid #ff6b81;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10rpx);
    box-shadow: 0 2rpx 8rpx rgba(255, 107, 129, 0.2);
  }
}
```

**功能实现：**
```typescript
const backToToday = () => {
  const today = dayjs();
  date.value = today.valueOf();
  dateString.value = today.format('YYYY-MM-DD');
  updateStatusForSelectedDate();
  updateCalendarSelected();
};
```

### 2. 日历整体样式

**容器样式：**
```scss
:deep(.uni-calendar) {
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
```

### 3. 头部样式定制

**头部容器：**
```scss
:deep(.uni-calendar__header) {
  padding: 20rpx 30rpx;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
```

**月份标题：**
```scss
.uni-calendar__header-text {
  font-size: 34rpx;
  font-weight: 500;
  color: #666;
}
```

**左右箭头按钮：**
```scss
.uni-calendar__header-btn-box {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(221, 186, 227, 0.1);
  }
  
  .uni-calendar__header-btn {
    font-size: 28rpx;
    color: #ddbae3;  // 粉紫色调，与原设计一致
    font-weight: bold;
    line-height: 1;
  }
}
```

### 4. 星期标题行样式

```scss
:deep(.uni-calendar__weeks) {
  background-color: #fafafa;
  
  .uni-calendar__weeks-day {
    color: #999;
    font-size: 26rpx;
    font-weight: 500;
  }
}
```

### 5. 日期单元格样式

**普通日期：**
```scss
.uni-calendar__weeks-item-text {
  color: #333;
  font-size: 28rpx;
}
```

**今天的样式：**
```scss
&.uni-calendar__weeks-item--today {
  .uni-calendar__weeks-item-text {
    background-color: #fff;
    border: 2rpx solid #ff6b81;
    border-radius: 50%;
    color: #ff6b81;
    font-weight: bold;
  }
}
```

**选中日期：**
```scss
&.uni-calendar__weeks-item--selected {
  .uni-calendar__weeks-item-text {
    background-color: #ff6b81;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
  }
}
```

**有标记的日期（经期、爱爱记录）：**
```scss
&.uni-calendar__weeks-item--checked {
  .uni-calendar__weeks-item-text {
    background-color: #ffb3ba;  // 浅粉色背景
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
  }
  
  // 如果同时是今天
  &.uni-calendar__weeks-item--today {
    .uni-calendar__weeks-item-text {
      background-color: #ff6b81;
      border: 2rpx solid #fff;
      box-shadow: 0 0 0 2rpx #ff6b81;
    }
  }
}
```

**不可选择的日期：**
```scss
&.uni-calendar__weeks-item--disable {
  .uni-calendar__weeks-item-text {
    color: #ccc;
  }
}
```

**其他月份的日期：**
```scss
&.uni-calendar__weeks-item--isOtherMonth {
  .uni-calendar__weeks-item-text {
    color: #ddd;
  }
}
```

### 6. 标记点样式

```scss
:deep(.uni-calendar__weeks-item-extra) {
  position: absolute;
  bottom: 4rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background-color: #ff6b81;
}
```

## 颜色方案

| 元素 | 颜色值 | 说明 |
|------|--------|------|
| 主色调 | `#ff6b81` | 粉红色，用于今天、选中状态 |
| 箭头颜色 | `#ddbae3` | 粉紫色，与原设计一致 |
| 经期标记 | `#ffb3ba` | 浅粉色，用于经期日期背景 |
| 普通文字 | `#333` | 深灰色 |
| 次要文字 | `#666` | 中灰色 |
| 禁用文字 | `#ccc` | 浅灰色 |

## 技术要点

1. **深度选择器使用**：使用 `:deep()` 选择器来穿透组件样式封装
2. **CSS 类名映射**：准确识别 uni-calendar 的内部 CSS 类名
3. **状态组合处理**：处理多种状态的组合（如今天+有标记）
4. **响应式设计**：使用 rpx 单位确保跨设备兼容性
5. **层级管理**：合理使用 z-index 确保回到今天按钮的显示层级

## 功能特性

- ✅ 自定义左右箭头颜色和样式
- ✅ 添加回到今天按钮
- ✅ 经期日期粉色标记
- ✅ 爱爱记录日期标记
- ✅ 今天日期特殊样式
- ✅ 选中日期高亮
- ✅ 多状态组合显示
- ✅ 悬停效果
- ✅ 圆角和阴影效果

## 兼容性说明

- 样式使用标准 CSS 属性，确保跨平台兼容性
- 使用 uni-app 推荐的 rpx 单位
- 深度选择器语法符合 Vue 3 规范
- 所有样式都经过类型检查验证

## 后续优化建议

1. 可以考虑添加动画效果，如日期切换的过渡动画
2. 可以根据不同记录类型使用不同的标记颜色
3. 可以添加长按日期的交互效果
4. 可以考虑添加农历显示功能 