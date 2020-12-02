import { PoolConnection } from "mysql";

import { query } from "../db";

export const initializeRating = async (connection: PoolConnection) => {
  const { insertId } = await query(
    connection,
    'INSERT INTO rating_counter VALUES ()'
  )

  return insertId;
}

export const updateRating = async (connection: PoolConnection, ratingId: number, stars: number) => {
  if (stars === 1) {
    await query(
      connection,
      'UPDATE rating_counter SET one_star_count = one_star_count + 1 WHERE id = ?' 
      [ ratingId ]
    )
  }
  else if (stars === 2) {
    await query(
      connection,
      'UPDATE rating_counter SET two_star_count = two_star_count + 1 WHERE id = ?',
      [ ratingId ]
    )
  }
  else if (stars === 3) {
    await query(
      connection,
      'UPDATE rating_counter SET three_star_count = three_star_count + 1 WHERE id = ?',
      [ ratingId ]
    )
  }
  else if (stars === 4) {
    await query(
      connection,
      'UPDATE rating_counter SET four_star_count = four_star_count + 1 WHERE id = ?',
      [ ratingId ]
    )
  }
  else if (stars === 5) {
    await query(
      connection,
      'UPDATE rating_counter SET five_star_count = five_star_count + 1 WHERE id = ?',
      [ ratingId ]
    )
  }
}

export const findRatingById = async (connection: PoolConnection, ratingId: number) => {
  const [ result ] = await query(
    connection,
    `
      SELECT *
      FROM SolvedRatingCounters
      WHERE id = ?
    `,
    [
      ratingId
    ]
  )

  return result;
}