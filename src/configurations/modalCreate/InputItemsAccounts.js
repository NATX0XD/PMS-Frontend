import { FaBoxes } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const InputItemsAccounts = () => [
  {
    key: 'image',
    label: 'Click or Drag & Drop to upload',
    typeInput: 'images',
    isProfile: true
  },
  {
    key: 'name',
    label: 'First name',
    labelPlacement: 'outside',
    placeholder: 'Your First name',
    typeInput: 'textarea',
    maxLength: '250',
    maxRows: '2',
    groupWith: 'surname'
  },
  {
    key: 'surname',
    label: 'Surname',
    labelPlacement: 'outside',
    placeholder: 'Your surname',
    typeInput: 'textarea',
    maxLength: '250',
    maxRows: '2',
    groupWith: 'firstname'
  },
  {
    key: 'email',
    label: 'Email',
    labelPlacement: 'outside',
    placeholder: 'Enter your email',
    typeInput: 'email',
    endContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-default-400 text-small'>
          <MdEmail />
        </span>
      </div>
    )
  },
  {
    key: 'username',
    label: 'Username',
    labelPlacement: 'outside',
    placeholder: 'Enter product category',
    typeInput: 'textarea',
    maxLength: '250'
  },
  {
    key: 'password',
    label: 'Password',
    labelPlacement: 'outside',
    placeholder: 'Enter your password',
    typeInput: 'password'
  },
  {
    key: 'role',
    label: 'Role',
    labelPlacement: 'outside',
    placeholder: 'Enter product category',
    typeInput: 'autocomplete',
    defaultItems: [
      { label: 'Admin', key: 'admin' },
      { label: 'User', key: 'user' }
    ],
    maxLength: '250'
  }
]
export default InputItemsAccounts
