<template>
	<view class="container">
		<!-- 使用封装的日历组件 -->
		<CalendarView
			:selectedDate="date"
			@dateChange="onDateChange"
		/>

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
	hasPeriod,
	updateLoveData,
	hasLove,
} from '@/utils/periodData';
import dayjs from 'dayjs';

// 当前选中日期
const date = ref(dayjs().format('YYYY-MM-DD'));
const periodStatus = ref('0');
const loveStatus = ref('0');

onMounted(() => {
	loadPeriodData();
	updateStatusForSelectedDate();
});

const updateStatusForSelectedDate = () => {
	periodStatus.value = hasPeriod(date.value) ? '1' : '0';
	loveStatus.value = hasLove(date.value) ? '1' : '0';
};

const onDateChange = (newDate: string) => {
	date.value = newDate;
	// updateStatusForSelectedDate();
};

const onPeriodStatusChange = (isActive: boolean) => {
	updatePeriodData(date.value, isActive);
	// 更新本地状态，保持UI同步
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
