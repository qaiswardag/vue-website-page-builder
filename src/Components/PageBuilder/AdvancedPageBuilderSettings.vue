<script setup>
import { ref, computed, inject } from 'vue'
import PageBuilderClass from '@/composables/PageBuilderClass.ts'

// Get stores from parent PageBuilder component
const pageBuilderStateStore = inject('pageBuilderStateStore')
</script>
