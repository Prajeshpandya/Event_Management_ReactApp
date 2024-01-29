import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

import Swal from "sweetalert2";
import classes from "./EventForm.module.css";
 

//method come from editevent[patch] and newevent[post] page !1  

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const inSubmitting = navigation.state === "submitting";

  return (
    <Form method={method} className={classes.form}>
      {/* this form data send only to current route if you want to send to other route we have to do action="/any other path"  */}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          disabled={inSubmitting}
        >
          Cancel
        </button>
        <button disabled={inSubmitting}>
          {inSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;


 //for edit form & for the update the event page !!
export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventID = params.eventID;
    url = "http://localhost:8080/events/" + eventID;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json(
      { message: "the data can't be send to the server!!" },
      { status: 500 }
    );
  } else {
    if(method === "PATCH"){
      Swal.fire({
        title: "Good job!",
        text: "Your Event has been edited !!",
        icon: "success",
      });
    }
    else{
      Swal.fire({
        title: "Good job!",
        text: "Your Event has been added !!",
        icon: "success",
      });
    }
    
  }
  return redirect("/events");
}
