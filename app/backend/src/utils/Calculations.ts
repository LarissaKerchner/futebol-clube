export function calculateEfficiency(totalPoints: number, totalGames: number): number {
  if (totalGames === 0) return 0;
  return parseFloat(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
}

export function calculateGoalBalance(goalsFavor: number, goalsOwn: number): number {
  return goalsFavor - goalsOwn;
}
