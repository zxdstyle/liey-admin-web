import { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
import { forIn } from 'lodash-es';
import { BasicTableProps } from '../types/table';

export default function useDataSource(props: Partial<BasicTableProps>) {
  const resolveSearch = (params: Recordable) => {
    const res: Recordable = {};
    forIn(params, (value, key) => {
      if (value) {
        res[`where.${key}.eq`] = value;
      }
    });
    return res;
  };

  const resolveFilter = (filters: VxeTableDefines.FilterCheckedParams[]) => {
    const res: Recordable = {};
    filters.forEach(filter => {
      const { property, values } = filter;
      if (values.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        res[`where.${property}.eq`] = values[0];
      }
      if (values.length > 1) {
        res[`where.${property}.in`] = values;
      }
    });
    return res;
  };

  const resolveSort = (sorts: VxeGridPropTypes.ProxyAjaxQuerySortCheckedParams[]) => {
    const res: Recordable = {};
    sorts.forEach(sort => {
      const { column, order } = sort;
      res[`order.${column.field}`] = order;
    });
    return res;
  };

  const onQuery = (params: VxeGridPropTypes.ProxyAjaxQueryParams) => {
    const { form, page, sorts, filters } = params;

    const queryParams = {
      ...resolveSearch(form),
      ...resolveFilter(filters),
      ...resolveSort(sorts),
      page: page.currentPage,
      pageSize: page.pageSize
    };

    return new Promise(resolve => {
      if (props && props.api) {
        resolve(props.api(queryParams));
      }
    });
  };

  return { onQuery };
}
