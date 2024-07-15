import { FC } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { invoice } from '../data/types'
import { useDebounce } from '@uidotdev/usehooks'
import Main_Invoice from './Main_Invoice'


interface Props {
  data: invoice
  setData(data: invoice): void

}

const Download: FC<Props> = ({ data }) => {
  const debounced = useDebounce(data, 500)

  const title = data.seller_billing_company_name ? data.seller_billing_company_name.toLowerCase() : 'invoice'
  return (
    <div className={'download-pdf '}>
      <PDFDownloadLink
        key="pdf"
        document={<Main_Invoice pdfMode={true} data={debounced} fstate={[]}/>}
        fileName={`${title}.pdf`}
        aria-label="Save PDF"
        title="Save PDF"
        className="download-pdf__pdf"
      ></PDFDownloadLink>
      <p>Save PDF</p>
    </div>
  )
}

export default Download
