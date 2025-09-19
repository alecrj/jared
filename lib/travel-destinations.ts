export interface Destination {
  country: string
  cities: string[]
  region: string
  popular: boolean
}

export const travelDestinations: Destination[] = [
  // Europe
  { country: "Italy", cities: ["Rome", "Florence", "Venice", "Milan", "Naples", "Turin", "Bologna", "Palermo"], region: "Europe", popular: true },
  { country: "France", cities: ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Strasbourg", "Montpellier", "Cannes"], region: "Europe", popular: true },
  { country: "Spain", cities: ["Madrid", "Barcelona", "Seville", "Valencia", "Bilbao", "Granada", "Córdoba", "Toledo"], region: "Europe", popular: false },
  { country: "United Kingdom", cities: ["London", "Edinburgh", "Manchester", "Liverpool", "Bath", "Oxford", "Cambridge", "York"], region: "Europe", popular: false },
  { country: "Germany", cities: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt", "Dresden", "Heidelberg", "Rothenburg"], region: "Europe", popular: false },
  { country: "Greece", cities: ["Athens", "Santorini", "Mykonos", "Rhodes", "Crete", "Delphi", "Meteora", "Corfu"], region: "Europe", popular: true },
  { country: "Portugal", cities: ["Lisbon", "Porto", "Sintra", "Óbidos", "Coimbra", "Braga", "Aveiro", "Lagos"], region: "Europe", popular: false },
  { country: "Croatia", cities: ["Dubrovnik", "Split", "Zagreb", "Plitvice Lakes", "Hvar", "Rovinj", "Zadar", "Korčula"], region: "Europe", popular: true },
  { country: "Netherlands", cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Groningen", "Delft", "Leiden"], region: "Europe", popular: false },
  { country: "Switzerland", cities: ["Zurich", "Geneva", "Basel", "Bern", "Lucerne", "Interlaken", "Zermatt", "Montreux"], region: "Europe", popular: false },

  // Asia
  { country: "Japan", cities: ["Tokyo", "Kyoto", "Osaka", "Hiroshima", "Nara", "Yokohama", "Kobe", "Takayama"], region: "Asia", popular: true },
  { country: "China", cities: ["Beijing", "Shanghai", "Xi'an", "Chengdu", "Guilin", "Hangzhou", "Suzhou", "Pingyao"], region: "Asia", popular: false },
  { country: "Thailand", cities: ["Bangkok", "Chiang Mai", "Phuket", "Krabi", "Ayutthaya", "Sukhothai", "Koh Samui", "Hua Hin"], region: "Asia", popular: false },
  { country: "India", cities: ["Delhi", "Mumbai", "Jaipur", "Agra", "Varanasi", "Goa", "Kerala", "Udaipur"], region: "Asia", popular: false },
  { country: "Vietnam", cities: ["Ho Chi Minh City", "Hanoi", "Hoi An", "Hue", "Da Nang", "Sapa", "Halong Bay", "Dalat"], region: "Asia", popular: false },
  { country: "South Korea", cities: ["Seoul", "Busan", "Jeju", "Incheon", "Daegu", "Daejeon", "Gwangju", "Gyeongju"], region: "Asia", popular: false },
  { country: "Singapore", cities: ["Singapore"], region: "Asia", popular: false },
  { country: "Indonesia", cities: ["Jakarta", "Bali", "Yogyakarta", "Bandung", "Surabaya", "Medan", "Lombok", "Borobudur"], region: "Asia", popular: true },
  { country: "Malaysia", cities: ["Kuala Lumpur", "George Town", "Malacca", "Ipoh", "Johor Bahru", "Kota Kinabalu", "Kuching", "Langkawi"], region: "Asia", popular: false },
  { country: "Cambodia", cities: ["Siem Reap", "Phnom Penh", "Battambang", "Sihanoukville", "Kep", "Kampot", "Koh Rong", "Kratie"], region: "Asia", popular: false },

  // Americas
  { country: "United States", cities: ["New York", "Los Angeles", "San Francisco", "Chicago", "Las Vegas", "Miami", "Boston", "Seattle"], region: "North America", popular: false },
  { country: "Canada", cities: ["Toronto", "Vancouver", "Montreal", "Quebec City", "Calgary", "Ottawa", "Edmonton", "Winnipeg"], region: "North America", popular: false },
  { country: "Mexico", cities: ["Mexico City", "Cancún", "Guadalajara", "Mérida", "Oaxaca", "San Miguel de Allende", "Playa del Carmen", "Puerto Vallarta"], region: "North America", popular: false },
  { country: "Brazil", cities: ["Rio de Janeiro", "São Paulo", "Salvador", "Brasília", "Florianópolis", "Recife", "Fortaleza", "Manaus"], region: "South America", popular: true },
  { country: "Argentina", cities: ["Buenos Aires", "Mendoza", "Córdoba", "Rosario", "Salta", "Bariloche", "El Calafate", "Ushuaia"], region: "South America", popular: true },
  { country: "Peru", cities: ["Lima", "Cusco", "Arequipa", "Trujillo", "Iquitos", "Huacachina", "Paracas", "Chachapoyas"], region: "South America", popular: true },
  { country: "Chile", cities: ["Santiago", "Valparaíso", "Atacama Desert", "Patagonia", "Easter Island", "Viña del Mar", "La Serena", "Puerto Varas"], region: "South America", popular: true },
  { country: "Colombia", cities: ["Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta", "Villa de Leyva", "San Andrés", "Tayrona"], region: "South America", popular: true },

  // Africa
  { country: "Morocco", cities: ["Marrakech", "Casablanca", "Fez", "Rabat", "Chefchaouen", "Essaouira", "Tangier", "Meknes"], region: "Africa", popular: true },
  { country: "Egypt", cities: ["Cairo", "Luxor", "Aswan", "Alexandria", "Hurghada", "Sharm El Sheikh", "Dahab", "Siwa"], region: "Africa", popular: true },
  { country: "South Africa", cities: ["Cape Town", "Johannesburg", "Durban", "Port Elizabeth", "Bloemfontein", "Pretoria", "Stellenbosch", "Hermanus"], region: "Africa", popular: true },
  { country: "Kenya", cities: ["Nairobi", "Mombasa", "Nakuru", "Eldoret", "Kisumu", "Malindi", "Lamu", "Maasai Mara"], region: "Africa", popular: true },
  { country: "Tanzania", cities: ["Dar es Salaam", "Arusha", "Zanzibar", "Dodoma", "Mwanza", "Tanga", "Moshi", "Serengeti"], region: "Africa", popular: true },

  // Oceania
  { country: "Australia", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Cairns", "Darwin"], region: "Oceania", popular: true },
  { country: "New Zealand", cities: ["Auckland", "Wellington", "Christchurch", "Queenstown", "Hamilton", "Tauranga", "Dunedin", "Rotorua"], region: "Oceania", popular: true },

  // Additional Popular Destinations
  { country: "Turkey", cities: ["Istanbul", "Cappadocia", "Antalya", "Izmir", "Ankara", "Bodrum", "Pamukkale", "Ephesus"], region: "Europe/Asia", popular: true },
  { country: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"], region: "Middle East", popular: true },
  { country: "Israel", cities: ["Jerusalem", "Tel Aviv", "Haifa", "Eilat", "Nazareth", "Acre", "Caesarea", "Masada"], region: "Middle East", popular: true },
  { country: "Jordan", cities: ["Amman", "Petra", "Wadi Rum", "Aqaba", "Jerash", "Madaba", "Karak", "Dead Sea"], region: "Middle East", popular: true },
  { country: "Iceland", cities: ["Reykjavik", "Blue Lagoon", "Golden Circle", "Akureyri", "Westfjords", "Jökulsárlón", "Vík", "Húsavík"], region: "Europe", popular: true },
  { country: "Norway", cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Tromsø", "Ålesund", "Geiranger", "Lofoten"], region: "Europe", popular: true },
  { country: "Sweden", cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Visby", "Kiruna", "Abisko", "Lund"], region: "Europe", popular: true },
  { country: "Denmark", cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens"], region: "Europe", popular: true },
  { country: "Finland", cities: ["Helsinki", "Tampere", "Turku", "Oulu", "Lahti", "Kuopio", "Jyväskylä", "Lapland"], region: "Europe", popular: true },
  { country: "Czech Republic", cities: ["Prague", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc", "Hradec Králové", "České Budějovice"], region: "Europe", popular: true },
  { country: "Hungary", cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", "Kecskemét"], region: "Europe", popular: true },
  { country: "Poland", cities: ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan", "Lodz", "Lublin", "Zakopane"], region: "Europe", popular: true },
  { country: "Austria", cities: ["Vienna", "Salzburg", "Innsbruck", "Graz", "Linz", "Hallstatt", "Melk", "Bad Ischl"], region: "Europe", popular: true },
  { country: "Belgium", cities: ["Brussels", "Antwerp", "Ghent", "Bruges", "Leuven", "Namur", "Mons", "Liège"], region: "Europe", popular: true },
  { country: "Ireland", cities: ["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Kilkenny", "Dingle", "Ring of Kerry"], region: "Europe", popular: true },
  { country: "Scotland", cities: ["Edinburgh", "Glasgow", "Stirling", "Inverness", "Aberdeen", "Dundee", "St. Andrews", "Isle of Skye"], region: "Europe", popular: true },
  { country: "Wales", cities: ["Cardiff", "Swansea", "Newport", "Bangor", "St. Davids", "Conwy", "Caerphilly", "Brecon"], region: "Europe", popular: true }
]

export const getCountriesByRegion = () => {
  const regions: Record<string, Destination[]> = {}

  travelDestinations.forEach(destination => {
    if (!regions[destination.region]) {
      regions[destination.region] = []
    }
    regions[destination.region].push(destination)
  })

  // Sort countries within each region by popularity first, then alphabetically
  Object.keys(regions).forEach(region => {
    regions[region].sort((a, b) => {
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return a.country.localeCompare(b.country)
    })
  })

  return regions
}

export const getAllCities = () => {
  const allCities: { city: string; country: string; popular: boolean }[] = []

  travelDestinations.forEach(destination => {
    destination.cities.forEach(city => {
      allCities.push({
        city,
        country: destination.country,
        popular: destination.popular
      })
    })
  })

  return allCities.sort((a, b) => {
    if (a.popular && !b.popular) return -1
    if (!a.popular && b.popular) return 1
    return a.city.localeCompare(b.city)
  })
}

export const getTopDestinations = () => {
  return travelDestinations
    .filter(dest => dest.popular)
    .slice(0, 50)
    .sort((a, b) => a.country.localeCompare(b.country))
}