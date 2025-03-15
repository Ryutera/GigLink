import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OngoingEventList from "../components/join/OngoingEventList";
import OngoingEventMap from "../components/join/OngoingEventMap";

const Join = async () => {
  const { userId } = await auth();

  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gt: new Date(), // 現在の日時より後のイベントのみ取得
      },
    },
    include: {
      organizer: true,
      applications: true,
    },
    orderBy: [
      {
        startTime: "asc",
      },
    ],
  });

  return (
    <div className="space-y-8 mx-auto w-full max-w-screen-lg p-7">
      <h2 className="text-3xl font-bold text-center">Ongoing Event</h2>

      <Tabs defaultValue="posts" className=" flex items-center flex-col">
        <TabsList className="mb-4 ">
          <TabsTrigger value="posts">Find Post</TabsTrigger>
          <TabsTrigger value="map">Find Location</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <OngoingEventList events={events} userId={userId} />
        </TabsContent>
        <TabsContent value="map">
          <OngoingEventMap events={events} userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Join;
