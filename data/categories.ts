export type Category =
  | "cities" | "animals" | "movies" | "food" | "sports"
  | "professions" | "countries" | "celebrities" | "videogames"
  | "brands" | "plants" | "inventions";

export type Difficulty = "easy" | "medium" | "hard";

export interface Word {
  text: string;
  difficulty: Difficulty;
}

export interface CategoryData {
  label: string;
  emoji: string;
  words: Word[];
}

function w(texts: string[], difficulty: Difficulty): Word[] {
  return texts.map(text => ({ text, difficulty }));
}

export const CATEGORIES: Record<Category, CategoryData> = {
  cities: {
    label: "Miasta Świata",
    emoji: "🌍",
    words: [
      ...w(["Paryż", "Londyn", "Nowy Jork", "Rzym", "Berlin", "Tokio", "Warszawa", "Kraków", "Barcelona", "Amsterdam", "Dubaj", "Sydney", "Los Angeles", "Miami", "Chicago", "Praga", "Madryt", "Mediolan", "Las Vegas", "Wrocław", "Gdańsk", "Moskwa", "Pekin", "Wiedeń"], "easy"),
      ...w(["Stambuł", "Buenos Aires", "Bangkok", "Lizbona", "Helsinki", "Oslo", "Kopenhaga", "Sztokholm", "Bruksela", "Budapeszt", "Dublin", "Edynburg", "Monachium", "Marsylia", "Toronto", "Seul", "Singapur", "Rio de Janeiro", "Hawana", "Santiago", "Ateny", "Genewa", "Zurych", "Kair"], "medium"),
      ...w(["Mumbaj", "Nairobi", "Kapsztad", "Dżakarta", "Kuala Lumpur", "Manila", "Hanoi", "Bogota", "Lima", "Bukareszt", "Sofia", "Zagrzeb", "Belgrad", "Sarajewo", "Tbilisi", "Baku", "Taszkent", "Casablanca", "Tunis", "Aleksandria", "Addis Abeba", "Lagos", "Kabul", "Meksyk"], "hard"),
    ],
  },
  animals: {
    label: "Zwierzęta",
    emoji: "🦁",
    words: [
      ...w(["Pies", "Kot", "Koń", "Krowa", "Słoń", "Lew", "Tygrys", "Żyrafa", "Delfin", "Rekin", "Orzeł", "Pingwin", "Panda", "Niedźwiedź", "Wilk", "Lis", "Królik", "Żółw", "Papuga", "Krokodyl", "Kangur", "Koala", "Zebra", "Wieloryb"], "easy"),
      ...w(["Goryl", "Gepard", "Jaguar", "Leopard", "Hipopotam", "Nosorożec", "Flaming", "Pelikan", "Sowa", "Bocian", "Łabędź", "Jeleń", "Łoś", "Bóbr", "Wydra", "Foka", "Mors", "Ośmiornica", "Kameleon", "Iguana", "Wąż", "Struś", "Paw", "Szympans"], "medium"),
      ...w(["Narwal", "Okapi", "Tapir", "Pancernik", "Mrówkojad", "Surykatka", "Leniwiec", "Lemur", "Gekon", "Salamandra", "Kolibr", "Kakadu", "Tukan", "Hiena", "Lampart", "Szakal", "Borsuk", "Szynszyla", "Morświn", "Żuraw", "Gazela", "Antylopa", "Bawół", "Emu"], "hard"),
    ],
  },
  movies: {
    label: "Filmy",
    emoji: "🎬",
    words: [
      ...w(["Titanic", "Shrek", "Król Lew", "Harry Potter", "Gwiezdne Wojny", "Batman", "Spider-Man", "Frozen", "Avatar", "Toy Story", "Piraci z Karaibów", "Matrix", "Jurassic Park", "Władca Pierścieni", "Indiana Jones", "Rocky", "Zorro", "Robin Hood", "Tarzan", "Superman", "Gladiator", "Forrest Gump", "Żelazny Człowiek", "Hulk"], "easy"),
      ...w(["Incepcja", "Interstellar", "Ojciec Chrzestny", "Pulp Fiction", "Fight Club", "Skazani na Shawshank", "Zielona Mila", "Siedem", "Milczenie Owiec", "Piękny Umysł", "Chłopaki Nie Płaczą", "Dzień Świra", "Miś", "Rejs", "Seksmisja", "Vabank", "Terminator", "Rambo", "Braveheart", "Schindler", "Cast Away", "Truman Show", "Gran Torino", "Joker"], "medium"),
      ...w(["Mulholland Drive", "Solaris", "Stalker", "Amelia", "Ida", "Zimna Wojna", "Blade Runner", "Taksówkarz", "Mechaniczna Pomarańcza", "Lot Nad Kukułczym Gniazdem", "Siedmiu Samurajów", "Persona", "Rashomon", "Nosferatu", "Metropolis", "Obywatel Kane", "Vertigo", "Chinatown", "Doktor Strangelove", "Apocalypse Now", "Łowca Androidów", "Wieczne Pragnienie", "Dekalog", "Czas Apokalipsy"], "hard"),
    ],
  },
  food: {
    label: "Jedzenie",
    emoji: "🍕",
    words: [
      ...w(["Pizza", "Hamburger", "Spaghetti", "Sushi", "Pierogi", "Naleśniki", "Jajecznica", "Kanapka", "Frytki", "Lody", "Czekolada", "Ciasto", "Zupa", "Sałatka", "Kiełbasa", "Schabowy", "Bigos", "Rosół", "Gołąbki", "Jabłko", "Banan", "Chleb", "Masło", "Ser"], "easy"),
      ...w(["Risotto", "Paella", "Ramen", "Dim Sum", "Falafel", "Hummus", "Guacamole", "Burrito", "Taco", "Pad Thai", "Curry", "Gnocchi", "Lasagne", "Tiramisu", "Panna Cotta", "Crème Brûlée", "Żurek", "Flaki", "Tatar", "Carpaccio", "Ceviche", "Fondue", "Raclette", "Croissant"], "medium"),
      ...w(["Bouillabaisse", "Coq au Vin", "Beef Wellington", "Foie Gras", "Kimchi", "Tempura", "Edamame", "Miso", "Gazpacho", "Shakshuka", "Bibimbap", "Pho", "Tom Yum", "Rendang", "Pierożki Gyoza", "Baba Ghanoush", "Tzatziki", "Ratatouille", "Cassoulet", "Ossobuco", "Goulash", "Cevapi", "Baklava", "Churros"], "hard"),
    ],
  },
  sports: {
    label: "Sporty",
    emoji: "⚽",
    words: [
      ...w(["Piłka nożna", "Koszykówka", "Siatkówka", "Tenis", "Pływanie", "Bieganie", "Jazda na rowerze", "Narty", "Łyżwiarstwo", "Boks", "Judo", "Karate", "Piłka ręczna", "Golf", "Baseball", "Hokej", "Surfing", "Skateboard", "Taniec", "Gimnastyka", "Lekkoatletyka", "Snowboard", "Rugby", "Badminton"], "easy"),
      ...w(["Szermierka", "Łucznictwo", "Wioślarstwo", "Kajakarstwo", "Triathlon", "Biathlon", "Skok w dal", "Skok wzwyż", "Rzut młotem", "Rzut oszczepem", "Polo", "Lacrosse", "Squash", "Curling", "Bobsleje", "Saneczkarstwo", "Windsurfing", "Kitesurfing", "Wspinaczka", "Parkour", "MMA", "Sumo", "Taekwondo", "Aikido"], "medium"),
      ...w(["Pelota", "Sepak Takraw", "Kabaddi", "Hurling", "Krykiet", "Polo wodne", "Skeleton", "Luge", "Skoki narciarskie", "Biegi przełajowe", "Orienteering", "Pięciobój", "Dziesięciobój", "Kendo", "Capoeira", "Bouldering", "Freediving", "Speedway", "Bobslej", "Short track", "Skeleton", "Petanka", "Strongman", "Armwrestling"], "hard"),
    ],
  },
  professions: {
    label: "Zawody",
    emoji: "👨‍⚕️",
    words: [
      ...w(["Lekarz", "Nauczyciel", "Policjant", "Strażak", "Kucharz", "Kierowca", "Pilot", "Aktor", "Piosenkarz", "Malarz", "Fryzjer", "Dentysta", "Sprzedawca", "Kelner", "Mechanik", "Ogrodnik", "Listonosz", "Piekarz", "Rzeźnik", "Stolarz", "Murarz", "Elektryk", "Hydraulik", "Ratownik"], "easy"),
      ...w(["Architekt", "Programista", "Prawnik", "Sędzia", "Dziennikarz", "Fotograf", "Tłumacz", "Psycholog", "Weterynarz", "Farmaceuta", "Księgowy", "Detektyw", "Archeolog", "Geolog", "Meteorolog", "Chirurg", "Anestezjolog", "Kardiolog", "Logopeda", "Dietetyk", "Fizjoterapeuta", "Kaskader", "Reżyser", "Scenarzysta"], "medium"),
      ...w(["Entomolog", "Paleontolog", "Kryptograf", "Somelier", "Enolog", "Kartograf", "Taksydermista", "Aktuariusz", "Epidemiolog", "Ichtiolog", "Ornitolog", "Herpetolog", "Speleolog", "Dendrochronolog", "Numizmatyk", "Filatelista", "Grafolog", "Heraldyk", "Kaligraf", "Kustosz", "Lepidopterolog", "Mikolog", "Parazytolog", "Wirusolog"], "hard"),
    ],
  },
  countries: {
    label: "Kraje",
    emoji: "🗺️",
    words: [
      ...w(["Polska", "Niemcy", "Francja", "Włochy", "Hiszpania", "Anglia", "USA", "Japonia", "Chiny", "Brazylia", "Meksyk", "Kanada", "Australia", "Indie", "Rosja", "Grecja", "Turcja", "Egipt", "Szwecja", "Norwegia", "Holandia", "Portugalia", "Czechy", "Szwajcaria"], "easy"),
      ...w(["Argentyna", "Chile", "Peru", "Kolumbia", "Korea Południowa", "Tajlandia", "Wietnam", "Indonezja", "Filipiny", "Izrael", "Arabia Saudyjska", "Iran", "Irak", "Maroko", "RPA", "Nigeria", "Kenia", "Rumunia", "Bułgaria", "Chorwacja", "Serbia", "Ukraina", "Irlandia", "Austria"], "medium"),
      ...w(["Bhutan", "Laos", "Brunei", "Surinam", "Gujana", "Lesotho", "Eswatini", "Dżibuti", "Komory", "Tuvalu", "Nauru", "Palau", "Kiribati", "Vanuatu", "Timor Wschodni", "Liechtenstein", "Andora", "San Marino", "Monako", "Luksemburg", "Malta", "Cypr", "Islandia", "Czarnogóra"], "hard"),
    ],
  },
  celebrities: {
    label: "Celebryci",
    emoji: "⭐",
    words: [
      ...w(["Robert Lewandowski", "Cristiano Ronaldo", "Lionel Messi", "Michael Jordan", "Elon Musk", "Taylor Swift", "Beyoncé", "Ed Sheeran", "Adele", "Drake", "Rihanna", "Shakira", "Eminem", "Madonna", "Elvis Presley", "Michael Jackson", "Leonardo DiCaprio", "Tom Hanks", "Will Smith", "Angelina Jolie", "Brad Pitt", "Johnny Depp", "Jennifer Lopez", "Dwayne Johnson"], "easy"),
      ...w(["Wisława Szymborska", "Czesław Miłosz", "Adam Małysz", "Iga Świątek", "Agnieszka Radwańska", "Zbigniew Boniek", "Doda", "Maryla Rodowicz", "Krzysztof Kieślowski", "Roman Polański", "Andrzej Wajda", "Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "Albert Einstein", "Stephen Hawking", "Marie Curie", "Nikola Tesla", "Steve Jobs", "Bill Gates", "Jeff Bezos", "Mark Zuckerberg", "Oprah Winfrey", "David Beckham"], "medium"),
      ...w(["Olga Tokarczuk", "Henryk Sienkiewicz", "Fryderyk Chopin", "Jan Matejko", "Mikołaj Kopernik", "Ignacy Łukasiewicz", "Maria Konopnicka", "Stefan Banach", "Stanisław Lem", "Andrzej Sapkowski", "Kubrick", "Coppola", "Fellini", "Bergman", "Kurosawa", "Wes Anderson", "Greta Gerwig", "Guillermo del Toro", "Denis Villeneuve", "Bong Joon-ho", "Park Chan-wook", "Hayao Miyazaki", "Lech Wałęsa", "Jan Paweł II"], "hard"),
    ],
  },
  videogames: {
    label: "Gry",
    emoji: "🎮",
    words: [
      ...w(["Minecraft", "Fortnite", "Mario", "Tetris", "FIFA", "GTA", "Pac-Man", "Angry Birds", "Candy Crush", "Pokémon", "Sonic", "Roblox", "Among Us", "Pong", "Worms", "Need for Speed", "Call of Duty", "Counter-Strike", "League of Legends", "Overwatch", "Valorant", "Mortal Kombat", "Street Fighter", "Sims"], "easy"),
      ...w(["The Witcher", "Cyberpunk", "God of War", "Skyrim", "Dark Souls", "Zelda", "Red Dead Redemption", "Uncharted", "Last of Us", "Resident Evil", "Silent Hill", "Halo", "Doom", "Half-Life", "Portal", "Diablo", "World of Warcraft", "Starcraft", "Civilization", "Fallout", "Bioshock", "Mass Effect", "Assassin's Creed", "Horizon"], "medium"),
      ...w(["Baldur's Gate", "Disco Elysium", "Outer Wilds", "Hollow Knight", "Celeste", "Hades", "Returnal", "Sekiro", "Bloodborne", "Elden Ring", "Factorio", "Rimworld", "Dwarf Fortress", "Kerbal Space Program", "Braid", "Journey", "Ico", "Shadow of the Colossus", "Okami", "Xenoblade", "Persona", "Planescape Torment", "System Shock", "Deus Ex"], "hard"),
    ],
  },
  brands: {
    label: "Marki",
    emoji: "🏷️",
    words: [
      ...w(["Apple", "Samsung", "Nike", "Adidas", "Coca-Cola", "McDonald's", "Google", "Facebook", "Amazon", "Netflix", "IKEA", "Lego", "Disney", "BMW", "Mercedes", "Toyota", "Volkswagen", "Pepsi", "Starbucks", "Zara", "H&M", "YouTube", "Instagram", "TikTok"], "easy"),
      ...w(["Porsche", "Ferrari", "Lamborghini", "Rolex", "Gucci", "Louis Vuitton", "Chanel", "Prada", "Versace", "Balenciaga", "Tesla", "SpaceX", "Spotify", "Uber", "Airbnb", "PayPal", "Adobe", "Intel", "NVIDIA", "Sony", "LG", "Huawei", "Xiaomi", "Biedronka"], "medium"),
      ...w(["Hermès", "Cartier", "Tiffany", "Bvlgari", "Maserati", "Bugatti", "Aston Martin", "Bentley", "Rolls-Royce", "Patek Philippe", "Audemars Piguet", "Breitling", "Tag Heuer", "Montblanc", "Swarovski", "Bang & Olufsen", "Dyson", "Bose", "Marshall", "Technics", "Leica", "Hasselblad", "Żywiec", "Wedel"], "hard"),
    ],
  },
  plants: {
    label: "Rośliny",
    emoji: "🌿",
    words: [
      ...w(["Róża", "Tulipan", "Słonecznik", "Stokrotka", "Dąb", "Sosna", "Brzoza", "Kaktus", "Palma", "Trawa", "Jabłoń", "Gruszka", "Wiśnia", "Pomidor", "Ziemniak", "Marchew", "Cebula", "Kukurydza", "Pszenica", "Bawełna", "Bambus", "Koniczyna", "Mak", "Lawenda"], "easy"),
      ...w(["Orchidea", "Lilia", "Piwonia", "Hortensja", "Azalia", "Magnolia", "Jaśmin", "Wisteria", "Bonsai", "Aloes", "Eukaliptus", "Cedr", "Cyprys", "Sekwoja", "Baobab", "Oliwka", "Figa", "Granat", "Awokado", "Mango", "Cynamon", "Wanilia", "Imbir", "Szafran"], "medium"),
      ...w(["Rafflesia", "Welwitschia", "Dionaea", "Nepentes", "Wolffia", "Ginkgo", "Araukaria", "Metasekwoja", "Miłorząb", "Modrzew", "Jałowiec", "Cis", "Kruszyna", "Barwinek", "Naparstnica", "Dziewanna", "Lubczyk", "Arcydzięgiel", "Kozłek", "Szałwia", "Echinacea", "Żeńszeń", "Guarana", "Yerba Mate"], "hard"),
    ],
  },
  inventions: {
    label: "Wynalazki",
    emoji: "💡",
    words: [
      ...w(["Koło", "Żarówka", "Telefon", "Telewizor", "Radio", "Samochód", "Samolot", "Rower", "Komputer", "Internet", "Drukarka", "Lodówka", "Pralka", "Mikrofalówka", "Odkurzacz", "Zegarek", "Kompas", "Papier", "Szkło", "Lustro", "Parasolka", "Zamek błyskawiczny", "Długopis", "Nożyczki"], "easy"),
      ...w(["Silnik parowy", "Dynamit", "Telegraf", "Maszyna do pisania", "Aparat fotograficzny", "Rentgen", "Penicylina", "Szczepionka", "Termometr", "Mikroskop", "Teleskop", "Stetoskop", "Bateria", "Dynamo", "Turbina", "Laser", "Radar", "Sonar", "Tranzystor", "Dioda LED", "Ogniwo słoneczne", "GPS", "Bluetooth", "WiFi"], "medium"),
      ...w(["Maszyna Turinga", "ENIAC", "Tranzystor polowy", "Superprzewodnik", "Hologram", "Grafen", "CRISPR", "Algorytm RSA", "Blockchain", "Kwantowy komputer", "Tokamak", "Cyklotron", "Spektroskop", "Interferometr", "Chromatograf", "Elektroforeza", "Tomograf", "Rezonans magnetyczny", "Akcelerator cząstek", "Detektor fal grawitacyjnych", "Sonda kosmiczna", "Teleskop Hubble'a", "Teleskop Webba", "Druk 3D"], "hard"),
    ],
  },
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getWordsForDifficulty(category: Category, difficulty: Difficulty | "all"): string[] {
  const data = CATEGORIES[category];
  if (difficulty === "all") return data.words.map(w => w.text);
  return data.words.filter(w => w.difficulty === difficulty).map(w => w.text);
}
