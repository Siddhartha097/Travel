'use client'

import useRentModal from '@/hooks/useRentModal';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

import dynamic from 'next/dynamic';

import Modal from './Modal';
import Heading from '../Heading';
import { categories } from '../Navbar/Categories';
import CategoryInput from '../Input/CategoryInput';
import CountrySelect from '../Input/CountrySelect';
import UploadImage from '../Input/UploadImage';
import Counter from '../Input/Counter';
import Input from '../Input/Input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';




const RentModal = () => {

    enum STEPS {
        CATEGORY = 0,
        LOCATION = 1,
        INFO = 2,
        IMAGES = 3,
        DESCRIPTION = 4,
        PRICE = 5,
    }

    const {
        register, handleSubmit, setValue, watch,formState: { errors }, reset,} 
        = useForm<FieldValues>({
            defaultValues: {
                category: '',
                locationValue: null,
                guests: 1,
                rooms: 1,
                bathrooms: 1,
                imgSrc: '',
                price: '0',
                title: '',
                description: '',
            }
        }
    );

    const category = watch('category');
    const location = watch('locationValue');
    const guestCount = watch('guests');
    const roomCount = watch('rooms');
    const bathroomCount = watch('bathrooms');
    const imgSrc = watch('imgSrc');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location])

    const customValuesSet = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const rentModal = useRentModal();

    const [steps, setSteps] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onBack = () => {
        setSteps(value => value - 1);
    }

    const onNext = () => {
        setSteps(value => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (steps != STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/listings', data)
        .then(() => {
            toast.success('listing added!')
            router.refresh();
            reset();
            setSteps(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong!')
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const actionLabel = useMemo(() => {
        if (steps === STEPS.PRICE) {
            return 'Create';
        }

        return 'Next';
    }, [STEPS, steps]);

    const secondaryLabel = useMemo(() => {
        if (steps === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [steps, STEPS]);

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Which among this best describes your place?'
                subtitle='Pick a category'
                center
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map(item => (
                    <div
                        className='col-span-1' 
                        key={item.label}
                    >
                        <CategoryInput 
                            onClick={(category) => customValuesSet('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (steps === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Where is your place located?'
                    subtitle='Help guests to find your place'
                    center
                />
                <CountrySelect
                    onChange={value => customValuesSet('locationValue', value)}
                    value={location}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (steps === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Share some details about your place'
                    subtitle='What features do you have'
                />
                <hr />
                <Counter
                    title='Guests'
                    subtitle='how many guests you can attain?'
                    value={guestCount}
                    onChange={(value) => customValuesSet('guests', value)}
                />
                <hr />
                <Counter
                    title='Room'
                    subtitle='how many rooms you can provide?'
                    value={roomCount}
                    onChange={(value) => customValuesSet('rooms', value)}
                />
                <hr />
                <Counter
                    title='Bathrooms'
                    subtitle='how many bathrooms you can provide?'
                    value={bathroomCount}
                    onChange={(value) => customValuesSet('bathrooms', value)}
                />
            </div>
        )
    }

    if (steps === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Describe your place'
                    subtitle='Like charming, comfortable, convenient!'
                />
                <Input 
                    id='title'
                    label='Title'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id='description'
                    label='Description'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (steps === STEPS.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Set your pricing'
                    subtitle='How much will you charge for one night?'
                />
                <Input 
                    id='price'
                    label='Price'
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    required
                />
            </div>
        )
    }

    if (steps === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Add photo of your place'
                    subtitle='Show the guest how your place looks like!'
                />
                <UploadImage 
                    value={imgSrc}
                    onChange={(value) => customValuesSet('imgSrc', value)}
                />
            </div>
        )
    }

    return (
        <Modal
            title='Add your own place'
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryLabel={secondaryLabel}
            secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
            
        />
    )
}

export default RentModal