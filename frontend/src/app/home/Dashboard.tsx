import React, { useState, useEffect } from "react";
import DashboardLoader from "./DashboardLoader";

interface DashboardProps {
  content: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ content }) => {
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
      {Loader ? <DashboardLoader /> : content}
    </div>
  );
};

export default Dashboard;
