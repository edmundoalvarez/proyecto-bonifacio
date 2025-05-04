type CustomButtonProps = {
    label: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset"; // ← importante
};

export function CustomButton({
    label,
    onClick,
    className = "",
    type = "button", // ← por defecto es 'button' si no se indica
}: CustomButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-[#082746] rounded-[8px] p-[4px] inline-block ${className}`}
        >
            <div className="bg-[#082746] rounded-[4px] border border-[#d6c7a3] px-[30px] py-[6px] text-white uppercase text-center text-xs xl:text-sm">
                {label}
            </div>
        </button>
    );
}
