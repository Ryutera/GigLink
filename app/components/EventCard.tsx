"use client";
import { Button } from "@/components/ui/button";
import { applicationApprove, applicationReject } from "@/lib/action";
import { Application, Event } from "@/types/events";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

export function EventCard({ event }: { event: Event}) {
  const [isApplicantsVisible, setIsApplicantsVisible] = useState(false);

  const filterApplicationByStatus = (status: "PENDING" | "ACCEPTED" | "REJECTED") =>{
    return event.applications.filter((app)=>app.status===status)
  }

  const pendingApplications = filterApplicationByStatus("PENDING")
  const acceptedApplications = filterApplicationByStatus("ACCEPTED")

  const onClickApprove = async (application: Application) => {
    try {
      await applicationApprove(application);
      alert("申請を承認しました");
    } catch (error) {
      alert("申請の承認に失敗しました");
    }
  };
  const onClickReject = async (application: Application) => {
    try {
      await applicationReject(application);
      alert("申請を拒否しました");
    } catch (error) {
      alert("申請の拒否に失敗しました");
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
          <span className="font-medium">場所:</span> {event.location}
        </p>
        <p className="text-gray-600 mb-1">
          <span className="font-medium">日時:</span>{" "}
          {`${event.date.toLocaleDateString()} ${event.startTime.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )} - ${event.endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">募集楽器:</span>{" "}
          {event.instruments.join(", ")}
        </p>
        <p key={event.id} className="text-gray-600 mb-4">
          <span>参加予定者</span>
          <br />
         
         {/* indexのとこは参加者の間に,を入れる処理 */}
          { acceptedApplications
            .map((p: Application,index) => (
              <span className="hover:text-blue-400">
                <Link href={`/profile/${p.user.id}`}>{p.user.name}</Link>
                {index < acceptedApplications.length - 1 ? ", " : ""}
              </span>
            ))}
        </p>

        <Button
          className="w-full text-left flex justify-between items-center text-black"
          onClick={() => setIsApplicantsVisible(!isApplicantsVisible)}
        >
          参加希望者を表示 (
          {
            pendingApplications.length
          }
          )
          {isApplicantsVisible ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </Button>
      </div>
      {isApplicantsVisible && (
        <div className="bg-gray-50 p-6 border-t">
          <h4 className="text-lg font-semibold mb-4">参加希望者一覧</h4>
          {pendingApplications.length > 0 ? 
          (
            <ul className="space-y-4">
              {pendingApplications
                .map((application: Application) => (
                  <li
                    key={application.id}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <p className="font-medium">{application.user.name}</p>
                    <p className="text-gray-600">
                      <span className="font-medium">楽器:</span>{" "}
                      {application.instrument}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">ステータス:</span>{" "}
                      {application.status}
                    </p>
                    <p className="text-gray-600 mt-2">{application.message}</p>
                    {application.status === "PENDING" && (
                      <div className="mt-4 space-x-2">
                        <Button
                          onClick={() => onClickApprove(application)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          承認
                        </Button>
                        <Button
                          onClick={() => onClickReject(application)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          拒否
                        </Button>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          ) 
          : (
            <p className="text-gray-600">まだ参加希望者はいません。</p>
          )}
        </div>
      )}
    </div>
  );
}
