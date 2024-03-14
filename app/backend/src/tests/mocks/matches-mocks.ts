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
    inProgress: true,
    homeTeam: {
      teamName: 'Internacional'
    },
    awayTeam: {
      teamName: 'Santos'
    }
  }
]

const updatedMatch = {
  homeTeamId: 9,
  homeTeamGoals: 1
};

const createdMatch = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

const createdWrongMatch = {
  homeTeamId: 16,
  awayTeamId: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

const createdDataWorng = {
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const retornCreateMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true
}

export default {
  matches,
  updatedMatch,
  createdMatch,
  createdWrongMatch,
  createdDataWorng,
  retornCreateMatch,
}