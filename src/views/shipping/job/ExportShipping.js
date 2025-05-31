import CreateForm from '@/components/CreateForm'
import inputItemsExportShipment from '@/configurations/inputItemsExportShipment'
import { Card, CardBody } from '@heroui/react'

const ExportShipping = () => {
  return (
    <Card>
      <CardBody>
        <CreateForm
          titleForm='EXPORT SHIPMENT'
          listInput={inputItemsExportShipment}
          shipmentType='export'
        />
      </CardBody>
    </Card>
  )
}
export default ExportShipping
