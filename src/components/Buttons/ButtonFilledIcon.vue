<template>
  <a
    class="button"
    :class="{ 'button--active': isActive }"
    @click="$emit('my-button-click')"
  >
    <span class="button__prepend">
      <slot name="icon"></slot>
    </span>
    <span class="button__body">
      <slot></slot>
    </span>
  </a>
</template>
<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  font-family: "Lato", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  background-color: var(--color-dark-3);
  border-radius: 60px;
  height: 44px;
  width: 275px;
  cursor: pointer;

  &__prepend {
    display: flex;
    align-items: center;
  }

  &__body {
    padding-left: 1rem;
  }
  &--active {
    background-color: var(--color-primary);
  }
}
@media screen and (max-width: 720px) {
  .button {
    width: 150px;
  }
}
</style>
