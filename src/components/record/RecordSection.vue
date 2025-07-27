<template>
	<view class="record-section">
		<view class="section-title">
			<text>经期记录 (今天 {{ props.date || '' }})</text>
		</view>

		<RecordItem
			v-for="item in coreStore.recordItems"
			:key="item.recordType"
			:recordType="item.recordType"
			:label="item.label"
			:iconName="item.iconName"
			:noText="item.noText"
			:yesText="item.yesText"
			:date="props.date"
			:modelValue="getStatusForType(item.recordType)"
			@update:modelValue="(value) => updateStatus(item.recordType, value)"
		/>
	</view>
</template>

<script setup lang="ts">
import RecordItem from './RecordItem.vue';
import type { RecordItemConfig } from '@/types/calendar';
import { useCoreStore } from '@/store/core';

const coreStore = useCoreStore();

const props = defineProps({
	date: {
		type: String,
		required: true,
	},
	periodStatus: {
		type: String,
		default: '0',
	},
	loveStatus: {
		type: String,
		default: '0',
	},
});

const emit = defineEmits(['periodStatusChange', 'loveStatusChange']);

// 根据记录类型获取对应的状态
const getStatusForType = (type: string): string => {
	if (type === 'period') return props.periodStatus;
	if (type === 'love') return props.loveStatus;
	return '0';
};

// 更新状态
const updateStatus = (type: string, value: string) => {
	// 更新 store 中的状态
	coreStore.updateRecordItemStatus(type, value);
	
	// 发出事件通知父组件
	if (type === 'period') {
		emit('periodStatusChange', value === '1');
	} else if (type === 'love') {
		emit('loveStatusChange', value === '1');
	}
};

/** 改变recordItems的方法 */
const changeRecordItems = (items: RecordItemConfig[]) => {
	coreStore.updateRecordItems(items);
};

/** 暴露changeRecordItems方法 */
defineExpose({
	changeRecordItems,
});
</script>

<style lang="scss">

.record-section {
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	padding: 0 0 20rpx 0;
}

.section-title {
	padding: 30rpx 30rpx 20rpx;
	font-size: 32rpx;
	font-weight: bold;
	border-bottom: 1px solid #f5f5f5;
}
</style>
