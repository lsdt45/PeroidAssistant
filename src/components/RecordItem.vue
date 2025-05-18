<template>
  <view class="record-item">
    <view class="record-label">
      <view class="icon-wrapper" :class="recordType + '-icon'">
        <nut-icon :name="iconName" size="20" />
      </view>
      <text>{{ label }}</text>
    </view>
    <nut-radio-group
      v-model="recordStatus"
      @change="onStatusChange"
      direction="horizontal"
    >
      <nut-radio shape="button" label="0" class="custom-radio no-btn">{{ noText }}</nut-radio>
      <nut-radio shape="button" label="1" class="custom-radio yes-btn">{{ yesText }}</nut-radio>
    </nut-radio-group>
  </view>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'RecordItem',
  props: {
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
  },
  emits: ['statusChange'],
  setup(props, { emit }) {
    const recordStatus = ref(props.defaultStatus);

    const onStatusChange = () => {
      emit('statusChange', {
        type: props.recordType,
        status: recordStatus.value === '1'
      });
    };

    return {
      recordStatus,
      onStatusChange
    };
  }
});
</script>

<style lang="scss">
@import '../styles/common.scss';
</style> 