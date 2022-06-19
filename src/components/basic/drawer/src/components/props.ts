import { CSSProperties, PropType } from 'vue';
import { ScrollbarProps } from 'naive-ui';

export const contentProps = {
  title: { type: String, required: true },
  headerStyle: { type: [String, Object] as PropType<String | CSSProperties> },
  footerStyle: { type: [String, Object] as PropType<String | CSSProperties> },
  bodyStyle: { type: [String, Object] as PropType<String | CSSProperties> },
  bodyContentStyle: { type: [String, Object] as PropType<String | CSSProperties> },
  nativeScrollbar: { type: Boolean, default: true },
  scrollbarProps: { type: Object as PropType<ScrollbarProps> },
  closable: { type: Boolean, default: true }
};
