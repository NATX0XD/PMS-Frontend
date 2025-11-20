// src/views/jobs/JobsIndex.jsx
'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { addToast } from '@heroui/react'
import JobsTableView from './JobsTableView'
import JobsCreateView from './JobsCreateView'

const JobsIndex = () => {
    const [mode, setMode] = useState('list') // 'list' | 'create'
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const loadJobs = useCallback(async () => {
        try {
            setIsLoading(true)

            const res = await fetch('/api/jobs', { cache: 'no-store' })
            if (!res.ok) throw new Error('load failed')

            const data = await res.json()
            const list = Array.isArray(data) ? data : data.data ?? []

            setJobs(list)
        } catch (err) {
            console.error(err)
            addToast({
                title: 'โหลดรายการงานไม่สำเร็จ',
                description: 'ไม่สามารถดึงข้อมูล Jobs ได้ โปรดลองใหม่อีกครั้ง',
                color: 'danger',
            })
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadJobs()
    }, [loadJobs])

    const handleJobCreated = () => {
        // สร้างเสร็จแล้ว กลับไปหน้า list แล้ว reload
        setMode('list')
        loadJobs()
    }

    return (
        <>
            {mode === 'list' && (
                <JobsTableView
                    jobs={jobs}
                    isLoading={isLoading}
                    onAddNew={() => setMode('create')}
                    onRefresh={loadJobs}
                />
            )}

            {mode === 'create' && (
                <JobsCreateView
                    onBackToList={() => setMode('list')}
                    onJobCreated={handleJobCreated}
                />
            )}
        </>
    )
}

export default JobsIndex