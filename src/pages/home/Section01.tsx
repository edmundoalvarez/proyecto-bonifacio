import backgroundVideo from "@/assets/videos/6945207-hd_1080_1920_30fps.mp4";
import logoConstrucserv from "@/assets/logos/logos_construcserv.svg";
import logoBonifacio from "@/assets/logos/logos_proyect-bonifacio.svg";
import logoNuevoEmprendimiento from "@/assets/logos/logos_nuevo-emprendimiento.svg";
import { CustomButton } from "@/components/CustomButtonProp";

export function Section01() {
    const handleScroll = () => {
        const target = document.getElementById("contactoForm");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Video de fondo */}
            <video
                className="absolute top-0 left-1/2 h-full -translate-x-1/2 object-cover object-top
               min-w-[200%] lg:min-w-full"
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Filtro de color */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#06223d]/70 z-10" />

            {/* Contenido encima del video */}
            <div className="relative z-10 flex flex-col items-center justify-between py-20 h-full text-white">
                <div className="w-[180px] flex flex-col">
                    <img className="w-full" src={logoConstrucserv} />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-10 lg:gap-[100px]">
                    <div className="w-[56%] lg:w-[30%] lg:max-w-[400px] flex flex-col">
                        <img className="w-full" src={logoBonifacio} />
                    </div>
                    <div className="w-[80%] lg:w-[60%] lg:max-w-[600px] flex flex-col">
                        <img className="w-full" src={logoNuevoEmprendimiento} />
                    </div>
                </div>
                <CustomButton label="Saber Más" onClick={handleScroll} />
            </div>

            {/* Capa oscura opcional */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[5]" />
        </div>
    );
}
