import { NInput } from 'naive-ui';
import { VXETableCore } from 'vxe-table';

export default function setupInputRender(VXETable: VXETableCore) {
  // 创建一个简单输入框渲染
  VXETable.renderer.add('Input', {
    renderItemContent(renderOpts, params) {
      const {
        data,
        item: { field }
      } = params;
      return [<NInput v-model:value={data[field]} />];
    },
    // 可编辑激活模板
    renderEdit(renderOpts, params) {
      const { row, column } = params;
      return [<NInput v-model:value={row[column.field]} />];
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
