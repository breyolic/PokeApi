<template>
  <div>
    <div class="load-wrapper">
      <div class="animation">
        <div class="spinner">
          <div class="pokeball-1"></div>
          <div class="pokeball-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.load-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-white);
  z-index: 9999;
  opacity: 1;
  transition: all 2s ease-in-out;
}
.load-wrapper:last-child {
  margin-right: 0;
}

.animation {
  text-align: center;
  opacity: 1;
}

.spinner {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto;
}

.pokeball-1,
.pokeball-2 {
  position: absolute;
  top: 0;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-image: url("../../assets/pokebola.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.pokeball-2 {
  top: auto;
  bottom: 0;
}

.animation .spinner {
  animation: loadingI 2s linear infinite;
}
.animation .pokeball-1,
.animation .pokeball-2 {
  animation: bounce 2s ease-in-out infinite;
}
.animation .pokeball-2 {
  animation-delay: -1s;
}
@keyframes loadingI {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
