// utils.js
export const isSpecialDay = (date) => {
    const dayOfWeek = date.getDay();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const vietnameseHolidays = [
        { day: 1, month: 1 },
        { day: 30, month: 4 },
        { day: 2, month: 9 },
    ];
    return (
        (dayOfWeek === 0 || dayOfWeek === 6) || // Ngày cuối tuần
        vietnameseHolidays.some(holiday => holiday.day === day && holiday.month === month)
    );
};


// Tính tổng giá dựa trên số lượng và giá
export const calculateTotalPrice = (adultCount, childCount, prices, selectedDate) => {
    const specialPrice = isSpecialDay(selectedDate);
    return specialPrice
        ? (adultCount * prices.specialAdultPrice) + (childCount * prices.specialChildPrice)
        : (adultCount * prices.adultPrice) + (childCount * prices.childPrice);
};