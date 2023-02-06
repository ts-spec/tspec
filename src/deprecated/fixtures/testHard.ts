import { DefineApiSpec, ExpressHandler } from "../types/DefineApiSpec";

type Nullable<T> = T | null;
type Optional<T> = T | undefined;

type ValueOf<T> = T[keyof T];

/* Model Types */
interface Entity {
  /** @example "2021-01-01T12:34:56.789Z" */
  createdAt: string,
  /** @example 1 */
  id: number,
  /** @example "2021-01-01T12:34:56.789Z" */
  updatedAt: string,
}

interface FavoriteGroupEntity extends Entity {
  data: Nullable<{}>, // NOTE(Jinwook): data is not used at FavoriteGroupEntity.
  key: string,
  userId: number,
}

interface FavoriteSeriesEntity extends Entity {
  data: Nullable<{
    episodeLog: {
      episodeId: number,
      scrollIndex: number,
      scrollPercentage: number,
      [key: string]: any,
    },
    [key: string]: any,
  }>,
  ord: Nullable<number>,
  favoriteGroupId: Nullable<number>,
  seriesId: Nullable<number>,
}

type FavoriteEntity = Pick<FavoriteGroupEntity, 'userId' | 'key'>
& Pick<FavoriteSeriesEntity, 'createdAt' | 'id' | 'ord' | 'seriesId'>;

const SERIES_RATING = {
  NOT_RATED: 0,
  DISLIKE: -1,
  LIKE: 1,
};

interface MySeriesData {
  favorite?: FavoriteEntity,
  notification?: FavoriteEntity,
  rating?: ValueOf<typeof SERIES_RATING>,
}

interface FreePass {
  isAvailable: boolean,
  remaining: number,
  renewCycle: number,
  rewardMax: number,
  rewardUsed: number,
}


interface ReleaseSchedule {
  color: string,
  text: string,
}

interface LinkedSeries {
  targetSeriesId: number,
  badgeText: 'COMIC' | 'NOVEL',
  eventType: 'to_comic' | 'to_novel',
  text: string,
  imageUrl: string,
}

type SeriesImageDietedData = Pick<SeriesImageThumbnail, 'id' | 'downloadUrl'> & {
  data: {
    blurhash?: string,
    height?: number,
    key: string,
    width?: number,
  },
};
type SeriesImageDieted = Partial<Record<SeriesImageKey, SeriesImageDietedData>>;

type Name = { en: string, ko?: string };

interface TagEntity extends Entity {
  data: Nullable<{}>, // NOTE(Jinwook): Data is not used at tag
  name: Nullable<Name>,
  type: Nullable<string>,
  state: Nullable<number>,
  cachedAt: Nullable<string>,
}


type SeriesTag = Pick<TagEntity, 'id' | 'name'>;


const SERIES_LOCK_TYPE = {
  SUBSCRIBER_ONLY: 0,
  WTF: 10, // NOTE(youngchul): DEPRECATED.
  FREE_PASS: 20,
};

interface SeriesDerived {
  /** Note(yeonjoon): Release Text and Color for Series Home */
  releaseSchedule1: ReleaseSchedule,
  /** Note(yeonjoon): DEPRECATED. Release Text and Color for Series Home for free user */
  releaseSchedule2?: ReleaseSchedule,
  /** Note(yeonjoon): Release Text and Color for Series Home to notate hiatus schedule */
  releaseSchedule3?: ReleaseSchedule,
  /** Note(yeonjoon): Release Text and Color for Search Result */
  releaseSchedule4: ReleaseSchedule,
  /** Note(yeonjoon): Text and Color Title for the bottom of Episode Viewer */
  nextSchedule1?: ReleaseSchedule,
  /** Note(yeonjoon): Text and Color for the bottom text of Episode Viewer */
  nextSchedule2?: ReleaseSchedule,
  /**
   * Note(yeonjoon): [Not Implemented] Season or series Open Date display at Coming Soon
   * Reference: https://www.notion.so/ridi/2022-01-26-Series-derived-d3380bb850944e0090608e0211c9f3e4
   * */
  comingSoonSchedule1?: {
    openAt: string,
  },
  /**
   * Note(yeonjoon): [Not Implemented] Season or Series Open Date display at Coming Soon
   * Reference: https://www.notion.so/ridi/2022-01-26-Series-derived-d3380bb850944e0090608e0211c9f3e4
   * */
  comingSoonSchedule2?: ReleaseSchedule,
  /** Note(yeonjoon): Override notice with series schedule notice */
  scheduleNotice?: string,
  lockType: ValueOf<typeof SERIES_LOCK_TYPE>,
  billboardSubText?: string,
  freePassPlan?: {
    renewCycle: number,
    rentalPeriod: number,
  },
  /** Note(yeonjoon): Series Home Banner from comic to novel or vice versa */
  linkedSeries1?: Pick<LinkedSeries, 'targetSeriesId' | 'eventType' | 'badgeText' | 'text'>,
  /** Note(yeonjoon): Episode Viewer and Series Detail Banner from comic to novel or vice versa */
  linkedSeries2?: Pick<LinkedSeries, 'targetSeriesId' | 'eventType' | 'text'>,
}

