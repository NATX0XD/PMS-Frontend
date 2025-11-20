// src/views/jobs/JobsCreateView/JobsCreateFileStep.jsx
'use client'

import React, { useState, useEffect } from 'react'
import { Input, Select, SelectItem, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react'
import { FaPlus, FaTrash } from 'react-icons/fa'

const containerTypeOptions = [
    { key: '20', label: '20"' },
    { key: '40', label: '40"' },
    { key: '40hc', label: '40HC' },
    { key: '45hc', label: '45HC' },
    { key: 'special_20ot', label: 'Special (20 OT)' },
    { key: 'special_40ot', label: 'Special (40 OT)' },
    { key: 'special_20flatrack', label: 'Special (20 Flatrack)' },
    { key: 'special_40flatrack', label: 'Special (40 Flatrack)' },
]

const JobsCreateFileStep = ({ value, onChange, file, onFileChange }) => {
    const [containerQuantity, setContainerQuantity] = useState('')
    const [containers, setContainers] = useState(value.containers || [])

    const update = (patch) => onChange((prev) => ({ ...prev, ...patch }))

    // Generate HBL/HAWB Running Number
    const generateHBLRunning = () => {
        const now = new Date()
        const year = now.getFullYear().toString().slice(-2)
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        return `HBL-${year}${month}-${random}`
    }

    // Auto-generate HBL/HAWB if empty
    useEffect(() => {
        if (!value.hbl_hawb) {
            update({ hbl_hawb: generateHBLRunning() })
        }
    }, [])

    // Handle container quantity change
    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value) || 0
        setContainerQuantity(e.target.value)

        if (qty > 0) {
            const newContainers = Array.from({ length: qty }, (_, index) => ({
                id: Date.now() + index,
                container_type: '20',
                container_no: '',
                gw: '',
                cbm: ''
            }))
            setContainers(newContainers)
            update({ containers: newContainers })
        } else {
            setContainers([])
            update({ containers: [] })
        }
    }

    // Update container data
    const updateContainer = (id, field, value) => {
        const updatedContainers = containers.map(c =>
            c.id === id ? { ...c, [field]: value } : c
        )
        setContainers(updatedContainers)
        update({ containers: updatedContainers })
    }

    // Remove container
    const removeContainer = (id) => {
        const updatedContainers = containers.filter(c => c.id !== id)
        setContainers(updatedContainers)
        setContainerQuantity(updatedContainers.length.toString())
        update({ containers: updatedContainers })
    }

    // Add single container
    const addContainer = () => {
        const newContainer = {
            id: Date.now(),
            container_type: '20',
            container_no: '',
            gw: '',
            cbm: ''
        }
        const updatedContainers = [...containers, newContainer]
        setContainers(updatedContainers)
        setContainerQuantity(updatedContainers.length.toString())
        update({ containers: updatedContainers })
    }

    return (
        <div className="space-y-6">
            {/* Booking / MBL / HBL Section - Reordered */}
            <div className="space-y-4">
                <div className="md:col-span-2">
                    <Input
                        label="Booking No."
                        labelPlacement="outside"
                        placeholder="กรอกเลข Booking"
                        value={value.booking_no}
                        onChange={(e) => update({ booking_no: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="MBL / AWB"
                        labelPlacement="outside"
                        placeholder="กรอกเลข MBL หรือ AWB"
                        value={value.mbl_awb}
                        onChange={(e) => update({ mbl_awb: e.target.value })}
                    />

                    <Input
                        label="HBL / HAWB"
                        labelPlacement="outside"
                        placeholder="เลข HBL/HAWB (Auto-generated)"
                        value={value.hbl_hawb}
                        onChange={(e) => update({ hbl_hawb: e.target.value })}
                        description="Running number สร้างอัตโนมัติ"
                    />
                </div>

                <div className="md:col-span-2">
                    <Select
                        label="Type BL"
                        labelPlacement="outside"
                        selectedKeys={[value.type_bl || '']}
                        onChange={(e) => update({ type_bl: e.target.value })}
                    >
                        <SelectItem key="draft">Draft</SelectItem>
                        <SelectItem key="obl">OBL / original</SelectItem>
                        <SelectItem key="surrender">Surrender / Telex Release</SelectItem>
                        <SelectItem key="swb">SWB</SelectItem>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Shed"
                        labelPlacement="outside"
                        value={value.shed}
                        onChange={(e) => update({ shed: e.target.value })}
                    />

                    <Input
                        label="Terminal"
                        labelPlacement="outside"
                        value={value.terminal}
                        onChange={(e) => update({ terminal: e.target.value })}
                    />
                </div>
            </div>

            {/* Container Section */}
            <div className="space-y-4 pt-4 border-t border-default-200">
                <p className="text-sm font-semibold text-default-700">
                    Container Information
                </p>

                <div className="flex gap-4 items-end">
                    <Input
                        type="number"
                        label="จำนวนตู้ (Quantity)"
                        labelPlacement="outside"
                        placeholder="กรอกจำนวนตู้"
                        value={containerQuantity}
                        onChange={handleQuantityChange}
                        min="0"
                        className="max-w-xs"
                    />
                    <Button
                        color="primary"
                        variant="flat"
                        onPress={addContainer}
                        startContent={<FaPlus />}
                    >
                        เพิ่มตู้
                    </Button>
                </div>

                {containers.length > 0 && (
                    <div className="overflow-x-auto">
                        <Table aria-label="Container information table">
                            <TableHeader>
                                <TableColumn>Container Type</TableColumn>
                                <TableColumn>Container No.</TableColumn>
                                <TableColumn>G.W.</TableColumn>
                                <TableColumn>CBM</TableColumn>
                                <TableColumn>Actions</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {containers.map((container) => (
                                    <TableRow key={container.id}>
                                        <TableCell>
                                            <Select
                                                size="sm"
                                                selectedKeys={[container.container_type]}
                                                onChange={(e) => updateContainer(container.id, 'container_type', e.target.value)}
                                                className="min-w-[150px]"
                                            >
                                                {containerTypeOptions.map((opt) => (
                                                    <SelectItem key={opt.key}>{opt.label}</SelectItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                size="sm"
                                                placeholder="เลขตู้"
                                                value={container.container_no}
                                                onChange={(e) => updateContainer(container.id, 'container_no', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                size="sm"
                                                type="number"
                                                placeholder="น้ำหนัก"
                                                value={container.gw}
                                                onChange={(e) => updateContainer(container.id, 'gw', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                size="sm"
                                                type="number"
                                                placeholder="ปริมาตร"
                                                value={container.cbm}
                                                onChange={(e) => updateContainer(container.id, 'cbm', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                color="danger"
                                                variant="light"
                                                isIconOnly
                                                onPress={() => removeContainer(container.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            {/* File Upload */}
            <div className="pt-4 border-t border-default-200">
                <Input
                    className="md:col-span-2"
                    type="file"
                    label="Attach file"
                    labelPlacement="outside"
                    description={file ? file.name : undefined}
                    onChange={(e) => {
                        const f = e.target.files?.[0] || null
                        onFileChange(f)
                    }}
                />
            </div>
        </div>
    )
}

export default JobsCreateFileStep
