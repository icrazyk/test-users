<template>
  <div :class="$style.progress">
    <VProgressLinear
      :indeterminate="true"
      :class="
        [
          'ma-0',
          $style.line,
        ]
      "
    />
  </div>
</template>

<style module>
.progress {
  position: relative;
}

.line {
  top: 0;
  right: 0;
  left: 0;
}

.progress .line {
  position: absolute;
}
</style>
