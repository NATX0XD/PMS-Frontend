const ColumnsTableCustomer = [
  { key: 'name', label: 'ชื่อลูกค้า', type: 'text' },
  { key: 'contact_name', label: 'ผู้ติดต่อ', type: 'text' },
  { key: 'phone', label: 'เบอร์โทร', type: 'text' },
  { key: 'email', label: 'อีเมล', type: 'text' },
  { key: 'address', label: 'ที่อยู่', type: 'text' },
  { key: 'city', label: 'อำเภอ/เขต', type: 'text' },
  { key: 'state', label: 'จังหวัด', type: 'text' },
  { key: 'postal_code', label: 'รหัสไปรษณีย์', type: 'text' },
  { key: 'country', label: 'ประเทศ', type: 'text' },
  { key: 'tax_id', label: 'เลขประจำตัวผู้เสียภาษี', type: 'text' },
  { key: 'customer_type', label: 'ประเภทลูกค้า', type: 'text' },
  { key: 'created_at', label: 'วันที่สร้าง', type: 'text' },
  {
    key: 'actions',
    label: 'ACTIONS',
    // width: "100px",
    type: 'actions'
  }
]
export default ColumnsTableCustomer
