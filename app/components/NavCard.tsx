import { Link,  LucideProps } from 'lucide-react'
import React from 'react'

interface Props {
    title:string,
    icon: React.ComponentType<LucideProps>;
    description: string,
    bgColor: string,
    hoverColor:string,
     link:string,

}
const NavCard = ({ title, icon: Icon, description, bgColor, hoverColor, link }:Props) => {
  return (
   
     
    <Link href={link} className="w-full">
    <div
      className={`h-[calc(70vh-2rem)] ${bgColor} ${hoverColor} rounded-lg shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-300 ease-in-out transform hover:scale-105`}
    >
      <Icon className="w-12 h-12" />
      <h2 className="text-2xl font-semibold mt-4 mb-2">{title}</h2>
      <p className="text-center text-gray-700">{description}</p>
    </div>
  </Link>
        )
        }
        
  


export default NavCard