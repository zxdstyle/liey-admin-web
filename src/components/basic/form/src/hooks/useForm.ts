import { nextTick, onUnmounted, ref, unref, watch } from 'vue';
import { getDynamicProps, DynamicProps } from '@/utils';
import type { NamePath } from '@/components/basic/form/src/types/formItem';
import type { FormActionType, FormProps, FormSchema, UseFormReturnType } from '../types/form';

type Props = Partial<DynamicProps<FormProps>>;

export default function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      );
    }
    await nextTick();
    return form as FormActionType;
  }

  function register(instance: FormActionType) {
    onUnmounted(() => {
      formRef.value = null;
      loadedRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(formRef)) {
      return;
    }

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true
      }
    );
  }

  const methods: FormActionType = {
    scrollToField: async (name: NamePath, options?: ScrollOptions | undefined) => {
      const form = await getForm();
      await form.scrollToField(name, options);
    },
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm();
      await form.setProps(formProps);
    },
    updateSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      await form.updateSchema(data);
    },
    resetSchema: async (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
      const form = await getForm();
      await form.resetSchema(data);
    },
    clearValidate: async (name?: string | string[]) => {
      const form = await getForm();
      await form.clearValidate(name);
    },
    resetFields: async () => {
      getForm().then(async form => {
        await form.resetFields();
      });
    },
    clearFields: async () => {
      getForm().then(async form => {
        await form.clearFields();
      });
    },

    removeSchemaByFiled: async (field: string | string[]) => {
      unref(formRef)?.removeSchemaByFiled(field);
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T;
    },

    setFieldsValue: async <T>(values: T) => {
      const form = await getForm();
      await form.setFieldsValue<T>(values);
    },

    appendSchemaByField: async (schema: FormSchema, prefixField: string | undefined, first: boolean | undefined) => {
      const form = await getForm();
      await form.appendSchemaByField(schema, prefixField, first);
    },

    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },

    validate: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validate(nameList);
    },

    validateFields: async (nameList?: NamePath[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validateFields(nameList);
    }
  };

  return [register, methods];
}
