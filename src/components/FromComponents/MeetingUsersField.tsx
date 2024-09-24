import { EuiComboBox, EuiFormRow } from '@elastic/eui'
import React from 'react'

const MeetingUsersField = ({
    label,
    options,
    onChange,
    selectedOptions,
    isClearable,
    placeholder,
    singleSelection=false,
    isInvalid,
  error
}:{
    label: string;
    options:any;
    selectedOptions:any;
    isClearable:boolean;
    onChange:any;
    placeholder:string;
    singleSelection:any;
    isInvalid:boolean,
    error: Array<String>
}) => {
  return (
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
        <EuiComboBox options={options}  onChange={onChange}
        selectedOptions={selectedOptions} singleSelection={singleSelection} 
        placeholder={placeholder} isClearable={isClearable}
        isInvalid={isInvalid}
        />
    </EuiFormRow>
  )
}

export default MeetingUsersField