import { FC } from 'react'
import { Text } from '@react-pdf/renderer'
import compose from '../styles/compose'

interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  pdfMode?: boolean;
  editable?: boolean; // New prop to control editability
}

const Input: FC<Props> = ({ className, placeholder, value, onChange, pdfMode, editable = true }) => {
  return (
    <>
      {pdfMode ? (
        <Text style={compose('span ' + (className ? className : ''))}>{value}</Text>
      ) : (
        <input
          type="text"
          className={'input ' + (className ? className : '')}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={!editable} // Set the input to read-only if editable is false
        />
      )}
    </>
  );
}

export default Input;
