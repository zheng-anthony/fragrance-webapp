import Link from "next/link";

const mockUrls = [
  "https://5jg4mxr6uu.ufs.sh/f/069k1fb8afrPTTPMHxR3jmXVy8Up5rWza0Rs6GA4wxEHSPLg",
  "https://5jg4mxr6uu.ufs.sh/f/069k1fb8afrPRzpmei2qIcUHxF3sXjuYMQzBoymifhw087SC",
  "https://5jg4mxr6uu.ufs.sh/f/069k1fb8afrP79HeX8Cpf3PDwIJNLr6SayOBKkv1UpTFioeG",
  "https://5jg4mxr6uu.ufs.sh/f/069k1fb8afrPu1OdsslPXE89WMCLAhoFrKzkdtHbe1lvmYsU",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));
export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
