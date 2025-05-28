'use client'

import React, { useEffect, useState } from 'react'
import QueryFilesViews from '@/components/QueryFilesViews'
import CreateDocument from '../CreateDocument'

const FormQuotation = () => {
  const [documentsQuotation, setDocumentsQuotation] = useState([])
  const [selectedDocument, setSelectedDocument] = useState(null)
  console.log('selectedDocument:', selectedDocument)
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // const response = await axios.get();
        // setDocumentsQuotation(response.data);

        const mockData = [
          {
            id: 1,
            name: 'Template ใบเสนอราคา #1',
            description: 'ใช้สำหรับจ้างงานทั่วไป',
            createdAt: '2025-05-27T14:30:00Z'
          },
          {
            id: 2,
            name: 'Template ใบเสนอราคา #2',
            description: 'ใช้สำหรับเสนอบริการให้ลูกค้า',
            createdAt: '2025-05-26T10:15:00Z'
          },
          {
            id: 3,
            name: 'Template ใบเสนอราคา #3',
            description: 'ใช้สำหรับการดำเนินงาน',
            createdAt: '2025-05-25T08:45:00Z'
          },
          {
            id: 3,
            name: 'Template ใบเสนอราคา #4',
            description: 'ใช้ทั่วไป',
            createdAt: '2025-05-25T08:45:00Z'
          }
        ]
        setDocumentsQuotation(mockData)
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
          title='ใบเสนอราคา'
          dataAll={documentsQuotation}
          setSelectedDocument={setSelectedDocument}
        />
      ) : (
        <CreateDocument
          title='ใบเสนอราคา'
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
        />
      )}
    </div>
  )
}

export default FormQuotation
