
import Link from "next/link";


export default function Home() {




  return (
    <div className="space-y-8 mx-8">
    <h2 className="text-3xl font-bold">Ongaing Event</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* これは募集中のライブのサンプルカードです。実際のデータで置き換えてください */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="border rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-semibold mb-2">ライブイベント {i}</h3>
          <p className="text-gray-600 mb-2">Place: 東京都渋谷区</p>
          <p className="text-gray-600 mb-2">Date: 2024年5月1日 19:00-22:00</p>
          <p className="text-gray-600 mb-4">Looking for: ギター, ベース, ドラム</p>
          <Link
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Detail →
          </Link>
        </div>
      ))}
    </div>
  </div>)
}
