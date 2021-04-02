<template>
  <div class="button" :style="{ width: width + 'px' }">
    <button
      class="button__body"
      :class="{ disabled: disabled }"
      :disabled="disabled"
      @click="$emit('my-button-click')"
    >
      <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 100,
      validator: (val) => {
        return val > 0 && val <= 1200;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
button,
button:focus {
  outline: none;
  border: none;
}

.button {
  height: 4.4rem;
  margin: 1rem 0;
  width: 100%;

  font-size: 1.8rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &__body {
    color: var(--color-white);
    border-radius: 60px;
    font-weight: 700;
    cursor: pointer;
    height: 100%;
    font-size: inherit;
    font-family: inherit;
    width: 100%;
    background-color: var(--color-primary);
  }
}
.disabled {
  background-color: var(--color-secondary);
  cursor: not-allowed;
}
</style>
