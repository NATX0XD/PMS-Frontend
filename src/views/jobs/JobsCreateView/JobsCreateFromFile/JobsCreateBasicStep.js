// src/views/jobs/JobsCreateView/JobsCreateBasicStep.jsx
'use client'

import React, { useState, useCallback } from 'react'
import { Input, Select, SelectItem } from '@heroui/react'
import CustomerAutocomplete from '../components/customers/CustomerAutocomplete'


const directionOptions = [
    { key: 'export', label: 'EXPORT' },
    { key: 'import', label: 'IMPORT' },
]

const modeOptions = [
    { key: 'air', label: 'AIR' },
    { key: 'ocean_lcl', label: 'OCEAN - LCL' },
    { key: 'ocean_fcl', label: 'OCEAN - FCL' },
    { key: 'truck', label: 'TRUCK' },
]

const packageOptions = [
    { key: 'freight_only', label: 'Freight Only' },
    { key: 'cc_truck', label: 'CC + TRUCK' },
    { key: 'frt_cc_truck', label: 'FRT + CC + TRUCK' },
    { key: 'frt_cc', label: 'FRT + CC' },
    { key: 'do_only', label: 'DO ONLY' },
    { key: 'do_truck', label: 'DO + TRUCK' },
    { key: 'truck_only', label: 'TRUCK ONLY' },
    { key: 'cc_only', label: 'CC ONLY' },
]

const JobsCreateBasicStep = ({ value, onChange }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const update = (patch) => onChange((prev) => ({ ...prev, ...patch }))

    // Handle customer selection from autocomplete
    const handleCustomerSelect = useCallback((customer) => {
        setSelectedCustomer(customer)
        if (customer) {
            update({
                customer_name: customer.name || '',
                customer_ref: customer.code || value.customer_ref || '',
            })
        }
    }, [value.customer_ref])

    // Auto-select first customer when data loads
    const handleCustomersLoaded = useCallback((customers) => {
        if (!value.customer_name?.trim() && customers.length > 0) {
            const firstCustomer = customers[0]
            setSelectedCustomer(firstCustomer)
            update({
                customer_name: firstCustomer.name || '',
                customer_ref: value.customer_ref || firstCustomer.code || '',
            })
        }
    }, [value.customer_name, value.customer_ref])

    return (
        <div className="space-y-4">
            {/* Customer Autocomplete */}
            <CustomerAutocomplete
                value={selectedCustomer}
                onSelect={handleCustomerSelect}
                onDataLoaded={handleCustomersLoaded}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Customer name"
                    labelPlacement="outside"
                    placeholder="ชื่อลูกค้า / บริษัท"
                    value={value.customer_name}
                    onChange={(e) => update({ customer_name: e.target.value })}
                    isRequired
                    description="สามารถแก้ไขได้โดยตรง หรือเลือกจาก dropdown ด้านบน"
                />

                <Input
                    label="Customer ref."
                    labelPlacement="outside"
                    placeholder="รหัสลูกค้า / reference"
                    value={value.customer_ref || ''}
                    onChange={(e) => update({ customer_ref: e.target.value })}
                />

                <Select
                    label="Direction"
                    labelPlacement="outside"
                    selectedKeys={[value.trade_direction]}
                    onChange={(e) => update({ trade_direction: e.target.value })}
                >
                    {directionOptions.map((opt) => (
                        <SelectItem key={opt.key}>{opt.label}</SelectItem>
                    ))}
                </Select>

                <Select
                    label="Mode"
                    labelPlacement="outside"
                    selectedKeys={[value.transport_mode]}
                    onChange={(e) => update({ transport_mode: e.target.value })}
                >
                    {modeOptions.map((opt) => (
                        <SelectItem key={opt.key}>{opt.label}</SelectItem>
                    ))}
                </Select>

                <Select
                    className="md:col-span-2"
                    label="Service Package"
                    labelPlacement="outside"
                    selectedKeys={[value.service_package]}
                    onChange={(e) => update({ service_package: e.target.value })}
                >
                    {packageOptions.map((opt) => (
                        <SelectItem key={opt.key}>{opt.label}</SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    )
}

export default JobsCreateBasicStep
