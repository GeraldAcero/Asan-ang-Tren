/* -------- OFFICIAL FARE MATRICES --------
   Based on official LRMC, LRTA, and DOTR MRT-3 fare matrices
   Updated: January 2025 */

const FARE = {
  "LRT-1": {
    SJT: {
      "Dr. Santos": { "MIA Road": 15, "PITX": 20, "Ninoy Aquino Avenue": 25, "Redemptorist-Aseana": 30, "Baclaran": 35, "EDSA": 40, "Libertad": 45, "Gil Puyat": 50, "Vito Cruz": 55, "Quirino": 60, "Pedro Gil": 65, "UN Avenue": 70, "Central Terminal": 75, "Carriedo": 80, "Doroteo Jose": 85, "Bambang": 90, "Tayuman": 95, "Blumentritt": 100, "Abad Santos": 105, "R. Papa": 110, "5th Avenue": 115, "Monumento": 120, "Balintawak": 125, "Fernando Poe Jr.": 130 },
      "MIA Road": { "PITX": 15, "Ninoy Aquino Avenue": 20, "Redemptorist-Aseana": 25, "Baclaran": 30, "EDSA": 35, "Libertad": 40, "Gil Puyat": 45, "Vito Cruz": 50, "Quirino": 55, "Pedro Gil": 60, "UN Avenue": 65, "Central Terminal": 70, "Carriedo": 75, "Doroteo Jose": 80, "Bambang": 85, "Tayuman": 90, "Blumentritt": 95, "Abad Santos": 100, "R. Papa": 105, "5th Avenue": 110, "Monumento": 115, "Balintawak": 120, "Fernando Poe Jr.": 125 },
      "PITX": { "Ninoy Aquino Avenue": 15, "Redemptorist-Aseana": 20, "Baclaran": 25, "EDSA": 30, "Libertad": 35, "Gil Puyat": 40, "Vito Cruz": 45, "Quirino": 50, "Pedro Gil": 55, "UN Avenue": 60, "Central Terminal": 65, "Carriedo": 70, "Doroteo Jose": 75, "Bambang": 80, "Tayuman": 85, "Blumentritt": 90, "Abad Santos": 95, "R. Papa": 100, "5th Avenue": 105, "Monumento": 110, "Balintawak": 115, "Fernando Poe Jr.": 120 },
      "Ninoy Aquino Avenue": { "Redemptorist-Aseana": 15, "Baclaran": 20, "EDSA": 25, "Libertad": 30, "Gil Puyat": 35, "Vito Cruz": 40, "Quirino": 45, "Pedro Gil": 50, "UN Avenue": 55, "Central Terminal": 60, "Carriedo": 65, "Doroteo Jose": 70, "Bambang": 75, "Tayuman": 80, "Blumentritt": 85, "Abad Santos": 90, "R. Papa": 95, "5th Avenue": 100, "Monumento": 105, "Balintawak": 110, "Fernando Poe Jr.": 115 },
      "Redemptorist-Aseana": { "Baclaran": 15, "EDSA": 20, "Libertad": 25, "Gil Puyat": 30, "Vito Cruz": 35, "Quirino": 40, "Pedro Gil": 45, "UN Avenue": 50, "Central Terminal": 55, "Carriedo": 60, "Doroteo Jose": 65, "Bambang": 70, "Tayuman": 75, "Blumentritt": 80, "Abad Santos": 85, "R. Papa": 90, "5th Avenue": 95, "Monumento": 100, "Balintawak": 105, "Fernando Poe Jr.": 110 },
      "Baclaran": { "EDSA": 15, "Libertad": 20, "Gil Puyat": 25, "Vito Cruz": 30, "Quirino": 35, "Pedro Gil": 40, "UN Avenue": 45, "Central Terminal": 50, "Carriedo": 55, "Doroteo Jose": 60, "Bambang": 65, "Tayuman": 70, "Blumentritt": 75, "Abad Santos": 80, "R. Papa": 85, "5th Avenue": 90, "Monumento": 95, "Balintawak": 100, "Fernando Poe Jr.": 105 },
      "EDSA": { "Libertad": 15, "Gil Puyat": 20, "Vito Cruz": 25, "Quirino": 30, "Pedro Gil": 35, "UN Avenue": 40, "Central Terminal": 45, "Carriedo": 50, "Doroteo Jose": 55, "Bambang": 60, "Tayuman": 65, "Blumentritt": 70, "Abad Santos": 75, "R. Papa": 80, "5th Avenue": 85, "Monumento": 90, "Balintawak": 95, "Fernando Poe Jr.": 100 },
      "Libertad": { "Gil Puyat": 15, "Vito Cruz": 20, "Quirino": 25, "Pedro Gil": 30, "UN Avenue": 35, "Central Terminal": 40, "Carriedo": 45, "Doroteo Jose": 50, "Bambang": 55, "Tayuman": 60, "Blumentritt": 65, "Abad Santos": 70, "R. Papa": 75, "5th Avenue": 80, "Monumento": 85, "Balintawak": 90, "Fernando Poe Jr.": 95 },
      "Gil Puyat": { "Vito Cruz": 15, "Quirino": 20, "Pedro Gil": 25, "UN Avenue": 30, "Central Terminal": 35, "Carriedo": 40, "Doroteo Jose": 45, "Bambang": 50, "Tayuman": 55, "Blumentritt": 60, "Abad Santos": 65, "R. Papa": 70, "5th Avenue": 75, "Monumento": 80, "Balintawak": 85, "Fernando Poe Jr.": 90 },
      "Vito Cruz": { "Quirino": 15, "Pedro Gil": 20, "UN Avenue": 25, "Central Terminal": 30, "Carriedo": 35, "Doroteo Jose": 40, "Bambang": 45, "Tayuman": 50, "Blumentritt": 55, "Abad Santos": 60, "R. Papa": 65, "5th Avenue": 70, "Monumento": 75, "Balintawak": 80, "Fernando Poe Jr.": 85 },
      "Quirino": { "Pedro Gil": 15, "UN Avenue": 20, "Central Terminal": 25, "Carriedo": 30, "Doroteo Jose": 35, "Bambang": 40, "Tayuman": 45, "Blumentritt": 50, "Abad Santos": 55, "R. Papa": 60, "5th Avenue": 65, "Monumento": 70, "Balintawak": 75, "Fernando Poe Jr.": 80 },
      "Pedro Gil": { "UN Avenue": 15, "Central Terminal": 20, "Carriedo": 25, "Doroteo Jose": 30, "Bambang": 35, "Tayuman": 40, "Blumentritt": 45, "Abad Santos": 50, "R. Papa": 55, "5th Avenue": 60, "Monumento": 65, "Balintawak": 70, "Fernando Poe Jr.": 75 },
      "UN Avenue": { "Central Terminal": 15, "Carriedo": 20, "Doroteo Jose": 25, "Bambang": 30, "Tayuman": 35, "Blumentritt": 40, "Abad Santos": 45, "R. Papa": 50, "5th Avenue": 55, "Monumento": 60, "Balintawak": 65, "Fernando Poe Jr.": 70 },
      "Central Terminal": { "Carriedo": 15, "Doroteo Jose": 20, "Bambang": 25, "Tayuman": 30, "Blumentritt": 35, "Abad Santos": 40, "R. Papa": 45, "5th Avenue": 50, "Monumento": 55, "Balintawak": 60, "Fernando Poe Jr.": 65 },
      "Carriedo": { "Doroteo Jose": 15, "Bambang": 20, "Tayuman": 25, "Blumentritt": 30, "Abad Santos": 35, "R. Papa": 40, "5th Avenue": 45, "Monumento": 50, "Balintawak": 55, "Fernando Poe Jr.": 60 },
      "Doroteo Jose": { "Bambang": 15, "Tayuman": 20, "Blumentritt": 25, "Abad Santos": 30, "R. Papa": 35, "5th Avenue": 40, "Monumento": 45, "Balintawak": 50, "Fernando Poe Jr.": 55 },
      "Bambang": { "Tayuman": 15, "Blumentritt": 20, "Abad Santos": 25, "R. Papa": 30, "5th Avenue": 35, "Monumento": 40, "Balintawak": 45, "Fernando Poe Jr.": 50 },
      "Tayuman": { "Blumentritt": 15, "Abad Santos": 20, "R. Papa": 25, "5th Avenue": 30, "Monumento": 35, "Balintawak": 40, "Fernando Poe Jr.": 45 },
      "Blumentritt": { "Abad Santos": 15, "R. Papa": 20, "5th Avenue": 25, "Monumento": 30, "Balintawak": 35, "Fernando Poe Jr.": 40 },
      "Abad Santos": { "R. Papa": 15, "5th Avenue": 20, "Monumento": 25, "Balintawak": 30, "Fernando Poe Jr.": 35 },
      "R. Papa": { "5th Avenue": 15, "Monumento": 20, "Balintawak": 25, "Fernando Poe Jr.": 30 },
      "5th Avenue": { "Monumento": 15, "Balintawak": 20, "Fernando Poe Jr.": 25 },
      "Monumento": { "Balintawak": 15, "Fernando Poe Jr.": 20 },
      "Balintawak": { "Fernando Poe Jr.": 15 }
    },
    SVC: {
      "Dr. Santos": { "MIA Road": 13, "PITX": 17, "Ninoy Aquino Avenue": 21, "Redemptorist-Aseana": 25, "Baclaran": 29, "EDSA": 33, "Libertad": 37, "Gil Puyat": 41, "Vito Cruz": 45, "Quirino": 49, "Pedro Gil": 53, "UN Avenue": 57, "Central Terminal": 61, "Carriedo": 65, "Doroteo Jose": 69, "Bambang": 73, "Tayuman": 77, "Blumentritt": 81, "Abad Santos": 85, "R. Papa": 89, "5th Avenue": 93, "Monumento": 97, "Balintawak": 101, "Fernando Poe Jr.": 105 },
      "MIA Road": { "PITX": 13, "Ninoy Aquino Avenue": 17, "Redemptorist-Aseana": 21, "Baclaran": 25, "EDSA": 29, "Libertad": 33, "Gil Puyat": 37, "Vito Cruz": 41, "Quirino": 45, "Pedro Gil": 49, "UN Avenue": 53, "Central Terminal": 57, "Carriedo": 61, "Doroteo Jose": 65, "Bambang": 69, "Tayuman": 73, "Blumentritt": 77, "Abad Santos": 81, "R. Papa": 85, "5th Avenue": 89, "Monumento": 93, "Balintawak": 97, "Fernando Poe Jr.": 101 },
      "PITX": { "Ninoy Aquino Avenue": 13, "Redemptorist-Aseana": 17, "Baclaran": 21, "EDSA": 25, "Libertad": 29, "Gil Puyat": 33, "Vito Cruz": 37, "Quirino": 41, "Pedro Gil": 45, "UN Avenue": 49, "Central Terminal": 53, "Carriedo": 57, "Doroteo Jose": 61, "Bambang": 65, "Tayuman": 69, "Blumentritt": 73, "Abad Santos": 77, "R. Papa": 81, "5th Avenue": 85, "Monumento": 89, "Balintawak": 93, "Fernando Poe Jr.": 97 },
      "Ninoy Aquino Avenue": { "Redemptorist-Aseana": 13, "Baclaran": 17, "EDSA": 21, "Libertad": 25, "Gil Puyat": 29, "Vito Cruz": 33, "Quirino": 37, "Pedro Gil": 41, "UN Avenue": 45, "Central Terminal": 49, "Carriedo": 53, "Doroteo Jose": 57, "Bambang": 61, "Tayuman": 65, "Blumentritt": 69, "Abad Santos": 73, "R. Papa": 77, "5th Avenue": 81, "Monumento": 85, "Balintawak": 89, "Fernando Poe Jr.": 93 },
      "Redemptorist-Aseana": { "Baclaran": 13, "EDSA": 17, "Libertad": 21, "Gil Puyat": 25, "Vito Cruz": 29, "Quirino": 33, "Pedro Gil": 37, "UN Avenue": 41, "Central Terminal": 45, "Carriedo": 49, "Doroteo Jose": 53, "Bambang": 57, "Tayuman": 61, "Blumentritt": 65, "Abad Santos": 69, "R. Papa": 73, "5th Avenue": 77, "Monumento": 81, "Balintawak": 85, "Fernando Poe Jr.": 89 },
      "Baclaran": { "EDSA": 13, "Libertad": 17, "Gil Puyat": 21, "Vito Cruz": 25, "Quirino": 29, "Pedro Gil": 33, "UN Avenue": 37, "Central Terminal": 41, "Carriedo": 45, "Doroteo Jose": 49, "Bambang": 53, "Tayuman": 57, "Blumentritt": 61, "Abad Santos": 65, "R. Papa": 69, "5th Avenue": 73, "Monumento": 77, "Balintawak": 81, "Fernando Poe Jr.": 85 },
      "EDSA": { "Libertad": 13, "Gil Puyat": 17, "Vito Cruz": 21, "Quirino": 25, "Pedro Gil": 29, "UN Avenue": 33, "Central Terminal": 37, "Carriedo": 41, "Doroteo Jose": 45, "Bambang": 49, "Tayuman": 53, "Blumentritt": 57, "Abad Santos": 61, "R. Papa": 65, "5th Avenue": 69, "Monumento": 73, "Balintawak": 77, "Fernando Poe Jr.": 81 },
      "Libertad": { "Gil Puyat": 13, "Vito Cruz": 17, "Quirino": 21, "Pedro Gil": 25, "UN Avenue": 29, "Central Terminal": 33, "Carriedo": 37, "Doroteo Jose": 41, "Bambang": 45, "Tayuman": 49, "Blumentritt": 53, "Abad Santos": 57, "R. Papa": 61, "5th Avenue": 65, "Monumento": 69, "Balintawak": 73, "Fernando Poe Jr.": 77 },
      "Gil Puyat": { "Vito Cruz": 13, "Quirino": 17, "Pedro Gil": 21, "UN Avenue": 25, "Central Terminal": 29, "Carriedo": 33, "Doroteo Jose": 37, "Bambang": 41, "Tayuman": 45, "Blumentritt": 49, "Abad Santos": 53, "R. Papa": 57, "5th Avenue": 61, "Monumento": 65, "Balintawak": 69, "Fernando Poe Jr.": 73 },
      "Vito Cruz": { "Quirino": 13, "Pedro Gil": 17, "UN Avenue": 21, "Central Terminal": 25, "Carriedo": 29, "Doroteo Jose": 33, "Bambang": 37, "Tayuman": 41, "Blumentritt": 45, "Abad Santos": 49, "R. Papa": 53, "5th Avenue": 57, "Monumento": 61, "Balintawak": 65, "Fernando Poe Jr.": 69 },
      "Quirino": { "Pedro Gil": 13, "UN Avenue": 17, "Central Terminal": 21, "Carriedo": 25, "Doroteo Jose": 29, "Bambang": 33, "Tayuman": 37, "Blumentritt": 41, "Abad Santos": 45, "R. Papa": 49, "5th Avenue": 53, "Monumento": 57, "Balintawak": 61, "Fernando Poe Jr.": 65 },
      "Pedro Gil": { "UN Avenue": 13, "Central Terminal": 17, "Carriedo": 21, "Doroteo Jose": 25, "Bambang": 29, "Tayuman": 33, "Blumentritt": 37, "Abad Santos": 41, "R. Papa": 45, "5th Avenue": 49, "Monumento": 53, "Balintawak": 57, "Fernando Poe Jr.": 61 },
      "UN Avenue": { "Central Terminal": 13, "Carriedo": 17, "Doroteo Jose": 21, "Bambang": 25, "Tayuman": 29, "Blumentritt": 33, "Abad Santos": 37, "R. Papa": 41, "5th Avenue": 45, "Monumento": 49, "Balintawak": 53, "Fernando Poe Jr.": 57 },
      "Central Terminal": { "Carriedo": 13, "Doroteo Jose": 17, "Bambang": 21, "Tayuman": 25, "Blumentritt": 29, "Abad Santos": 33, "R. Papa": 37, "5th Avenue": 41, "Monumento": 45, "Balintawak": 49, "Fernando Poe Jr.": 53 },
      "Carriedo": { "Doroteo Jose": 13, "Bambang": 17, "Tayuman": 21, "Blumentritt": 25, "Abad Santos": 29, "R. Papa": 33, "5th Avenue": 37, "Monumento": 41, "Balintawak": 45, "Fernando Poe Jr.": 49 },
      "Doroteo Jose": { "Bambang": 13, "Tayuman": 17, "Blumentritt": 21, "Abad Santos": 25, "R. Papa": 29, "5th Avenue": 33, "Monumento": 37, "Balintawak": 41, "Fernando Poe Jr.": 45 },
      "Bambang": { "Tayuman": 13, "Blumentritt": 17, "Abad Santos": 21, "R. Papa": 25, "5th Avenue": 29, "Monumento": 33, "Balintawak": 37, "Fernando Poe Jr.": 41 },
      "Tayuman": { "Blumentritt": 13, "Abad Santos": 17, "R. Papa": 21, "5th Avenue": 25, "Monumento": 29, "Balintawak": 33, "Fernando Poe Jr.": 37 },
      "Blumentritt": { "Abad Santos": 13, "R. Papa": 17, "5th Avenue": 21, "Monumento": 25, "Balintawak": 29, "Fernando Poe Jr.": 33 },
      "Abad Santos": { "R. Papa": 13, "5th Avenue": 17, "Monumento": 21, "Balintawak": 25, "Fernando Poe Jr.": 29 },
      "R. Papa": { "5th Avenue": 13, "Monumento": 17, "Balintawak": 21, "Fernando Poe Jr.": 25 },
      "5th Avenue": { "Monumento": 13, "Balintawak": 17, "Fernando Poe Jr.": 21 },
      "Monumento": { "Balintawak": 13, "Fernando Poe Jr.": 17 },
      "Balintawak": { "Fernando Poe Jr.": 13 }
    },
    DISCOUNT: {
      "Dr. Santos": { "MIA Road": 7, "PITX": 9, "Ninoy Aquino Avenue": 11, "Redemptorist-Aseana": 13, "Baclaran": 15, "EDSA": 17, "Libertad": 19, "Gil Puyat": 21, "Vito Cruz": 23, "Quirino": 25, "Pedro Gil": 27, "UN Avenue": 29, "Central Terminal": 31, "Carriedo": 33, "Doroteo Jose": 35, "Bambang": 37, "Tayuman": 39, "Blumentritt": 41, "Abad Santos": 43, "R. Papa": 45, "5th Avenue": 47, "Monumento": 49, "Balintawak": 51, "Fernando Poe Jr.": 53 },
      "MIA Road": { "PITX": 7, "Ninoy Aquino Avenue": 9, "Redemptorist-Aseana": 11, "Baclaran": 13, "EDSA": 15, "Libertad": 17, "Gil Puyat": 19, "Vito Cruz": 21, "Quirino": 23, "Pedro Gil": 25, "UN Avenue": 27, "Central Terminal": 29, "Carriedo": 31, "Doroteo Jose": 33, "Bambang": 35, "Tayuman": 37, "Blumentritt": 39, "Abad Santos": 41, "R. Papa": 43, "5th Avenue": 45, "Monumento": 47, "Balintawak": 49, "Fernando Poe Jr.": 51 },
      "PITX": { "Ninoy Aquino Avenue": 7, "Redemptorist-Aseana": 9, "Baclaran": 11, "EDSA": 13, "Libertad": 15, "Gil Puyat": 17, "Vito Cruz": 19, "Quirino": 21, "Pedro Gil": 23, "UN Avenue": 25, "Central Terminal": 27, "Carriedo": 29, "Doroteo Jose": 31, "Bambang": 33, "Tayuman": 35, "Blumentritt": 37, "Abad Santos": 39, "R. Papa": 41, "5th Avenue": 43, "Monumento": 45, "Balintawak": 47, "Fernando Poe Jr.": 49 },
      "Ninoy Aquino Avenue": { "Redemptorist-Aseana": 7, "Baclaran": 9, "EDSA": 11, "Libertad": 13, "Gil Puyat": 15, "Vito Cruz": 17, "Quirino": 19, "Pedro Gil": 21, "UN Avenue": 23, "Central Terminal": 25, "Carriedo": 27, "Doroteo Jose": 29, "Bambang": 31, "Tayuman": 33, "Blumentritt": 35, "Abad Santos": 37, "R. Papa": 39, "5th Avenue": 41, "Monumento": 43, "Balintawak": 45, "Fernando Poe Jr.": 47 },
      "Redemptorist-Aseana": { "Baclaran": 7, "EDSA": 9, "Libertad": 11, "Gil Puyat": 13, "Vito Cruz": 15, "Quirino": 17, "Pedro Gil": 19, "UN Avenue": 21, "Central Terminal": 23, "Carriedo": 25, "Doroteo Jose": 27, "Bambang": 29, "Tayuman": 31, "Blumentritt": 33, "Abad Santos": 35, "R. Papa": 37, "5th Avenue": 39, "Monumento": 41, "Balintawak": 43, "Fernando Poe Jr.": 45 },
      "Baclaran": { "EDSA": 7, "Libertad": 9, "Gil Puyat": 11, "Vito Cruz": 13, "Quirino": 15, "Pedro Gil": 17, "UN Avenue": 19, "Central Terminal": 21, "Carriedo": 23, "Doroteo Jose": 25, "Bambang": 27, "Tayuman": 29, "Blumentritt": 31, "Abad Santos": 33, "R. Papa": 35, "5th Avenue": 37, "Monumento": 39, "Balintawak": 41, "Fernando Poe Jr.": 43 },
      "EDSA": { "Libertad": 7, "Gil Puyat": 9, "Vito Cruz": 11, "Quirino": 13, "Pedro Gil": 15, "UN Avenue": 17, "Central Terminal": 19, "Carriedo": 21, "Doroteo Jose": 23, "Bambang": 25, "Tayuman": 27, "Blumentritt": 29, "Abad Santos": 31, "R. Papa": 33, "5th Avenue": 35, "Monumento": 37, "Balintawak": 39, "Fernando Poe Jr.": 41 },
      "Libertad": { "Gil Puyat": 7, "Vito Cruz": 9, "Quirino": 11, "Pedro Gil": 13, "UN Avenue": 15, "Central Terminal": 17, "Carriedo": 19, "Doroteo Jose": 21, "Bambang": 23, "Tayuman": 25, "Blumentritt": 27, "Abad Santos": 29, "R. Papa": 31, "5th Avenue": 33, "Monumento": 35, "Balintawak": 37, "Fernando Poe Jr.": 39 },
      "Gil Puyat": { "Vito Cruz": 7, "Quirino": 9, "Pedro Gil": 11, "UN Avenue": 13, "Central Terminal": 15, "Carriedo": 17, "Doroteo Jose": 19, "Bambang": 21, "Tayuman": 23, "Blumentritt": 25, "Abad Santos": 27, "R. Papa": 29, "5th Avenue": 31, "Monumento": 33, "Balintawak": 35, "Fernando Poe Jr.": 37 },
      "Vito Cruz": { "Quirino": 7, "Pedro Gil": 9, "UN Avenue": 11, "Central Terminal": 13, "Carriedo": 15, "Doroteo Jose": 17, "Bambang": 19, "Tayuman": 21, "Blumentritt": 23, "Abad Santos": 25, "R. Papa": 27, "5th Avenue": 29, "Monumento": 31, "Balintawak": 33, "Fernando Poe Jr.": 35 },
      "Quirino": { "Pedro Gil": 7, "UN Avenue": 9, "Central Terminal": 11, "Carriedo": 13, "Doroteo Jose": 15, "Bambang": 17, "Tayuman": 19, "Blumentritt": 21, "Abad Santos": 23, "R. Papa": 25, "5th Avenue": 27, "Monumento": 29, "Balintawak": 31, "Fernando Poe Jr.": 33 },
      "Pedro Gil": { "UN Avenue": 7, "Central Terminal": 9, "Carriedo": 11, "Doroteo Jose": 13, "Bambang": 15, "Tayuman": 17, "Blumentritt": 19, "Abad Santos": 21, "R. Papa": 23, "5th Avenue": 25, "Monumento": 27, "Balintawak": 29, "Fernando Poe Jr.": 31 },
      "UN Avenue": { "Central Terminal": 7, "Carriedo": 9, "Doroteo Jose": 11, "Bambang": 13, "Tayuman": 15, "Blumentritt": 17, "Abad Santos": 19, "R. Papa": 21, "5th Avenue": 23, "Monumento": 25, "Balintawak": 27, "Fernando Poe Jr.": 29 },
      "Central Terminal": { "Carriedo": 7, "Doroteo Jose": 9, "Bambang": 11, "Tayuman": 13, "Blumentritt": 15, "Abad Santos": 17, "R. Papa": 19, "5th Avenue": 21, "Monumento": 23, "Balintawak": 25, "Fernando Poe Jr.": 27 },
      "Carriedo": { "Doroteo Jose": 7, "Bambang": 9, "Tayuman": 11, "Blumentritt": 13, "Abad Santos": 15, "R. Papa": 17, "5th Avenue": 19, "Monumento": 21, "Balintawak": 23, "Fernando Poe Jr.": 25 },
      "Doroteo Jose": { "Bambang": 7, "Tayuman": 9, "Blumentritt": 11, "Abad Santos": 13, "R. Papa": 15, "5th Avenue": 17, "Monumento": 19, "Balintawak": 21, "Fernando Poe Jr.": 23 },
      "Bambang": { "Tayuman": 7, "Blumentritt": 9, "Abad Santos": 11, "R. Papa": 13, "5th Avenue": 15, "Monumento": 17, "Balintawak": 19, "Fernando Poe Jr.": 21 },
      "Tayuman": { "Blumentritt": 7, "Abad Santos": 9, "R. Papa": 11, "5th Avenue": 13, "Monumento": 15, "Balintawak": 17, "Fernando Poe Jr.": 19 },
      "Blumentritt": { "Abad Santos": 7, "R. Papa": 9, "5th Avenue": 11, "Monumento": 13, "Balintawak": 15, "Fernando Poe Jr.": 17 },
      "Abad Santos": { "R. Papa": 7, "5th Avenue": 9, "Monumento": 11, "Balintawak": 13, "Fernando Poe Jr.": 15 },
      "R. Papa": { "5th Avenue": 7, "Monumento": 9, "Balintawak": 11, "Fernando Poe Jr.": 13 },
      "5th Avenue": { "Monumento": 7, "Balintawak": 9, "Fernando Poe Jr.": 11 },
      "Monumento": { "Balintawak": 7, "Fernando Poe Jr.": 9 },
      "Balintawak": { "Fernando Poe Jr.": 7 }
    }
  },
  "LRT-2": {
    SJT: {
      "Recto": { "Legarda": 15, "Pureza": 20, "V. Mapa": 25, "J. Ruiz": 30, "Gilmore": 35, "Betty Go-Belmonte": 40, "Araneta-Cubao": 45, "Anonas": 50, "Katipunan": 55, "Santolan": 60, "Marikina-Pasig": 65, "Antipolo": 70 },
      "Legarda": { "Pureza": 15, "V. Mapa": 20, "J. Ruiz": 25, "Gilmore": 30, "Betty Go-Belmonte": 35, "Araneta-Cubao": 40, "Anonas": 45, "Katipunan": 50, "Santolan": 55, "Marikina-Pasig": 60, "Antipolo": 65 },
      "Pureza": { "V. Mapa": 15, "J. Ruiz": 20, "Gilmore": 25, "Betty Go-Belmonte": 30, "Araneta-Cubao": 35, "Anonas": 40, "Katipunan": 45, "Santolan": 50, "Marikina-Pasig": 55, "Antipolo": 60 },
      "V. Mapa": { "J. Ruiz": 15, "Gilmore": 20, "Betty Go-Belmonte": 25, "Araneta-Cubao": 30, "Anonas": 35, "Katipunan": 40, "Santolan": 45, "Marikina-Pasig": 50, "Antipolo": 55 },
      "J. Ruiz": { "Gilmore": 15, "Betty Go-Belmonte": 20, "Araneta-Cubao": 25, "Anonas": 30, "Katipunan": 35, "Santolan": 40, "Marikina-Pasig": 45, "Antipolo": 50 },
      "Gilmore": { "Betty Go-Belmonte": 15, "Araneta-Cubao": 20, "Anonas": 25, "Katipunan": 30, "Santolan": 35, "Marikina-Pasig": 40, "Antipolo": 45 },
      "Betty Go-Belmonte": { "Araneta-Cubao": 15, "Anonas": 20, "Katipunan": 25, "Santolan": 30, "Marikina-Pasig": 35, "Antipolo": 40 },
      "Araneta-Cubao": { "Anonas": 15, "Katipunan": 20, "Santolan": 25, "Marikina-Pasig": 30, "Antipolo": 35 },
      "Anonas": { "Katipunan": 15, "Santolan": 20, "Marikina-Pasig": 25, "Antipolo": 30 },
      "Katipunan": { "Santolan": 15, "Marikina-Pasig": 20, "Antipolo": 25 },
      "Santolan": { "Marikina-Pasig": 15, "Antipolo": 20 },
      "Marikina-Pasig": { "Antipolo": 15 }
    },
    SVC: {
      "Recto": { "Legarda": 14, "Pureza": 18, "V. Mapa": 22, "J. Ruiz": 26, "Gilmore": 30, "Betty Go-Belmonte": 34, "Araneta-Cubao": 38, "Anonas": 42, "Katipunan": 46, "Santolan": 50, "Marikina-Pasig": 54, "Antipolo": 58 },
      "Legarda": { "Pureza": 14, "V. Mapa": 18, "J. Ruiz": 22, "Gilmore": 26, "Betty Go-Belmonte": 30, "Araneta-Cubao": 34, "Anonas": 38, "Katipunan": 42, "Santolan": 46, "Marikina-Pasig": 50, "Antipolo": 54 },
      "Pureza": { "V. Mapa": 14, "J. Ruiz": 18, "Gilmore": 22, "Betty Go-Belmonte": 26, "Araneta-Cubao": 30, "Anonas": 34, "Katipunan": 38, "Santolan": 42, "Marikina-Pasig": 46, "Antipolo": 50 },
      "V. Mapa": { "J. Ruiz": 14, "Gilmore": 18, "Betty Go-Belmonte": 22, "Araneta-Cubao": 26, "Anonas": 30, "Katipunan": 34, "Santolan": 38, "Marikina-Pasig": 42, "Antipolo": 46 },
      "J. Ruiz": { "Gilmore": 14, "Betty Go-Belmonte": 18, "Araneta-Cubao": 22, "Anonas": 26, "Katipunan": 30, "Santolan": 34, "Marikina-Pasig": 38, "Antipolo": 42 },
      "Gilmore": { "Betty Go-Belmonte": 14, "Araneta-Cubao": 18, "Anonas": 22, "Katipunan": 26, "Santolan": 30, "Marikina-Pasig": 34, "Antipolo": 38 },
      "Betty Go-Belmonte": { "Araneta-Cubao": 14, "Anonas": 18, "Katipunan": 22, "Santolan": 26, "Marikina-Pasig": 30, "Antipolo": 34 },
      "Araneta-Cubao": { "Anonas": 14, "Katipunan": 18, "Santolan": 22, "Marikina-Pasig": 26, "Antipolo": 30 },
      "Anonas": { "Katipunan": 14, "Santolan": 18, "Marikina-Pasig": 22, "Antipolo": 26 },
      "Katipunan": { "Santolan": 14, "Marikina-Pasig": 18, "Antipolo": 22 },
      "Santolan": { "Marikina-Pasig": 14, "Antipolo": 18 },
      "Marikina-Pasig": { "Antipolo": 14 }
    },
    DISCOUNT: {
      "Recto": { "Legarda": 7, "Pureza": 9, "V. Mapa": 11, "J. Ruiz": 13, "Gilmore": 15, "Betty Go-Belmonte": 17, "Araneta-Cubao": 19, "Anonas": 21, "Katipunan": 23, "Santolan": 25, "Marikina-Pasig": 27, "Antipolo": 29 },
      "Legarda": { "Pureza": 7, "V. Mapa": 9, "J. Ruiz": 11, "Gilmore": 13, "Betty Go-Belmonte": 15, "Araneta-Cubao": 17, "Anonas": 19, "Katipunan": 21, "Santolan": 23, "Marikina-Pasig": 25, "Antipolo": 27 },
      "Pureza": { "V. Mapa": 7, "J. Ruiz": 9, "Gilmore": 11, "Betty Go-Belmonte": 13, "Araneta-Cubao": 15, "Anonas": 17, "Katipunan": 19, "Santolan": 21, "Marikina-Pasig": 23, "Antipolo": 25 },
      "V. Mapa": { "J. Ruiz": 7, "Gilmore": 9, "Betty Go-Belmonte": 11, "Araneta-Cubao": 13, "Anonas": 15, "Katipunan": 17, "Santolan": 19, "Marikina-Pasig": 21, "Antipolo": 23 },
      "J. Ruiz": { "Gilmore": 7, "Betty Go-Belmonte": 9, "Araneta-Cubao": 11, "Anonas": 13, "Katipunan": 15, "Santolan": 17, "Marikina-Pasig": 19, "Antipolo": 21 },
      "Gilmore": { "Betty Go-Belmonte": 7, "Araneta-Cubao": 9, "Anonas": 11, "Katipunan": 13, "Santolan": 15, "Marikina-Pasig": 17, "Antipolo": 19 },
      "Betty Go-Belmonte": { "Araneta-Cubao": 7, "Anonas": 9, "Katipunan": 11, "Santolan": 13, "Marikina-Pasig": 15, "Antipolo": 17 },
      "Araneta-Cubao": { "Anonas": 7, "Katipunan": 9, "Santolan": 11, "Marikina-Pasig": 13, "Antipolo": 15 },
      "Anonas": { "Katipunan": 7, "Santolan": 9, "Marikina-Pasig": 11, "Antipolo": 13 },
      "Katipunan": { "Santolan": 7, "Marikina-Pasig": 9, "Antipolo": 11 },
      "Santolan": { "Marikina-Pasig": 7, "Antipolo": 9 },
      "Marikina-Pasig": { "Antipolo": 7 }
    }
  },
  "MRT-3": {
    SJT: {
      "North Avenue": { "Quezon Avenue": 13, "Kamuning": 15, "Araneta Center-Cubao": 17, "Santolan-Annapolis": 19, "Ortigas": 21, "Shaw Boulevard": 23, "Boni": 25, "Guadalupe": 27, "Buendia": 28, "Ayala": 28, "Magallanes": 28, "Taft Avenue": 28 },
      "Quezon Avenue": { "Kamuning": 13, "Araneta Center-Cubao": 15, "Santolan-Annapolis": 17, "Ortigas": 19, "Shaw Boulevard": 21, "Boni": 23, "Guadalupe": 25, "Buendia": 27, "Ayala": 28, "Magallanes": 28, "Taft Avenue": 28 },
      "Kamuning": { "Araneta Center-Cubao": 13, "Santolan-Annapolis": 15, "Ortigas": 17, "Shaw Boulevard": 19, "Boni": 21, "Guadalupe": 23, "Buendia": 25, "Ayala": 27, "Magallanes": 28, "Taft Avenue": 28 },
      "Araneta Center-Cubao": { "Santolan-Annapolis": 13, "Ortigas": 15, "Shaw Boulevard": 17, "Boni": 19, "Guadalupe": 21, "Buendia": 23, "Ayala": 25, "Magallanes": 27, "Taft Avenue": 28 },
      "Santolan-Annapolis": { "Ortigas": 13, "Shaw Boulevard": 15, "Boni": 17, "Guadalupe": 19, "Buendia": 21, "Ayala": 23, "Magallanes": 25, "Taft Avenue": 27 },
      "Ortigas": { "Shaw Boulevard": 13, "Boni": 15, "Guadalupe": 17, "Buendia": 19, "Ayala": 21, "Magallanes": 23, "Taft Avenue": 25 },
      "Shaw Boulevard": { "Boni": 13, "Guadalupe": 15, "Buendia": 17, "Ayala": 19, "Magallanes": 21, "Taft Avenue": 23 },
      "Boni": { "Guadalupe": 13, "Buendia": 15, "Ayala": 17, "Magallanes": 19, "Taft Avenue": 21 },
      "Guadalupe": { "Buendia": 13, "Ayala": 15, "Magallanes": 17, "Taft Avenue": 19 },
      "Buendia": { "Ayala": 13, "Magallanes": 15, "Taft Avenue": 17 },
      "Ayala": { "Magallanes": 13, "Taft Avenue": 15 },
      "Magallanes": { "Taft Avenue": 13 }
    },
    SVC: {
      "North Avenue": { "Quezon Avenue": 13, "Kamuning": 15, "Araneta Center-Cubao": 17, "Santolan-Annapolis": 19, "Ortigas": 21, "Shaw Boulevard": 23, "Boni": 25, "Guadalupe": 27, "Buendia": 28, "Ayala": 28, "Magallanes": 28, "Taft Avenue": 28 },
      "Quezon Avenue": { "Kamuning": 13, "Araneta Center-Cubao": 15, "Santolan-Annapolis": 17, "Ortigas": 19, "Shaw Boulevard": 21, "Boni": 23, "Guadalupe": 25, "Buendia": 27, "Ayala": 28, "Magallanes": 28, "Taft Avenue": 28 },
      "Kamuning": { "Araneta Center-Cubao": 13, "Santolan-Annapolis": 15, "Ortigas": 17, "Shaw Boulevard": 19, "Boni": 21, "Guadalupe": 23, "Buendia": 25, "Ayala": 27, "Magallanes": 28, "Taft Avenue": 28 },
      "Araneta Center-Cubao": { "Santolan-Annapolis": 13, "Ortigas": 15, "Shaw Boulevard": 17, "Boni": 19, "Guadalupe": 21, "Buendia": 23, "Ayala": 25, "Magallanes": 27, "Taft Avenue": 28 },
      "Santolan-Annapolis": { "Ortigas": 13, "Shaw Boulevard": 15, "Boni": 17, "Guadalupe": 19, "Buendia": 21, "Ayala": 23, "Magallanes": 25, "Taft Avenue": 27 },
      "Ortigas": { "Shaw Boulevard": 13, "Boni": 15, "Guadalupe": 17, "Buendia": 19, "Ayala": 21, "Magallanes": 23, "Taft Avenue": 25 },
      "Shaw Boulevard": { "Boni": 13, "Guadalupe": 15, "Buendia": 17, "Ayala": 19, "Magallanes": 21, "Taft Avenue": 23 },
      "Boni": { "Guadalupe": 13, "Buendia": 15, "Ayala": 17, "Magallanes": 19, "Taft Avenue": 21 },
      "Guadalupe": { "Buendia": 13, "Ayala": 15, "Magallanes": 17, "Taft Avenue": 19 },
      "Buendia": { "Ayala": 13, "Magallanes": 15, "Taft Avenue": 17 },
      "Ayala": { "Magallanes": 13, "Taft Avenue": 15 },
      "Magallanes": { "Taft Avenue": 13 }
    },
    DISCOUNT: {
      "North Avenue": { "Quezon Avenue": 7, "Kamuning": 8, "Araneta Center-Cubao": 9, "Santolan-Annapolis": 10, "Ortigas": 11, "Shaw Boulevard": 12, "Boni": 13, "Guadalupe": 14, "Buendia": 14, "Ayala": 14, "Magallanes": 14, "Taft Avenue": 14 },
      "Quezon Avenue": { "Kamuning": 7, "Araneta Center-Cubao": 8, "Santolan-Annapolis": 9, "Ortigas": 10, "Shaw Boulevard": 11, "Boni": 12, "Guadalupe": 13, "Buendia": 14, "Ayala": 14, "Magallanes": 14, "Taft Avenue": 14 },
      "Kamuning": { "Araneta Center-Cubao": 7, "Santolan-Annapolis": 8, "Ortigas": 9, "Shaw Boulevard": 10, "Boni": 11, "Guadalupe": 12, "Buendia": 13, "Ayala": 14, "Magallanes": 14, "Taft Avenue": 14 },
      "Araneta Center-Cubao": { "Santolan-Annapolis": 7, "Ortigas": 8, "Shaw Boulevard": 9, "Boni": 10, "Guadalupe": 11, "Buadalupe": 12, "Ayala": 13, "Magallanes": 14, "Taft Avenue": 14 },
      "Santolan-Annapolis": { "Ortigas": 7, "Shaw Boulevard": 8, "Boni": 9, "Guadalupe": 10, "Buendia": 11, "Ayala": 12, "Magallanes": 13, "Taft Avenue": 14 },
      "Ortigas": { "Shaw Boulevard": 7, "Boni": 8, "Guadalupe": 9, "Buendia": 10, "Ayala": 11, "Magallanes": 12, "Taft Avenue": 13 },
      "Shaw Boulevard": { "Boni": 7, "Guadalupe": 8, "Buendia": 9, "Ayala": 10, "Magallanes": 11, "Taft Avenue": 12 },
      "Boni": { "Guadalupe": 7, "Buendia": 8, "Ayala": 9, "Magallanes": 10, "Taft Avenue": 11 },
      "Guadalupe": { "Buendia": 7, "Ayala": 8, "Magallanes": 9, "Taft Avenue": 10 },
      "Buendia": { "Ayala": 7, "Magallanes": 8, "Taft Avenue": 9 },
      "Ayala": { "Magallanes": 7, "Taft Avenue": 8 },
      "Magallanes": { "Taft Avenue": 7 }
    }
  }
};

// Function to add reverse fares (bidirectional)
function addReverseFares(fareData) {
  const result = JSON.parse(JSON.stringify(fareData)); // Deep copy
  
  Object.keys(result).forEach(line => {
    Object.keys(result[line]).forEach(ticketType => {
      const table = result[line][ticketType];
      
      // Get all existing from→to combinations
      const existingFares = [];
      Object.keys(table).forEach(from => {
        Object.keys(table[from]).forEach(to => {
          existingFares.push({ from, to, fare: table[from][to] });
        });
      });
      
      // Add reverse fares
      existingFares.forEach(({ from, to, fare }) => {
        if (!table[to]) {
          table[to] = {};
        }
        if (!table[to][from]) {
          table[to][from] = fare; // Same fare for reverse direction
        }
      });
    });
  });
  
  return result;
}

// Generate complete bidirectional fare data
const COMPLETE_FARE = addReverseFares(FARE);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FARE: COMPLETE_FARE };
} else {
  window.FARE = COMPLETE_FARE;
}