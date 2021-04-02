<template>
  <div class="input-group" :style="{ width: width + '%' }">
    <input
      class="input-group__input"
      name="input"
      :placeholder="name"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('my-keyup-enter')"
      @blur="$emit('my-blur')"
      type="text"
      ref="input"
      required
    />
    <span class="input-group__span">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "Input text",
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  width: 100%;
  position: relative;
  font-family: "Montserrat", sans-serif;

  &__span {
    position: absolute;
    left: 1.5rem;
    top: 1.5rem;
    color: var(--color-dark-3);
  }

  &__input {
    height: 5rem;
    width: 100%;
    font-size: 1.6rem;
    padding: 1.4rem;
    padding-left: 4.3rem;
    display: block;

    background-color: var(--color-white);
    border: none;
    box-shadow: var(--shadow-light);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--color-dark-3);
    }
  }
}
</style>
