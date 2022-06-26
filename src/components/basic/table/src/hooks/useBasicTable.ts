import useRegisterComp from '@/hooks/common/useRegisterComp';
import { BasicTableProps, BasicTableInstance, BasicTableMethods } from '../types/table';

export default function useBasicTable(
  props: BasicTableProps
): [(instance: BasicTableInstance) => void, BasicTableMethods] {
  const { register, getInstance } = useRegisterComp<BasicTableProps, BasicTableInstance>(props);

  const methods = {
    setProps: (props: BasicTableProps): void => getInstance()?.setProps(props),
    reload: () => getInstance()?.reload()
  };

  return [register, methods];
}
