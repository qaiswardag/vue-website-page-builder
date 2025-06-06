<script setup>
import { ref, onMounted, inject } from 'vue'
import { Switch } from '@headlessui/vue'
import Modal from '@/Components/Modals/Modal.vue'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')
</script>
