import { QueryDto } from 'src/shared/dto/query.dto';

export const getTake = (query: QueryDto) => {
  return query?.limit || 10;
};

export const getSkip = (query: QueryDto) => {
  return query?.page ? (query.page - 1) * getTake(query) : 0;
};
