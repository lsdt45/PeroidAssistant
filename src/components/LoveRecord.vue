<template>
  <!-- 爱爱记录 -->
  <view class="record-item">
    <view class="record-label">
      <view class="icon-wrapper love-icon">
        <nut-icon name="heart" size="20" />
      </view>
      <text>爱爱</text>
    </view>
    <nut-radio-group
      v-model="loveStatus"
      @change="onLoveStatusChange"
      direction="horizontal"
    >
      <nut-radio shape="button" label="0" class="custom-radio no-btn">否</nut-radio>
      <nut-radio shape="button" label="1" class="custom-radio yes-btn">是</nut-radio>
    </nut-radio-group>
  </view>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "LoveRecord",
  props: {
    date: {
      type: Number,
      required: true,
    },
    defaultStatus: {
      type: String,
      default: "0",
    },
  },
  emits: ["statusChange"],
  setup(props, { emit }) {
    const loveStatus = ref(props.defaultStatus);

    const onLoveStatusChange = () => {
      emit("statusChange", loveStatus.value === "1");
    };

    return {
      loveStatus,
      onLoveStatusChange,
    };
  },
});
</script>

<style lang="scss">
@import "../styles/common.scss";
</style>
