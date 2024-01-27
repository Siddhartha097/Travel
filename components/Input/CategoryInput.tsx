'use client'

import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick: (value: string) => void;
    selected?: boolean;
    label: string;
    icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onClick, label, icon: Icon, selected}) => {
    return (
        <div
            onClick={() => onClick(label)} 
            className={`
                rounded-xl border-2 p-4 flex gap-5 align-middle hover:border-amber-700 transition cursor-pointer
                ${selected ? 'border-amber-700' : 'border-neutral-200'}
                ${selected ? 'text-amber-700' : 'text-neutral-600'}
            `} 
        >
            <Icon size={30} />
            <div className="font-semibold">
                {label}
            </div>
        </div>
    )
}

export default CategoryInput