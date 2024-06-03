import moment from "moment";

export const formatDate = (dateString) => {
    const date = moment(dateString, "YYY-MM-DD");
    const formattedDate = date.format("DD MMM YY");
    return formattedDate;
};

export const formatTime = (timeString) => {
    const inputFormat = "HH:mm:ss";
    const momentTime = moment(timeString, inputFormat);
    const formattedTime = momentTime.format("hh:mm A");
    return formattedTime;
};
export const formatCreatedAt = (createdAtString) => {
    const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSSSSS";
    const momentCreatedAt = moment(createdAtString, inputFormat);
    const formattedCreatedAt = momentCreatedAt.format("DD MMM YY - hh:mm A");
    return formattedCreatedAt;
};

export const formatTimeStamp = (createdAtString) => {
    const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSSSSS";
    const momentCreatedAt = moment(createdAtString, inputFormat);
    const formattedCreatedAt = momentCreatedAt.format("DD MMM YY - HH:mm:ss");
    return formattedCreatedAt;
};