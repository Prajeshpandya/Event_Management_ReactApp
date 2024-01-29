import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import EventsPage from "./components/EventsPage";
import EditEventPage from "./components/EditEventPage";

import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDeletAction,
} from "./components/EventDetailPage";
import Newsletter,{action as newsletterAction} from "./components/Newsletter";
import NewEventPage from "./components/NewEventPage";
import EventROOT from "./components/EventROOT";
import Root from "./components/Root";
import { loader } from "./components/EventsPage";
import {} from "./components/EventItem";
import Error from "./components/Error";
import { action as manipulateEventAction } from "./components/EventForm";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <HomePage /> },

        {
          path: "/",
          element: <EventROOT />,
          children: [
            {
              path: "/events",
              element: <EventsPage />,
              loader: loader,
            },

            {
              path: "/events/:eventID",
              id: "Event-Detail",
              loader: eventDetailLoader,
              children: [
                {
                  path: "/events/:eventID",
                  action: eventDeletAction,
                  element: <EventDetailPage />,
                },
                {
                  path: "/events/:eventID/edit",
                  element: <EditEventPage />,
                  action: manipulateEventAction,
                },
              ],
            },

            {
              path: "/events/new",
              action: manipulateEventAction,
              element: <NewEventPage />,
            },
          ],
        },
        {
          path: '/newsletter',
          element: <Newsletter />,
          action: newsletterAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
