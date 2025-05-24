export interface ICalendarData {
	hasPeriod: boolean;
	hasLove: boolean;
	date: string;
	info?: string;
	data?: {
		custom?: string;
		name?: string;
	};
}

export interface IProps {
	selectedDate: string; // 当前选中的日期时间戳
}
	
export interface IEmits {
	/**
	 * 日期变化事件
	 * @param date 日期时间戳
	 */
	(e: 'dateChange', date: number): void;
}
