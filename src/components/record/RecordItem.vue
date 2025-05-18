<template>
  <view class="record-item">
    <view class="record-label">
      <view class="icon-wrapper" :class="props.recordType + '-icon'">
        <nut-icon :name="props.iconName" size="20" />
      </view>
      <text>{{ props.label }}</text>
    </view>
    <nut-radio-group
      v-model="recordStatus"
      @change="onStatusChange"
      direction="horizontal"
    >
      <nut-radio shape="button" label="0" class="custom-radio no-btn">{{ props.noText }}</nut-radio>
      <nut-radio shape="button" label="1" class="custom-radio yes-btn">{{ props.yesText }}</nut-radio>
    </nut-radio-group>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  recordType: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  iconName: {
    type: String,
    required: true
  },
  noText: {
    type: String,
    required: true
  },
  yesText: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  defaultStatus: {
    type: String,
    default: '0'
  }
});

const emit = defineEmits(['statusChange']);

const recordStatus = ref(props.defaultStatus);

const onStatusChange = () => {
  emit('statusChange', {
    type: props.recordType,
    status: recordStatus.value === '1'
  });
};
</script>

<style lang="scss">
@import '../../styles/common.scss';
</style> 