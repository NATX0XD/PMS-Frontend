'use client'
import QueryFilesViews from '@/components/QueryFilesViews'
import React, { useEffect, useState } from 'react'
import CreateDocument from '../CreateDocument'

const FormInvoice = () => {
  const [documentsInvoice, setDocumentsInvoice] = useState([])
  const [selectedDocument, setSelectedDocument] = useState(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // const response = await axios.get();
        // setDocumentsInvoice(response.data);

        const mockData = [
          {
            id: 1,
            name: 'Template ใบแจ้งหนี้ #1',
            description: 'ใช้สำหรับจ้างงานทั่วไป',
            createdAt: '2025-05-27T14:30:00Z'
          },
          {
            id: 2,
            name: 'Template ใบแจ้งหนี้ #2',
            description: 'ใช้สำหรับเสนอบริการให้ลูกค้า',
            createdAt: '2025-05-26T10:15:00Z'
          },
          {
            id: 3,
            name: 'Template ใบแจ้งหนี้ #3',
            description: 'ใช้สำหรับการดำเนินงาน',
            createdAt: '2025-05-25T08:45:00Z'
          },
          {
            id: 3,
            name: 'Template ใบแจ้งหนี้ #4',
            description: 'ใช้ทั่วไป',
            createdAt: '2025-05-25T08:45:00Z'
          }
        ]
        setDocumentsInvoice(mockData)
      } catch (error) {
        console.error('Error loading documents:', error)
      }
    }

    fetchDocuments()
  }, [])
  return (
    <div>
      {selectedDocument === null ? (
        <QueryFilesViews
          title='ใบแจ้งหนี้'
          dataAll={documentsInvoice}
          setSelectedDocument={setSelectedDocument}
        />
      ) : (
        <CreateDocument
          title='ใบแจ้งหนี้'
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
        />
      )}
    </div>
  )
}

export default FormInvoice
