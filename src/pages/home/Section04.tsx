import { PlanoInteractivo } from "@/components/PlanoInteractivo";

export function Section04() {
    return (
        <div className="w-screen py-20 lg:py-40 bg-[#082746]">
            <div className="flex flex-col justify-center items-center mb-16 xl:mb-22">
                <h2 className="text-xl lg:text-2xl max-w-[345px] lg:max-w-[460px] xl:max-w-[500px] text-[#bb9f7c] text-center">
                    SELECCIONÁ UN DEPARTAMENTO PARA VER SUS CARACTERÍSTICAS
                </h2>
            </div>
            <div>
                <PlanoInteractivo />
            </div>
        </div>
    );
}
