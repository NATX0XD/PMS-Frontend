// src/components/ports/PortAutocomplete.jsx
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Autocomplete, AutocompleteItem } from '@heroui/react'

/**
 * PortAutocomplete - Autocomplete component for searching and selecting ports
 * Similar to PortCombobox from the original design but using HeroUI Autocomplete
 */
const PortAutocomplete = ({
    value,
    onSelect,
    label,
    placeholder = 'ค้นหาท่า/เมือง...',
    isRequired = false
}) => {
    const [ports, setPorts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    // Load ports from API
    useEffect(() => {
        let cancelled = false

        const loadPorts = async () => {
            try {
                setIsLoading(true)
                const res = await fetch('/api/ports', {
                    method: 'GET',
                    cache: 'no-store',
                })

                if (!res.ok) return

                const data = await res.json().catch(() => [])
                if (cancelled) return

                const list = Array.isArray(data) ? data : []
                setPorts(list)
            } catch (err) {
                console.error('Failed to load ports:', err)
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        loadPorts()

        return () => {
            cancelled = true
        }
    }, [])

    // Filter ports based on search value
    const filteredPorts = useMemo(() => {
        if (!searchValue) return ports

        const search = searchValue.toLowerCase()
        return ports.filter(
            (p) =>
                p.port_code?.toLowerCase().includes(search) ||
                p.port_name?.toLowerCase().includes(search) ||
                p.country?.toLowerCase().includes(search)
        )
    }, [ports, searchValue])

    // Handle selection
    const handleSelectionChange = (key) => {
        if (!key) {
            onSelect?.(null)
            return
        }

        const selectedPort = ports.find((p) => p.port_code === key)
        if (selectedPort) {
            onSelect?.(selectedPort)
        }
    }

    return (
        <Autocomplete
            label={label}
            labelPlacement="outside"
            placeholder={placeholder}
            isRequired={isRequired}
            isLoading={isLoading}
            selectedKey={value?.port_code || null}
            onSelectionChange={handleSelectionChange}
            onInputChange={setSearchValue}
            allowsCustomValue={false}
            showScrollIndicators={true}
            listboxProps={{
                emptyContent: 'ไม่พบท่าที่ค้นหา',
            }}
        >
            {filteredPorts.map((port) => (
                <AutocompleteItem
                    key={port.port_code}
                    value={port.port_code}
                    textValue={`${port.port_code} - ${port.port_name}`}
                >
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {port.port_code} - {port.port_name}
                        </span>
                        {port.country && (
                            <span className="text-xs text-default-400">
                                {port.country}
                            </span>
                        )}
                    </div>
                </AutocompleteItem>
            ))}
        </Autocomplete>
    )
}

export default PortAutocomplete
