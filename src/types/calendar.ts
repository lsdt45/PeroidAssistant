/**
 * 日历组件相关类型定义
 * 包含日历数据、组件属性、事件和记录配置等接口
 */

/**
 * 基础记录数据接口
 * 包含所有记录类型的共同字段
 */
export interface IBaseRecordData {
	/** 日期字符串，ISO格式 */
	date: string;
	/** 是否有经期记录 */
	hasPeriod: boolean;
	/** 是否有爱爱记录 */
	hasLove: boolean;
}

/**
 * 日历数据接口
 * 继承基础记录数据，添加日历显示相关字段
 */
export interface ICalendarData extends IBaseRecordData {
	/** 可选的附加信息 */
	info?: string;
	/** 可选的自定义数据 */
	data?: {
		/** 自定义字段 */
		custom?: string;
		/** 名称字段 */
		name?: string;
	};
}

/**
 * 日历组件属性接口
 * 定义传入日历组件的props
 */
export interface IProps {
	/** 当前选中的日期时间戳 */
	selectedDate: string;
}
	
/**
 * 日历组件事件接口
 * 定义日历组件向外发射的事件
 */
export interface IEmits {
	/**
	 * 日期变化事件
	 * @param e 事件名称
	 * @param date 日期时间戳
	 */
	(e: 'dateChange', date: string): void;
}

/**
 * 记录项配置接口
 * 用于配置不同类型记录的显示信息
 */
export interface RecordItemConfig {
	/** 记录类型标识 */
	recordType: string;
	/** 显示标签 */
	label: string;
	/** 图标名称 */
	iconName: string;
	/** 无记录时的文本 */
	noText: string;
	/** 有记录时的文本 */
	yesText: string;
	/** 当前状态 */
	status: string;
}
