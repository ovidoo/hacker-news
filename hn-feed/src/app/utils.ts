import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const regexPattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
export const urlExtractor = (url: string) => new RegExp(regexPattern).exec(url) as string[];
export const formatTimeStamp = (time: number) => dayjs.unix(time + 1000).fromNow();