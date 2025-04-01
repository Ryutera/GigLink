"use client"
import { applicationCreate, deleteApplication } from "@/lib/action"
import { type ChangeEvent, useState } from "react"
import { instruments } from "../constants/instruments"
import { useFormStatus } from "react-dom"

interface JoinFormProps {
  eventId: string
  hasApplied: any
  userId: string
}

function FormJoinButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className={`${pending ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded  transition`}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Apply Now"}
    </button>
  )
}

const JoinForm = ({ eventId, hasApplied, userId }: JoinFormProps) => {
  const [message, setMessage] = useState("")

  const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await applicationCreate(formData, eventId)
      if (result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Unable to submit application", error)
      alert("An error occurred while submitting your application")
    }
  }

  const onClickDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to cancel your application?")) {
        const result = await deleteApplication(eventId, userId)
        if (result.success) {
          alert(result.message)
        } else {
          alert(result.message)
        }
      }
    } catch (error) {
      alert("An error occurred while canceling your application")
    }
  }

  return (
    <form className="space-y-4" action={handleSubmit}>
      <div>
        <label htmlFor="instrument" className=" mb-1 font-medium">
          Instrument
        </label>

        {hasApplied.length ? (
          <span>: {hasApplied[0].instrument}</span>
        ) : (
          <select id="instrument" name="instrument" className="w-full border rounded-md p-2  border-indigo-500">
            {instruments.map((instrument) => (
              <option key={instrument}>{instrument}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label htmlFor="pr" className="block mb-1 font-medium">
          About You
        </label>
        {hasApplied.length ? (
          <textarea
            disabled
            className="w-full border rounded-md p-2 bg-white"
            value={hasApplied[0]?.message}
          ></textarea>
        ) : (
          <textarea
            id="pr"
            name="message"
            rows={2}
            className="w-full border rounded-md p-2 border-indigo-500"
            placeholder="Please provide a brief introduction about yourself"
            value={message}
            onChange={onChangeMessage}
          ></textarea>
        )}
      </div>
      <div>
        {hasApplied.length > 0 ? (
          <div className="flex justify-between">
            <button disabled className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed ">
              Already Applied
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onClickDelete}
            >
              Cancel Application
            </button>
          </div>
        ) : (
          <FormJoinButton />
        )}
      </div>
    </form>
  )
}

export default JoinForm

