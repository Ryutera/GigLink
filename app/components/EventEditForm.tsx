import React from 'react'

const EventEditForm = () => {
  return (
    <div className='flex gap-20 items-center justify-center'>
      <button type="submit"  className="bg-green-400 text-white px-4 py-2 rounded  ">
      編集する
    </button>
    <button type="submit"  className="bg-red-500 text-white px-4 py-2 rounded  ">
      削除する
    </button>
    </div>
  )
}

export default EventEditForm