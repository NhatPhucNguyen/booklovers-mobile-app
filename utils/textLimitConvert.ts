export const textLimitConvert = (
    text: string | null | undefined,
    limit: number
) => {
    if (!text) {
        return "";
    }
    if (text.length > limit) {
        return text.slice(0, limit) + "...";
    }
    return text;
};
