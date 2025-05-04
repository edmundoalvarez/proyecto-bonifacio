import { useEffect, useRef, useState } from "react";
import iconO1 from "@/assets/logos/logos_icon-building.svg";
import iconO2 from "@/assets/logos/logos_icon-flat.svg";

export function Section05() {
    const [pisos, setPisos] = useState(0);
    const [unidades, setUnidades] = useState(0);
    const [started, setStarted] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.4 } // puede ajustar la visibilidad mínima
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, [started]);

    useEffect(() => {
        if (!started) return;

        const targetPisos = 10;
        const targetUnidades = 17;
        const duration = 2000;
        const steps = 30;
        const interval = duration / steps;
        let currentStep = 0;

        let pisosValue = 0;
        let unidadesValue = 0;

        const incrementPisos = targetPisos / steps;
        const incrementUnidades = targetUnidades / steps;

        const counter = setInterval(() => {
            currentStep++;
            pisosValue += incrementPisos;
            unidadesValue += incrementUnidades;

            setPisos(Math.min(Math.round(pisosValue), targetPisos));
            setUnidades(Math.min(Math.round(unidadesValue), targetUnidades));

            if (currentStep >= steps) clearInterval(counter);
        }, interval);
    }, [started]);

    return (
        <div className="bg-[#f4f4f4]  flex items-center justify-center order-3 sm:row-start-2 sm:col-start-1 py-[100px] px-0 h-fit">
            <div
                ref={sectionRef}
                className="flex flex-wrap justify-center items-center w-[80%] max-w-[500px] lg:max-w-[800px] gap-20 lg:gap-[200px] py-10 lg:py-20  border-t-2 border-t-[#06223d] border-b-2 border-b-[#06223d]"
            >
                <div className="flex items-center flex-col gap-4">
                    <div className="w-[80px] sm:w-[100px] lg:w-[140px] flex flex-col">
                        <img className="w-full ml-[-4px]" src={iconO1} />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="contador c-01 text-5xl font-extrabold text-[#06223d] uppercase">
                            {pisos.toString().padStart(1, "0")}
                        </span>
                        <p className="max-w-[340px] text-2xl !font-extralight text-[#06223d] uppercase">
                            Pisos
                        </p>
                    </div>
                </div>
                <div className="flex items-center flex-col gap-4">
                    <div className="w-[80px] sm:w-[100px] lg:w-[140px] flex flex-col">
                        <img className="w-full ml-[-4px]" src={iconO2} />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="contador c-02 text-5xl font-extrabold text-[#06223d] uppercase">
                            {unidades.toString().padStart(1, "0")}
                        </span>
                        <p className="max-w-[340px] text-2xl !font-extralight text-[#06223d] uppercase">
                            Unidades
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
