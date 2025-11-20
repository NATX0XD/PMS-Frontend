// src/views/jobs/JobsCreateView/JobsCreateFromQuotation.jsx
'use client'

import React, { useMemo, useState } from 'react'
import { Button, Input, addToast } from '@heroui/react'
import { generateJobDraftId } from '@/helpers/jobDraftId'
const JobsCreateFromQuotation = ({ onBackToList, onJobCreated }) => {
    const [quotationRef, setQuotationRef] = useState('')
    const [loading, setLoading] = useState(false)
    const draftId = useMemo(() => generateJobDraftId("JBD"), [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!quotationRef.trim()) {
            addToast({
                title: 'กรุณากรอก Quotation no. / Hash id',
                color: 'warning',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
            return
        }

        try {
            setLoading(true)

            const res = await fetch(
                `/api/jobs/from-quotation/${encodeURIComponent(
                    quotationRef.trim()
                )}`,
                { method: 'POST' }
            )

            const text = await res.text().catch(() => '')
            if (!res.ok) {
                console.error('Create from quotation failed:', text)
                addToast({
                    title: 'สร้างจาก Quotation ไม่สำเร็จ',
                    color: 'danger',
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                })
                return
            }

            const data = text ? JSON.parse(text) : {}
            addToast({
                title: 'สร้าง Job จาก Quotation แล้ว',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })

            onJobCreated?.(data)
            onBackToList?.()
        } catch (err) {
            console.error('Create from quotation error:', err)
            addToast({
                title: 'สร้างจาก Quotation ไม่สำเร็จ',
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="w-full   -mx-6 -mt-6 py-2 px-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* ซ้าย: Title + Description */}
                <div className="space-y-1">

                    <h2 className="text-base md:text-lg font-semibold text-foreground">
                        กรอกข้อมูล Quotation เพื่อเปิดงานใหม่
                    </h2>

                </div>

                {/* ขวา: Draft badge */}
                <div className="flex md:flex-col items-end md:items-end gap-1 text-right">
                    <span className="text-[11px] uppercase tracking-wide text-default-400">
                        Draft Reference
                    </span>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                      bg-default-50 border border-default-200">
                        <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" />
                        <span className="text-xs font-mono font-semibold text-default-700">
                            {draftId}
                        </span>
                    </div>
                </div>
            </div>

            <form className="space-y-4 max-w-md  w-full" onSubmit={handleSubmit} >
                <div className="space-y-1">
                    <p className="text-xs font-medium text-default-600">
                        Quotation no. / Hash id
                    </p>
                    <Input
                        size="md"
                        variant="bordered"
                        placeholder="เช่น QT-XXXX หรือ hash id"
                        value={quotationRef}
                        onChange={(e) => setQuotationRef(e.target.value)}
                    />
                </div>

                <p className="text-[11px] text-default-500 leading-relaxed">
                    ระบบจะดึงข้อมูลลูกค้าและ shipment จาก Quotation ที่คุณระบุ
                    มาเปิดเป็น Job ให้อัตโนมัติ
                </p>

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        type="button"
                        variant="flat"
                        size="sm"
                        onPress={onBackToList}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        size="sm"
                        isLoading={loading}
                    >
                        Create from quotation
                    </Button>
                </div>
            </form>
        </>
    )
}

export default JobsCreateFromQuotation