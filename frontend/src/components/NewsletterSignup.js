import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";
import Swal from "sweetalert2";

function NewsletterSignup() {
  const fetcher = useFetcher();

  const { data, state } = fetcher;

  useEffect(() => {
    if (fetcher.state === "idle" && data && data.message) {
      Swal.fire({
        title: "Congratulations!",
        text: "You are registerd !",
        icon: "success",
      });
    }
    // console.log(data)
  }, [state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        required
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
