"use client";

import { useState } from "react";
import "./admin.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function () {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (nameValue === "gayatriAadmin" && passwordValue === "adminqwerty") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin/adminAdd");
    } else {
      console.log("Неправильные данные введены");
    }
  };

  return (
    <form className="adminLogin" onSubmit={handleSubmit}>
      <h2>Введіть ім'я адміністратора</h2>
      <input
        type="text"
        value={nameValue}
        className="adminLogin__name"
        onChange={(e) => setNameValue(e.target.value)}
      />
      <h2>Введіть пароль адміністратора</h2>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        className="adminLogin__password"
      />
      <button type="submit" className="defaultButton">
        Войти в админ панель
      </button>
    </form>
  );
}
