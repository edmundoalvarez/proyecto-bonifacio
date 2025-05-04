import logoConstrucserv2 from "@/assets/logos/logos_construcserv2.svg";

export function Footer() {
    return (
        <footer className="bg-[#bb9f7c]">
            <div className="text-2xl font-bold text-center m-auto">
                <div className="relative z-10 flex flex-col items-center justify-between py-14 mx-6 lg:mx-16 h-full text-white border-b border-b-[#06223d]">
                    <div className="w-[180px] flex flex-col">
                        <img className="w-full" src={logoConstrucserv2} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start; gap-2 py-6 mx-6 lg:mx-16 text-[#06223d]">
                    <p className="text-xs">
                        All rights reserved ©{" "}
                        <strong>
                            <a href="https://www.construcserv.com.ar">
                                CONSTRUCSERV
                            </a>
                        </strong>
                        , 2025
                    </p>
                    <p className="text-xs">
                        Desarrollado por{" "}
                        <strong>
                            <a href="https://www.edmundoalvarez.com.ar">
                                Edmundo Alvarez
                            </a>
                        </strong>
                    </p>
                </div>
            </div>
        </footer>
    );
}
