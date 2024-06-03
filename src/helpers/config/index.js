export const config = {
  api: {
    baseUrl: 'https://realestate-backend-g1-t2-572448be0354.herokuapp.com',
  },
  project: {
    name: "Prettier Homes",
    description: "Prettier Homes is an online platform for buying, selling, or renting various properties like houses, apartments, land, and commercial real estate. It also provides users with the convenience of easily requesting property tours and efficiently managing incoming tour requests, thereby offering a comprehensive solution for all their real estate requirements.",
  },
  settings: {
    languages: [
      { code: 'en', name: 'English', flag: "/icons/flags/uk.png" },
      { code: 'tr', name: 'Türkçe', flag: "/icons/flags/tr.png" },
      { code: 'fr', name: 'Français', flag: "/icons/flags/fr.png" },
      { code: 'de', name: 'Deutsch', flag: "/icons/flags/de.png" },
      { code: 'es', name: 'Español', flag: "/icons/flags/es.png" }
    ],
  },
  banner: {
    images: [
      { alt: 'house', source: '/images/content/banner-slide/house.png' },
      { alt: 'couple', source: '/images/content/banner-slide/couple.png' },
      { alt: 'bluehouse', source: '/images/content/banner-slide/bluehouse.png' },
      { alt: 'camping', source: '/images/content/banner-slide/camping.png' },
      { alt: 'buildings', source: '/images/content/banner-slide/buildings.png' },
      { alt: 'buildingwindows', source: '/images/content/banner-slide/buildingwindows.png' },
      { alt: 'redroof', source: '/images/content/banner-slide/redroof.png' },
      { alt: 'floatinghouse', source: '/images/content/banner-slide/floatinghouse.png' },
    ],
  },
  contact: {
    center: {
      phone: "+90 (541) 123-2225",
      email: "prettierhome@gmail.com",
      address: "Trump Towers No:12 Kule:1 Kat:13 No:1408, 34381 Şişli, İstanbul",
      mapURL: "https://maps.app.goo.gl/t2bXusPKPwDtSxx7A",
      mapEmbedURL: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3008.078161122501!2d28.989887403427126!3d41.067284111210085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDA0JzAyLjUiTiAyOMKwNTknMjkuNCJF!5e0!3m2!1str!2str!4v1703539988073!5m2!1str!2str",
    },
    offices: [
      {
        id: 1,
        name: "PARIS",
        address: "Rue Saint-Dominique, Paris, France",
        mapURL: "https://maps.app.goo.gl/E5pFSPHY2iqmrtjj6",
        phone: "+33 1 56 76 01 02",
        image: "paris.png"
      },
      {
        id: 2,
        name: "LONDON",
        address: "Dover St, London, UK",
        mapURL: "https://maps.app.goo.gl/EGH1F8btiDkYyB4k9",
        phone: "+44 7980 794795",
        image: "london.png"
      },
      {
        id: 3,
        name: "ISTANBUL",
        address: "Trump Towers No:12Kule:1 Kat:13 No:1408, 34381 Şişli",
        mapURL: "https://maps.app.goo.gl/t2bXusPKPwDtSxx7A",
        phone: "+90 (541) 123-2225",
        image: "istanbul.png"
      }
    ]
  },
  pageRoles: {
    myProfile: ["ADMIN", "MANAGER", "CUSTOMER"],
    myAdverts: ["ADMIN", "MANAGER", "CUSTOMER"],
    myFavorites: ["ADMIN", "MANAGER", "CUSTOMER"],
    dashboard: ["ADMIN", "MANAGER"]
  },
  selectRoles: {
    roles: ["ADMIN", "MANAGER", "CUSTOMER"]
  },
  advertsStatus: {
    status: [{ label: "All", value: "" }, { label: "Pending", value: 0 }, { label: "Activated", value: 1 }, { label: "Rejected", value: 2 }]
  },
  tourRequestStatus: {
    status: [{ label: "All", value: "" }, { label: "Pending", value: 0 }, { label: "Approved", value: 1 }, { label: "Declined", value: 2 }, { label: "Canceled", value: 3 }]
  }

}