import React from "react";
import EventItem from "./EventItem";
import { json, useRouteLoaderData , redirect} from "react-router-dom";
import Swal from "sweetalert2";


export default function EventDetailPage() {
  const data = useRouteLoaderData("Event-Detail");

  return (
    
      <EventItem event={data.event} />
    
  );
}

export async function loader({request, params}) {
  const id = params.eventID;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({
      message: "the data of this event could not be fetched!!",
      status: 500,
    });
  } else {
    return response;
  }
}

//the method comes from the eventItem and you can also add hardcored delete method

export async function action({params}){
  const eventID = params.eventID

  const response =await fetch("http://localhost:8080/events/" + eventID , {
    method:"DELETE"
  })

  if(!response.ok)
  {
    throw json({message:"the event can't be delet!!"},{status:500})

  }

   return redirect('/events')
  
}
