import { useState, useEffect } from "react";

const charades = [
  "Lavando los platos con fastidio",
  "Corriendo de una cucaracha voladora",
  "Fingiendo estar en una película dramática",
  "Haciendo TikTok sin saber los pasos",
  "Tomándose selfies con mil poses",
  "Recibiendo un regalo feo y fingiendo emoción",
  "Jugando fútbol y pateando el aire",
  "Perreando sin ritmo pero con actitud",
  "Manejando en tráfico y discutiendo con el aire"
];

export default function CharadesApp() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setStatus("correct");
        nextCard();
      } else if (e.key === "ArrowUp") {
        setStatus("pass");
        nextCard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  const nextCard = () => {
    setTimeout(() => {
      setStatus(null);
      setIndex((prev) => (prev + 1) % charades.length);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-6">Adivina Quién Soy</h1>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <p className="text-xl font-semibold">{charades[index]}</p>
        {status && (
          <p className={`mt-4 text-lg font-bold ${status === "correct" ? "text-green-600" : "text-red-500"}`}>
            {status === "correct" ? "¡Correcto!" : "¡Pasaste!"}
          </p>
        )}
      </div>
      <p className="mt-10 text-sm text-gray-500">Presiona ↓ si adivinó bien, ↑ si pasa</p>
    </div>
  );
}