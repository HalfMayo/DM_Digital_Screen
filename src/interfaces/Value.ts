export default interface Value {
  className?: string;
  value: string;
  src?: string;
  img?: boolean;
  onClick?: () => void;
  checked?: boolean;
  readonly?: boolean;
  labelActive?: boolean;
}
