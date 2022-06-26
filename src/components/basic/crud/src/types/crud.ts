export interface CrudProps {
  title: string;
  grid: {};
}

export interface CrudInstance {
  setProps: (formProps: Partial<CrudProps>) => Promise<void>;
  reload: () => Promise<void>;
}
