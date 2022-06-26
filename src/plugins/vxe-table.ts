import { App } from 'vue';
import {
  Table,
  Header,
  Filter,
  Icon,
  Edit,
  Validator,
  Pager,
  VXETable,
  Form,
  FormItem,
  FormGather,
  Button,
  Input,
  Toolbar
} from 'vxe-table';
import setupRenders from '@/plugins/renders';

export default function setupVxeTable(app: App) {
  setupRenders(VXETable);
  app.use(Icon);
  app.use(Pager);
  app.use(Edit);
  app.use(Validator);
  app.use(Table);
  app.use(Filter);
  app.use(Header);
  app.use(Button);
  app.use(Toolbar);
  app.use(Input);
  app.use(Form);
  app.use(FormItem);
  app.use(FormGather);
}
