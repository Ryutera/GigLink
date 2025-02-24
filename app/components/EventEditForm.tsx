import React from 'react'

const EventEditForm = () => {
  return (
   <>
   
      <div className='flex gap-20 items-center justify-center mt-6'>


<button type="submit" name="action" value="edit"  className="bg-green-400 hover:bg-green-500  text-white px-4 py-2 rounded  ">
編集する
</button> 

<button type="submit" name="action" value="delete"   className="bg-red-500 text-white px-4 py-2 rounded  ">
削除する
</button>
</div>


</>
  )
}

export default EventEditForm