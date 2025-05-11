export async function searchProductByImage(imageBase64: string) {
    // En el futuro: conectarás aquí con una API real (Bing, Clarifai, etc.)
    // Por ahora: devolvemos datos simulados usando la imagen subida
  
    return [
      {
        site: "AliExpress",
        price: "$12.99",
        link: "https://www.aliexpress.com/item/123",
        image: imageBase64,
      },
      {
        site: "Amazon",
        price: "$15.50",
        link: "https://www.amazon.com/item/456",
        image: imageBase64,
      },
    ];
  }
  