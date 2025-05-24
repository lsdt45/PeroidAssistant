
import type { ICalendarData } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCoreStore = defineStore('core', () => {
	const calendarData = ref<ICalendarData[]>();

	const updateCalendarData = (data: ICalendarData[]) => {
		calendarData.value = data;
	};

	return {
		calendarData,
		updateCalendarData,
	};
});
