"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Application, Event, User } from "@prisma/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Music,  Mail } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import BackButton from "../BackButton"

interface Props {
  user: User
  selectedInstruments: string[]
  bio: string
  
  organizedEvents:Event[]
  applications:Application[]
}

const ProfileFormView = ({
  user,
  selectedInstruments,
  bio,
  
  organizedEvents,
  applications
}: Props) => {
  // 登録日をフォーマット addSuffix: true → 「◯◯前」または「◯◯後」という形式で出力
  const memberSince = user.createdAt
    ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: true, locale: ja })
    : "不明"

  return (
    <div className="space-y-6">
      {/* プロフィールヘッダー */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-gray-200">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name?.substring(0, 2).toUpperCase() || "UN"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center text-gray-500 mt-1">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>メンバー登録: {memberSince}</span>
              </div>
              {user.email && (
                <div className="flex items-center text-gray-500 mt-1">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{user.email}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* 活動統計 */}
          <div className="grid grid-cols-2 gap-4 my-4 text-center">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-sm">参加イベント</p>
              <p className="text-2xl font-bold">{applications.length}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-sm">主催イベント</p>
              <p className="text-2xl font-bold">{organizedEvents.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 楽器セクション */}
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold flex items-center">
            <Music className="h-5 w-5 mr-2" />
            担当楽器
          </h3>
        </CardHeader>
        <CardContent>
          {selectedInstruments.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedInstruments.map((instrument) => (
                <Badge key={instrument} variant="secondary" className="px-3 py-1">
                  {instrument}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">楽器が登録されていません</p>
          )}
        </CardContent>
      </Card>

      {/* 自己紹介セクション */}
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">自己紹介</h3>
        </CardHeader>
        <CardContent>
          {bio ? (
            <div className="bg-gray-50 rounded-md p-4 whitespace-pre-line">{bio}</div>
          ) : (
            <p className="text-gray-500 italic">自己紹介はありません</p>
          )}
        </CardContent>
      </Card>


      {/* 戻るボタン */}
    <BackButton/>
    </div>
  )
}

export default ProfileFormView

