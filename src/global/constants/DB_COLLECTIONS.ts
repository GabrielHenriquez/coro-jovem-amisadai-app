const ENV = process.env.EXPO_PUBLIC_ENV;
const isStaging = ENV === "STAGING";

type DB_COLLECTIONS_TYPE = {
  dots: string;
  events: string;
  eventsCard: string;
  eventsBirthDateCard: string;
  components: string;
  musics: string;
};

export const DB_COLLECTIONS: Record<keyof DB_COLLECTIONS_TYPE, string> = {
  dots: isStaging ? "dots-staging" : "dots",
  events: isStaging ? "events-staging" : "events",
  eventsCard: isStaging ? "eventsCard-staging" : "eventsCard",
  eventsBirthDateCard: isStaging
    ? "eventsBirthDateCard-staging"
    : "eventsBirthDateCard",
  components: isStaging ? "components-staging" : "components",
  musics: isStaging ? "musics-staging" : "musics",
};
