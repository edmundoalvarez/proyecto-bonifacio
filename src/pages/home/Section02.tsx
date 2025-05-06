import backgroundImg from "@/assets/images/render.png"; // o el path correspondiente

export function Section02() {
    return (
        <div className="grid md:grid-rows-2 md:grid-cols-2 w-screen lg:h-screen">
            {/* DIV 1 */}
            <div className="bg-[#f4f4f4] flex items-center justify-center order-1 md:row-start-1 md:col-start-1 py-[100px] xl:py-[150px]  px-0 h-fit md:h-full">
                <div className="flex flex-col justify-center items-center w-[80%]">
                    <div className="flex items-start flex-col gap-4 pl-5 border-l-4 border-l-[#082746]">
                        <h2 className="text-2xl xl:text-3xl max-w-[340px]">
                            DEPARTAMENTOS DE 1 Y 3 AMBIENTES
                        </h2>
                        <p className="max-w-[340px] xl:max-w-[400px] text-sm xl:text-lg text-[#1e1e1e]">
                            Emprendimiento destinado a viviendas multifamiliares
                            y aptos profesionales con unidades monoambientes de
                            39 m2 y unidades de 3 ambientes de 87 m2.
                        </p>
                    </div>
                </div>
            </div>

            {/* DIV 2 */}
            <div
                className="w-full h-[600px] md:h-full bg-cover bg-[center_bottom] bg-no-repeat py-4 px-4 flex items-center justify-center order-2 md:row-span-2 md:col-start-2"
                style={{ backgroundImage: `url(${backgroundImg})` }}
            >
                <div className="flex flex-col justify-center items-center border-2 w-full h-full border-[#bb9f7c]"></div>
            </div>

            {/* DIV 3 */}
            <div className="bg-[#f4f4f4] md:bg-[#082746]  flex items-center justify-center order-3 md:row-start-2 md:col-start-1 py-[100px] xl:py-[150px] px-0 h-fit md:h-full">
                <div className="flex flex-col justify-center items-center w-[80%]">
                    <div className="flex items-start flex-col gap-4 pl-5 border-l-4 border-l-[#082746] md:border-l-[#f4f4f4]">
                        <h2 className="text-2xl xl:text-3xl max-w-[340px]">
                            UBICACIÓN
                        </h2>
                        <p className="max-w-[340px] xl:max-w-[400px] text-sm xl:text-lg text-[#1e1e1e] md:text-[#f4f4f4]">
                            En una ubicación estratégica en una de las áreas mas
                            conectadas de la ciudad. A pocas cuadras de las
                            estaciones del Subte Línea A, Línea H. Está próximo
                            a avenidas principales como Carabobo, Directorio y
                            Rivadavia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
