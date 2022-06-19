import { DrawerContentProps, DrawerProps } from 'naive-ui';

export type DrawerType = 'default' | 'classic';

export interface BasicDrawerProps extends DrawerProps {
  content?: BasicContentProps;
  type?: DrawerType;
}

export interface BasicContentProps extends DrawerContentProps {}

export interface DrawerMethods {
  setProps: (props: Partial<BasicDrawerProps>) => void;
}

export interface ReturnDrawerMethods extends DrawerMethods {
  openDrawer: () => void;
  closeDrawer: () => void;
}

export type RegisterFn = (drawerMethods: DrawerMethods) => void;

export type UseDrawerReturnType = [RegisterFn, ReturnDrawerMethods];
