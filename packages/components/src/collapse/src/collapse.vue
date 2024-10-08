<template>
  <div class="collapse-box">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PropType, provide, ref, watch } from 'vue'
import { NameType, collapseContextKey } from './types'
import '@/styles/collapse.scss'

defineOptions({
  name: 'Collapse'
})

const props = defineProps({
  modelValue: {
    type: Array as PropType<NameType[]>,
    required: true
  },
  accordion: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'change', values: NameType[]): void
}>()

const activeNames = ref<NameType[]>(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)

if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}

const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value]

  if (props.accordion) {
    // 点击的是当前项 ? 关闭 : 打开
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)

    if (index > -1) {
      // 存在，删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      // 不存在，插入对应的name
      _activeNames.push(item)
    }

    activeNames.value = _activeNames
  }

  emit('update:modelValue', _activeNames)

  emit('change', _activeNames)
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
