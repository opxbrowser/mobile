import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

export function getTextTime(timestamp) {
    if (timestamp && timestamp != "") {
        const {
            diffYear,
            diffMonths,
            diffDays,
            diffHours,
            diffMinutes,
            diffSeconds,
        } = getDiffs(timestamp);

        let textTime = "";

        if (diffYear) {
            textTime = `${diffYear} year${diffYear > 1 ? "s" : ""} ago.`;
        } else if (diffMonths) {
            textTime = `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago.`;
        } else if (diffDays) {
            if (diffDays < 0) {
                textTime = `A while ago.`;
            } else {
                textTime = `${diffDays} day${diffDays > 1 ? "s" : ""} ago.`;
            }
        } else if (diffHours) {
            if (diffHours < 0) {
                textTime = `A while ago.`;
            } else {
                textTime = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago.`;
            }
        } else if (diffMinutes) {
            textTime = `${diffMinutes} minute${
                diffMinutes > 1 ? "s" : ""
            } ago.`;
        } else if (diffSeconds > 30) {
            textTime = `${diffSeconds} second${
                diffSeconds > 1 ? "s" : ""
            } ago.`;
        } else {
            textTime = `Now`;
        }

        return textTime;
    }
    return "";
}

function getDiffs(time) {
    const postConfig = moment.utc(time).toDate();
    const nowConfig = moment.utc(getTimestamp()).toDate();

    const range = moment.range(postConfig, nowConfig);
    const diffDays = range.diff("days");
    const diffMonths = range.diff("months");
    const diffYear = range.diff("years");
    const diffHours = range.diff("hours");
    const diffMinutes = range.diff("minutes");
    const diffSeconds = range.diff("seconds");

    return {
        diffYear,
        diffMonths,
        diffDays,
        diffHours,
        diffMinutes,
        diffSeconds,
    };
}

export function getTimestamp() {
    const timestamp = moment().valueOf();
    return timestamp;
}
