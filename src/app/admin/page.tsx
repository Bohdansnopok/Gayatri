"use client";

import { useState, useEffect } from "react";
import "./admin.css";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      router.replace("/admin/adminAdd"); 
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (nameValue === "gayatriAadmin" && passwordValue === "adminqwerty") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loginTime", Date.now().toString());

        window.dispatchEvent(new Event("storage"));

        router.replace("/admin/adminAdd");
      } else {
        setError("Невірне ім'я або пароль");
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <form className="adminLogin" onSubmit={handleSubmit}>
      <h2>Введіть ім'я адміністратора</h2>
      <input
        type="text"
        value={nameValue}
        className="adminLogin__name"
        onChange={(e) => {
          setNameValue(e.target.value);
          setError("");
        }}
        placeholder="Ім'я адміністратора"
        required
        disabled={isLoading}
      />

      <h2>Введіть пароль адміністратора</h2>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => {
          setPasswordValue(e.target.value);
          setError("");
        }}
        className="adminLogin__password"
        placeholder="пароль адміністратора"
        required
        disabled={isLoading}
      />

      {error && (
        <div
          style={{
            color: "red",
            margin: "10px 0",
            padding: "10px",
            background: "#ffe6e6",
            borderRadius: "4px",
            border: "1px solid #ffcccc",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        className="defaultButton"
        disabled={isLoading || !nameValue.trim() || !passwordValue.trim()}
        style={{
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Вхід..." : "Увійти в адмін панель"}
      </button>
    </form>
  );
}
