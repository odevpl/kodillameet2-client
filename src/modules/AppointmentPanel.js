import React from "react";
import UserPanel from "./UserPanel";
import AdminPanel from "./AdminPanel";
import { useUser } from "../OdevFetch";

function AppointmentPanel() {
  const urlParams = new URLSearchParams(window.location.search);
  const userUuid = urlParams.get("user_uuid");

  const { payload, loading } = useUser({
    uuid: userUuid,
  });

  if (loading) return <div>Loading</div>;
  return <div>{payload.data.role === 2 ? <AdminPanel /> : <UserPanel />}</div>;
}

export default AppointmentPanel;
