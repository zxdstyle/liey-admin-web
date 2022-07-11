<script lang="tsx">
import { computed, defineComponent, PropType } from 'vue';
import { FilterField } from '../typing';
import { componentMap } from '../consts';

export default defineComponent({
  props: {
    field: { type: Object as PropType<FilterField> }
  },
  setup(props) {
    const getBindVal = computed(() => {
      return {};
    });

    const getComponent = computed(() => {
      if (!props.field) return componentMap.get('Input');
      return componentMap.get(props.field.component);
    });

    function renderComp() {
      if (!getComponent.value) return;
      const Comp = getComponent.value.component as ReturnType<typeof defineComponent>;
      return <Comp {...getComponent.value.options} {...getBindVal}></Comp>;
    }

    return () => renderComp();
  }
});
</script>
