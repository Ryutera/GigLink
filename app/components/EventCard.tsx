"use client";
import { Button } from "@/components/ui/button";
import { applicationApprove, applicationReject } from "@/lib/action";
import { Application, MusicEvent } from "@/types/events";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import { useState } from "react";

export function EventCard({ event }: { event: MusicEvent }) {
  const [isApplicantsVisible, setIsApplicantsVisible] = useState(false);

  const filterApplicationByStatus = (
    status: "PENDING" | "ACCEPTED" | "REJECTED"
  ) => {
    //applicationがundefinedでfilter使えないのを防ぐ
    return (event.applications ?? []).filter((app:Application) => app.status === status);
  };

  const pendingApplications = filterApplicationByStatus("PENDING");
  const acceptedApplications = filterApplicationByStatus("ACCEPTED");

  const onClickApprove = async (application: Application) => {
    if(window.confirm("Do you want to approve this application?")){
      try {
        await applicationApprove(application);
        alert("Application approved");
      } catch (error) {
        alert("Failed to approve application");
      }
    }
   
  };
  const onClickReject = async (application: Application) => {
    if (window.confirm("Do you want to reject this application?")) {
      try {
        await applicationReject(application);
        alert("Application rejected");
      } catch (error) {
        alert("Failed to reject application");
      }
    }  
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-white">
        <h3 className="text-2xl font-semibold mb-2">
          <Link
            className="hover:text-blue-500"
            href={`/event_detail/${event.id}`}
          >
            {event.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-1">
          <span className="font-medium">Location:</span> {event.location}
        </p>

        <p className="text-gray-600 mb-1">
          <span className="font-medium">Date & Time:</span>{" "}
          {`${event.date.toISOString().slice(0,10)} ${event.startTime.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )} - ${event.endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Instruments Needed:</span>{" "}
          {event.instruments.join(", ")}
        </p>

        <div className="text-gray-600 mb-4">
          <span>Confirmed Participants:</span>
          <br />

          {/* This adds commas between participants */}
          {acceptedApplications.length > 0 ? (
            acceptedApplications.map((p: Application, index: number) => (
              <div className="flex items-center py-2" key={event.id}>
                <Link href={`/profile/${p.user?.id}`}>
                  <Avatar className="h-8 w-8 border-2 border-gray-200 flex">
                    <AvatarImage
                      src={p.user?.image || undefined}
                      alt={p.user?.name}
                    />
                    <AvatarFallback className="text-lg">
                      {p.user?.name?.substring(0, 2).toUpperCase() || "UN"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hover:text-blue-400"> {p.user?.name}</span>
                </Link>
                {index < acceptedApplications.length - 1 ? ", " : ""}
              </div>
            ))
          ) : (
            <span>No participants yet</span>
          )}
        </div>

        <Button
          className="w-full text-left flex justify-between items-center text-black"
          onClick={() => setIsApplicantsVisible(!isApplicantsVisible)}
        >
          Show Applicants ({pendingApplications.length})
          {isApplicantsVisible ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </Button>
      </div>
      {isApplicantsVisible && (
        <div className="bg-gray-50 p-6 border-t">
          <h4 className="text-lg font-semibold mb-4">Applicant List</h4>
          {pendingApplications.length > 0 ? (
            <ul className="space-y-4">
              {pendingApplications.map((application: Application) => (
                <li
                  key={application.id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  
                  <Link href={`/profile/${application.user?.id}`}>
                  <div className="flex items-center mb-3">
                    <Avatar className="md:h-10 md:w-10 h-8 w-8 border-2 border-gray-200 flex">
                      <AvatarImage
                        src={application.user?.image || undefined}
                        alt={application.user?.name}
                      />
                      <AvatarFallback className="text-lg">
                        {application.user?.name
                          ?.substring(0, 2)
                          .toUpperCase() || "UN"}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium ml-2 hover:text-blue-400">{application.user?.name}</p>
                    </div>
                  </Link>
                  

                  <p className="text-gray-600">
                    <span className="font-medium">Instrument:</span>{" "}
                    {application.instrument}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span>{" "}
                    {application.status}
                  </p>
                  <p className="text-gray-600 mt-2">{application.message}</p>
                  {application.status === "PENDING" && (
                    <div className="mt-4 space-x-2">
                      <Button
                        onClick={() => onClickApprove(application)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => onClickReject(application)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No applicants yet.</p>
          )}
        </div>
      )
      }
    </div>
  );
}