import type { ICalendarData } from '@/types';
import type { RecordItemConfig } from '@/types/calendar';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import dayjs from 'dayjs';

export const useCoreStore = defineStore('core', () => {
	const calendarData = ref<ICalendarData[]>();
	/** 当前选中的日期 */
	const currentDate = ref<string>(dayjs().format('YYYY-MM-DD'));

	/** 记录项配置 */
	const recordItems = ref<RecordItemConfig[]>([
		{
			recordType: 'period',
			label: '月经',
			iconName: 'heart-fill',
			noText: '没来',
			yesText: '来了',
			status: '0',
		},
		{
			recordType: 'love',
			label: '爱爱',
			iconName: 'heart',
			noText: '否',
			yesText: '是',
			status: '0',
		},
	]);

	/** 更新日历数据 */
	const updateCalendarData = (data: ICalendarData[]) => {
		calendarData.value = data;
	};

	/** 更新当前选中的日期 */
	const updateCurrentDate = (date: string) => {
		currentDate.value = date;
	};

	/** 更新记录项配置 */
	const updateRecordItems = (items: RecordItemConfig[]) => {
		recordItems.value = items;
	};

	/** 更新特定记录项的状态 */
	const updateRecordItemStatus = (recordType: string, status: string) => {
		const item = recordItems.value.find(item => item.recordType === recordType);
		if (item) {
			item.status = status;
		}
	};

	return {
		calendarData,
		updateCalendarData,
		currentDate,
		updateCurrentDate,
		recordItems,
		updateRecordItems,
		updateRecordItemStatus,
	};
});
