import { ref } from 'vue';
import dayjs from 'dayjs';

export interface IPeriodDay {
	date: string;
	hasPeriod: boolean;
	hasLove?: boolean; // 添加爱爱记录字段
}

// Store period data
export const periodData = ref<IPeriodDay[]>([]);

// Add or update period data
export const updatePeriodData = (date: string, hasPeriod: boolean) => {
	const existingIndex = periodData.value.findIndex((item) => {
		// 使用dayjs比较日期，检查是否是同一天
		return (
			dayjs(item.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
		);
	});

	if (existingIndex >= 0) {
		// Update existing record
		periodData.value[existingIndex].hasPeriod = hasPeriod;
	} else {
		// Add new record
		periodData.value.push({ date, hasPeriod });
	}

	// Store data to local storage
	uni.setStorageSync('period_data', JSON.stringify(periodData.value));
};

// Add or update love data
export const updateLoveData = (date: string, hasLove: boolean) => {
	const existingIndex = periodData.value.findIndex((item) => {
		// 使用dayjs比较日期，检查是否是同一天
		return (
			dayjs(item.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
		);
	});

	if (existingIndex >= 0) {
		// Update existing record
		periodData.value[existingIndex].hasLove = hasLove;
	} else {
		// Add new record
		periodData.value.push({ date, hasPeriod: false, hasLove });
	}

	// Store data to local storage
	uni.setStorageSync('period_data', JSON.stringify(periodData.value));
};

// Load period data from storage
export const loadPeriodData = () => {
	try {
		const data = uni.getStorageSync('period_data');
		if (data) {
			periodData.value = JSON.parse(data);
		}
	} catch (e) {
		console.error('Failed to load period data', e);
	}
};

// Check if a date has a period
export const hasPeriod = (date: string): boolean => {
	return periodData.value.some((item) => {
		// 使用dayjs比较日期，检查是否是同一天
		return dayjs(item.date).format('YYYY-MM-DD') === date && item.hasPeriod;
	});
};

// Check if a date has love record
export const hasLove = (date: string): boolean => {
	return periodData.value.some((item) => {
		// 使用dayjs比较日期，检查是否是同一天
		return dayjs(item.date).format('YYYY-MM-DD') === date && item.hasLove;
	});
};

// Get calendar markers for NutUI Calendar
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

// Get calendar selected data for uni-calendar component
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
