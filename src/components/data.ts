type Scale = {
    unit: string,
    step: number,
    format: string | ((date: Date | undefined) => string) 
}

type Column = {
    name: string,
    label: string,
    width: string
}

enum ETimeFormat {
    day = 'day',
    week = 'week',
    month = 'month',
    year = 'year'
}

export const scales: Array<Scale> = [
    { unit: ETimeFormat.day, step: 7, format: (date?: Date) => {

      if (date) {
        const finalyDate = new Date();

        const startDay = date.toString().slice(8, 10);
        const startMonth = date.toString().slice(4, 7);

        finalyDate.setMonth(date.getMonth(), date.getDate() + 7);

        const finalyDay = finalyDate.toString().slice(8, 10);
        const finalyMonth = finalyDate.toString().slice(4, 7);

        return `${startDay} ${startMonth} - ${finalyDay} ${finalyMonth}`;
      }

      return ''
      
    } },
    { unit: "day", step: 1, format: "d"},
];
  
export const columns: Array<Column> = [
    { name: "text", label: "Work Item", width: "390px"},
];