<template>
  <el-container class="min-h-screen">
    <el-header class="bg-white shadow-sm">
      <div class="container mx-auto py-4 max-w-[1400px] h-full">
        <div class="flex items-center justify-between h-full">
          <h1
            class="text-3xl font-bold text-black flex items-center gap-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.1)] cursor-pointer hover:opacity-80 transition-opacity"
            @click="goToHome"
          >
            The ArriDog<span class="text-4xl">🐕</span>
          </h1>

          <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
          >
            <div class="text-sm text-gray-600">
              {{ userStore.currentUser?.name }}
              <span v-if="userStore.isAdmin" class="text-blue-600"> (Admin) </span>
            </div>
            <BaseButtonGroup custom-class="border border-gray-200 shadow-lg">
              <BaseButton
                :type="userStore.isAdmin ? 'primary' : 'default'"
                size="small"
                @click="userStore.loginAsAdmin"
              >
                <span class="hidden sm:inline">Login as </span>Admin
              </BaseButton>
              <BaseButton
                :type="!userStore.isAdmin ? 'primary' : 'default'"
                size="small"
                @click="userStore.loginAsUser"
              >
                <span class="hidden sm:inline">Login as </span>User
              </BaseButton>
            </BaseButtonGroup>
          </div>
        </div>
      </div>
    </el-header>

    <el-main class="bg-white">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import BaseButton from "@/components/atoms/BaseButton/BaseButton.vue";
import BaseButtonGroup from "@/components/atoms/BaseButtonGroup/BaseButtonGroup.vue";

const router = useRouter();
const userStore = useUserStore();

const goToHome = (): void => {
  router.push({ name: "Home" });
};
</script>
