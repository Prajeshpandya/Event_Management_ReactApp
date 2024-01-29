import React, { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

export default function Root() {
  const navigation = useNavigation();

  return (
    <Fragment>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p>Loading..</p>}
        <Outlet />
      </main>
    </Fragment>
  );
}
