import { useRegisterComp } from '@/hooks/common/useRegisterComp';
import { BasicTableProps, BasicTableInstance } from '../types/table';

export default function useBasicTable(
  props: BasicTableProps
): [register: (instance: BasicTableInstance) => void, methods: BasicTableInstance] {
  const { getInstance, register } = useRegisterComp<BasicTableProps, BasicTableInstance>(props);

  const methods: BasicTableInstance = {
    setProps: props => getInstance().setProps(props),
    reload: (opt?: Recordable) => getInstance().reload(opt),
    getSize: () => getInstance().getSize()
  };

  return [register, methods];
}
