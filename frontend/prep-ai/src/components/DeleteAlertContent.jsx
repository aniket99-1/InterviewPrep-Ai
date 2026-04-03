import React from 'react'

const DeleteAlertContent = ({content, onDelete, onCancel}) => {
  return (
    <div className="">
        <p className="text-gray-600 text-sm">{content}</p>
        <div className="flex justify-end gap-2 mt-4">
            <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
                Cancel
            </button>
            <button
                onClick={onDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlertContent;