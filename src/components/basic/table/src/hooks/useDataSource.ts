import { VxeGridPropTypes } from 'vxe-table';
import { BasicTableProps } from '../types/table';

export default function useDataSource(props: Partial<BasicTableProps>) {
  const resolveFilter = (params: Recordable) => {
    return (
      params &&
      params.map((item: Recordable) => {
        console.log(item);
        return;
      })
    );
  };

  const onQuery = (params: VxeGridPropTypes.ProxyAjaxQueryParams) => {
    const { form } = params;

    const queryParams = {
      ...resolveFilter(form)
    };

    return new Promise(resolve => {
      if (props && props.api) {
        resolve(props.api(queryParams));
      }
    });
  };

  return { onQuery };
}
