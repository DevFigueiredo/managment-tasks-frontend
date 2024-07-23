import { redirect, RedirectType } from "next/navigation";
import { Routes } from "@/utils/routes";

export default async function Custom404() {
  return redirect(Routes.Home, RedirectType.push);
}
