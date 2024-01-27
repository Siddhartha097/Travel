'use Client'
import { Range } from 'react-date-range';
import Calendar from '../Input/Calendar';
import Button from '../Button';

interface ListingReservationPro {
    totalPrice: number;
    dateRange: Range;
    onSubmit: () => void;
    onChangeDate: (value: Range) => void;
    disabled?: boolean;
    disabledDates: Date[];
    price: number;
}

const ListingReservation: React.FC<ListingReservationPro> = ({
    price, totalPrice, dateRange, onChangeDate, disabled, onSubmit, disabledDates,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
        <div className='flex flex-row items-center gap-1 p-4'>
            <div className='text-2xl font-semibold '>
                $ {price}
            </div>
            <div className='font-light text-neutral-600'>
                /night
            </div>
        </div>
        <hr />
        <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={value => onChangeDate(value.select)}
        />
        <hr />
        <div className='p-4'>
            <Button 
                disabled={disabled}
                label='Book'
                onClick={onSubmit}
            />
        </div>
        <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
            <div>Total</div>
            <div>$ {totalPrice}</div>
        </div>
    </div>
  )
}

export default ListingReservation