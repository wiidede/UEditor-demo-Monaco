<template>
  <div
    w="100dvw full"
    h="100dvh full"
    flex="~ col"
    font-sans
    p="x-4 y-4"
    text="gray-700 dark:gray-200"
  >
    <header class="text-3xl">
      UEditor preview
    </header>
    <main class="min-h0 flex-auto">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
