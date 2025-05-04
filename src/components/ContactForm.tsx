// ContactForm.tsx
import { useState } from "react";
import { CustomButton } from "@/components/CustomButtonProp";

export function ContactForm() {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        consulta: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        /* const response = await fetch("/api/send-contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            alert("Consulta enviada con éxito.");
            setForm({
                nombre: "",
                apellido: "",
                telefono: "",
                email: "",
                consulta: "",
            });
        } else {
            alert("Error al enviar. Intente de nuevo.");
        } */
    };

    return (
        <div
            id="contactoForm"
            className="bg-[#0b1f3b] flex justify-center items-center w-full px-4"
        >
            <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/mpwddawe"
                className="w-full max-w-3xl border border-[#bb9f7c] px-6 py-10 text-white"
            >
                <h2 className="text-center text-xl mb-10 font-semibold uppercase max-w-[300px] mx-auto">
                    Contactanos para saber sobre el proyecto
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="!font-extralight">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full border border-[#bb9f7c] bg-[#041a2f] text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="!font-extralight">Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                            className="w-full border border-[#bb9f7c] bg-[#041a2f] text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="!font-extralight">Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            className="w-full border border-[#bb9f7c] bg-[#041a2f] text-white p-2"
                        />
                    </div>
                    <div>
                        <label className="!font-extralight">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-[#bb9f7c] bg-[#041a2f] text-white p-2"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="!font-extralight">Consulta</label>
                    <textarea
                        name="consulta"
                        value={form.consulta}
                        onChange={handleChange}
                        className="w-full border border-[#bb9f7c] bg-[#041a2f] text-white p-2 h-32"
                    ></textarea>
                </div>

                <div className="text-center mt-16">
                    <CustomButton
                        type="submit"
                        label="Enviar consulta"
                        className="uppercase"
                    />
                </div>
            </form>
        </div>
    );
}
