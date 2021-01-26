<template>
  <button
    :type="type"
    class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
    :class="[
      size === 'small' ? 'text-sm leading-5' : 'text-base leading-6',
      {'bg-blue-600 hover:bg-blue-500 text-white' : !color},
      {'bg-white border border-gray-300 text-gray-700 hover:text-gray-500' : color === 'white'},
      {'bg-blue-100 hover:bg-blue-50 text-blue-500  ' : color === 'secondary'},
      {'bg-red-100 hover:bg-red-50 text-red-500  ' : color === 'red'},
      {'shadow-sm' : color === 'primary'}
    ]"
    @click="to ? $router.push(to) : callback($event)"
  >
    <progress-circular
      v-if="loading"
      :color="color ==='secondary' ? 'text-blue-500':'text-white'"
      class="mr-2"
    />
    <span>
      <slot name="icon"/>
    </span>
    <span>{{ title }}</span>
  </button>
</template>
<script lang="ts">
import {
  Vue, Component, Prop, Emit,
} from 'vue-property-decorator';
import ProgressCircular from '@/components/ui/ProgressCircular.vue';

@Component({
  components: {
    ProgressCircular,
  },
})
export default class CustomButton extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(String) readonly size!: string;
  @Prop(String) readonly color!: string;
  @Prop(String) readonly to!: string;
  @Prop(String) readonly type!: string;
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;

  @Emit('click')
  callback(e: Record<string, any>) {
    return e;
  }
}
</script>
