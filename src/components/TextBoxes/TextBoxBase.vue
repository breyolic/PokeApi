<template>
  <div class="text-box">
    <div class="text-box__label">
      <slot name="label"></slot>
    </div>
    <div class="text-box__value">
      <slot name="value"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-box {
  display: flex;
  margin-left: 3rem;
  margin-right: 3rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  border-bottom: 1px solid var(--color-light-1);
  &__label {
    font-weight: 700;
  }
  &__value {
    font-weight: 500;
    padding-left: 0.5rem;
  }
}
</style>
