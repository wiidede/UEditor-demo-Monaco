<template>
  <div
    w="100dvw full"
    h="100dvh full"
    flex="~ col"
    font-sans
    p="x-4 y-1"
    text="gray-700 dark:gray-200"
  >
    <header class="flex items-center gap2">
      <div class="i-carbon-ibm-cloud-direct-link-2-dedicated-hosting" />
      <h1 class="text-3xl">
        UEditor Demo
      </h1>
      <div class="mb3 rd bg-zinc/33 px2 text-sm">
        Monaco Editor
      </div>
    </header>
    <main class="min-h0 flex-auto">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
