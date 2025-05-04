import { useEffect, useRef, useState } from "react";
import Plano from "@/assets/images/plano-interactivo.svg?url";
import InlineSVG from "react-inlinesvg";
import { departamentosData, DepartamentoKey } from "@/data/departamentos";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CustomButton } from "@/components/CustomButtonProp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function PlanoInteractivo() {
    const [descripcionOpen, setDescripcionOpen] = useState(false);
    const [selected, setSelected] = useState<DepartamentoKey>("primerPiso01");
    const svgRef = useRef<SVGSVGElement | null>(null);

    const zonas: DepartamentoKey[] = [
        "primerPiso01",
        "segundoPiso01",
        "segundoPiso02",
        "tercerPiso01",
        "tercerPiso02",
        "terraza",
    ];

    const applyFillToChildren = (el: Element, color: string) => {
        el.querySelectorAll("*").forEach((child) => {
            const svgChild = child as SVGElement;
            svgChild.setAttribute("fill", color);
            svgChild.style.fill = color; // Soluciona el error
        });
    };

    const clearFillFromChildren = (el: Element) => {
        el.querySelectorAll("*").forEach((child) => {
            const svgChild = child as SVGElement;
            svgChild.removeAttribute("fill");
            svgChild.style.fill = "";
        });
    };

    const handleLoad = () => {
        const svg = svgRef.current;
        if (!svg) return;

        zonas.forEach((id) => {
            const el = svg.querySelector(`#${id}`);
            if (!el) return;

            (el as HTMLElement).style.cursor = "pointer";

            el.addEventListener("mouseover", () => {
                // solo aplicar si no tiene fill seteado (o si no es el seleccionado)
                if (!el.classList.contains("selected")) {
                    applyFillToChildren(el, "#5285af");
                }
            });

            el.addEventListener("mouseout", () => {
                if (!el.classList.contains("selected")) {
                    clearFillFromChildren(el);
                }
            });

            el.addEventListener("click", () => {
                zonas.forEach((otherId) => {
                    const otherEl = svg.querySelector(`#${otherId}`);
                    if (otherEl) {
                        clearFillFromChildren(otherEl);
                        otherEl.classList.remove("selected");
                    }
                });

                applyFillToChildren(el, "#457296");
                el.classList.add("selected"); // ✅ marca como seleccionado
                setSelected(id);
            });
        });

        const estructura = svg.querySelector(
            "#estructura"
        ) as SVGElement | null;
        if (estructura) {
            estructura.style.pointerEvents = "none";
        }

        // ✅ Aplicar color al bloque seleccionado al inicio
        const elInicial = svg.querySelector(`#${selected}`);
        if (elInicial) {
            applyFillToChildren(elInicial, "#457296");
            elInicial.classList.add("selected");
        }

        // Preseleccionar "primerPiso01"
        /* const elInicial = svg.querySelector("#primerPiso01");
        if (elInicial) {
            applyFillToChildren(elInicial, "#457296");
            elInicial.classList.add("selected");
        } */
    };

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg || !selected) return;

        zonas.forEach((id) => {
            const el = svg.querySelector(`#${id}`);
            if (el) {
                clearFillFromChildren(el);
                el.classList.remove("selected");
            }
        });

        const el = svg.querySelector(`#${selected}`);
        if (el) {
            applyFillToChildren(el, "#457296");
            el.classList.add("selected");
        }
    }, [selected, zonas]);

    const [modalOpen, setModalOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const openModal = (img: string) => {
        setActiveImage(img);
        setModalOpen(true);
    };

    return (
        <div className="w-full h-full flex flex-col lg:flex-row lg:justify-between xl:justify-end lg:items-between lg:content-start lg:gap-10 xl:gap-[10vw]">
            <div
                className="
                w-full lg:w-1/4 xl:w-auto
                h-[65vh] lg:h-[540px] xl:h-[600px]  
                lg:ml-[6%] xl:ml-40 
                lg:flex lg:flex-col lg:items-end lg:justify-end 
                
                "
            >
                <InlineSVG
                    src={Plano}
                    onLoad={handleLoad}
                    innerRef={(ref: SVGElement | null) => {
                        svgRef.current = ref as SVGSVGElement;
                    }}
                    className="
                        w-full lg:w-[240px] xl:w-auto
                        h-full
                        
                    "
                />
            </div>
            <div
                className="
                w-full h-full 
                lg:max-w-[750px] xl:max-w-[1000px] 
                py-6 lg:py-0 
                lg:pt-8 
                text-white 
                lg:ml-0
                lg:border-t lg:border-t-white"
            >
                {selected && departamentosData[selected] ? (
                    <div
                        key={selected}
                        className="space-y-4 opacity-0 animate-fadeIn transition-opacity duration-500"
                    >
                        <div className="mt-10 lg:mt-0 mb-8 text-center lg:text-start">
                            <h2 className="text-xl font-bold uppercase">
                                {departamentosData[selected].titulo}
                            </h2>

                            <div className="lg:py-3">
                                {departamentosData[selected].subtitulo.map(
                                    (s, i) => (
                                        <p
                                            key={i}
                                            className="text-sm italic text-white uppercase lg:text-lg"
                                        >
                                            {s}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="lg:flex lg:flex-row lg:justify-start lg:items-start lg:gap-[2rem] xl:gap-10">
                                <div
                                    className="
                                    h-[65vh] lg:h-[365px] xl:h-[400px]
                                    lg:w-auto
                                    my-12 lg:my-0 
                                    lg:flex lg:flex-col lg:justify-start lg:items-start
                                    
                                    "
                                >
                                    <img
                                        src={departamentosData[selected].plano}
                                        alt="Plano"
                                        className="
                                            w-full
                                            h-full lg:h-full xl:h-[400px]
                                            lg:min-w-[140px]  xl:min-w-[180px] 
                                            xl:max-h-[400px] 
                                            lg:min-h-[300px] xl:min-h-[400px]
                                            lg:object-contain lg:object-top-left
                                            
                                            "
                                    />
                                </div>
                                <div className="relative w-full xl:mr-10">
                                    <Swiper
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={{
                                            nextEl: ".swiper-button-next",
                                            prevEl: ".swiper-button-prev",
                                        }}
                                        modules={[Pagination, Navigation]}
                                        className="
                                        mt-16 ml-auto mr-4 lg:mt-0 lg:!ml-0 
                                        z-10 
                                        md:max-w-[540px] lg:max-w-[480px] xl:max-w-[540px]   
                                        lg:w-full
                                        "
                                    >
                                        {departamentosData[
                                            selected
                                        ].imagenes.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div
                                                    className="w-full 
                                                    h-[50vw] md:h-[300px] lg:h-[320px] xl:h-[320px] 
                                                    lg:min-h-[260px] 
                                                    xl:max-h-[400px] 
                                                    overflow-hidden 
                                                    sm:rounded-md
                                                    
                                                    "
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Imagen ${idx}`}
                                                        className="h-full w-full object-cover cursor-pointer "
                                                        onClick={() =>
                                                            openModal(img)
                                                        }
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        {/* Botones visibles solo desde lg */}
                                        <div className="hidden lg:flex items-center justify-between absolute inset-y-1/2 w-full z-20 px-4 pointer-events-none">
                                            <button className="lg:mt-[-20px] swiper-button-prev pointer-events-auto !text-white"></button>
                                            <button className="lg:mt-[-100px] swiper-button-next pointer-events-auto !text-white"></button>
                                        </div>
                                    </Swiper>
                                </div>
                            </div>
                            <div className="text-center mt-16 lg:mt-4 xl:mt-10 lg:text-left">
                                <CustomButton
                                    label="Ver más características de la unidad"
                                    className="uppercase"
                                    onClick={() => setDescripcionOpen(true)}
                                />
                            </div>
                        </div>

                        <Modal
                            isOpen={descripcionOpen}
                            onRequestClose={() => setDescripcionOpen(false)}
                            className="relative outline-none max-w-xl z-[99999] flex items-center justify-center"
                            overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999]"
                            ariaHideApp={false}
                        >
                            <div className="relative outline-none max-w-xl w-[90%] bg-black/85 p-8 rounded-lg shadow-lg text-white z-[99999] border border-[#bb9f7c]">
                                {/* Botón de cierre */}
                                <button
                                    onClick={() => setDescripcionOpen(false)}
                                    className="absolute top-4 right-4 text-[#bb9f7c] hover:text-red"
                                    aria-label="Cerrar"
                                >
                                    <FontAwesomeIcon icon={faTimes} size="xl" />
                                </button>

                                <div className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
                                    <h2 className="text-3xl text-[#bb9f7c] uppercase">
                                        Datos extra
                                    </h2>
                                    <ul className="list-disc pl-6 space-y-1 text-sm text-white flex flex-col gap-2">
                                        {departamentosData[
                                            selected
                                        ].descripcion.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Modal>

                        {/* <Modal
                            isOpen={modalOpen}
                            onRequestClose={() => setModalOpen(false)}
                            className="outline-none z-[99999]" // contenido del modal
                            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]"
                            ariaHideApp={false}
                        >
                            <img
                                src={activeImage || ""}
                                alt="Imagen ampliada"
                                className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
                            />
                        </Modal> */}
                    </div>
                ) : (
                    <p>Seleccioná un departamento</p>
                )}
            </div>
        </div>
    );
}
