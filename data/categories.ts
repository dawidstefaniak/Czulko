export type Category = "cities" | "animals";

const WORLD_CITIES: string[] = [
  "Paryż", "Tokio", "Nowy Jork", "Londyn", "Kair", "Sydney",
  "Rzym", "Berlin", "Moskwa", "Pekin", "Dubaj", "Bangkok",
  "Barcelona", "Amsterdam", "Praga", "Wiedeń", "Lizbona", "Stambuł",
  "Buenos Aires", "Meksyk", "Toronto", "Seul", "Mumbaj", "Nairobi",
  "Kapsztad", "Rio de Janeiro", "Lima", "Bogota", "Santiago", "Hawana",
  "Ateny", "Helsinki", "Oslo", "Kopenhaga", "Sztokholm", "Bruksela",
  "Zurych", "Genewa", "Budapeszt", "Bukareszt", "Sofia", "Zagrzeb",
  "Belgrad", "Sarajewo", "Dublin", "Edynburg", "Madryt", "Mediolan",
  "Marsylia", "Monachium", "Kraków", "Warszawa", "Gdańsk", "Wrocław",
  "Las Vegas", "San Francisco", "Los Angeles", "Chicago", "Miami",
  "Hanoi", "Singapur", "Kuala Lumpur", "Manila", "Dżakarta",
  "Kijów", "Tbilisi", "Baku", "Taszkent", "Kabul",
  "Casablanca", "Tunis", "Aleksandria", "Addis Abeba", "Lagos",
];

const ANIMALS: string[] = [
  "Słoń", "Tygrys", "Delfin", "Orzeł", "Krokodyl", "Pingwin",
  "Żyrafa", "Lew", "Goryl", "Panda", "Koala", "Kangur",
  "Rekin", "Wieloryb", "Ośmiornica", "Papuga", "Flaming", "Pelikan",
  "Niedźwiedź", "Wilk", "Lis", "Jeleń", "Łoś", "Bóbr",
  "Wydra", "Foka", "Mors", "Gepard", "Leopard", "Jaguar",
  "Hipopotam", "Nosorożec", "Zebra", "Gazela", "Antylopa", "Bawół",
  "Kameleon", "Iguana", "Wąż", "Żółw", "Krab", "Meduza",
  "Sowa", "Jastrząb", "Sokół", "Bocian", "Żuraw", "Kolibr",
  "Łabędź", "Paw", "Struś", "Emu", "Tukan", "Kakadu",
  "Morświn", "Narwal", "Lampart", "Hiena", "Surykatka", "Leniwiec",
  "Szympans", "Orangutan", "Lemur", "Kojot", "Szakal", "Borsuk",
  "Jeż", "Wiewiórka", "Chomik", "Szynszyla", "Gekon", "Jaszczurka",
  "Salamandra", "Żaba", "Mrówkojad", "Pancernik", "Tapir", "Okapi",
];

export const CATEGORIES: Record<Category, { label: string; words: string[] }> = {
  cities: { label: "Miasta Świata", words: WORLD_CITIES },
  animals: { label: "Zwierzęta", words: ANIMALS },
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
