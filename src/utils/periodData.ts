/** @format */

import { ref } from 'vue';
import dayjs from 'dayjs';
import { type IBaseRecordData, type ICalendarData } from '@/types';
import { cloneDeep } from 'lodash';
import { useCoreStore } from '@/store/core';
import { storeToRefs } from 'pinia';

const coreStore = useCoreStore();
const { calendarData } = storeToRefs(coreStore);

export const periodData = ref<IBaseRecordData[]>([]);

export const updatePeriodData = (date: string, hasPeriod: boolean) => {
	const formattedDate = dayjs(date).format('YYYY-MM-DD');

	// 更新calendarData（Pinia存储）
	const _calendarData = cloneDeep(calendarData.value || []);
	const existingIndex = _calendarData.findIndex((item) => item.date === formattedDate);

	if (existingIndex >= 0) {
		const existingItem = _calendarData[existingIndex];
		existingItem.hasPeriod = hasPeriod;
		existingItem.info = getInfoText(hasPeriod, existingItem.hasLove);
	} else {
		_calendarData.push({
			date: formattedDate,
			hasPeriod,
			hasLove: false,
			info: getInfoText(hasPeriod, false),
		});
	}

	// 更新Pinia store
	coreStore.updateCalendarData(_calendarData);

	// 同步更新periodData
	const periodIndex = periodData.value.findIndex((item) => item.date === formattedDate);

	if (periodIndex >= 0) {
		periodData.value[periodIndex].hasPeriod = hasPeriod;
	} else if (hasPeriod) {
		periodData.value.push({
			date: formattedDate,
			hasPeriod,
			hasLove: false,
		});
	}

	uni.setStorageSync('period_data', JSON.stringify(periodData.value));
};

export const updateLoveData = (date: string, hasLove: boolean) => {
	const formattedDate = dayjs(date).format('YYYY-MM-DD');

	const _calendarData = cloneDeep(calendarData.value || []);
	const existingIndex = _calendarData.findIndex((item) => item.date === formattedDate);

	if (existingIndex >= 0) {
		// 更新已存在的记录
		_calendarData[existingIndex].hasLove = hasLove;
		// 更新info字段
		const hasPeriod = _calendarData[existingIndex].hasPeriod;
		_calendarData[existingIndex].info = getInfoText(hasPeriod, hasLove);
	} else {
		// 添加新记录
		_calendarData.push({
			date: formattedDate,
			hasPeriod: false,
			hasLove,
			info: hasLove ? '爱爱' : '',
		});
	}

	// 更新Pinia store
	coreStore.updateCalendarData(_calendarData);

	// 同步更新periodData
	const periodIndex = periodData.value.findIndex((item) => dayjs(item.date).format('YYYY-MM-DD') === formattedDate);

	if (periodIndex >= 0) {
		// 更新已存在的记录
		periodData.value[periodIndex].hasLove = hasLove;
	} else if (hasLove) {
		// 只有当hasLove为true时才添加新记录
		periodData.value.push({
			date: formattedDate,
			hasPeriod: false,
			hasLove,
		});
	}

	uni.setStorageSync('period_data', JSON.stringify(periodData.value));
};

// 提取获取info文本的公共函数
const getInfoText = (hasPeriod: boolean, hasLove: boolean): string => {
	if (hasPeriod && hasLove) {
		return '经期+爱爱';
	} else if (hasPeriod) {
		return '经期';
	} else if (hasLove) {
		return '爱爱';
	}
	return '';
};

// Load period data from storage
export const loadPeriodData = () => {
	try {
		const data = uni.getStorageSync('period_data');
		if (data) {
			periodData.value = JSON.parse(data);

			// 将periodData转换为ICalendarData格式并更新到store
			const calendarDataArray: ICalendarData[] = periodData.value.map((item) => ({
				date: item.date,
				hasPeriod: item.hasPeriod,
				hasLove: item.hasLove || false,
				info: getInfoText(item.hasPeriod, item.hasLove || false),
			}));

			// 更新Pinia store
			coreStore.updateCalendarData(calendarDataArray);
		}
	} catch (e) {
		console.error('Failed to load period data', e);
	}
};

export const hasLove = (date: string): boolean => {
	return periodData.value.some((item) => {
		// 使用dayjs比较日期，检查是否是同一天
		return dayjs(item.date).format('YYYY-MM-DD') === date && item.hasLove;
	});
};

export const getCalendarMarks = () => {
	return periodData.value
		.filter((item) => item.hasPeriod)
		.map((item) => {
			// 使用dayjs获取年月日
			const d = dayjs(item.date);
			return {
				type: 'dot',
				color: '#FF6666',
				date: d.date(),
				month: d.month() + 1, // dayjs月份从0开始，需要+1
				year: d.year(),
			};
		});
};

export const getUniCalendarSelected = () => {
	return periodData.value
		.filter((item) => item.hasPeriod || item.hasLove)
		.map((item) => {
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
				data: data,
			};
		});
};
