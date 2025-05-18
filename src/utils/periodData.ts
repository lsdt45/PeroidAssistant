import { ref } from 'vue';
import dayjs from 'dayjs';

// Interface for period data
export interface PeriodDay {
  date: number; // timestamp
  hasPeriod: boolean;
  hasLove?: boolean; // 添加爱爱记录字段
}

// Store period data
export const periodData = ref<PeriodDay[]>([]);

// Add or update period data
export const updatePeriodData = (date: number, hasPeriod: boolean) => {
  const existingIndex = periodData.value.findIndex(item => {
    // 使用dayjs比较日期，检查是否是同一天
    return dayjs(item.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD');
  });

  if (existingIndex >= 0) {
    // Update existing record
    periodData.value[existingIndex].hasPeriod = hasPeriod;
  } else {
    // Add new record
    periodData.value.push({ date, hasPeriod });
  }

  // Store data to local storage
  uni.setStorageSync('period_data', JSON.stringify(periodData.value));
};

// Add or update love data
export const updateLoveData = (date: number, hasLove: boolean) => {
  const existingIndex = periodData.value.findIndex(item => {
    // 使用dayjs比较日期，检查是否是同一天
    return dayjs(item.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD');
  });

  if (existingIndex >= 0) {
    // Update existing record
    periodData.value[existingIndex].hasLove = hasLove;
  } else {
    // Add new record
    periodData.value.push({ date, hasPeriod: false, hasLove });
  }

  // Store data to local storage
  uni.setStorageSync('period_data', JSON.stringify(periodData.value));
};

// Load period data from storage
export const loadPeriodData = () => {
  try {
    const data = uni.getStorageSync('period_data');
    if (data) {
      periodData.value = JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load period data', e);
  }
};

// Check if a date has a period
export const hasPeriod = (date: number): boolean => {
  return periodData.value.some(item => {
    // 使用dayjs比较日期，检查是否是同一天
    return dayjs(item.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') && item.hasPeriod;
  });
};

// Check if a date has love record
export const hasLove = (date: number): boolean => {
  return periodData.value.some(item => {
    // 使用dayjs比较日期，检查是否是同一天
    return dayjs(item.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD') && item.hasLove;
  });
};

// Get calendar markers for NutUI Calendar
export const getCalendarMarks = () => {
  return periodData.value
    .filter(item => item.hasPeriod)
    .map(item => {
      // 使用dayjs获取年月日
      const d = dayjs(item.date);
      return {
        type: 'dot',
        color: '#FF6666',
        date: d.date(),
        month: d.month() + 1,  // dayjs月份从0开始，需要+1
        year: d.year()
      };
    });
}; 