<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ref_nav = ref<any>(null)

const toggleMenu = () => {
  ref_nav.value.classList.toggle('u-display-flex')
}

const route = useRoute()

watch(route, () => {
  ref_nav.value.classList.remove('u-display-flex')
})
</script>

<template>
  <header class="p-header">
    <div class="p-header__container">
      <router-link to="/" class="p-header__logo"
        ><img src="/img/logo.svg" alt="POSSEロゴ"
      /></router-link>
      <nav>
        <ul class="p-header__items-list" ref="ref_nav">
          <li class="p-header__items-list__text01"><router-link to="/">POSSEとは</router-link></li>
          <li class="p-header__items-list__text02"><router-link to="/quiz">クイズ</router-link></li>
          <li class="p-header__items-list__sns">
            <a href="#"><img src="/img/icon/icon-twitter.svg" alt="Twitterアイコン" /></a>
          </li>
          <li class="p-header__items-list__sns">
            <a href="#"><img src="/img/icon/icon-instagram.svg" alt="Instagramアイコン" /></a>
          </li>
          <ul class="p-header__items-list-mobile">
            <li class="p-header__items-list-mobile__line-add">
              <div class="p-header__items-list-mobile__line-add__container">
                <div class="p-header__items-list-mobile__line-add__image01">
                  <img src="/img/icon/icon-line.svg" alt="Lineアイコン" />
                </div>
                <span>POSSE公式LINE追加</span>
                <div class="p-header__items-list-mobile__line-add__image02">
                  <img src="/img/icon/icon-link-light.svg" alt="Linkアイコン" />
                </div>
              </div>
            </li>
            <li>
              POSSE公式サイト<img src="/img/icon/icon-link-gray-dark.svg" alt="Linkアイコン" />
            </li>
            <li>
              <a href="#"><img src="/img/icon/icon-twitter.svg" alt="Twitterアイコン" /></a>
              <a href="#"><img src="/img/icon/icon-instagram.svg" alt="Instagramアイコン" /></a>
            </li>
          </ul>
        </ul>
      </nav>
      <div class="p-header__hamburger" @click="toggleMenu">
        <span></span>
      </div>
    </div>
  </header>
</template>
