// const allLeaderboard = [
//   {
//     name: 'Santos',
//     totalPoints: 11,
//     totalGames: 1,
//     totalVictories: 3,
//     totalDraws: 2,
//     totalLosses: 0,
//     goalsFavor: 12,
//     goalsOwn: 6,
//     goalsBalance: 6,
//     efficiency: 73.33
//   },
//   {
//     name: 'Grêmio',
//     totalPoints: 10,
//     totalGames: 1,
//     totalVictories: 3,
//     totalDraws: 1,
//     totalLosses: 1,
//     goalsFavor: 9,
//     goalsOwn: 8,
//     goalsBalance: 1,
//     efficiency: 66.67
//   },
//   {
//     name: 'Internacional',
//     totalPoints: 10,
//     totalGames: 1,
//     totalVictories: 3,
//     totalDraws: 1,
//     totalLosses: 1,
//     goalsFavor: 7,
//     goalsOwn: 6,
//     goalsBalance: 1,
//     efficiency: 66.67
//   },
//   {
//     name: 'São Paulo',
//     totalPoints: 8,
//     totalGames: 1,
//     totalVictories: 2,
//     totalDraws: 2,
//     totalLosses: 1,
//     goalsFavor: 9,
//     goalsOwn: 6,
//     goalsBalance: 3,
//     efficiency: 53.33
//   },
// ]

// const homeLeaderboard = [
//   // São Paulo
//   {
//     name: 'São Paulo',
//     totalPoints: 0,
//     totalGames: 1,
//     totalVictories: 0,
//     totalDraws: 1,
//     totalLosses: 0,
//     goalsFavor: 1,
//     goalsOwn: 1,
//     goalsBalance: 0,
//     efficiency: 33.33
//   },
//   {
//     name: 'Internacional',
//     totalPoints: 4,
//     totalGames: 1,
//     totalVictories: 1,
//     totalDraws: 1,
//     totalLosses: 1,
//     goalsFavor: 4,
//     goalsOwn: 6,
//     goalsBalance: -2,
//     efficiency: 44.44
//   },
//   // internacional
// ]


// const awayLeaderboard = [
//   // Grêmio
//   {
//     name: 'Grêmio',
//     totalPoints: 4,
//     totalGames: 1,
//     totalVictories: 1,
//     totalDraws: 1,
//     totalLosses: 1,
//     goalsFavor: 5,
//     goalsOwn: 7,
//     goalsBalance: -2,
//     efficiency: 44.44
//   },
//   {
//     name: 'Santos',
//     totalPoints: 2,
//     totalGames: 1,
//     totalVictories: 0,
//     totalDraws: 2,
//     totalLosses: 0,
//     goalsFavor: 3,
//     goalsOwn: 3,
//     goalsBalance: 0,
//     efficiency: 33.33
//   }
//   // Santos
// ]

// export default {
//   allLeaderboard,
//   homeLeaderboard,
//   awayLeaderboard
// }

const leaderboard = [
  {
    name: "Palmeiras",
    totalPoints: 13,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: 86.67
  },
  {
    name: "Flamengo",
    totalPoints: 12,
    totalGames: 5,
    totalVictories: 3,
    totalDraws: 3,
    totalLosses: 0,
    goalsFavor: 15,
    goalsOwn: 3,
    goalsBalance: 12,
    efficiency: 80
  }
];

const matches = [
  {
    id: 1,
    homeTeamId: 4,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 3,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      'teamName': 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeamId: 2,
    homeTeamGoals: 1,
    awayTeamId: 3,
    awayTeamGoals: 2,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional'
    },
    awayTeam: {
      teamName: 'Santos'
    }
  }
]


export default {
  leaderboard,
  matches
}