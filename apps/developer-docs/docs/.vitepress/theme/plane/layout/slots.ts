import type { Slots, VNode } from "vue";

/** Normalize Vue 3 slots for use with `h(Component, props, children)` */
export function slotsToChildren(slots: Slots): Record<string, () => VNode[]> {
  const children: Record<string, () => VNode[]> = {};
  for (const name of Object.keys(slots)) {
    const slot = slots[name];
    if (slot) {
      children[name] = () => slot() as VNode[];
    }
  }
  return children;
}