const SERIES_TYPE = {
  WEBTOON: 10,
  WEBNOVEL: 20,
};

interface SeriesCreator {
  name?: string,
  role?: string,
}

interface SeriesImageOriginal {
  createdAt: string,
  data: {
    encoding: string,
    fieldname: string,
    key: string,
    mimetype: string,
    originalname: string,
    size: number,
    type: string,
  },
  downloadUrl: string,
  id: number,
  updatedAt: string,
}

interface SeriesImageThumbnail {
  createdAt: Date | string,
  data: {
    blurhash: string,
    format: string,
    height: number,
    key: string,
    size: number,
    type: string,
    width: number,
  },
  downloadUrl: string,
  id: number,
  parentId: number,
}

type SeriesImageOriginalKey = '1440x1440' | '1280x1840' | '1280x1840-2' | '1280x1840b'
  | '1280x1840bt' | '1440x3072a';
type SeriesImageThumbnailKey = '1440x1440_720' | '1280x1840_720' | '1280x1840-2_720'
  | '1280x1840b_720' | '1280x1840bt_720' | '1440x3072a_720' | '1440x1440_480' | '1280x1840_480'
  | '1280x1840-2_480' | '1440x3072a_480';
type SeriesImageKey = SeriesImageOriginalKey | SeriesImageThumbnailKey;

type SeriesImage = Partial<
  Record<SeriesImageOriginalKey, SeriesImageOriginal>
  & Record<SeriesImageThumbnailKey, SeriesImageThumbnail>
>;

type EpisodeDecoImageOriginalKey = 'header' | 'footer' | 'footer2';
type EpisodeDecoImageResizedKey = 'header_720' | 'footer_720' | 'footer2_720';

type EpisodeDecoImage = Partial<
  Record<EpisodeDecoImageOriginalKey, SeriesImageOriginal>
  & Record<EpisodeDecoImageResizedKey, SeriesImageThumbnail>
>;

type EpisodeDeco = EpisodeDecoImage & {
  ords: Array<number>, // pair of begin & (optionally) end episode ord.
};

interface SeriesData {
  billboardBadge?: { text?: string, bgColor?: string, bgGradient?: string[] },
  billboardSubText?: string,
  billboardTitle?: string,
  categories?: string[], // ??
  contentId?: string, // ??
  contentWarning?: string,
  creators?: SeriesCreator[],
  description?: { long?: string, short?: string },
  freeEpisodeCount?: number,
  freePassBeginAt?: string,
  freePassEndAt?: string,
  freePassLockCount?: number,
  freePassRenewCycle?: number,
  freeUserNotice?: string,
  episodeDecos?: EpisodeDeco[],
  isCompleted?: boolean,
  isCreatedByManta?: boolean,
  isExclusive?: boolean,
  isHorizontalView?: boolean,
  isOriginal?: boolean,
  isRewardPassSeries?: boolean,
  isRTL?: boolean,
  latestEpisodeToLock?: number,
  linkedSeriesList?: { comic?: number[], novel?: number[] },
  localization?: SeriesCreator[], // Integrated into creators. This is for backwards compatibility.
  notice?: string,
  relatedSeriesList?: number[],
  releaseSchedule?: string,
  scheduleSubText?: string,
  seasonText?: string,
  subscriberNotice?: string,
  tags?: number[],
  title?: { en?: string },
  totalEpisodeCount?: number,
  videoList?: { url?: string }[],
  wtfBeginAt?: string, // NOTE(youngchul): DEPRECATED, keeping just for reference.
  wtfEndAt?: string, // NOTE(youngchul): DEPRECATED, keeping just for reference.
}

interface SeriesVariation {
  [key: string]: Optional<{
    mod?: [number, number],
    data?: SeriesData,
    note?: string,
    image?: SeriesImage,
    endTime?: string,
    startTime?: string,
  }>,
}

type RegionKey = 'us' | 'ph';

type BlockRegions = Partial<Record<RegionKey, { blockAt: string }>>;

type I18n = {
  blockRegions: BlockRegions,
};

