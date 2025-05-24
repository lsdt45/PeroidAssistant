<template>
  <!-- 月经记录 -->
  <view class="record-item">
    <view class="record-label">
      <view class="icon-wrapper period-icon">
        <nut-icon name="heart-fill" size="20" />
      </view>
      <text>月经</text>
    </view>
    <nut-radio-group 
      v-model="periodStatus" 
      @change="onPeriodStatusChange"
      direction="horizontal"
    >
      <nut-radio shape="button" label="0" class="custom-radio no-btn">没来</nut-radio>
      <nut-radio shape="button" label="1" class="custom-radio yes-btn">来了</nut-radio>
    </nut-radio-group>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
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

const periodStatus = ref(props.defaultStatus);

const onPeriodStatusChange = () => {
  emit('statusChange', periodStatus.value === '1');
};
</script>

<style lang="scss">
@import '@/styles/common.scss';
</style> 