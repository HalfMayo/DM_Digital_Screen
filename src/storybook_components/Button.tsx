interface ButtonProps {
    color?: "primary" | "secondary" | "tertiary",
    rank?: "main" | "default"
    label: string,
    onClick?: () => void,
    disabled?: boolean,
    type?: "button" | "reset" | "submit"
}

export default function Button({color = "primary", rank = "default", label, onClick, disabled = false, type} : ButtonProps) {
    return(
        <button type={type} className={`py-2 px-3 w-fit text-sm font-medium border rounded-full
                            ${disabled
                                ? 'text-disabled bg-transparent border-disabled'
                                : rank === "main"
                                    ? `${color === "primary"
                                                        ? "text-white bg-primary border-primary"
                                                        : color === "secondary"
                                                            ? "bg-secondary-container border-secondary-container text-on-secondary-container"
                                                            : "bg-tertiary-container border-tertiary-container text-on-tertiary-container"}`
                                    : `bg-transparent ${color === "primary"
                                                            ? "text-primary border-primary"
                                                            : color === "secondary"
                                                                ? "text-secondary border-secondary"
                                                                : "text-tertiary border-tertiary"}`
                            }`} onClick={onClick} disabled={disabled} value={label}>
            {label}
        </button>
    )
}