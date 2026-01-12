import React, { useState } from "react"
import { ImAttachment } from "react-icons/im"
import { MdDelete } from "react-icons/md"
import axiosInstance from "../utils/axioInstance"
import toast from "react-hot-toast"

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleDeleteOption = (index) => {
    const updatedArray = attachments.filter((_, i) => i !== index)
    setAttachments(updatedArray)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file first")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      setUploading(true)
      const response = await axiosInstance.post(
        "/tasks/upload-attachment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setAttachments([...attachments, response.data.fileUrl])
      setFile(null)
      toast.success("File uploaded")
    } catch (error) {
      console.error("Error uploading file: ", error)
      toast.error("File upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex items-center justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <ImAttachment className="text-gray-400" />

            <p className="text-sm text-black">{item}</p>
          </div>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <MdDelete className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      <div className="text-sm text-gray-600 mt-2">
        Attach files via the upload control below.
      </div>

      <div className="flex items-center gap-3 mt-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,image/*"
          className="text-sm"
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          onClick={handleFileUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {file && (
          <span className="text-sm text-gray-600 ml-2">{file.name}</span>
        )}
      </div>
    </div>
  )
}

export default AddAttachmentsInput
