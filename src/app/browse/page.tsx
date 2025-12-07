import {
  getFragrancesPage,
  type FragrancePage,
} from "@/actions/get-fragrances";
import BrowseClient from "./BrowseClient";

export default async function BrowsePage() {
  const initialData: FragrancePage = await getFragrancesPage(1);

  return <BrowseClient initialData={initialData} />;
}
