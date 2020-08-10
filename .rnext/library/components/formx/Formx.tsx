import React, { memo, useCallback, forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import { Form, Row } from 'antd';
import { FormxProps, FormItemProps, FormxRefProps } from './interface';
import { handleFormItemsGroup, handleInitialValues, getExtraData, handleValues, handleBindRelations, getDisabled, getRules } from './util';
import styles from './formx.module.scss';
import ControlItem from './ControlItem';

const gutter = [10, 2];

const Formx = (props: FormxProps, ref: React.Ref<FormxRefProps>) => {

  const extraData = useRef({});
  const [form] = Form.useForm();
  const { formItems, groupNumber, initialValues, onValuesChange } = props;
  const [formItemsGroup, setFormItemsGroup] = useState<FormItemProps[][]>([]);

  useImperativeHandle(ref, () => ({
    ...form,
    validateFields: async () => {
      const values = await form.validateFields();
      return { ...extraData.current, ...handleValues(formItems, values) }
    }
  }));

  useEffect(() => {
    if (initialValues && formItems.length) {
      form.setFieldsValue(handleInitialValues(initialValues, formItems));
      extraData.current = initialValues;
    }
  }, [initialValues, form, formItems]);

  useEffect(() => {
    setFormItemsGroup(handleFormItemsGroup(formItems, initialValues || {}, groupNumber))
  }, [formItems, groupNumber, initialValues]);

  const _onValuesChange = useCallback((changedValues, allValues) => {
    const formItemExtraData = getExtraData(formItems, changedValues);
    extraData.current = { ...extraData.current, ...allValues, ...formItemExtraData };

    const fieldsValue = handleBindRelations(
      formItems,
      { ...changedValues, ...formItemExtraData },
      extraData.current
    );
    form.setFieldsValue(fieldsValue);

    setFormItemsGroup(handleFormItemsGroup(formItems, extraData.current, groupNumber));
    onValuesChange?.(changedValues, allValues);
  }, [formItems, onValuesChange, form, groupNumber]);

  return (
    <div className={styles.formx}>
      <Form layout='vertical' {...props} initialValues={initialValues} onValuesChange={_onValuesChange} form={form}>
        {formItemsGroup.map((group, groupIndex) => (
          <Row gutter={gutter as any} key={groupIndex}>
            {group.map(item => (
              <ControlItem
                label={item.label || window.$app.t(item.name)}
                disabled={getDisabled(item, extraData.current)}
                rules={getRules(item, extraData.current)}
                groupNumber={groupNumber}
                formItem={item}
                key={item.name} />
            ))}
          </Row>
        ))}
      </Form>
    </div>
  )
}

export default memo(forwardRef(Formx));