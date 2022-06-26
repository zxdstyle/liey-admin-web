import { NSelect } from 'naive-ui';
import { VXETableCore } from 'vxe-table';

export default function setupInputRender(VXETable: VXETableCore) {
  // 创建一个简单输入框渲染
  VXETable.renderer.add('Select', {
    renderItemContent(renderOpts, params) {
      const { data, item } = params;
      const { options } = renderOpts;
      return [<NSelect v-model:value={data[item.field]} options={options} />];
    },
    // 可编辑激活模板
    renderEdit(renderOpts, params) {
      const { row, column } = params;
      const { options } = renderOpts;
      return [<NSelect v-model={row[column.field]} options={options} />];
    },
    // 可编辑显示模板
    renderCell(renderOpts, params) {
      const { row, column } = params;
      return [<span>{row[column.field]}</span>];
    },
    // 导出模板，例如导出插槽中自定义的内容
    exportMethod(params) {
      const { row, column } = params;
      return row[column.field];
    }
  });
}
