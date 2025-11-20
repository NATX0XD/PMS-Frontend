// src/components/customers/CustomerAutocomplete.jsx
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Autocomplete, AutocompleteItem } from '@heroui/react'

/**
 * CustomerAutocomplete - Autocomplete component for searching and selecting customers
 */
const CustomerAutocomplete = ({
    value,
    onSelect,
    label = 'เลือกลูกค้าจากระบบ',
    placeholder = 'ค้นหาชื่อลูกค้า / code...',
    onDataLoaded
}) => {
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    // Load customers from API
    useEffect(() => {
        let cancelled = false

        const loadCustomers = async () => {
            try {
                setIsLoading(true)
                const res = await fetch('/api/customers', {
                    method: 'GET',
                    cache: 'no-store',
                })

                if (!res.ok) return

                const data = await res.json().catch(() => [])
                if (cancelled) return

                const list = Array.isArray(data) ? data : []
                setCustomers(list)
                onDataLoaded?.(list)
            } catch (err) {
                console.error('Failed to load customers:', err)
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        loadCustomers()

        return () => {
            cancelled = true
        }
    }, [onDataLoaded])

    // Filter customers based on search value
    const filteredCustomers = useMemo(() => {
        if (!searchValue) return customers

        const search = searchValue.toLowerCase()
        return customers.filter(
            (c) =>
                c.code?.toLowerCase().includes(search) ||
                c.name?.toLowerCase().includes(search) ||
                c.tel?.toLowerCase().includes(search) ||
                c.email?.toLowerCase().includes(search)
        )
    }, [customers, searchValue])

    // Handle selection
    const handleSelectionChange = (key) => {
        if (!key) {
            onSelect?.(null)
            return
        }

        const selectedCustomer = customers.find((c) => String(c.id) === String(key))
        if (selectedCustomer) {
            onSelect?.(selectedCustomer)
        }
    }

    return (
        <Autocomplete
            label={label}
            labelPlacement="outside"
            placeholder={placeholder}
            isLoading={isLoading}
            selectedKey={value ? String(value.id) : null}
            onSelectionChange={handleSelectionChange}
            onInputChange={setSearchValue}
            allowsCustomValue={false}
            showScrollIndicators={true}
            listboxProps={{
                emptyContent: 'ไม่พบลูกค้าในระบบ',
            }}
        >
            {filteredCustomers.map((customer) => (
                <AutocompleteItem
                    key={String(customer.id)}
                    value={String(customer.id)}
                    textValue={`${customer.code} - ${customer.name}`}
                >
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {customer.code} - {customer.name}
                        </span>
                        {(customer.tel || customer.email) && (
                            <span className="text-xs text-default-400">
                                {customer.tel || ''} {customer.email ? `• ${customer.email}` : ''}
                            </span>
                        )}
                    </div>
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default CustomerAutocomplete
