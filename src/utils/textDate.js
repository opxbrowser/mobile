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
      textTime = `Há ${diffYear} ano${diffYear > 1 ? "s" : ""} atrás.`;
    } else if (diffMonths) {
      textTime = `Há ${diffMonths} ${diffMonths > 1 ? "meses" : "mês"} atrás.`;
    } else if (diffDays) {
      if (diffDays < 0) {
        textTime = `Há um tempo atrás.`;
      } else {
        textTime = `Há ${diffDays} ${diffDays > 1 ? "dias" : "dia"} atrás.`;
      }
    } else if (diffHours) {
      if (diffHours < 0) {
        textTime = `Há um tempo atrás.`;
      } else {
        textTime = `Há ${diffHours} ${diffHours > 1 ? "horas" : "hora"} atrás.`;
      }
    } else if (diffMinutes) {
      textTime = `Há ${diffMinutes} ${
        diffMinutes > 1 ? "minutos" : "minuto"
      } atrás.`;
    } else if (diffSeconds > 30) {
      textTime = `Há ${diffSeconds} ${
        diffSeconds > 1 ? "secondos" : "segundo"
      } atrás.`;
    } else {
      textTime = `Agora`;
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
