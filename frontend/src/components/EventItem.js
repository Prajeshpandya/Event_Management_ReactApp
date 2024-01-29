import { NavLink, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";
import Swal from "sweetalert2";


function EventItem({ event }) {
  const submit = useSubmit();


  function startDeleteHandler() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (result.isConfirmed) {
          submit(null, { method: "delete" });   //first prop is for data that need to submit 
        }
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your Event has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your EventDetail is safe :)",
          icon: "error"
        });
      }
    });

   
    
    // if (proceed) {
    //   submit(null, { method: "delete" });   //first prop is for data that need to submit 
    // }
  }

  
  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <NavLink to={`/events/${event.id}/edit`}> Edit</NavLink>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
      <div className={classes.actions}>
        <NavLink to="/events">
          <button >Back</button>
        </NavLink>
      </div>
    </article>
  );
}

export default EventItem;
