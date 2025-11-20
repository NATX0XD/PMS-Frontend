
// src/configurations/columns/ColumnsTableJobs.js

const ColumnsTableJobs = [
    {
        key: 'job_no',
        label: 'Job No.',
        width: '120px'
    },
    {
        key: 'customer_name',
        label: 'Customer',
        width: '180px'
    },
    {
        key: 'customer_ref',
        label: 'Customer ref.',
        width: '160px'
    },
    {
        key: 'trade_direction',
        label: 'Direction',
        width: '100px'
    },
    {
        key: 'transport_mode',
        label: 'Mode',
        width: '120px'
    },
    {
        key: 'service_package',
        label: 'Package',
        width: '160px'
    },
    {
        key: 'status',
        label: 'Status',
        type: 'chip', // ให้ TableQuery render เป็น Chip
        width: '110px'
    },
    {
        key: 'created_at',
        label: 'Created at',
        width: '160px'
    },
    {
        key: 'actions',
        label: 'ACTIONS',
        // width: "100px",
        type: 'actions'
    }];
// ถ้าอยากเพิ่ม action ภายหลัง ค่อยเพิ่ม key: "actions" ทีหลังได้

export default ColumnsTableJobs