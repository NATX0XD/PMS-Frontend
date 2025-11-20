// src/views/jobs/JobsCreateView/JobsCreateFromFile.jsx
'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { addToast } from '@heroui/react'
import Stepper, { useStepper } from '@/components/Stepper'

import JobsCreateBasicStep from './JobsCreateBasicStep'
import JobsCreateShipmentStep from './JobsCreateShipmentStep'
import JobsCreateFileStep from './JobsCreateFileStep'
import { jobsController } from '@/api/controllers/jobsController'
import { generateJobDraftId } from '@/helpers/jobDraftId'
import JobsCreateRouteStep from './JobsCreateRouteStep'

const JobsCreateFromFile = ({ onBackToList, onJobCreated, }) => {
    const api = jobsController()
    const draftId = useMemo(() => generateJobDraftId("JBD"), [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [file, setFile] = useState(null)

    const [basic, setBasic] = useState({
        customer_name: '',
        customer_ref: '',
        trade_direction: 'import',
        transport_mode: 'ocean_lcl',
        service_package: 'do_only',
    })

    const [shipment, setShipment] = useState({
        por: '',
        pol: '',
        pod: '',
        final_destination: '',
        por_object: null,
        pol_object: null,
        pod_object: null,
        shipper: '',
        inv_po: '',
        etd: '',
        eta: '',
        vsl_voy_flight: '',
    })

    const [warehouse, setWarehouse] = useState({
        mbl_awb: '',
        hbl_hawb: '',
        booking_no: '',
        type_bl: '',
        shed: '',
        terminal: '',
        gw: '',
        cbm: '',
        container_type: '',
        container_no: '',
    })

    const handleSubmit = useCallback(async () => {
        if (!basic.customer_name.trim()) {
            addToast({
                title: 'กรุณากรอก Customer name',
                color: 'warning',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
            return
        }

        if (!file) {
            addToast({
                title: 'กรุณาแนบไฟล์ก่อนเปิดงาน',
                color: 'warning',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
            return
        }

        try {
            setIsSubmitting(true)

            const formData = new FormData()
            Object.entries(basic).forEach(([k, v]) => formData.append(k, v || ''))

            // Only send the port codes, not full objects
            Object.entries(shipment).forEach(([k, v]) => {
                if (k.endsWith('_object')) return
                if (v !== '' && v != null) formData.append(k, v)
            })

            Object.entries(warehouse).forEach(([k, v]) => {
                if (v !== '' && v != null) formData.append(k, v)
            })

            formData.append('file', file)

            const job = await api.createFromFile(formData)

            addToast({
                title: 'สร้าง Job จากไฟล์เรียบร้อยแล้ว',
                color: 'success',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })

            onJobCreated?.(job)
            onBackToList?.()
        } catch (err) {
            console.error(err)
            addToast({
                title: 'สร้าง Job ไม่สำเร็จ',
                color: 'danger',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
        } finally {
            setIsSubmitting(false)
        }
    }, [api, basic, shipment, warehouse, file, onBackToList, onJobCreated])

    const steps = [
        {
            id: 'basic',
            title: 'Basic info',
            description: 'Customer & service package',
            content: <JobsCreateBasicStep value={basic} onChange={setBasic} />,
        },
        {
            id: 'route',
            title: 'Route',
            description: 'POR / POL / POD / Final destination',
            content: <JobsCreateRouteStep value={shipment} onChange={setShipment} />,
        },
        {
            id: 'shipment',
            title: 'Shipment',
            description: 'Shipper & schedule details',
            content: (
                <JobsCreateShipmentStep
                    value={shipment}
                    onChange={setShipment}
                />
            ),
        },
        {
            id: 'file',
            title: 'File / Container',
            description: 'BL, warehouse & attach file',
            content: (
                <JobsCreateFileStep
                    value={warehouse}
                    onChange={setWarehouse}
                    file={file}
                    onFileChange={setFile}
                />
            ),
        },
    ]

    const canProceed = useCallback(
        (stepIndex) => {
            // Step 0: ต้องมี customer_name
            if (stepIndex === 0) {
                return !!basic.customer_name.trim()
            }

            // Step สุดท้าย: อย่าให้กดถ้ากำลัง submit
            if (stepIndex === steps.length - 1) {
                return !isSubmitting
            }

            // step กลาง ๆ ปล่อยผ่านได้
            return true
        },
        [basic.customer_name, isSubmitting, steps.length]
    )

    const stepper = useStepper(steps, {
        canProceed,
        onComplete: handleSubmit,
    })

    return (
        <>

            <div className="w-full -mx-6 -mt-6 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-t-2xl">
                {/* ซ้าย: Title + Description */}
                <div className="space-y-1">

                    <h2 className="text-base md:text-lg font-semibold text-foreground">
                        กรอกข้อมูลให้ครบทุกขั้นตอนเพื่อเปิดงานใหม่
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



            <Stepper
                {...stepper}
                title={false}
                draftId={draftId} aw
                locale={{
                    entityName: 'job',
                    previousButtonText: 'Back',
                    nextButtonText: 'Next',
                    completeButtonText: isSubmitting ? 'Creating...' : 'Create Job',
                }}
            />
        </>
    )
}

export default JobsCreateFromFile