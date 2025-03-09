import { LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavCardProps {
  title: string;
  icon: React.ComponentType<LucideProps>;
  description: string;
  bgColor: string;
  hoverColor: string;
  link: string;
}
// propsとして受け取る`icon`は小文字ですが、それをコンポーネントとして使用するために`Icon`という大文字の変数名に変更しています。
const NavCard:React.FC<NavCardProps> = ({
  title,
  icon: Icon,
  description,
  bgColor,
  hoverColor,
  link,
}) => {
  return (
    <Link href={link} className="w-full">
      <div
        className={
          `
          md:h-[calc(70vh-2rem)] 
          h-60
          ${bgColor} ${hoverColor} 
          rounded-lg shadow-lg  
          md:flex  md:flex-col 
          items-center  justify-center p-6 
          transition-all duration-300 ease-in-out transform hover:scale-105`}
      >
        <Icon className="w-12 h-12" />
        <h2 className="text-2xl font-semibold mt-4 mb-2">{title}</h2>
        <p className="md:block text-center text-gray-700 hidden">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default NavCard;
