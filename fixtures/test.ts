import { DefineApiSpec } from "../src/types/DefineApiSpec";

type Series = {
  thumbnail: Thumbnail
};

type Thumbnail = {
  xlarge: string
};

type GetSeriesSpecDescription = 'Retrieve a series';
type GetSeriesSpecRaw = {
  url: `GET /manta/v1/series/{id}`;
  summary: "Retrieve a series";
  description: GetSeriesSpecDescription;
  tags: ["Series", "Front"];
  path: {
    /**
     * Series id
     * @example 1255
     */
    id: number;
  };
  auth: "JWT";
  response: Series;
};

export type GetSeriesSpec = DefineApiSpec<GetSeriesSpecRaw>;
