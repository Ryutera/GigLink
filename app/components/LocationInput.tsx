import React, { useRef } from 'react'
import { GoogleMap, useJsApiLoader,StandaloneSearchBox } from '@react-google-maps/api'

interface LocationInputProps {
  setPlace: (location: string) => void; // 追加
  children: React.ReactNode;
}
const LocationInput:React.FC<LocationInputProps> = ({children,setPlace}) => {
    const inputref = useRef<google.maps.places.SearchBox | null>(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries:["places"]
      })


      const handleOnPlacesChanged = () =>{
        let places = inputref.current?.getPlaces()
        
       
        if (places && places.length > 0) {
          setPlace(places[0].formatted_address || ""); // 取得した住所を保存
        }
        
       
      }
  return (
    <div>
        {isLoaded &&
<StandaloneSearchBox
onLoad={(ref)=>inputref.current=ref}
onPlacesChanged={handleOnPlacesChanged}
>
{children}
</StandaloneSearchBox>
}
    </div>
        
  )
}

export default LocationInput

// まず、コンポーネントが呼ばれたら useRef で null を設定し、SearchBox インスタンスを保存する準備をする。useJsApiLoader を使って Google Maps API の places ライブラリをロードし、その状態を isLoaded で管理する。

// isLoaded が true になると <StandaloneSearchBox> を表示し、これが初めてレンダリングされたときに onLoad が実行される。

// onLoad で SearchBox インスタンスが ref.current に保存され、後で getPlaces() などのメソッドを使って検索結果を取得できるようになる。

// ユーザーが検索ボックスに住所を入力し、候補リストの中から場所を選択すると、onPlacesChanged が発火し、選択された住所情報が setPlace に保存される。