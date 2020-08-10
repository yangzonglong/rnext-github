import React, { memo, useMemo } from 'react';
import Select from './Select';
import { SelectProps, ConsoleCode } from './interface';

interface ConsoleSelectProps extends SelectProps { 
  code: string;
}

const url = '/bk/api/console/ConsoleCode/findOne';
const fieldNames = { value: 'codeValue', label: 'codeDesc' };

function rtnDataAfter(data: ConsoleCode){
  return data.ConsoleCodeValues
}

export default memo(({ code, onChange, value, id, extra }: ConsoleSelectProps) => {

  const query = useMemo(() => ({
    where: { code },
    include: [{ model: 'ConsoleCodeValue' }]
  }), [code]);

  return (
    <Select 
      id={id}
      extra={extra}
      value={value}
      cacheKey={`Cconsole.${code}`}
      onChange={onChange as any}
      rtnDataAfter={rtnDataAfter} 
      query={query} 
      fieldNames={fieldNames} 
      url={url} />
  )
})