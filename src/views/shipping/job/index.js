// Import form usage example
import CreateForm from '@/components/CreateForm'
import inputItemsImportShipment from '@/configurations/inputItemsImportShipment'
import inputItemsExportShipment from '@/configurations/inputItemsExportShipment'

// Combined Component with Tab Selection
import { Tabs, Tab } from '@heroui/react'
import ImportShipping from './ImportShipping'
import ExportShipping from './ExportShipping'

const ViewShippingJob = () => (
  <div className='max-w-full mx-auto p-0 '>
    <Tabs
      aria-label='Shipment Options '
      color='primary'
      variant='underlined'
      classNames={{
        tabList:
          'gap-6 w-full relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full bg-blue-600',
        tab: 'max-w-fit px-6 h-12',
        tabContent: 'group-data-[selected=true]:text-blue-600 font-medium'
      }}
    >
      <Tab key='import' title='Import Shipment'>
        <ImportShipping />x
      </Tab>
      <Tab key='export' title='Export Shipment'>
        <ExportShipping />
      </Tab>
    </Tabs>
  </div>
)

export default ViewShippingJob
