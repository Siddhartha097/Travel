import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label, disabled, outline, onClick, icon: Icon, small,
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        ${outline ? 'bg-white' : 'bg-amber-500'} 
        ${outline ? 'border-black' : 'border-amber-500'} 
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-base'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full`}
    >
      {Icon && (
        <Icon 
          size={24}
          className="absolute left-4 top-3"
        />
      )}
      {label}
    </button>
  )
}

export default Button