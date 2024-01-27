'use client'

import qs from 'query-string';
import { formatISO } from 'date-fns';

import Modal from './Modal'
import Heading from '../Heading';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import useSearchModal from '@/hooks/useSearchModal';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';

import CountrySelect, { CountrySelectValue } from '../Input/CountrySelect';
import Calendar from '../Input/Calendar';
import Counter from '../Input/Counter';


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [steps, setSteps] = useState(STEPS.LOCATION);
    const [guests, setGuests] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'select',
    });

    //@ts-ignore
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

    const onBack = useCallback(() => {
        setSteps(value => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setSteps(value => value + 1);
    }, []);

    const onSubmit = useCallback(async() => {
        if (steps !== STEPS.INFO) {
            return onNext();
        }

        let currQuery = {};

        if (params){
            currQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currQuery,
            locationValue: location?.value,
            rooms,
            bathrooms,
            guests,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        },{
            skipNull: true,
        });

        setSteps(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);

    }, [steps, searchModal, location, router, rooms, guests, bathrooms, dateRange, params, onNext]);

    const actionLabel = useMemo(() => {
        if (steps === STEPS.INFO){
            return 'Search';
        }

        return 'Next';
    }, [steps]);

    const secondaryLabel = useMemo(() => {
        if (steps === STEPS.LOCATION){
            return undefined;
        }

        return 'Back';
    }, [steps]);

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title='What is the location you are looking for?'
                subtitle='Find your desired location!'
                center
            />
            <CountrySelect 
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    if (steps === STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='When you are planning to go there?'
                    subtitle='Check your dates for a stressfree travel!'
                    center
                />
                <Calendar 
                    value={dateRange}
                    onChange={(value) => setDateRange(value.select)}

                />
                <hr />
            </div>
        );
    }

    if (steps === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Additional Information'
                    subtitle='Find your perfect place to stay!'
                    center
                />
                <Counter 
                    title='Guests'
                    subtitle='How many are you there?'
                    value={guests}
                    onChange={value => setGuests(value)}
                />
                <Counter 
                    title='Rooms'
                    subtitle='How many rooms do you need?'
                    value={rooms}
                    onChange={value => setRooms(value)}
                />
                <Counter 
                    title='Bathrooms'
                    subtitle='How many bathrooms you need?'
                    value={bathrooms}
                    onChange={value => setBathrooms(value)}
                />
                <hr />
            </div>
        );
    }

    return (
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title='Search Filters'
            actionLabel={actionLabel}
            secondaryLabel={secondaryLabel}
            secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default SearchModal