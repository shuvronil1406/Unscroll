// Static movie detail enrichment (director, genres, year, overview)
// In production, replace with TMDB API calls using REACT_APP_TMDB_KEY

interface MovieDetail {
  overview: string;
  director: string;
  genres: string[];
  year: string;
  posterColor: string;
}

const MOVIE_DETAILS: Record<number, MovieDetail> = {
  19995: { overview: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.", director: "James Cameron", genres: ["Action","Adventure","Science Fiction"], year: "2009", posterColor: "#1a4a2e" },
  299536: { overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos.", director: "Anthony & Joe Russo", genres: ["Action","Adventure","Science Fiction"], year: "2018", posterColor: "#2e1a1a" },
  140607: { overview: "Three decades after the Empire's defeat, a new threat arises in the militant First Order. Defected stormtrooper Finn and the scavenger Rey are caught up in the Resistance's search for the missing Luke Skywalker.", director: "J.J. Abrams", genres: ["Action","Adventure","Science Fiction"], year: "2015", posterColor: "#1a2a3e" },
  157336: { overview: "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.", director: "Christopher Nolan", genres: ["Adventure","Drama","Science Fiction"], year: "2014", posterColor: "#0d1a2e" },
  27205:  { overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible.", director: "Christopher Nolan", genres: ["Action","Thriller","Science Fiction"], year: "2010", posterColor: "#1a1a0d" },
  603:    { overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.", director: "The Wachowskis", genres: ["Action","Science Fiction"], year: "1999", posterColor: "#0d2e0d" },
  24428:  { overview: "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster.", director: "Joss Whedon", genres: ["Action","Adventure","Science Fiction"], year: "2012", posterColor: "#2e1a0d" },
  98:     { overview: "In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into chaos. Maximus is one of the Roman army's most capable and trusted generals and a key advisor to the emperor.", director: "Ridley Scott", genres: ["Action","Drama","Adventure"], year: "2000", posterColor: "#2e2000" },
  181808: { overview: "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.", director: "Rian Johnson", genres: ["Action","Adventure","Science Fiction"], year: "2017", posterColor: "#1a0d2e" },
  9806:   { overview: "Bob Parr has given up his superhero days to log in time as an insurance adjuster and raise his three children with his formerly superhero wife in suburbia. But when he receives a mysterious assignment, it's time to get back into costume.", director: "Brad Bird", genres: ["Action","Adventure","Animation"], year: "2004", posterColor: "#2e0d0d" },
  278:    { overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank State Penitentiary.", director: "Frank Darabont", genres: ["Drama","Crime"], year: "1994", posterColor: "#2a1a00" },
  238:    { overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life.", director: "Francis Ford Coppola", genres: ["Drama","Crime"], year: "1972", posterColor: "#1a0000" },
  155:    { overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.", director: "Christopher Nolan", genres: ["Drama","Action","Crime","Thriller"], year: "2008", posterColor: "#0d0d0d" },
  550:    { overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.", director: "David Fincher", genres: ["Drama","Thriller","Mystery"], year: "1999", posterColor: "#1a0a00" },
  329865: { overview: "A linguist is recruited by the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.", director: "Denis Villeneuve", genres: ["Drama","Science Fiction","Mystery"], year: "2016", posterColor: "#000d1a" },
  335984: { overview: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.", director: "Denis Villeneuve", genres: ["Science Fiction","Drama"], year: "2017", posterColor: "#0d0d1a" },
};

const DEFAULT_DETAIL: MovieDetail = {
  overview: "An acclaimed film featuring outstanding performances and compelling storytelling that keeps audiences on the edge of their seats throughout.",
  director: "A visionary filmmaker",
  genres: ["Drama","Thriller"],
  year: "2020",
  posterColor: "#1a1a2e"
};

export const getMovieDetail = (movieId: number): MovieDetail => {
  return MOVIE_DETAILS[movieId] || DEFAULT_DETAIL;
};

export const POSTER_COLORS = [
  "#1a2e1a","#2e1a1a","#1a1a2e","#2e2e1a","#1a2e2e","#2e1a2e",
  "#0d1a2e","#2e0d0d","#0d2e0d","#2a1a00","#1a0d2e","#000d1a"
];