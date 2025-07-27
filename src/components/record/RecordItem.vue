<template>
	<view class="record-item">
		<view class="record-label">
			<view class="icon-wrapper" :class="props.recordType + '-icon'">
				<nut-icon :name="props.iconName" size="20" />
			</view>
			<text>{{ props.label }}</text>
		</view>
		<nut-radio-group v-model="recordStatus" direction="horizontal">
			<nut-radio shape="button" label="0" class="custom-radio no-btn">{{
				props.noText
			}}</nut-radio>
			<nut-radio shape="button" label="1" class="custom-radio yes-btn">{{
				props.yesText
			}}</nut-radio>
		</nut-radio-group>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	recordType: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	iconName: {
		type: String,
		required: true,
	},
	noText: {
		type: String,
		required: true,
	},
	yesText: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	modelValue: {
		type: String,
		default: '0',
	},
});

const emit = defineEmits(['update:modelValue']);

// 使用 computed 实现 v-model 双向绑定
const recordStatus = computed({
	get: () => props.modelValue,
	set: (value: string) => {
		emit('update:modelValue', value);
	},
});
</script>

<style lang="scss">
@import '@/styles/common.scss';
.custom-radio {
	margin-left: 20rpx;
	border-radius: 40rpx !important;
	padding: 10rpx 40rpx !important;
}
</style>
