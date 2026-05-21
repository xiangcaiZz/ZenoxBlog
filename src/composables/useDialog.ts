import { ref } from 'vue'

interface DialogState {
  visible: boolean
  type: 'alert' | 'confirm'
  message: string
  resolve: ((value: boolean) => void) | null
}

// 模块级单例，全局共享
const state = ref<DialogState>({
  visible: false,
  type: 'alert',
  message: '',
  resolve: null,
})

export function useDialog() {
  function alert(message: string): Promise<void> {
    return new Promise((resolve) => {
      state.value = {
        visible: true,
        type: 'alert',
        message,
        resolve: (confirmed: boolean) => {
          resolve()
        },
      }
    })
  }

  function confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      state.value = {
        visible: true,
        type: 'confirm',
        message,
        resolve,
      }
    })
  }

  function onConfirm() {
    state.value.resolve?.(true)
    state.value = { visible: false, type: 'alert', message: '', resolve: null }
  }

  function onCancel() {
    state.value.resolve?.(false)
    state.value = { visible: false, type: 'alert', message: '', resolve: null }
  }

  return { state, alert, confirm, onConfirm, onCancel }
}