interface SeriesEntity extends Entity {
  cachedAt: Nullable<string>,
  closeAt: Nullable<string>,
  data: Nullable<SeriesData>,
  i18n: Nullable<I18n>,
  image: Nullable<SeriesImage>,
  lang: Nullable<string>,
  locale: Nullable<string>,
  openAt: Nullable<string>,
  state: Nullable<number>,
  scoreData: Nullable<never>,
  type: Nullable<number>,
  variation: Nullable<SeriesVariation>,
  webtoonId: number | string,

  episodes?: EpisodeEntity[], // One-To-Many
}

interface RelatedSeries {
  data: Pick<SeriesData,
    'freePassBeginAt' | 'freePassEndAt' | 'isCompleted' | 'title'
  >,
  id: number,
  image: SeriesImageDieted,
  derived?: SeriesDerived,
}

const SERIES_SCHEDULE_TYPE = {
  FREE: 10,
  SUBSCRIPTION: 20,
} as const;

const SERIES_SCHEDULE_STATE = {
  ACTIVE: 100,
  INACTIVE: 500,
} as const;

interface SeriesScheduleData {
  closeOrd?: number,
  isOnHiatus: boolean,
  isSeason: boolean,
  isSeriesCompleted: boolean,
  openOrd: number,
  releaseScheduleText: string,
  scheduleNotice?: string,
  scheduleSubtext?: string,
}

interface SeriesScheduleEntity extends Entity {
  data: Nullable<SeriesScheduleData>,
  seriesId: number | string,
  state: Nullable<ValueOf<typeof SERIES_SCHEDULE_STATE>>,
  title: Nullable<string>,
  type: Nullable<ValueOf<typeof SERIES_SCHEDULE_TYPE>>,
}

interface SeriesSchedule extends SeriesScheduleEntity {
  openAt: Nullable<string>,
  closeAt: Nullable<string>,
}

type Series = Omit<SeriesEntity, 'data' | 'image'> & {
  data: Omit<SeriesData, 'relatedSeriesList' | 'tags'> & {
    relatedSeriesList?: RelatedSeries[],
    tags?: SeriesTag[],
  },
  derived?: SeriesDerived,
  image: SeriesImageDieted,
  seriesSchedules?: SeriesSchedule[],
  variationKey?: string,
};

interface EpisodeData {
  freeAt?: string, // NOTE(youngchul): DEPRECATED, keeping just for reference.
  isDisableOpenPush?: boolean,
  isFree?: boolean,
  title?: string,
}

interface EpisodeEntity extends Entity {
  cachedAt: Nullable<string>,
  closeAt: Nullable<string>,
  data: EpisodeData,
  image: Nullable<{ [key: string]: any }>,
  ord: Nullable<number>,
  openAt: Nullable<string>,
  state: number,
  seriesId: number,

  series?: SeriesEntity,
  episodeBuild?: EpisodeBuildEntity,
}

const BUILD_STATE = {
  INIT: 0,
  WORKING: 100,
  DONE: 200,
  FAILED: 900,
} as const;

interface EpisodeBuildEntity extends Entity {
  episodeId: number | string,
  // FIXME(jinwook): Set type of inputData and outputData.
  inputData: Nullable<any>,
  outputData: Nullable<any>,
  state: Nullable<ValueOf<typeof BUILD_STATE>>,
  workExpireAt: Nullable<string>,
  workerId: Nullable<string>,
}


type EpisodeSeriesData = Pick<SeriesData,
  'billboardBadge' | 'billboardTitle' | 'description' | 'freeEpisodeCount' | 'isCompleted' |
  'isHorizontalView' | 'releaseSchedule' | 'title' | 'totalEpisodeCount'
> & {
  relatedSeriesList?: RelatedSeries[],
};

type Episode = Omit<EpisodeEntity, 'series'> & {
  cutImages: { [key: string]: any }[],
  series: Pick<SeriesEntity, 'id'> & {
    data: EpisodeSeriesData,
  },

  lockData?: { [key: string]: any },
  purchaseHistory?: { [key: string]: any },
  viewHistory?: { [key: string]: any },
};

type SeriesEpisode = EpisodeEntity & Pick<Episode, 'lockData' | 'purchaseHistory' | 'viewHistory'>;

type GetSeriesRes = Series & {
  episodes?: SeriesEpisode[],
  freePass?: FreePass,
  my?: MySeriesData,
  sort?: 'asc' | 'desc',
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
  response: GetSeriesRes;
}>;

const getSeries: ExpressHandler<GetSeriesSpec> = async (req, res) => {
  // req and res are fully typed
  const { id } = req.params;
  const series = { id } as GetSeriesRes;
  res.json(series);
}
