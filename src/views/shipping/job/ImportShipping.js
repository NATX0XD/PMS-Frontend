import CreateForm from '@/components/CreateForm'
import inputItemsImportShipment from '@/configurations/inputItemsImportShipment'
import { Card, CardBody } from '@heroui/react'

const ImportShipping = () => {
  return (
    <Card>
      <CardBody>
        <CreateForm
          titleForm='IMPORT SHIPMENT'
          listInput={inputItemsImportShipment}
          shipmentType='import'
        />
      </CardBody>
    </Card>
  )
}
export default ImportShipping
