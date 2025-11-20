"use client"
import JobsView from '@/views/jobs'
import React, { Suspense } from 'react'
import LoadingJobsPage from './LoadingJobsPage'
import { useSetPageTitle } from '@/helpers/useSetPageTitle'

const JobsPage = () => {
    useSetPageTitle('Jobs')
    return (
        <Suspense fallback={<LoadingJobsPage />}>
            <JobsView />
        </Suspense>
    )
}

export default JobsPage