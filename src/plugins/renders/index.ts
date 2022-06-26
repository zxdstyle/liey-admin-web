import { VXETableCore } from 'vxe-table';
import setupInputRender from './input';
import setupSelectRender from './select';
import setupSwitchRender from './switch';

export default function setupRenders(VXETable: VXETableCore) {
  setupInputRender(VXETable);
  setupSelectRender(VXETable);
  setupSwitchRender(VXETable);
}
