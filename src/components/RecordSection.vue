<template>
  <view class="record-section">
    <view class="section-title">
      <text>经期记录 (今天 {{ formatDateSimple(date) }})</text>
    </view>
    
    <RecordItem 
      v-for="item in recordItems" 
      :key="item.recordType"
      :recordType="item.recordType"
      :label="item.label"
      :iconName="item.iconName"
      :noText="item.noText"
      :yesText="item.yesText"
      :date="date"
      :defaultStatus="getStatusForType(item.recordType)"
      @statusChange="onStatusChange"
    />
  </view>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import dayjs from 'dayjs';
import RecordItem from './RecordItem.vue';

interface RecordItemConfig {
  recordType: string;
  label: string;
  iconName: string;
  noText: string;
  yesText: string;
}

export default defineComponent({
  name: 'RecordSection',
  components: {
    RecordItem
  },
  props: {
    date: {
      type: Number,
      required: true
    },
    periodStatus: {
      type: String,
      default: '0'
    },
    loveStatus: {
      type: String,
      default: '0'
    }
  },
  emits: ['periodStatusChange', 'loveStatusChange'],
  setup(props, { emit }) {
    // 配置不同记录类型的数据
    const recordItems = ref<RecordItemConfig[]>([
      {
        recordType: 'period',
        label: '月经',
        iconName: 'heart-fill',
        noText: '没来',
        yesText: '来了'
      },
      {
        recordType: 'love',
        label: '爱爱',
        iconName: 'heart',
        noText: '否',
        yesText: '是'
      }
    ]);

    // 根据记录类型获取对应的状态
    const getStatusForType = (type: string): string => {
      if (type === 'period') return props.periodStatus;
      if (type === 'love') return props.loveStatus;
      return '0';
    };

    // 状态变更处理
    const onStatusChange = (data: { type: string; status: boolean }) => {
      if (data.type === 'period') {
        emit('periodStatusChange', data.status);
      } else if (data.type === 'love') {
        emit('loveStatusChange', data.status);
      }
    };

    // 使用dayjs格式化日期 (简化格式: 5月17日)
    const formatDateSimple = (timestamp: number) => {
      return dayjs(timestamp).format('M月D日');
    };

    return {
      recordItems,
      getStatusForType,
      onStatusChange,
      formatDateSimple
    };
  }
});
</script>

<style lang="scss">
@import '../styles/common.scss';

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