import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')