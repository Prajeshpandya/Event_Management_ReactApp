import React from 'react'
import EventForm from "./EventForm"
import { useRouteLoaderData } from 'react-router-dom'
export default function EditEventPage() {
  const data = useRouteLoaderData("Event-Detail")

  return (
    <EventForm method="patch" event={data.event}/>
  )
}
