// src/views/jobs/JobsCreateView/index.jsx
'use client'

import React, { useState } from 'react'
import { Button, Card, CardBody } from '@heroui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { FiUpload, FiLink2 } from 'react-icons/fi'

import JobsCreateFromFile from './JobsCreateFromFile'
import JobsCreateFromQuotation from './JobsCreateFromQuotation'

const JobsCreateView = ({ onBackToList, onJobCreated }) => {
    // mode: "file" | "quotation"
    const [mode, setMode] = useState('file')
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <div className="space-y-1">
                    <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
                        Create new Job
                    </h1>
                    <p className="mt-1 text-xs md:text-sm text-default-500">
                        เลือกวิธีเปิดงาน จากการอัปโหลดไฟล์ หรือจากใบเสนอราคาที่มีอยู่แล้ว
                    </p>

                </div>

                <div className="flex items-center gap-3 justify-end">

                    <div className=" flex gap-2">
                        <Button
                            variant="flat"
                            size="md"
                            startContent={<FaArrowLeft />}
                            onPress={onBackToList}
                        >
                            Back to list
                        </Button>
                        <Button
                            color={mode === 'file' ? 'primary' : 'default'}
                            size='md'
                            endContent={<FiUpload />}
                            onPress={() => setMode('file')}
                        >
                            From file
                        </Button>
                        <Button
                            color={mode === 'quotation' ? 'primary' : 'default'}
                            size='md'
                            endContent={<FiLink2 />}
                            onPress={() => setMode('quotation')}
                        >
                            From quotation
                        </Button>

                    </div>
                </div>
            </div>

            {/* MAIN CARD */}
            <div className="max-full mx-auto">
                <Card shadow="sm" className="border border-default-100">
                    <CardBody className="py-6 center flex items-center " >
                        {mode === 'file' ? (
                            <JobsCreateFromFile
                                onBackToList={onBackToList}
                                onJobCreated={onJobCreated}

                            />
                        ) : (
                            <JobsCreateFromQuotation
                                onBackToList={onBackToList}
                                onJobCreated={onJobCreated}

                            />
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default JobsCreateView