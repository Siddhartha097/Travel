'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string';

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    description?: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon, description, selected }) => {

    const router = useRouter();

    const params = useSearchParams();

    const handleClick = useCallback(
      () => {
        let currentQuery = {};

        if (params) {
            currentQuery = params ? qs.parse(params.toString()) : {};
        }

        const upDatedQuery: any = {
            ...currentQuery,
            category: label
        };

        if (params?.get('category') === label) {
            delete upDatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: upDatedQuery,

        }, { skipNull: true })

        router.push(url);
      },
      [label, params, router]
    )
    

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div 
                onClick={handleClick}
                className={`
                    ${selected ? 'border-neutral-800' : 'border-transparent'}
                    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
                    flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer`}
            >
                <Icon size={25} />
                <div className=" font-medium text-sm">
                    {label}
                </div>
            </div>
        </Suspense>
        
    )
}

export default CategoryBox