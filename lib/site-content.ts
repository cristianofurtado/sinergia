export interface StateCoverage {
  uf: string;
  name: string;
  discount: string;
  distributor: string;
  modalities: string;
}

export interface TeamMember {
  name: string;
  photo: string;
  phoneRaw: string;
  phoneDisplay: string;
  region: string;
}

export const SITE_INFO = {
  name: "Energia Prospectar",
  url: "https://energiaprospectar.com.br",
  logo: "https://energiaprospectar.com.br/logo-oficial.png",
  description:
    "Plataforma de gestão de Energia e ecossistema para clientes B2B e consultores em todo o Brasil. Economize de 10% a 30% na conta de luz sem obras ou investimentos.",
  primaryPhoneRaw: "5571987822230",
  primaryPhoneDisplay: "+55 (71) 98782-2230",
  knowsAbout: [
    "Energia por assinatura",
    "Geração distribuída",
    "Mercado Livre de Energia",
  ],
} as const;

export const STATES_COVERAGE: StateCoverage[] = [
  { uf: "CE", name: "Ceará", discount: "20%", distributor: "Enel Ceará", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "RN", name: "Rio Grande do Norte", discount: "18%", distributor: "Neoenergia Cosern", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "BA", name: "Bahia", discount: "18%", distributor: "Neoenergia Coelba", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "PE", name: "Pernambuco", discount: "16%", distributor: "Neoenergia Celpe", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "AL", name: "Alagoas", discount: "18%", distributor: "Equatorial Alagoas", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "MA", name: "Maranhão", discount: "18%", distributor: "Equatorial Maranhão", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "PI", name: "Piauí", discount: "18%", distributor: "Equatorial Piauí", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "PA", name: "Pará", discount: "18%", distributor: "Equatorial Pará", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "GO", name: "Goiás", discount: "25%", distributor: "Equatorial Goiás", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "MT", name: "Mato Grosso", discount: "25%", distributor: "Energisa MT", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "MS", name: "Mato Grosso do Sul", discount: "23%", distributor: "Energisa MS", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "TO", name: "Tocantins", discount: "16%", distributor: "Energisa Tocantins", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "MG", name: "Minas Gerais", discount: "26%", distributor: "CEMIG", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "SP", name: "São Paulo", discount: "15%", distributor: "CPFL / Elektro / Piratininga", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "ES", name: "Espírito Santo", discount: "15%", distributor: "EDP Espírito Santo", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "RJ", name: "Rio de Janeiro", discount: "15%", distributor: "Light / Enel RJ", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "PR", name: "Paraná", discount: "15%", distributor: "Copel", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "SC", name: "Santa Catarina", discount: "12%", distributor: "Celesc", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "RS", name: "Rio Grande do Sul", discount: "15%", distributor: "RGE / CEEE Equatorial", modalities: "Geração Distribuída e Mercado Livre" },
  { uf: "SE", name: "Sergipe", discount: "16%", distributor: "Energisa Sergipe", modalities: "Geração Distribuída e Mercado Livre" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Cristiano Furtado",
    photo: "/cristiano-furtado.jpg",
    phoneRaw: "5571987822230",
    phoneDisplay: "+55 (71) 98782-2230",
    region: "Bahia & Região Nordeste",
  },
  {
    name: "Renata Cereser",
    photo: "/renata-cereser.jpg",
    phoneRaw: "5511972274060",
    phoneDisplay: "+55 (11) 97227-4060",
    region: "São Paulo & Região Sudeste",
  },
  {
    name: "Dani Fritzen",
    photo: "/dani-fritzen.jpg",
    phoneRaw: "5551980584545",
    phoneDisplay: "+55 (51) 98058-4545",
    region: "Rio Grande do Sul & Região Sul",
  },
  {
    name: "Eliene Matos",
    photo: "/eliene-matos.jpg",
    phoneRaw: "5511966413480",
    phoneDisplay: "+55 (11) 96641-3480",
    region: "São Paulo & Região Sudeste",
  },
  {
    name: "Cleunes Lavratti",
    photo: "/cleunes-lavratti.jpg",
    phoneRaw: "5565996097884",
    phoneDisplay: "+55 (65) 99609-7884",
    region: "Mato Grosso & Centro-Oeste",
  },
];
