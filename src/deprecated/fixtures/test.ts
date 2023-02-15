import { DefineApiSpec, ExpressHandler } from "../types/DefineApiSpec";

type Series = {
  id: number,
  thumbnail: Thumbnail
};

type Thumbnail = {
  xlarge: string
};

type GetSeriesSpecDescription = 'Retrieve a series';
export type GetSeriesSpec = DefineApiSpec<{
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
  query: {
    debug?: boolean;
  };
  auth: "JWT";
  response: Series;
}>;

export const getSeries: ExpressHandler<GetSeriesSpec> = async (req, res) => {
  // req and res are fully typed
  const { id } = req.params;
  res.json({
    id,
    thumbnail: {
      xlarge: "https://example.com/series/1255/thumbnail.jpg",
    },
  });
}
