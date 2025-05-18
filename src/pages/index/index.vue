<template>
  <view class="container">
    <view class="calendar-section">
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
    </view>

    <!-- 使用封装的记录区域组件 -->
    <RecordSection
      :date="date"
      :periodStatus="periodStatus"
      :loveStatus="loveStatus"
      @periodStatusChange="onPeriodStatusChange"
      @loveStatusChange="onLoveStatusChange"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  loadPeriodData,
  updatePeriodData,
  hasPeriod,
  getCalendarMarks,
  updateLoveData,
  hasLove,
} from "../../utils/periodData";
import dayjs from "dayjs";

// 使用dayjs获取当天的时间戳
const date = ref(dayjs().valueOf());
// 将时间戳转换为YYYY-MM-DD格式的字符串
const dateString = computed(() => dayjs(date.value).format("YYYY-MM-DD"));
// 计算当前月的开始日期和结束日期
const currentMonthStart = computed(() => dayjs().startOf("month").format("YYYY-MM-DD"));
const currentMonthEnd = computed(() => dayjs().endOf("month").format("YYYY-MM-DD"));
const periodStatus = ref("0");
const loveStatus = ref("0");
const calendarMarks = ref<any[]>([]);

onMounted(() => {
  loadPeriodData();
  updateCalendarMarks();
  updateStatusForSelectedDate();
});

const updateCalendarMarks = () => {
  calendarMarks.value = getCalendarMarks();
};

const updateStatusForSelectedDate = () => {
  periodStatus.value = hasPeriod(date.value) ? "1" : "0";
  loveStatus.value = hasLove(date.value) ? "1" : "0";
};

/**
 * 处理日历选择事件
 * @param param 日历组件返回的参数数组
 * 根据NutUI文档，参数格式为：
 * [0]：年，[1]：月，[2]：日，[3]：完整日期字符串YYYY-MM-DD格式，[4]：星期
 */
const onSelect = (param: any) => {
  if (Array.isArray(param) && param.length >= 4) {
    // 将YYYY-MM-DD格式的日期字符串转换为时间戳
    date.value = dayjs(param[3]).valueOf();
    updateStatusForSelectedDate();
  }
};

const onPeriodStatusChange = (isActive: boolean) => {
  updatePeriodData(date.value, isActive);
  updateCalendarMarks();
  // 更新本地状态，保持UI同步
  periodStatus.value = isActive ? "1" : "0";
};

const onLoveStatusChange = (isActive: boolean) => {
  updateLoveData(date.value, isActive);
  // 更新本地状态，保持UI同步
  loveStatus.value = isActive ? "1" : "0";
};
</script>

<style lang="scss">
@import "../../styles/common.scss";

.container {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  background-color: #f8f8f8;
}

.calendar-section {
  margin-bottom: 30rpx;
}
</style>
