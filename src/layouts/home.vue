<template>
  <div id="app" class="flex flex-col flex-col-reverse md:flex-row lg:flex-row xl:flex-row">
    <!-- Left side -->
    <h3>Left side</h3>
    <!-- Right side -->
    <div
      class="flex flex-wrap w-full sm:w-full md:w-2/5 lg:w-2/5 bg-lightgray-200 p-10 h-screen content-center justify-center fixed right-0"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>
