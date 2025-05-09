// ContactForm.tsx
import { useState } from "react";

export function ContactForm() {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        consulta: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // limpiar error al escribir
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.nombre.trim()) newErrors.nombre = "Campo obligatorio";
        if (!form.apellido.trim()) newErrors.apellido = "Campo obligatorio";
        if (!form.email.trim()) newErrors.email = "Campo obligatorio";
        if (!form.consulta.trim()) newErrors.consulta = "Campo obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("email", form.email);
        formData.append("nombre", form.nombre);
        formData.append("apellido", form.apellido);
        formData.append("telefono", form.telefono);
        formData.append("consulta", form.consulta);

        try {
            const response = await fetch("https://formspree.io/f/mpwddawe", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                window.location.reload();
            } else {
                const errorMsg =
                    result?.errors?.[0]?.message ||
                    result?.message ||
                    "Intente de nuevo.";
                alert("Error al enviar: " + errorMsg);
            }
        } catch (err) {
            console.error(err);
            alert("Error inesperado al enviar.");
        }
    };

    return (
        <div
            id="contactoForm"
            className="bg-[#0b1f3b] flex justify-center items-center w-full px-4"
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl border border-[#bb9f7c] px-6 py-10 text-white"
                method="POST"
                noValidate
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
                        {errors.nombre && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.nombre}
                            </p>
                        )}
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
                        {errors.apellido && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.apellido}
                            </p>
                        )}
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
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
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
                    {errors.consulta && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.consulta}
                        </p>
                    )}
                </div>

                <div className="text-center mt-8">
                    <button
                        type="submit"
                        className={`bg-[#082746] rounded-[8px] p-[4px] inline-block cursor-pointer hover:bg-[#0b3056] ease-in-out`}
                    >
                        <div className="bg-[#082746] hover:bg-[#0b3056] ease-in-out rounded-[4px] border border-[#d6c7a3] px-[30px] py-[6px] text-white uppercase text-center text-xs xl:text-sm">
                            Enviar consulta
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}
