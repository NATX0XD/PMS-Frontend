'use client'

import React from 'react'
import { Input } from '@heroui/react'
import PortAutocomplete from '../components/ports/PortAutocomplete'

const JobsCreateRouteStep = ({ value, onChange }) => {
    const update = (patch) => onChange(prev => ({ ...prev, ...patch }))

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-sm font-semibold text-default-700">
                    Route / Transport Path
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* POR */}
                    <div className="md:col-span-2">
                        <PortAutocomplete
                            label="Place of Receipt (POR)"
                            placeholder="ค้นหาท่าต้นทาง..."
                            value={value.por_object}
                            onSelect={(port) => {
                                update({
                                    por: port?.port_code || '',
                                    por_object: port,
                                })
                            }}
                        />
                    </div>

                    {/* POL */}
                    <PortAutocomplete
                        label="Port of Loading (POL)"
                        placeholder="ค้นหาท่าขึ้นสินค้า..."
                        value={value.pol_object}
                        onSelect={(port) => {
                            update({
                                pol: port?.port_code || '',
                                pol_object: port,
                            })
                        }}
                    />

                    {/* POD */}
                    <PortAutocomplete
                        label="Port of Discharge (POD)"
                        placeholder="ค้นหาท่าลงสินค้า..."
                        value={value.pod_object}
                        onSelect={(port) => {
                            update({
                                pod: port?.port_code || '',
                                pod_object: port,
                            })
                        }}
                    />

                    {/* Final Destination */}
                    <div className="md:col-span-2">
                        <Input
                            label="Final Destination"
                            labelPlacement="outside"
                            placeholder="เช่น BANGKOK, THAILAND"
                            value={value.final_destination}
                            onChange={(e) =>
                                update({ final_destination: e.target.value })
                            }
                            isRequired
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobsCreateRouteStep