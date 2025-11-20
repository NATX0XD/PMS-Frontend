// src/views/jobs/JobsCreateView/JobsCreateShipmentStep.jsx
'use client'

import React, { useState, useCallback } from 'react'
import { Input } from '@heroui/react'
import CustomerAutocomplete from '../components/customers/CustomerAutocomplete'

const JobsCreateShipmentStep = ({ value, onChange }) => {
    const [selectedShipper, setSelectedShipper] = useState(null)

    const update = useCallback((patch) => onChange(prev => ({ ...prev, ...patch })))

    const handleShipperSelect = useCallback((customer) => {
        setSelectedShipper(customer)
        if (customer) {
            update({
                shipper: customer.name || '',
                shipper_code: customer.code || '',
            })
        }
    }, [update])

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-sm font-semibold text-default-700">
                    Shipment Information
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Shipper Autocomplete */}
                    <div className="md:col-span-2">
                        <CustomerAutocomplete
                            value={selectedShipper}
                            onSelect={handleShipperSelect}
                            label="เลือก Shipper จากระบบ"
                            placeholder="ค้นหาชื่อ Shipper / code..."
                        />
                    </div>

                    {/* Shipper Name (editable) */}
                    <div className="md:col-span-2 border-3 border-red-500">
                        <Input
                            label="Shipper (SHPR)"
                            labelPlacement="outside"
                            placeholder="ชื่อ Shipper"
                            value={value.shipper}
                            onChange={(e) => update({ shipper: e.target.value })}
                            description="สามารถแก้ไขได้โดยตรง หรือเลือกจาก dropdown ด้านบน"
                        />
                    </div>

                    <div className="md:col-span-2 border-3 border-red-500">
                        <Input
                            label="INV / PO (Reference)"
                            labelPlacement="outside"
                            value={value.inv_po}
                            onChange={(e) => update({ inv_po: e.target.value })}
                        />
                    </div>

                    <Input
                        type="date"
                        label="ETD"
                        labelPlacement="outside"
                        value={value.etd}
                        onChange={(e) => update({ etd: e.target.value })}
                    />

                    <Input
                        type="date"
                        label="ETA"
                        labelPlacement="outside"
                        value={value.eta}
                        onChange={(e) => update({ eta: e.target.value })}
                    />

                    <div className="md:col-span-2">
                        <Input
                            label="VSL & VOY / Flight No."
                            labelPlacement="outside"
                            value={value.vsl_voy_flight}
                            onChange={(e) =>
                                update({ vsl_voy_flight: e.target.value })
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobsCreateShipmentStep