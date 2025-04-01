import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Props {
  organizerName: string | undefined;
  organizerImg: string | undefined | null;
  organizerId: string | undefined;
}

const OrganizerDetail = ({
  organizerName,
  organizerImg,
  organizerId,
}: Props) => {
  return (
    <div className="bg-white p-2 rounded-lg border border-gray-100 mb-6  shadow-sm">
      <p className="text-sm font-medium text-gray-500 mb-2">主催者</p>
      <div className="flex items-center gap-3">
        <Link href={`/profile/${organizerId}`}>
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage
              src={organizerImg || undefined}
              alt={organizerName}
            />
            <AvatarFallback className="text-lg bg-blue-100 text-blue-800">
              {organizerName?.substring(0, 2).toUpperCase() || "UN"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/profile/${organizerId}`} className="hover:text-blue-600 font-medium transition-colors">
            {organizerName}
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default OrganizerDetail;