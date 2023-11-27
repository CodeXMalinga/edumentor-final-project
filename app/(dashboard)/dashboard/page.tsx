import React from "react";
import Sidebar from "../sidebar/Sidebar";
import ClientOnly from "../../components/ClientOnly";
import Provider from "../Provider";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Dashboard = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return <div className="pt-12">Body</div>;
};

export default Dashboard;
