import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { Modal, Input, Form, Select } from 'antd';
import { useRequest } from 'ahooks';
import server from './../../utils/server/server';
import md5 from 'md5';
import { setUserInfo } from './util';

type BodyProps = {
  user: string,
  password: string
}

const FormItem = Form.Item;
const Option = Select.Option;

const SESSION_USER_KEY = 'userInfo';
const DEFAULT_USERS = ['29000000002']

export default memo(() => {

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [codeTime, setCodeTime] = useState(1);

  useEffect(() => {
    const userInfo = window.sessionStorage.getItem(SESSION_USER_KEY);
    if (!userInfo) setVisible(true);
  }, []);

  const onCancel = useCallback(() => setVisible(false), []);

  const login = useCallback(async (values: BodyProps) => {
    try {
      const userInfo = await server('/bk/login', values);
      setUserInfo(userInfo);
      setVisible(false);
      window.location.reload();
    } catch (error) {
      if (error.code === 1) setIsCode(true);
    }
  }, []);

  const { loading, run } = useRequest(login, { manual: true });

  const onOk = useCallback(async () => {
    const values = await form.validateFields();
    run({ ...values, password: md5(values.password) } as BodyProps)
  }, [form, run]);

  const changeUser = useCallback((user: string) => {
    form.setFieldsValue({ user, password: '111111' })
  }, [form]);

  const resetVCode = useCallback(() => setCodeTime(+(new Date())), []);

  const VCode = useMemo(() => {
    return <img onClick={resetVCode} alt='vcode' src={`/bk/getSvj1?${codeTime}`} />
  }, [resetVCode, codeTime]);

  return (
    <Modal confirmLoading={loading} onOk={onOk} onCancel={onCancel} title='模似登录' visible={visible}>
      <Form form={form}>
        <FormItem label='内置'>
          <Select onChange={changeUser}>
            {DEFAULT_USERS.map(item => (
              <Option value={item} key={item}>{item}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name='user' label='用户'>
          <Input />
        </FormItem>
        <FormItem name='password' label='密码'>
          <Input />
        </FormItem>
          {isCode && <FormItem name='vCode' label='验证'>
          <Input addonAfter={VCode} />
        </FormItem>}
      </Form>
    </Modal>
  )
})