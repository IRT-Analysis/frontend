import { ChangeEvent, FormEvent, useState } from 'react'

import './table.css'
import Table from '@/components/Table'
import { ItemData } from '@/types/response_data.type'
import { transformData } from '@/lib/utils'
import uploadApiRequest from '@/api/upload'

const App = () => {
  const [file, setFile] = useState<File | null>(null)
  const [flaskResponse, setFlaskResponse] = useState<ItemData[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null
    setFile(uploadedFile)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await uploadApiRequest.upload(formData)
        setFlaskResponse(res.data.data)
        setMessage(res.data.message)
      } else {
        alert('Please upload an Excel file.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <div>
      <h1>Item Analysis</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
        <button type="submit">Submit</button>
      </form>

      {message && <h2>Message: {message}</h2>}
      {flaskResponse &&
        flaskResponse.map((item: ItemData, index: number) => {
          return (
            <div key={index}>
              <h4>Question {item.question}</h4>
              <Table data={transformData(item)} />
            </div>
          )
        })}
    </div>
  )
}

export default App
