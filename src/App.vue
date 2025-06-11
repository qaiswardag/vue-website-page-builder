<script setup>
import Navbar from './Components/Homepage/Navbar.vue'
import HomeSection from './Components/Homepage/HomeSection.vue'
import Footer from './Components/Homepage/Footer.vue'
</script>

<template>
  <div>
    <Navbar @handleButton="handlePageBuilder"></Navbar>
    <HomeSection></HomeSection>
    <Footer></Footer>
  </div>
</template>
