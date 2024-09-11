import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import jsPDF from 'jspdf'
import 'jspdf-autotable'

type ProductLine = {
  id: number
  description: string
  hsn: string
  quantity: number
  rate: number
  per: string
  amount: number
}

type TaxLine = {
  hsn: string
  taxableValue: number
  cgstRate: number
  cgstAmount: number
  sgstRate: number
  sgstAmount: number
  totalTaxAmount: number
}

type CompanyDetails = {
  name: string
  address: string[]
  gstin: string
  state: string
  stateCode: string
}

export default function DynamicTaxInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('71')
  const [invoiceDate, setInvoiceDate] = useState('31-May-24')
  const [buyerOrderNo, setBuyerOrderNo] = useState('')
  const [buyerOrderDate, setBuyerOrderDate] = useState('')
  const [dispatchDocNo, setDispatchDocNo] = useState('')
  const [deliveryNoteDate, setDeliveryNoteDate] = useState('')
  const [dispatchedThrough, setDispatchedThrough] = useState('Ganesh Trp')
  const [destination, setDestination] = useState('Mumbai')
  const [productLines, setProductLines] = useState<ProductLine[]>([
    {
      id: 1,
      description: 'Pluto New - Denim Fabrics',
      hsn: '52094200',
      quantity: 585,
      rate: 92,
      per: 'Mtr',
      amount: 53820
    }
  ])
  const [nextId, setNextId] = useState(2)

  const [supplier, setSupplier] = useState<CompanyDetails>({
    name: 'CLASSIC FABRICS',
    address: [
      '503, A WING, 5TH FLOOR, SAMARPAN APARTMENT,',
      'NEAR D-MART, YASHWANT VIVA TOWNSHIP,'
    ],
    gstin: '27CHLPP2269J1ZR',
    state: 'Maharashtra',
    stateCode: '27'
  })

  const [customer, setCustomer] = useState<CompanyDetails>({
    name: 'L. P. CREATION',
    address: [
      'CHANDRKANT CHAWL, ROOM NO 19, OPP',
      'KHIRA NAGAR, S. V. ROAD, SANTACRUZ',
      'WEST, Mumbai Suburban, 400054'
    ],
    gstin: '27AITPP7407M1ZE',
    state: 'Maharashtra',
    stateCode: '27'
  })

  const addProductLine = () => {
    setProductLines([...productLines, {
      id: nextId,
      description: '',
      hsn: '',
      quantity: 0,
      rate: 0,
      per: '',
      amount: 0
    }])
    setNextId(nextId + 1)
  }

  const updateProductLine = (id: number, field: keyof ProductLine, value: string | number) => {
    setProductLines(productLines.map(line => {
      if (line.id === id) {
        const updatedLine = { ...line, [field]: value }
        updatedLine.amount = updatedLine.quantity * updatedLine.rate
        return updatedLine
      }
      return line
    }))
  }

  const calculateTaxLines = (): TaxLine[] => {
    const taxLines: TaxLine[] = []
    productLines.forEach(line => {
      const existingTaxLine = taxLines.find(taxLine => taxLine.hsn === line.hsn)
      if (existingTaxLine) {
        existingTaxLine.taxableValue += line.amount
        existingTaxLine.cgstAmount = existingTaxLine.taxableValue * (existingTaxLine.cgstRate / 100)
        existingTaxLine.sgstAmount = existingTaxLine.taxableValue * (existingTaxLine.sgstRate / 100)
        existingTaxLine.totalTaxAmount = existingTaxLine.cgstAmount + existingTaxLine.sgstAmount
      } else {
        const newTaxLine: TaxLine = {
          hsn: line.hsn,
          taxableValue: line.amount,
          cgstRate: 2.5,
          cgstAmount: line.amount * 0.025,
          sgstRate: 2.5,
          sgstAmount: line.amount * 0.025,
          totalTaxAmount: line.amount * 0.05
        }
        taxLines.push(newTaxLine)
      }
    })
    return taxLines
  }

  const calculateTotal = () => productLines.reduce((sum, line) => sum + line.amount, 0)
  const calculateTotalTax = () => calculateTaxLines().reduce((sum, line) => sum + line.totalTaxAmount, 0)
  const calculateGrandTotal = () => calculateTotal() + calculateTotalTax()

  const numberToWords = (num: number) => {
    // This is a placeholder. Implement a proper number to words conversion here.
    return `INR ${num.toFixed(2)} Only`
  }

  const updateCompanyDetails = (company: 'supplier' | 'customer', field: keyof CompanyDetails, value: string) => {
    if (field === 'address') {
      const updatedAddress = value.split('\n')
      if (company === 'supplier') {
        setSupplier(prev => ({ ...prev, address: updatedAddress }))
      } else {
        setCustomer(prev => ({ ...prev, address: updatedAddress }))
      }
    } else {
      if (company === 'supplier') {
        setSupplier(prev => ({ ...prev, [field]: value }))
      } else {
        setCustomer(prev => ({ ...prev, [field]: value }))
      }
    }
  }

  const downloadInvoice = () => {
    const doc = new jsPDF()

    // Set font styles
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)

    // Header
    doc.setFontSize(18)
    doc.text('Tax Invoice', 105, 15, { align: 'center' })
    
    // Company details
    doc.setFontSize(12)
    doc.text(supplier.name, 20, 25)
    doc.setFontSize(8)
    supplier.address.forEach((line, index) => {
      doc.text(line, 20, 30 + (index * 5))
    })
    doc.text(`GSTIN/UIN: ${supplier.gstin}`, 20, 40)
    doc.text(`State Name : ${supplier.state}, Code : ${supplier.stateCode}`, 20, 45)

    // Invoice details
    doc.text(`Invoice No: ${invoiceNumber}`, 150, 25)
    doc.text(`Dated: ${invoiceDate}`, 150, 30)
    doc.text('Mode/Terms of Payment', 150, 35)

    // Buyer and Consignee details
    doc.setFontSize(10)
    doc.text('Consignee (Ship to)', 20, 55)
    doc.text('Buyer (Bill to)', 110, 55)
    doc.setFontSize(8)
    customer.address.forEach((line, index) => {
      doc.text(line, 20, 60 + (index * 5))
      doc.text(line, 110, 60 + (index * 5))
    })
    doc.text(`GSTIN/UIN : ${customer.gstin}`, 20, 75)
    doc.text(`State Name : ${customer.state}, Code : ${customer.stateCode}`, 20, 80)
    doc.text(`GSTIN/UIN : ${customer.gstin}`, 110, 75)
    doc.text(`State Name : ${customer.state}, Code : ${customer.stateCode}`, 110, 80)

    // Order details
    doc.setFontSize(8)
    doc.text(`Buyer's Order No.: ${buyerOrderNo}`, 20, 95)
    doc.text(`Dated: ${buyerOrderDate}`, 20, 100)
    doc.text(`Dispatch Doc No.: ${dispatchDocNo}`, 75, 95)
    doc.text(`Delivery Note Date: ${deliveryNoteDate}`, 75, 100)
    doc.text(`Dispatched through: ${dispatchedThrough}`, 130, 95)
    doc.text(`Destination: ${destination}`, 130, 100)

    // Product table
    doc.autoTable({
      head: [['SI No.', 'Description of Goods', 'HSN/SAC', 'Quantity', 'Rate', 'per', 'Amount']],
      body: productLines.map((line, index) => [
        index + 1,
        line.description,
        line.hsn,
        line.quantity,
        line.rate,
        line.per,
        line.amount.toFixed(2)
      ]),
      startY: 105,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [200, 200, 200], textColor: 20 },
    })

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10
    doc.setFontSize(10)
    doc.text(`Total: ${productLines.reduce((sum, line) => sum + line.quantity, 0)} ${productLines[0]?.per}`, 130, finalY)
    doc.text(`₹ ${calculateGrandTotal().toFixed(2)}`, 175, finalY, { align: 'right' })
    doc.setFontSize(8)
    doc.text('E. & O.E', 175, finalY + 5, { align: 'right' })
    doc.text('Amount Chargeable (in words)', 20, finalY + 10)
    doc.setFont("helvetica", "bold")
    doc.text(numberToWords(calculateGrandTotal()), 20, finalY + 15)
    doc.setFont("helvetica", "normal")

    // Tax table
    doc.autoTable({
      head: [['HSN/SAC', 'Taxable Value', 'Central Tax Rate', 'Central Tax Amount', 'State Tax Rate', 'State Tax Amount', 'Total Tax Amount']],
      body: calculateTaxLines().map(line => [
        line.hsn,
        line.taxableValue.toFixed(2),
        `${line.cgstRate.toFixed(2)}%`,
        line.cgstAmount.toFixed(2),
        `${line.sgstRate.toFixed(2)}%`,
        line.sgstAmount.toFixed(2),
        line.totalTaxAmount.toFixed(2)
      ]),
      startY: finalY + 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [200, 200, 200], textColor: 20 },
    })

    // Tax amount in words
    const taxFinalY = (doc as any).lastAutoTable.finalY + 5
    doc.setFontSize(8)
    doc.text('Tax Amount (in words) :', 20, taxFinalY)
    doc.setFont("helvetica", "bold")
    doc.text(numberToWords(calculateTotalTax()), 20, taxFinalY + 5)
    doc.setFont("helvetica", "normal")

    // Company's Bank Details
    doc.setFontSize(9)
    doc.text("Company's Bank Details", 20, taxFinalY + 15)
    doc.setFontSize(8)
    doc.text('Bank Name : HDFC 9588', 20, taxFinalY + 20)
    doc.text('A/c No. : 50200067469585', 20, taxFinalY + 25)
    doc.text('Branch & IFS Code : Nallasopra East & HDFC0001808', 20, taxFinalY + 30)

    // Company's PAN and Declaration
    doc.text("Company's PAN : CHLPP2269J", 20, taxFinalY + 40)
    doc.text('Declaration:', 20, taxFinalY + 45)
    doc.setFontSize(7)
    doc.text('We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.', 20, taxFinalY + 50)

    // Signature
    doc.setFontSize(8)
    doc.text(`for ${supplier.name}`, 150, taxFinalY + 60)
    doc.text('Authorised Signatory', 150, taxFinalY + 70)

    // Footer
    doc.setFontSize(8)
    doc.text('This is a Computer Generated Invoice', 105, 285, { align: 'center' })

    // Save the PDF
    doc.save(`Invoice_${invoiceNumber}.pdf`)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Tax Invoice</CardTitle>
            <Input
              value={supplier.name}
              onChange={(e) => updateCompanyDetails('supplier', 'name', e.target.value)}
              className="font-semibold"
            />
            <textarea
              value={supplier.address.join('\n')}
              onChange={(e) => updateCompanyDetails('supplier', 'address', e.target.value)}
              className="text-xs text-muted-foreground w-full"
              rows={2}
            />
            <Input
              value={supplier.gstin}
              onChange={(e) => updateCompanyDetails('supplier', 'gstin', e.target.value)}
              className="text-xs text-muted-foreground"
              placeholder="GSTIN/UIN"
            />
            <div className="flex gap-2">
              <Input
                value={supplier.state}
                onChange={(e) => updateCompanyDetails('supplier', 'state', e.target.value)}
                className="text-xs text-muted-foreground"
                placeholder="State"
              />
              <Input
                value={supplier.stateCode}
                onChange={(e) => updateCompanyDetails('supplier', 'stateCode', e.target.value)}
                className="text-xs text-muted-foreground w-16"
                placeholder="Code"
              />
            </div>
          </div>
          <div className="text-right">
            <Label htmlFor="invoiceNumber">Invoice No:</Label>
            <Input
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-24 text-right"
            />
            <Label htmlFor="invoiceDate">Dated:</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-36"
            />
            <p className="text-xs text-muted-foreground">Mode/Terms of Payment</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Consignee (Ship to)</h3>
            <Input
              value={customer.name}
              onChange={(e) => updateCompanyDetails('customer', 'name', e.target.value)}
              className="font-semibold"
            />
            <textarea
              value={customer.address.join('\n')}
              onChange={(e) => updateCompanyDetails('customer', 'address', e.target.value)}
              className="text-sm w-full"
              rows={3}
            />
            <Input
              value={customer.gstin}
              onChange={(e) => updateCompanyDetails('customer', 'gstin', e.target.value)}
              className="text-sm"
              placeholder="GSTIN/UIN"
            />
            <div className="flex gap-2">
              <Input
                value={customer.state}
                onChange={(e) => updateCompanyDetails('customer', 'state', e.target.value)}
                className="text-sm"
                placeholder="State"
              />
              <Input
                value={customer.stateCode}
                onChange={(e) => updateCompanyDetails('customer', 'stateCode', e.target.value)}
                className="text-sm w-16"
                placeholder="Code"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Buyer (Bill to)</h3>
            <Input
              value={customer.name}
              onChange={(e) => updateCompanyDetails('customer', 'name', e.target.value)}
              className="font-semibold"
            />
            <textarea
              value={customer.address.join('\n')}
              onChange={(e) => updateCompanyDetails('customer', 'address', e.target.value)}
              className="text-sm w-full"
              rows={3}
            />
            <Input
              value={customer.gstin}
              onChange={(e) => updateCompanyDetails('customer', 'gstin', e.target.value)}
              className="text-sm"
              placeholder="GSTIN/UIN"
            />
            <div className="flex gap-2">
              <Input
                value={customer.state}
                onChange={(e) => updateCompanyDetails('customer', 'state', e.target.value)}
                className="text-sm"
                placeholder="State"
              />
              <Input
                value={customer.stateCode}
                onChange={(e) => updateCompanyDetails('customer', 'stateCode', e.target.value)}
                className="text-sm w-16"
                placeholder="Code"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="buyerOrderNo">Buyer's Order No.</Label>
            <Input
              id="buyerOrderNo"
              value={buyerOrderNo}
              onChange={(e) => setBuyerOrderNo(e.target.value)}
            />
            <Label htmlFor="buyerOrderDate">Dated</Label>
            <Input
              id="buyerOrderDate"
              type="date"
              value={buyerOrderDate}
              onChange={(e) => setBuyerOrderDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dispatchDocNo">Dispatch Doc No.</Label>
            <Input
              id="dispatchDocNo"
              value={dispatchDocNo}
              onChange={(e) => setDispatchDocNo(e.target.value)}
            />
            <Label htmlFor="deliveryNoteDate">Delivery Note Date</Label>
            <Input
              id="deliveryNoteDate"
              type="date"
              value={deliveryNoteDate}
              onChange={(e) => setDeliveryNoteDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dispatchedThrough">Dispatched through</Label>
            <Input
              id="dispatchedThrough"
              value={dispatchedThrough}
              onChange={(e) => setDispatchedThrough(e.target.value)}
            />
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SI No.</TableHead>
              <TableHead>Description of Goods</TableHead>
              <TableHead>HSN/SAC</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>per</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productLines.map((line, index) => (
              <TableRow key={line.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    value={line.description}
                    onChange={(e) => updateProductLine(line.id, 'description', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={line.hsn}
                    onChange={(e) => updateProductLine(line.id, 'hsn', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={line.quantity}
                    onChange={(e) => updateProductLine(line.id, 'quantity', parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={line.rate}
                    onChange={(e) => updateProductLine(line.id, 'rate', parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={line.per}
                    onChange={(e) => updateProductLine(line.id, 'per', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-right">{line.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={addProductLine} className="mt-4">Add Product Line</Button>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">{productLines.reduce((sum, line) => sum + line.quantity, 0)} {productLines[0]?.per}</p>
            <p className="font-semibold">₹ {calculateGrandTotal().toFixed(2)}</p>
          </div>
          <p className="text-sm text-right">E. & O.E</p>
          <p className="text-sm font-semibold mt-2">Amount Chargeable (in words)</p>
          <p className="text-sm">{numberToWords(calculateGrandTotal())}</p>
        </div>
        <div className="mt-6 border-t pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>HSN/SAC</TableHead>
                <TableHead>Taxable Value</TableHead>
                <TableHead>Central Tax Rate</TableHead>
                <TableHead>Central Tax Amount</TableHead>
                <TableHead>State Tax Rate</TableHead>
                <TableHead>State Tax Amount</TableHead>
                <TableHead>Total Tax Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculateTaxLines().map((taxLine, index) => (
                <TableRow key={index}>
                  <TableCell>{taxLine.hsn}</TableCell>
                  <TableCell>{taxLine.taxableValue.toFixed(2)}</TableCell>
                  <TableCell>{taxLine.cgstRate.toFixed(2)}%</TableCell>
                  <TableCell>{taxLine.cgstAmount.toFixed(2)}</TableCell>
                  <TableCell>{taxLine.sgstRate.toFixed(2)}%</TableCell>
                  <TableCell>{taxLine.sgstAmount.toFixed(2)}</TableCell>
                  <TableCell>{taxLine.totalTaxAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6} className="font-semibold text-right">Total</TableCell>
                <TableCell className="font-semibold">{calculateTotalTax().toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-6">
          <p className="text-sm font-semibold">Tax Amount (in words) : {numberToWords(calculateTotalTax())}</p>
          <p className="text-sm font-semibold mt-4">Company's Bank Details</p>
          <p className="text-sm">Bank Name : HDFC 9588</p>
          <p className="text-sm">A/c No. : 50200067469585</p>
          <p className="text-sm">Branch & IFS Code : Nallasopara East & HDFC0001808</p>
        </div>
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-semibold">Company's PAN : CHLPP2269J</p>
          <p className="text-xs mt-2">Declaration:</p>
          <p className="text-xs">We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
          <div className="mt-4 text-right">
            <p className="text-sm font-semibold">for {supplier.name}</p>
            <p className="text-xs mt-8">Authorised Signatory</p>
          </div>
        </div>
        <p className="text-xs text-center mt-4">This is a Computer Generated Invoice</p>
        <Button onClick={downloadInvoice} className="mt-4">Download Invoice</Button>
      </CardContent>
    </Card>
  )
}