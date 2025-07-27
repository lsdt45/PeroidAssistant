<template>
	<view class="container">
		<!-- 使用封装的日历组件 -->
		<CalendarView :selectedDate="date" @dateChange="onDateChange" />

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
import { ref, onMounted } from 'vue';
import {
	loadPeriodData,
	updatePeriodData,
	updateLoveData,
	hasLove,
} from '@/utils/periodData';
import dayjs from 'dayjs';
import CalendarView from '@/components/CalendarView/index.vue';
import RecordSection from '@/components/record/RecordSection.vue';
import { useCoreStore } from '@/store/core';
// 当前选中日期
const date = ref(dayjs().format('YYYY-MM-DD'));
const periodStatus = ref('0');
const loveStatus = ref('0');
const coreStore = useCoreStore();
defineOptions({
  styleIsolation: 'apply-shared'
})
onMounted(() => {
	loadPeriodData();
	updateStatusForSelectedDate();
});

const updateStatusForSelectedDate = () => {
	// 根据当前选择的日期，从calendarData匹配对应日期的数据
	const calendarData = coreStore.calendarData?.find(
		(item) => item.date === date.value
	);
	
	// 更新本地状态
	periodStatus.value = calendarData?.hasPeriod ? '1' : '0';
	loveStatus.value = calendarData?.hasLove ? '1' : '0';
	
	// 同步更新store中的状态
	coreStore.updateRecordItemStatus('period', periodStatus.value);
	coreStore.updateRecordItemStatus('love', loveStatus.value);
};

const onDateChange = (newDate: string) => {
	date.value = newDate;
	updateStatusForSelectedDate();
	coreStore.updateCurrentDate(newDate);
};

const onPeriodStatusChange = (isActive: boolean) => {
	updatePeriodData(date.value, isActive);
	periodStatus.value = isActive ? '1' : '0';
};

const onLoveStatusChange = (isActive: boolean) => {
	updateLoveData(date.value, isActive);
	// 更新本地状态，保持UI同步 
	loveStatus.value = isActive ? '1' : '0';  
};
</script>

<style lang="scss">
@import '@/styles/common.scss';
.container {
	display: flex;
	flex-direction: column;
	padding: 20rpx;
	background-color: #f8f8f8;
}
</style>
