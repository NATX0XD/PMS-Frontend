import { FaBoxes } from 'react-icons/fa'

const InputItemsProducts = () => [
  {
    key: 'image',
    label: 'Click or Drag & Drop to upload',
    typeInput: 'images'
  },
  {
    key: 'title',
    label: 'Title',
    labelPlacement: 'outside',
    placeholder: 'Your product title',
    typeInput: 'textarea',
    maxLength: '250'
  },
  {
    key: 'category',
    label: 'Category',
    labelPlacement: 'outside',
    placeholder: 'Enter product category',
    typeInput: 'textarea',
    maxLength: '500'
  },
  {
    key: 'stock',
    label: 'Stock',
    labelPlacement: 'outside',
    placeholder: '0',
    typeInput: 'number',
    onkeydown: true,
    endContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-default-400 text-small'>
          <FaBoxes />
        </span>
      </div>
    )
  },
  {
    key: 'price',
    label: 'Price',
    labelPlacement: 'outside',
    placeholder: '0.00',
    typeInput: 'number',
    onkeydown: false,
    endContent: (
      <div className='pointer-events-none flex items-center'>
        <span className='text-default-400 text-small'>$</span>
      </div>
    )
  }
]
export default InputItemsProducts
