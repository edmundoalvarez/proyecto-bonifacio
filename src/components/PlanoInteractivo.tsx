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

    // const [modalOpen, setModalOpen] = useState(false);
    // const [activeImage, setActiveImage] = useState<string | null>(null);

    // const openModal = (img: string) => {
    //     setActiveImage(img);
    //     setModalOpen(true);
    // };

    return (
        <div
            className="w-full h-full flex flex-col lg:flex-row lg:justify-between lg:items-between lg:content-start lg:gap-10 
        
        "
        >
            <div
                className="
                m-auto 
                lg:w-[80vw]
                lg:max-w-[910px]
                xl:w-[1100px]
                xl:max-w-[1100px]
                lg:flex lg:flex-col lg:justify-center lg:items-center lg:content-center lg:gap-20"
            >
                <div className=" lg:flex lg:flex-row lg:gap-20 lg:w-full">
                    {/* PLANO EDIFICIO */}
                    <div
                        className="
                        w-full lg:w-1/4 
                        h-[65vh] lg:h-[540px] 
                        lg:ml-[6%]
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
                        w-full lg:w-[240px] 
                        h-full
                        
                    "
                        />
                    </div>

                    {selected && departamentosData[selected] ? (
                        <div className="lg:w-3/4 ">
                            <div
                                key={selected}
                                className="space-y-4 opacity-0 animate-fadeIn transition-opacity duration-500  lg:flex lg:flex-row-reverse lg:gap-10 xl:gap-10"
                            >
                                <div className="mt-10 lg:mt-0 mb-8 text-center lg:text-start xl:max-w-[350px]">
                                    <h2 className="text-xl font-bold uppercase">
                                        {departamentosData[selected].titulo}
                                    </h2>

                                    <div className="lg:py-3 ">
                                        {departamentosData[
                                            selected
                                        ].subtitulo.map((s, i) => (
                                            <p
                                                key={i}
                                                className="text-sm italic text-white uppercase lg:text-lg"
                                            >
                                                {s}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className="
                                    h-[65vh] lg:h-[540px]  
                                    lg:w-auto
                                    xl:min-w-[270px]
                                    my-12 lg:my-0 
                                    lg:flex lg:flex-col lg:justify-start lg:items-start
                                    
                                    "
                                >
                                    <img
                                        src={departamentosData[selected].plano}
                                        alt="Plano"
                                        className="
                                            w-full
                                            h-full lg:h-full 
                                            lg:min-w-[140px]  
                                            xl:min-w-[300px]
                                            lg:min-h-[300px] 
                                            lg:object-contain lg:object-top-left
                                            
                                            "
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                {selected && departamentosData[selected] ? (
                    <div className=" w-[100vw]">
                        <div className="relative w-full ">
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
                                mt-16 ml-auto mr-4 lg:mt-0 
                                z-10 
                                md:max-w-[540px] 
                                lg:max-w-[800px]
                                xl:max-w-[970px]
                                lg:w-[80vw]
                                lg:text-center
                                "
                            >
                                {departamentosData[selected].imagenes.map(
                                    (img, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div
                                                className="w-full 
                                                h-[60vw] md:h-[300px] lg:h-[500px] xl:h-[500px]
                                                lg:m-auto
                                                
                                                overflow-hidden 
                                                sm:rounded-md
                                                
                                            "
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Imagen ${idx}`}
                                                    className="h-full w-full object-cover cursor-pointer "
                                                    // onClick={() =>
                                                    //     openModal(img)
                                                    // }
                                                />
                                            </div>
                                        </SwiperSlide>
                                    )
                                )}
                                {/* Botones visibles solo desde lg */}
                                <div className="hidden lg:flex items-center justify-between absolute inset-y-1/2 w-full z-20 px-4 pointer-events-none">
                                    <button className="lg:mt-[-20px] swiper-button-prev pointer-events-auto !text-white"></button>
                                    <button className="lg:mt-[-100px] swiper-button-next pointer-events-auto !text-white"></button>
                                </div>
                            </Swiper>
                        </div>
                        <div>
                            <div className="text-center mt-16 lg:mt-4 xl:mt-10 lg:text-center">
                                <CustomButton
                                    label="Ver más características de la unidad"
                                    className="uppercase"
                                    onClick={() => setDescripcionOpen(true)}
                                />
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
                                        onClick={() =>
                                            setDescripcionOpen(false)
                                        }
                                        className="absolute top-4 right-4 text-[#bb9f7c] hover:text-red"
                                        aria-label="Cerrar"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            size="xl"
                                        />
                                    </button>

                                    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
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
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
