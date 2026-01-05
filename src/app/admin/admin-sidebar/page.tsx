'use client'

import Link from "next/link";
import "../admin.css";
import { useAuth } from "@/hooks/useAuth";


export default function AdminSidebar() {
useAuth();

  return (
    <div className="admin__sidebar">
      <Link className="admin__sidebar__link" href="/admin/adminAdd">
        Додати товар
      </Link>
      <Link className="admin__sidebar__link" href="/admin/adminProducts/oils">
        Ефірні олії
      </Link>
      <Link className="admin__sidebar__link" href="/admin/adminProducts/face">
        Догляд за обличчям
      </Link>
      <Link className="admin__sidebar__link" href="/admin/adminProducts/body">
        Догляд за тілом
      </Link>
      <Link className="admin__sidebar__link" href="/admin/adminProducts/hair">
        Догляд за волоссям
      </Link>
      <Link className="admin__sidebar__link" href="/admin/adminProducts/decor">
        Декоративна косметика
      </Link>
    </div>
  );
}
