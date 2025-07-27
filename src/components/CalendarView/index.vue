<template>
	<view class="calendar-container">
		<view class="calendar-header-overlay">
			<view class="back-today" @click="backToToday">回今天</view>
		</view>
		<view class="calendar-section">
			<uni-calendar
				:date="currentDate"
				:insert="true"
				:start-date="currentMonthStart"
				:end-date="currentMonthEnd"
				:selected="calendarData"
				@change="onSelect"
			/>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { getUniCalendarSelected, periodData } from '@/utils/periodData';
import { useCoreStore } from '@/store/core';
import dayjs from 'dayjs';  
import type { IProps, IEmits } from '@/types/calendar';
import { storeToRefs } from 'pinia';

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const coreStore = useCoreStore();
const { calendarData, currentDate } = storeToRefs(coreStore);

// 根据当前选中日期计算月份范围
const currentMonthStart = computed(() => {
	return dayjs(props.selectedDate).startOf('month').format('YYYY-MM-DD');
});

const currentMonthEnd = computed(() => {
	return dayjs(props.selectedDate).endOf('month').format('YYYY-MM-DD');
});

const updateCalendarSelected = () => {};

onMounted(() => {
	updateCalendarSelected();
});

// 监听选中日期变化，更新日历显示
watch(
	() => props.selectedDate,
	(newDate) => {
		updateCalendarSelected();
	},
	{ immediate: true }
);

// 监听periodData变化，自动更新日历显示
watch(
	() => periodData.value,
	() => {
		updateCalendarSelected();
	},
	{ deep: true }
);

const backToToday = () => {
	const today = dayjs();
	emit('dateChange', today.format('YYYY-MM-DD'));
};

/**
 * 处理日历选择事件
 * @param param uni-calendar组件返回的参数对象
 * {year: 2024, month: 2, date: 24}
 */
const onSelect = (param: any) => {
	if (param?.fulldate) {
		coreStore.updateCurrentDate(param.fulldate);
		emit('dateChange', param.fulldate);
	}
};

// 暴露更新日历选中状态的方法
const refreshCalendar = () => {
	updateCalendarSelected();
};

defineExpose({
	refreshCalendar,
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
