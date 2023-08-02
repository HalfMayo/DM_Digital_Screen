export default interface SliderProps {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: string | number;
    max: string | number;
    lockable?: boolean;
}