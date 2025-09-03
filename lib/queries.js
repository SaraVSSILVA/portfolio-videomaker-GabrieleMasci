export const homeQuery = `*[_type == "home"][0]{title, description, "backgroundImage": backgroundImage.asset->url}`;
export const serviceQuery = `*[_type == "service"]{
  title_pt,
  title_it,
  description_pt,
  description_it,
  "image": image.asset->url
}`;
export const portfolioQuery = `*[_type == "portfolio"]{
  title_pt,
  title_it,
  description_pt,
  description_it,
  categoria,
  videoUrl,
  videoId,
  "thumbnailUrl": thumbnail.asset->url
}`;

export const contactQuery = `*[_type == "contact"][0]{email, phone, social}`;
export const sobreQuery = `*[_type == "sobre"][0]{titulo_pt, titulo_it, texto1_pt, texto1_it, texto2_pt, texto2_it, texto3_pt, texto3_it, texto4_pt, texto4_it, "imagem": imagem.asset->url}`;
