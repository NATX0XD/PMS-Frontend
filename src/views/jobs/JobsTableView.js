// src/views/jobs/JobsTableView.jsx
'use client'

import React from 'react'
import { Button } from '@heroui/react'
import { FaPlus } from 'react-icons/fa'
import TableQuery from '@/components/TableQuery'
import ColumnsTableJobs from '@/configurations/columns/ColumnsTableJobs'

const JobsTableView = ({ jobs, isLoading, onAddNew, onRefresh }) => {
    const mappedJobs = (jobs || []).map(job => ({
        id: job.id,
        job_no: job.job_no || job.job_no_display || `JOB-${job.id}`,
        customer_name: job.customer_name,
        customer_ref: job.customer_ref,
        trade_direction: job.trade_direction?.toUpperCase?.() || job.trade_direction,
        transport_mode: job.transport_mode?.toUpperCase?.() || job.transport_mode,
        service_package: job.service_package,
        status: job.status || 'draft',
        created_at: job.created_at
            ? new Date(job.created_at).toLocaleString()
            : ''
    }))

    const statusColorMap = {
        draft: 'default',
        open: 'primary',
        in_progress: 'warning',
        closed: 'success',
        cancelled: 'danger'
    }

    return (
        <TableQuery
            dataAll={mappedJobs}
            isLoading={isLoading}
            titleTable='Jobs List'
            columns={ColumnsTableJobs}
            searchField='job_no'
            searchPlaceholder='Search Job No / Customer'
            initialVisibleColumns={[
                'job_no',
                'customer_name',
                'customer_ref',
                'trade_direction',
                'transport_mode',
                'service_package',
                'status',
                'created_at'
            ]}
            statusColorMap={statusColorMap}
            statusMapKey='status'
            isModalAction={false}
            actionButton={false}

            renderActionButton={
                <Button
                    color='primary'
                    size='md'
                    endContent={<FaPlus />}
                    onPress={onAddNew}
                >
                    Add Job
                </Button>
            }
            refreshButton
            queryFunction={onRefresh}
        />
    )
}

export default JobsTableView